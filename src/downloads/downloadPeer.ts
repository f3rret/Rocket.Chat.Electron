import fs from 'fs';
import path from 'path';
const wrtc = require('wrtc');

export const MSG_DOWNLOAD_COMPLETE='загрузка завершена';
export const MSG_DOWNLOAD_CANCEL='загрузка отменена';
export const MSG_DOWNLOAD_BEGIN='идет загрузка..';

export const downloadPeer=(param:any, _webContent:any)=>{

    var SimplePeer=require('simple-peer');
    var peer = new SimplePeer({
        initiator: true,
       // reconnectTimer: 100,
        iceTransportPolicy: 'relay',
        trickle: false,
        config: {
            iceServers:[
                {
                    urls: ['stun:rocketchat:3478', 'turn:rocketchat:3478'],
                    username: "rocketchat",
                    credential: "rocketchat"
                }]
        },
        wrtc: wrtc });
    peer.srcid=param.srcid;
    var _sumsize=param.sumsize||0;
    var _sumrec=new Array();

    peer.setMaxListeners(100);
    peer.destroy=function(){
        try{
            peer._destroy(null, ()=>{})
        }
        catch(e){
            console.log('error while destroy fileChannel:', e);
        }
    }

    peer.on('signal', (data:any)=>{
        try{
            if(data.type)peer.state=data.type;
            
            if(data.type && data.type==='offer'){
                data.srcid=param.srcid;

                var execjs:string=`
                    Meteor.call('sendMessage', {
                    _id: '`+param.randomid+`',
                    msg: '`+MSG_DOWNLOAD_BEGIN+`',
                    rid: '`+param.rid+`',
                    tmid: '`+param.srcid+`',
                    p2p: true,
                    tshow: true,
                    signal: JSON.parse('`+JSON.stringify(data).replace(/\\/g, '\\\\')+`')
                    }); `;

                _webContent.executeJavaScript(execjs);
            }

            _webContent.executeJavaScript("Meteor.p2p['"+param.srcid+"']={state: '"+ data.type +"'}");
        }
        catch(e){
            console.log(e);
        }
    });

    var SimplePeerFiles=require('simple-peer-files-electron');
    var spf=new SimplePeerFiles.default();
    var transfers=new Array();

    const writeStreams=new Array();
    const downloadItems=new Array();
    peer.downloadItems=downloadItems;

    var checkInterval:any;
    var checkIntervalCounter=0;

    const checkComplete=()=>{
        if(checkInterval)return;

        checkInterval=setInterval(function(){
            var ok=Object.keys(transfers);
            if(ok && ok.length && checkIntervalCounter<5){
                checkIntervalCounter++;
                return;
            }
            clearInterval(checkInterval);

            ok=Object.keys(peer.downloadItems);
            ok.forEach(fid=>{
                if(peer.downloadItems[fid] && peer.downloadItems[fid].getMimeType()==='folder'){
                    peer.downloadItems[fid].emit('done');
                    //delete downloadItems[fid];
                }
            });
            
            peer.emit('DOWNLOAD_PROGRESS', 100, MSG_DOWNLOAD_COMPLETE);
            peer.emit('close');
        }, 1000);
    }

    peer.on('error', (err:any)=>{
        console.log('------peer on error--------');
        if(checkInterval)clearInterval(checkInterval);
        console.log(err);
        try{
            var ok=Object.keys(writeStreams);
            if(ok && ok.length){
                ok.forEach((ws:any)=>{if(writeStreams[ws])writeStreams[ws].destroy();});
            }
            peer.emit('close');

            ok=Object.keys(peer.downloadItems);
            if(ok && ok.length){
                ok.forEach((d:any)=>peer.downloadItems[d]['p2p_cancel']());
            }
        }
        catch{}
    });

    peer.on('connect', ()=>{
        peer.state='connected';
    });

    peer.on('close', (cb:any)=>{
        try{
            if(checkInterval)clearInterval(checkInterval);
            if(peer.state==='closed')return;
            peer.state='closed';
  
            var ok=Object.keys(transfers);
            if(ok && ok.length){
                ok.forEach((t:any)=>transfers[t]=undefined);
            }

            ok=Object.keys(writeStreams);
            if(ok && ok.length){
                ok.forEach((ws:any)=>{writeStreams[ws].destroy();});
            }

            var execjs:string=`
                Meteor.call('updateMessage', {
                _id: '`+param.randomid+`',
                msg: '`+MSG_DOWNLOAD_COMPLETE+`',
                rid: '`+param.rid+`',
                tmid: '`+param.srcid+`',
                tshow: true,
                state: 'closed',
                p2p: true
                }); `;

            _webContent.executeJavaScript(execjs);
            _webContent.executeJavaScript("Meteor.p2p['"+param.srcid+"'].state='closed'");

            setTimeout(function(){peer.destroy();}, 1000);

            if(cb)cb();
        }
        catch(e){
            console.log('error on peer close:', e);
        }
    });
    
    peer.on('pause', ()=>{
        try{
            if(!peer.paused){
                var ok=Object.keys(transfers);
                if(ok && ok.length){
                    ok.forEach((t:any)=>{if(transfers[t])transfers[t].pause()});
                }
                peer.paused=true;
                _webContent.executeJavaScript("Meteor.p2p['"+param.srcid+"'].paused=true");

                ok=Object.keys(peer.downloadItems);
                if(ok && ok.length){
                    ok.forEach((d:any)=>peer.downloadItems[d]['p2p_pause'](transfers[d].bytesReceived));
                }

            }
        }
        catch{}
    });
    peer.on('resume', ()=>{
        try{
            if(peer.paused){
                var ok=Object.keys(transfers);
                if(ok && ok.length){
                    ok.forEach((t:any)=>{if(transfers[t])transfers[t].resume()});
                }
                peer.paused=false;
                _webContent.executeJavaScript("Meteor.p2p['"+param.srcid+"'].paused=false");
            }
        }
        catch{}
    });
    peer.on('cancel', ()=>{
        try{
            var ok=Object.keys(transfers);
            if(ok && ok.length){
                ok.forEach((t:any)=>{if(transfers[t])transfers[t].cancel();});
            }
            setTimeout(()=>{
                peer.emit('close', ()=> _webContent.executeJavaScript("Meteor.p2p['"+param.srcid+"'].currfilename='"+MSG_DOWNLOAD_CANCEL+"'; Meteor.p2p['"+param.srcid+"'].paused=false"));
            }, 250);
            
            ok=Object.keys(peer.downloadItems);
            if(ok && ok.length){
                ok.forEach((d:any)=>peer.downloadItems[d]['p2p_cancel']());
            }
        }
        catch(e){
            console.log(e);
        }
    });

	peer.on('data', (data:any) =>{
        try{
            if(data.toString().substr(0, 5) === "file-") {
                let parentItemFileID:any=null;
                const fileID = data.toString().substr(5);
                const fileinfo=fileID.split('::');
                const relpath=fileinfo[0];
                const dirname=relpath.endsWith('/')?relpath.slice(0,-1):path.dirname(relpath);

                const downloads = param.dpath;
                if (!fs.existsSync(downloads)){
                    fs.mkdirSync(downloads, { recursive: true });
                }

                if(dirname!=='.'){
                    if(!fs.existsSync(path.join(downloads, dirname))){
                        fs.mkdirSync(path.join(downloads, dirname), { recursive: true });
                    }

                    const root=relpath.substr(0, relpath.indexOf('/'));                  
                    var ok=Object.keys(peer.downloadItems);
                    ok.forEach((k:any)=>{
                        if(peer.downloadItems[k].getFilename()===root){
                            parentItemFileID=k;
                        }
                    });
                    if(!parentItemFileID){
                        var dirsize=peer.sumsize;
                        
                        param.filelist.forEach((f:any)=>{
                            if(f.name===root && f.type==='folder' && f.size){
                                dirsize=f.size;
                                return;
                            }
                        });
                        
                        parentItemFileID=fileID;
                        _sumrec[fileID]= 0;

                        if(dirsize>0){
                            _webContent.session.createInterruptedDownload({
                                path: path.join(downloads, root),
                                urlChain: ["p2p://"+param.username+"/"+param.srcid+"%%%%"+fileID.replaceAll('/', '%%%')+"/"+root],
                                mimeType: "folder",
                                offset: 0,
                                length: dirsize || 1
                            });
                        }
                    }
                }
                else{
                    if(fileinfo[2]!=0){
                        _webContent.session.createInterruptedDownload({
                            path: path.join(downloads, relpath),
                            urlChain: ["p2p://"+param.username+"/"+param.srcid+"%%%%"+fileID.replaceAll('/', '%%%')+'/'+fileinfo[0]],
                            mimeType: fileinfo[1],
                            offset: 0,
                            length: parseFloat(fileinfo[2]) || 1
                        });
                    }
                }

                let basename=path.basename(relpath);
                while(fs.existsSync(path.join(downloads, dirname, basename))){
                    basename='_'+basename;
                }

                if(fileinfo[2]==0 && fileinfo[1]!='folder'){ //пустые файлы
                    delete transfers[fileID];
                    writeStreams[fileID]=fs.createWriteStream(path.join(downloads, dirname, basename));
                    writeStreams[fileID].end();
                }
                else{
                    spf.receive(peer, fileID, wrtc).then((t:any) => {
                        transfers[fileID]=t;
                        transfers[fileID].parentItemFileID=parentItemFileID;

                        _sumrec[fileID]=0;
                        
                        writeStreams[fileID]=fs.createWriteStream(path.join(downloads, dirname, basename));
                        
                        transfers[fileID].fileStream=writeStreams[fileID];
                        writeStreams[fileID].on('finish', function(){
                            writeStreams[fileID].destroy();
                            delete writeStreams[fileID];
                        });
                    
                        transfers[fileID].on("progress", (progress:any, bytes:any)=>{
                            if(!progress)false;
                            /*if(progress==100){
                                _sumrec[fileID]=-parseFloat(bytes);
                            }*/
                            peer.emit('DOWNLOAD_PROGRESS', bytes, fileID);
                        });
                        transfers[fileID].on("done", ()=>{
                            if(peer.downloadItems[fileID] && peer.downloadItems[fileID].getMimeType()!=='folder'){
                                peer.downloadItems[fileID].emit('done');
                            }

                            setTimeout(function(){
                                delete transfers[fileID];
                                if(writeStreams[fileID])writeStreams[fileID].end();
                            }, 1000);
                        });
                        
                        transfers[fileID].on('paused', ()=>{
                            if(!peer.paused)peer.emit('pause');
                        });
                        transfers[fileID].on('resumed', ()=>{
                            if(peer.paused)peer.emit('resume');
                        });
                        transfers[fileID].on('cancelled', ()=>{
                            if(peer.state!=='closed')peer.emit('cancel');
                        });
                    });
                }
                peer.send("start-" + fileID);
            }
            else if(data.toString()==="done!"){
                checkComplete();
            }
        }
        catch(e){
            console.log(e);
        }      
	});

    var tickMark=Date.now();
    peer.on('DOWNLOAD_PROGRESS', (p:any, fileID:any)=>{
        try{
            var progress:any=0;

            if(fileID===MSG_DOWNLOAD_COMPLETE && p===100){
                progress=100;
            }
            else {
                var item:any=null;
                var folderID:any=null;

                if(transfers[fileID] && transfers[fileID].parentItemFileID){
                    folderID=transfers[fileID].parentItemFileID;
                    item=peer.downloadItems[folderID];

                    _sumrec[folderID] -= Math.abs(_sumrec[fileID]);//дочерние файлы с -, основные с +
                    _sumrec[fileID]= -parseFloat(p);
                    _sumrec[folderID] += Math.abs(_sumrec[fileID]);
                }
                else{
                    _sumrec[fileID]=parseFloat(p);
                    item=peer.downloadItems[fileID];
                }

                if(Date.now()-tickMark>250){
                    if(item){
                        item.emit('updated', folderID ? _sumrec[folderID]:_sumrec[fileID]);
                        var ok=Object.keys(_sumrec);
                        ok.forEach((k:any)=>{
                            if(folderID){
                                if(_sumrec[k]>0)progress+=_sumrec[k];
                            }
                            else{
                                progress+=Math.abs(_sumrec[k]); 
                            }
                        });

                        progress=(progress*100/_sumsize).toFixed(1);
                    }
                    else{
                        console.log('--no item:', fileID);
                    }

                    tickMark=Date.now();
                    _webContent.executeJavaScript("Meteor.p2p['"+param.srcid+"']=JSON.parse('"+JSON.stringify({progress: progress, currfilename: folderID || fileID, state: 'connected', paused: peer.paused})+"')");
                }
            }
        }
        catch(e){
            console.log(e);
        }
    });


    return peer;
}