import path from 'path';

import {
  clipboard,
  DownloadItem,
  Event,
  shell,
  app,
  dialog,
  WebContents,
  webContents,
  BrowserWindow
} from 'electron';

import { handle } from '../ipc/main';
import { dispatch, select } from '../store';
import {
  DOWNLOAD_CREATED,
  DOWNLOAD_REMOVED,
  DOWNLOAD_UPDATED,
  DOWNLOADS_CLEARED
} from './actions';
import { DOWNLOADS_PATH_CHANGED/*, UPDATE_DIALOG_REMIND_UPDATE_LATER_CLICKED*/ } from '../ui/actions';
import { Download, DownloadStatus } from './common';
//import {uploadPeer} from './uploadPeer';
import {downloadPeer} from './downloadPeer';
import {askRemoveAllDownloads} from '../ui/main/dialogs';

const items = new Map<Download['itemId'], DownloadItem>();

export const handleWillDownloadEvent = async (
  _event: Event,
  item: DownloadItem,
  serverWebContents: WebContents
): Promise<void> => {
  const itemId = Date.now();

  items.set(itemId, item);
  item.setSaveDialogOptions({
    defaultPath: path.join(app.getPath('downloads'), item.getFilename())
  });

  var server:any;
  var roomName:any;

  if(item.getURL().startsWith('p2p://')){

    try{
      const execjs=`if(globalThis['have_new_downloads']){
        globalThis['have_new_downloads'](true);
      }`;
      BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(execjs);
      }
    catch{}

    item['myId']=itemId;
    const str=item.getURL().substr(6).split('/');
    const fileinfo=str[1].split('%%%%'); //ид пира + ид папки
    const diid=decodeURI(fileinfo[1] ? fileinfo[1].replaceAll('%%%', '/'):str[2]); //отображаемое имя загрузки

    globalThis['p2p'][fileinfo[0]].downloadItems[diid]=item;

    if(item.getMimeType()==='folder'){
      item['isFolder']=true //??
    }
    
    item['p2p_cancel']=()=>{
      const itemId=item['myId'];

      setTimeout(function(){
        downloads_remove(itemId);
      }, 2000);

      items.delete(itemId);
    };
    
    item['p2p_pause']=(b:any)=>{
      const itemId=item['myId'];

      setTimeout(function(){
        dispatch({
          type: DOWNLOAD_UPDATED,
          payload: {
            itemId,
            state: 'paused',
            status: DownloadStatus.PAUSED,
            fileName: item.getFilename(),
            receivedBytes: b,
            totalBytes: item.getTotalBytes(),
            startTime: item.getStartTime() * 1000,
            endTime: Date.now(),
            url: item.getURL(),
            mimeType: item.getMimeType(),
            savePath: item.getSavePath(),
            serverUrl: server?.url,
            serverTitle: roomName || server?.title,
          },
        })
      }, 100);

    };
    globalThis['p2p_items']=globalThis['p2p_items']||{};
    globalThis['p2p_items'][item['myId']]=fileinfo[0];

    item.on('updated', (p:any)=>{
      const itemId=item['myId'];
      item['p2p_receivedBytes']=p;

      dispatch({
        type: DOWNLOAD_UPDATED,
        payload: {
          itemId,
          state: item.isPaused() ? 'paused' : 'progressing',//'progressing',
          status: item.isPaused() ? DownloadStatus.PAUSED : DownloadStatus.ALL,//DownloadStatus.ALL,
          fileName: item.getFilename(),
          receivedBytes: p,
          totalBytes: item.getTotalBytes(),
          startTime: item.getStartTime() * 1000,
          endTime: Date.now(),
          url: item.getURL(),
          mimeType: item.getMimeType(),
          savePath: item.getSavePath(),
          serverUrl: server?.url,
          serverTitle: roomName || server?.title,
        },
      });

      items.delete(itemId);
    });
    
    item.on('done', () => {
      const itemId=item['myId'];
      item['p2p_receivedBytes']=item.getTotalBytes();

      dispatch({
        type: DOWNLOAD_UPDATED,
        payload: {
          itemId,
          state: 'completed',
          status: DownloadStatus.ALL,
          fileName: item.getFilename(),
          receivedBytes: item.getTotalBytes(),
          totalBytes: item.getTotalBytes(),
          startTime: item.getStartTime() * 1000,
          endTime: Date.now(),
          url: item.getURL(),
          mimeType: item.getMimeType(),
          savePath: item.getSavePath(),
          serverUrl: server?.url,
          serverTitle: roomName || server?.title,
        },
      });

      items.delete(itemId);

      try{
        const execjs=`if(globalThis['have_new_downloads']){
          globalThis['have_new_downloads'](true);
        }`;
        BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(execjs);
        }
      catch(e){}

      globalThis['p2p_items'][itemId]=undefined;
    });

    roomName=str[0];
  }
  else{
    server = select(({ servers }) =>
      servers.find((server) => server.webContentsId === serverWebContents.id)
    );

    /*if (!server) {
      // TODO: check if the download always comes from the main frame webContents
      throw new Error('could not match the server');
    }*/

    try{
      const execjs=await serverWebContents.executeJavaScript('[Meteor.user().username, Session.keys]');
      const keys=execjs[1] || [];
      const username=execjs[0] || '';
      //const username=await serverWebContents.executeJavaScript('Meteor.user().username');
      
      if(keys.openedRoom && keys.openedRoom!='undefined'){
        const room=JSON.parse(keys['roomData'+keys.openedRoom.replace(/['"]/igm, '')]);
  
        if(room){
          if(room.t==='d'){
            const users=room['usernames'].filter((f:any)=>{return f!==username});
            roomName=users.join(' x ');
          }
          else{
            roomName=room['name'];
          }
        }
      }
      else{
        let lasturl=server ? server.lastPath:undefined;
        if(!lasturl && serverWebContents['history'] && serverWebContents['history'].length){
          lasturl=serverWebContents['history'].slice(-1);
        }

        if(lasturl){
          if(typeof lasturl !== 'string'){ lasturl=lasturl[0] }
          if(lasturl.endsWith("/")){ lasturl=lasturl.slice(0, -1) }
          roomName=lasturl.slice(lasturl.lastIndexOf("/")+1).replace(/[#\/&\?\\%]/igm, '');
        }
      }

    }
    catch(e){
      console.log(e);
    }

    item.on('updated', () => {

      dispatch({
        type: DOWNLOAD_UPDATED,
        payload: {
          itemId,
          state: /*item.isPaused() ? 'paused' :*/ item.getState(),
          status: /*item.isPaused() ? DownloadStatus.PAUSED :*/ DownloadStatus.ALL,
          fileName: item.getFilename(),
          receivedBytes: item.getReceivedBytes(),
          totalBytes: item.getTotalBytes(),
          startTime: item.getStartTime() * 1000,
          endTime: Date.now(),
          url: item.getURL(),
          mimeType: item.getMimeType(),
          savePath: item.getSavePath(),
        },
      });

      items.delete(itemId);
    });

    item.on('done', () => {

      dispatch({
        type: DOWNLOAD_UPDATED,
        payload: {
          itemId,
          state: /*item.isPaused() ? 'paused' :*/ item.getState(),
          status:
            item.getState() === 'cancelled'
              ? DownloadStatus.CANCELLED
              : DownloadStatus.ALL,
          fileName: item.getFilename(),
          receivedBytes: item.getReceivedBytes(),
          totalBytes: item.getTotalBytes(),
          startTime: item.getStartTime() * 1000,
          endTime: Date.now(),
          url: item.getURL(),
          mimeType: item.getMimeType(),
          savePath: item.getSavePath(),
        },
      });

      items.delete(itemId);
      if(globalThis['have_new_downloads']){
        globalThis['have_new_downloads'](true);
      }
    });
     
    dispatch({
      type: DOWNLOAD_CREATED,
      payload: {
        itemId,
        state: /*item.isPaused() ? 'paused' :*/ 'progressing',//item.getState(),
        status: /*item.isPaused() ? DownloadStatus.PAUSED :*/ DownloadStatus.ALL,
        fileName: item.getFilename(),
        receivedBytes: item.getReceivedBytes(),
        totalBytes: item.getTotalBytes(),
        startTime: item.getStartTime() * 1000,
        endTime: undefined,
        url: item.getURL(),
        serverUrl: server?.url,
        serverTitle: roomName || server?.title,
        mimeType: item.getMimeType(),
        savePath: item.getSavePath(),
      },
    });

  }

 

};

export const setupDownloads = (): void => {

  let downloadsPath = select(({ downloadsPath }) => downloadsPath);

  if(downloadsPath){
    app.setPath('downloads', downloadsPath);
  }

 /* const messenger=require('messenger');
  const server=messenger.createListener('127.0.0.1:3010');

  server.on('p2p-upload', function(message:any, data:any){

    if(data.p2pfiles.length){
      globalThis['p2p_sendto_payload']=data.p2pfiles;

      const wcs = webContents.getAllWebContents();
      wcs.forEach(w=>{
        if(w['viewInstanceId']===1){
          const sc = `document.getElementById("CreateRoomP2P").click();`;
          try{
            w.executeJavaScript(sc);
          }
          catch{
            console.log('Cannot execute script on webContent: ', w);
          }
        }
      });
    }

    message.reply({'ok':'ok'});
  });
*/


  handle('downloads/show-downloads-path', async (_webContents) => {
    shell.openPath(app.getPath('downloads'));
  });

  handle('downloads/remove-all-downloads', async(_webContents)=>{
    try{
      const dpath=app.getPath('downloads');
      const approve=await askRemoveAllDownloads(dpath);
      if(!approve)return;

      dispatch({
        type: DOWNLOADS_CLEARED
      });

      const forbidden=[
        process.env['ALLUSERSPROFILE'],
        process.env['USERPROFILE'],
        process.env['APPDATA'],
        process.env['SystemDrive'],
        process.env['SystemRoot'],
        process.env['ProgramFiles'],
        process.env['ProgramFiles(x86)'],
        process.env['ProgramData']
      ].filter((el:any)=>el!=='').map((el:any)=>{
        return el.replace(/\\$/i, '').toLowerCase();
      });

      if(forbidden.indexOf(dpath.replace(/\\$/i, '').toLowerCase())>-1)return;

      const fs=require('fs');
      const list=fs.readdirSync(dpath);
   
      if(!list)return;
      
      list.forEach((element:any) => {
        shell.moveItemToTrash(path.join(dpath, element), true);
      });

    }
    catch(e){
      console.log(e);
    }

  });

  handle('downloads/set-downloads-path', async (_webContents) => {
    
    const paths=dialog.showOpenDialogSync({
      properties: ['openDirectory']
    });
    if(!paths)return;

    app.setPath('downloads', paths[0]);
    dispatch({
      type: DOWNLOADS_PATH_CHANGED,
      payload: paths[0],
    });
  });

  handle('downloads/show-in-folder', async (_webContents, itemId) => {
    const download = select(({ downloads }) => downloads[itemId]);

    if (!download) {
      return;
    }

    shell.showItemInFolder(download.savePath);
  });

  handle('downloads/run-downloaded', async (_webContents, itemId) => {
    const download = select(({ downloads }) => downloads[itemId]);

    if (!download) {
      return;
    }

    shell.openPath(download.savePath);
  });

  handle('p2p-upload', async(_webContent/*, param*/)=>{
    /*try{
      globalThis['p2p']=globalThis['p2p'] || {};

      if(param.signal){
        const gp=globalThis['p2p'][param.signal.srcid];

        if(param.signal.type==='close'){
          Object.keys(gp).forEach((peerid:any)=>{
            let peer=gp[peerid];
            if(peer && peer.state && peer.state!=='closed'){
              peer.emit('close');
            }
          });
          if(gp)gp.state='closed';
          _webContent.executeJavaScript("Meteor.p2p['"+param.signal.srcid+"'].state='closed';");
        }
        else if(gp && gp.state==='announce' && gp[param.userid]===undefined){
          gp[param.userid]=uploadPeer({files: gp.files, signal: param.signal, userid: param.userid, rid: param.rid, tmid: param.tmid, randomid: param.randomid}, _webContent);
          //await gp[param.userid].signal(param.signal);
        }
        
        return;
      }

      var paths=param.paths || globalThis['p2p_sendto_payload'];

      if(!paths){
        //const {dialog}=require('electron');
        
        if(param.isFolder===true){
          paths=dialog.showOpenDialogSync({
            properties: ['openDirectory', 'multiSelections']
          });
        }
        else{
          paths=dialog.showOpenDialogSync({
            properties: ['openFile', 'multiSelections']
          });
        }
        
        if(!paths)return;
      }

      const fs=require('fs');
      const mime = require('mime');
      const ffs=require('fast-folder-size');
      var _sumsize=0;

      const files = paths.map((fpath:any) => {
        var fstat=fs.statSync(fpath);
        var ftype=mime.getType(fpath);
        var fname=path.parse(fpath).name+path.parse(fpath).ext;
        
        const isFolder=fstat.isDirectory();
        if(!isFolder){
          _sumsize+=fstat.size;
          return {
            relpath: fname,
            path: fpath,
            name: fname,
            size: fstat.size,
            type: ftype
          };
        }
        else{
          return {
            relpath: fname+'/',
            path: fpath,
            name: fname,
            size: -1,
            type: 'folder'
          };
        }     
      });

      const sendAnnounce=()=>{
        var execjs:string=`
        Meteor.call('sendMessage', {
            _id: '`+param.randomid+`',
            msg: '',
            rid: '`+param.room.rid+`',`+
            (param.room.tmid?`tmid: '`+param.room.tmid+`',`:``)+
            `p2p: true,
            filelist: JSON.parse('`+JSON.stringify(files).replace(/\\/g, '\\\\')+`'),
            signal: {type: 'announce', srcid: '`+param.randomid+`', rid: '`+param.room.rid+`', tmid: '`+param.room.tmid+`', sumsize: `+_sumsize+`}
        }); `;
    
        _webContent.executeJavaScript(execjs);
      
        globalThis['p2p'][param.randomid]={state: 'announce', files: files, isFolder: param.isFolder, sumsize: _sumsize};
        if(globalThis['p2p_sendto_payload'])globalThis['p2p_sendto_payload']=undefined;
        _webContent.executeJavaScript("Meteor.p2p['"+param.randomid+"']={state: 'announce'};");  
      };
      
      const checkSizes=(index:any)=>{

        if(index===files.length){
          sendAnnounce();
          return;
        }
        else if(files[index].size===-1){
          ffs(files[index].path, (err:any, bytes:any)=>{
            if(err)console.log(err);
            _sumsize+=bytes;
            files[index].size=bytes;
            checkSizes(index+1);
          });
        }
        else{
          checkSizes(index+1);
        }
      };

      checkSizes(0);
    }
    catch(e){
      console.log(e);
    }*/
  });

  handle('p2p-download', async (_webContent, signal)=>{
    try{
      globalThis['p2p']=globalThis['p2p'] || {};
      const gp=globalThis['p2p'];

      if(gp[signal.srcid]===undefined){

        if(signal.autodownload!==true){
          const paths=dialog.showOpenDialogSync({
            defaultPath: app.getPath('downloads'),
            properties: ['openDirectory']
          });
          if(!paths){
            await _webContent.executeJavaScript("Meteor.p2p['"+signal.srcid+"']={state: 'cancelled'}");
            return;
          }

          signal.dpath=paths[0];
        }
        else{
          signal.dpath=app.getPath('downloads');
        }

        gp[signal.srcid] = downloadPeer(signal, _webContent);
        return;
      }
      if(gp[signal.srcid] && gp[signal.srcid].state==='closed'){
        return;
      }
      if(gp[signal.srcid] && gp[signal.srcid].state==='offer'){
        await gp[signal.srcid].signal(signal);
        return;
      }

      const peer=gp[signal.srcid][signal.userid]||gp[signal.srcid];

      if(signal.pause && peer){
        await peer.emit('pause');
        return;
      }
      if(signal.resume && peer){
        await peer.emit('resume');
        return;
      }
      if(signal.cancel && peer){
        await peer.emit('cancel');
        return;
      }
    }
    catch(e){
      console.log(e);
    }
  });

  handle('downloads/copy-link', async (_webContent, itemId) => {
    const download = select(({ downloads }) => downloads[itemId]);

    if (!download) {
      return;
    }

    clipboard.write({ text: download.url });
  });

  handle('downloads/pause', async (_webContent, itemId) => {
    const peerid=globalThis['p2p_items'][itemId];
    if(peerid){
      globalThis['p2p'][peerid].emit('pause');
      return;
    }
    if (!items.has(itemId)) {
      return;
    }
    const item = items.get(itemId);
    if (item?.isPaused()) {
      return;
    }
    item?.pause();
  });

  handle('downloads/resume', async (_webContent, itemId) => {
    const peerid=globalThis['p2p_items'][itemId];
    if(peerid){
      globalThis['p2p'][peerid].emit('resume');
      return;
    }
    if (!items.has(itemId)) {
      return;
    }
    const item = items.get(itemId);
    if (!item?.canResume()) {
      return;
    }
    item?.resume();

  });

  handle('downloads/cancel', async (_webContent, itemId) => {
    try{
      const peerid=globalThis['p2p_items'][itemId];
      if(peerid){
        globalThis['p2p'][peerid].emit('cancel');
        return;
      }
    
      if (!items.has(itemId)) {
        //console.log('no itemId:', itemId);
        return;
      }
      const item = items.get(itemId);
      item?.cancel();
    
    }
    catch{}
  
    dispatch({
      type: DOWNLOAD_REMOVED,
      payload: itemId,
    });
  });



  handle('downloads/retry', async (_webContent, itemId) => {
    const { url, webContentsId } = select(({ downloads, servers }) => {
      const { url, serverUrl } = downloads[itemId];
      const { webContentsId } =
        servers.find((server) => server.url === serverUrl) ?? {};
      return { url, webContentsId };
    });

    /*dispatch({
      type: DOWNLOAD_REMOVED,
      payload: itemId,
    });*/

    if (webContentsId) {
      webContents.fromId(webContentsId).downloadURL(url);
    }
  });

  handle('downloads/remove', async (_webContent, itemId) => {
    downloads_remove(itemId);

  });

};

const downloads_remove=(itemId:any)=>{
  try{
    if (items.has(itemId)) {
      const item = items.get(itemId);
      item?.cancel();
    }
  }catch{}

  const download = select(({ downloads }) => downloads[itemId]);

  if (download) {
      doDelete(download.savePath);
  }

  dispatch({
    type: DOWNLOAD_REMOVED,
    payload: itemId,
  });
}
const doDelete=async(p:string):Promise<void>=>{
  const fs=require('fs');
  if(fs.existsSync(p)){
    shell.moveItemToTrash(p, true);
  }
}
