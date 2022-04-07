import React from 'react';
import { Box, Icon} from '@rocket.chat/fuselage';
import { invoke } from '../../../ipc/renderer';
import {app, remote} from 'electron';
import fastFolderSize from 'fast-folder-size';

class HeaderInfo extends React.Component{

    constructor(props){
        super(props);
        this.state={
            folderSize: 0,
            diskFree: 0,
            path: remote.app.getPath('downloads')
        }
    }

    handleOpenDownloads=()=>{
        invoke('downloads/show-downloads-path');
    };

    handleSetDownloads=()=>{
        invoke('downloads/set-downloads-path').then(()=>{
            this.setState({path: remote.app.getPath('downloads')});
            this.handleRecalcSpace();
        });
    };

    handleRecalcSpace=()=>{
        fastFolderSize(this.state.path, (err, bytes)=>{
            const checkDiskSpace=require('check-disk-space').default;
            checkDiskSpace(this.state.path).then((diskSpace)=>{
                this.setState({folderSize: bytes, diskFree: diskSpace.free});
            });
        });
    };

    handleRemoveAll=()=>{
        invoke('downloads/remove-all-downloads').then(()=>{
            fastFolderSize(this.state.path, (err, bytes)=>{
                this.setState({folderSize: bytes}); 
            });
        });
    }

    getProperBytes=(bytes)=>{
        return parseFloat(bytes/(1024*1024*1024)).toFixed(2)
    };

    componentDidMount(){
        this.handleRecalcSpace();        
    }

    componentWillUnmount(){

    }

    render(){
        return(
            <>
            <Icon title="Выбрать папку для загрузок" onClick={this.handleSetDownloads} style={{paddingBottom: '4px',marginLeft: '30px', cursor: 'pointer'}} name='pencil-box' size={20}></Icon>
            <Box onClick={this.handleOpenDownloads} style={{marginBottom: '-1px', cursor: 'pointer'}} withTruncatedText>
                <Icon title="Открыть папку загрузок" style={{paddingBottom: '4px'}} name='folder' size={20}/> {this.state.path}
            </Box>
            <Box onClick={this.handleRecalcSpace} style={{marginBottom: '-1px', marginLeft: '30px', cursor: 'pointer'}} withTruncatedText>
                <Icon title="Пересчитать" style={{paddingBottom: '4px'}} name='reload' size={20}/> {this.getProperBytes(this.state.folderSize)} Гб (доступно: {this.getProperBytes(this.state.diskFree)} Гб) 
            </Box>
            <Box onClick={this.handleRemoveAll} style={{marginBottom: '-1px', marginLeft: '30px', cursor: 'pointer', color: 'white', backgroundColor: 'coral', padding: '2px 6px 0px 2px', borderRadius:'2px'}} withTruncatedText>
                <Icon title="Очистить папку и стереть историю загрузок" style={{paddingBottom: '4px'}} name='trash' size={20}/>Удалить всё
            </Box>
            </>
        );
    }

}

export default HeaderInfo;