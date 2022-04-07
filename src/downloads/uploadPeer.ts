import fs from 'fs';
import path from 'path';
const mime = require('mime');
const wrtc = require('wrtc');

export const MSG_DOWNLOAD_COMPLETE='загрузка завершена';
export const MSG_DOWNLOAD_CANCEL='загрузка отменена';

export const uploadPeer=(param:any, _webContent:any)=>{
    const files=param.files;
    const keys:any=[];
    
    var spf:any;
    var transfers=new Array();
    var _sumsend=new Array();
    const _sumsize=globalThis['p2p'][param.signal.srcid].sumsize;
    
    const SimplePeer = require('simple-peer');
    const peer=new SimplePeer({
       // reconnectTimer: 10,
        iceTransportPolicy: 'relay',
        trickle: false,
        config: {
            iceServers: [
                {
                    urls: ['stun:rocketchat:3478', 'turn:rocketchat:3478'],
                    username: "rocketchat",
                    credential: "rocketchat"
                }]
        },
        wrtc: wrtc
    });
    peer.srcid=param.signal.srcid;
    peer.setMaxListeners(100);
    peer.destroy=function(){
        try{
            peer._destroy(null,()=>{})
        }
        catch(e){
            console.log('error while destroy fileChannel:', e);
        }
    }

    for(var i=files.length; i>0; i--){
        const fileID=files[i-1].path+ '::' +files[i-1].type+ '::' +files[i-1].size;
        files[fileID]=files[i-1];
        keys.push(fileID);
    }

    const sendNextPack=()=>{
        try{
            const queue=Object.keys(transfers).length;
            for(let i=0; i<5-queue && keys.length; i++){
                var k=keys.pop();
                transfers[k]={state: 'ready'};
                peer.send("file-"+k);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    const checkComplete=()=>{

        if(keys.length == 0){
            if(Object.keys(transfers).length == 0 ){ 
                peer.send("done!");
                peer.emit('DOWNLOAD_PROGRESS', _sumsize, MSG_DOWNLOAD_COMPLETE);
            }
            else{
                
            }
        }

    }

    peer.on('signal', (data:any) => {
        try{
            if(data.type)peer.state=data.type;
            data.srcid=peer.srcid;

            var execjs:string=`
            Meteor.call('sendMessage', {
                _id: '`+param.randomid+`',
                msg: '',
                rid: '`+param.rid+`',
                tmid: '`+peer.srcid+`',
                p2p: true,
                tshow: true,
                sys: true,
                signal: JSON.parse('`+JSON.stringify(data).replace(/\\/g, '\\\\')+`')
            }); `;

            _webContent.executeJavaScript(execjs);
            _webContent.executeJavaScript("Meteor.p2p['"+peer.srcid+"']['"+param.userid+"']={state: 'answer'};");
        }
        catch(e){console.log(e)}
    });

    peer.signal(param.signal);

    peer.on('connect', ()=>{
        try{
            var SimplePeerFiles=require('simple-peer-files-electron');
            peer.state='connected';
            spf=new SimplePeerFiles.default();
            sendNextPack();
        }
        catch{}
    });

    peer.on('error', (err:any)=>{
        console.log(err);
        try{peer.emit('close');}catch{}
    });

    peer.on('close', (cb:any)=>{
        try{
            var ok=Object.keys(transfers);
            if(ok && ok.length){
                ok.forEach((t:any)=>{
                    transfers[t]=undefined;
                });
            }
            
            peer.destroy();
            if(cb)cb();

            _webContent.executeJavaScript("Meteor.p2p['"+peer.srcid+"']['"+param.userid+"'].state='closed'");
            globalThis['p2p'][peer.srcid][param.userid].state='closed';

            _webContent.executeJavaScript("Meteor.p2p_close_check('"+param.rid+"', '"+param.signal.srcid+"');");
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
                    ok.forEach((t:any)=>transfers[t].pause());
                }
                peer.paused=true;
                _webContent.executeJavaScript("Meteor.p2p['"+peer.srcid+"']['"+param.userid+"'].paused=true");
            }
        }
        catch{}
    });

    peer.on('resume', ()=>{
        try{
            if(peer.paused){
                var ok=Object.keys(transfers);
                if(ok && ok.length){
                    ok.forEach((t:any)=>transfers[t].resume());
                }
                peer.paused=false;
                _webContent.executeJavaScript("Meteor.p2p['"+peer.srcid+"']['"+param.userid+"'].paused=false");
            }
        }
        catch{}
    });

    peer.on('cancel', ()=>{
        setTimeout(()=>{
            try{
                peer.emit('close', ()=> {
                    _webContent.executeJavaScript("Meteor.p2p['"+peer.srcid+"']['"+param.userid+"'].currfilename='"+MSG_DOWNLOAD_CANCEL+"'; Meteor.p2p['"+peer.srcid+"']['"+param.userid+"'].paused=false");
                });
            }
            catch(e){ console.log('error on peer cancel:',e)}
        }, 250);
    });

    var tickMark=Date.now();
    peer.on('DOWNLOAD_PROGRESS', (p:any, f:any)=>{
        try{
            var progress:any=0;
            if(f!==MSG_DOWNLOAD_COMPLETE && p!==100){
                _sumsend[f]=parseFloat(p);
                var ok=Object.keys(_sumsend);
                ok.forEach((k:any)=>{
                    progress+=_sumsend[k];
                });
                progress=(progress*100/_sumsize).toFixed(1);
            }
            else{
                progress=100;
            }

            if(progress===100 || Date.now()-tickMark>250){
                _webContent.executeJavaScript("Meteor.p2p['"+peer.srcid+"']['"+param.userid+"']=JSON.parse('"+JSON.stringify({progress: progress, currfilename: f.replaceAll('\\', '/'), paused: peer.paused})+"')");
                tickMark=Date.now();
            }
        }
        catch{}
    });

    peer.on('data', async (data:any) =>{
        try{
            if (data.toString().substr(0, 6) === "start-") {
                var fileID = data.toString().substr(6);

                if(files[fileID].type==='folder'){
                    fs.readdirSync(files[fileID].path).forEach((file:any) => {
                        const currFile=path.join(files[fileID].path, file);
                        const fstat=fs.statSync(currFile);
                        const ftype=(fstat.isDirectory()?'folder':mime.getType(currFile)) || '-';
                        const fparse=path.parse(file);
                        const relPath=path.join(files[fileID].relpath, file);
                        const id=relPath.replaceAll('\\', '/')+ '::' +ftype+ '::' +fstat.size;
                        files[id]={
                            name: fparse.name+fparse.ext,
                            relpath: relPath,
                            path: currFile,
                            type: ftype,
                            size: fstat.size
                        }

                        keys.push(id);
                    });

                    delete transfers[fileID];
                    sendNextPack();
                    checkComplete();

                    return;
                }

                if(files[fileID].size==0){

                    delete transfers[fileID];
                    sendNextPack();
                    checkComplete();

                    return;
                }
                
                transfers[fileID] = await spf.send(peer, fileID, files[fileID], wrtc);
                transfers[fileID].on("progress", (progress:any, bytes:any)=>{
                    if(progress==100){
                        _sumsend[fileID]=parseFloat(bytes);
                    }
                    peer.emit('DOWNLOAD_PROGRESS', bytes, fileID);
                });
                transfers[fileID].on("done", ()=>{                    
                    setTimeout(function(){
                        try{
                            delete transfers[fileID];
                            sendNextPack();
                            checkComplete();
                        }
                        catch{}
                    }, 1000);
                });
                transfers[fileID].on('paused', ()=>{
                    if(!peer.paused)peer.emit('pause');
                });
                transfers[fileID].on('resumed_remote', ()=>{
                    setTimeout(()=>{
                        try{
                            if(peer.paused)peer.emit('resume');
                        }
                        catch{}
                    }, 250);
                });
                transfers[fileID].on('cancelled', ()=>{
                    try{
                        if(peer.state!=='closed')peer.emit('cancel');
                    }
                    catch{}
                });
                transfers[fileID].start();

            }
        }
        catch(e){
            console.log(e);
        }
    });

    return peer;
};
