import { Box, BoxProps, ProgressBar, Icon/*, Button*/ } from '@rocket.chat/fuselage';
import React, { FC, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Download } from '../../../downloads/common';
import { invoke } from '../../../ipc/renderer';
//import ActionButton from './ActionButton';
import FileIcon from './FileIcon';

type DownloadItemProps = Download & BoxProps;

const DownloadItem: FC<DownloadItemProps> = ({
  itemId,
  state,
  status: _status,
  fileName,
  receivedBytes,
  totalBytes,
  startTime,
  endTime,
  url: _url,
  mimeType,
  serverTitle,
  serverUrl: _serverUrl,
  savePath: _savePath,
  ...props
}) => {
  const { t, i18n } = useTranslation();

  const progressSize = useMemo(() => {
    try{
      if (!receivedBytes || !totalBytes) {
        return undefined;
      }

      if (state === 'completed') {
        return i18n.format(totalBytes, 'byteSize');
      }

      return t('downloads.item.progressSize', {
        receivedBytes,
        totalBytes,
        ratio: receivedBytes / totalBytes,
      });
    }
    catch(e){
      console.log(e);
      return undefined;
    }
  }, [i18n, receivedBytes, state, t, totalBytes]);

  const progressSpeed = useMemo(() => {
    if (
      !receivedBytes ||
      !totalBytes ||
      !startTime ||
      !endTime ||
      state !== 'progressing'
    ) {
      return undefined;
    }

    try{
      return i18n.format(
        (receivedBytes / (endTime - startTime)) * 1000,
        'byteSpeed'
      );
    }
    catch{
      return undefined;
    }
  }, [endTime, i18n, receivedBytes, startTime, state, totalBytes]);

  const estimatedTimeLeft = useMemo(() => {
    if (
      !receivedBytes ||
      !totalBytes ||
      !startTime ||
      !endTime ||
      state !== 'progressing'
    ) {
      return undefined;
    }

    try{
      const remainingBytes = totalBytes - receivedBytes;
      const speed = receivedBytes / (endTime - startTime);
      return i18n.format(remainingBytes / speed, 'duration');
    }
    catch(e){
      console.log(e);
      return undefined;
    }
  }, [endTime, i18n, receivedBytes, startTime, state, totalBytes]);

  const handlePause =  useCallback(async (e:any) => {
    e.stopPropagation();
    invoke('downloads/pause', itemId);
  }, [itemId]);

  const handleResume =  useCallback(async (e:any) => {
    e.stopPropagation();
    invoke('downloads/resume', itemId);
  }, [itemId]);

  const handleCancel = useCallback(async () => {
    //invoke('downloads/remove', itemId);
    invoke('downloads/cancel', itemId);
  }, [itemId]);

  const handleShowInFolder = useCallback((): void => {
    invoke('downloads/show-in-folder', itemId);
  }, [itemId]);

  const handleRunDownloaded = useCallback((): void => {
    invoke('downloads/run-downloaded', itemId);
  }, [itemId]);

  /*const handleRetry = useCallback(() => {
    invoke('downloads/retry', itemId);
  }, [itemId]);*/

  const handleRemove = useCallback(() => {
    invoke('downloads/remove', itemId);
  }, [itemId]);

  const handleCopyLink = useCallback(() => {
    invoke('downloads/copy-link', itemId);
  }, [itemId]);

  const errored = state === 'interrupted' || state === 'cancelled';
  const percentage = useMemo(
    () => Math.floor((receivedBytes / totalBytes) * 100),
    [receivedBytes, totalBytes]
  );

  const fDate=endTime?(new Date(endTime)):(new Date());
  
  /*try{
    if(globalThis['p2p']){
      const ditem=globalThis['p2p'][itemId];
      if(ditem){
        console.log('ditem.getState()', ditem.getState(), 'state', state);
        if(ditem.getState()!==state){
          state=ditem.getState();
        }
      }
    }
  }
  catch(e){console.log(e)}*/

  return (
    <Box
      display='flex'
      height={45}
      alignItems='center'
      style={{userSelect:'text', borderBottomWidth: '1px', borderBottomStyle: 'solid', borderBottomColor: 'rgb(0,0,0,.15)', marginBottom: '10px'}}
      {...props}
    >
      <Box
        flexGrow={7}
        flexShrink={7}
        flexBasis='40%'
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='start'
        style={{maxWidth: '40%', overflow: 'hidden'}}
      >
        <FileIcon style={{cursor: 'pointer', marginBottom: '5px'}} onClickHandle={handleRunDownloaded}  fileName={fileName} mimeType={mimeType} />
        <Box mis={8} style={{width: '85%'}}>
          <Box color={errored ? 'danger-500' : 'default'} fontScale='s1' withTruncatedText>
            {fileName}
          </Box>
          <Box withTruncatedText color='neutral-600' fontScale='c1'>
            {serverTitle}
          </Box>
        </Box>
      </Box>
      
      <Box 
      display='flex'
      flexGrow={2}
      flexShrink={2}
      flexBasis='15%'
      color='neutral-600' fontScale='c2' withTruncatedText>
        {fDate.toLocaleDateString()+" "+fDate.toLocaleTimeString()}
      </Box>

      <Box display='flex'
      flexGrow={7}
      flexShrink={7}
      flexBasis='45%' 
      style={{maxWidth: '45%', overflow: 'hidden'}}
      flexDirection='column' mi={16}>
        <Box
          display='flex'
          flexDirection='row'
          mbe={6}
          alignItems='center'
          justifyContent='space-between'
        >
          <Box style={{maxWidth: '80%'}} display='flex' flexDirection='row' alignItems='center'>
            {progressSize ? (
              <Box
                mie={12}
                color='neutral-600'
                fontScale='c1'
                withTruncatedText
              >
                {progressSize}
              </Box>
            ) : null}
            {progressSpeed ? (
              <Box
                mie={12}
                color='neutral-600'
                fontScale='c1'
                withTruncatedText
              >
                {progressSpeed}
              </Box>
            ) : null}
            {estimatedTimeLeft ? (
              <Box color='neutral-600' fontScale='c1' withTruncatedText>
                {estimatedTimeLeft}
              </Box>
            ) : null}
          </Box>
          <Box display='flex' fontScale='c1'>
              
            {state === 'progressing' && (
              <>
                <Icon onClick={handlePause} color='neutral-800' title='Пауза' style={{cursor: 'pointer', marginRight: '4px'}} name='pause' size={20}/>
                <Icon onClick={handleCopyLink} color='neutral-800' title='Копировать ссылку' style={{cursor: 'pointer', marginRight: '4px'}} name='link' size={20}/>
                <Icon onClick={handleCancel} color='neutral-800' title='Отменить' style={{cursor: 'pointer', marginRight: '4px'}} name='cancel' size={20}/>
              </>
            )}
            {state === 'paused' && (
              <>
                <Icon onClick={handleResume} color='neutral-800' title='Продолжить' style={{cursor: 'pointer', marginRight: '4px'}} name='play' size={20}/>
                <Icon onClick={handleCopyLink} color='neutral-800' title='Копировать ссылку' style={{cursor: 'pointer', marginRight: '4px'}} name='link' size={20}/>
                <Icon onClick={handleCancel} color='neutral-800' title='Отменить' style={{cursor: 'pointer', marginRight: '4px'}} name='cancel' size={20}/>
              </>
            )}
            {state === 'completed' && (
              <>
                <Icon onClick={handleShowInFolder} color='neutral-800' title='Показать в папке' style={{cursor: 'pointer', marginRight: '4px'}} name='folder' size={20}/>
                <Icon onClick={handleCopyLink} color='neutral-800' title='Копировать ссылку' style={{cursor: 'pointer', marginRight: '4px'}} name='link' size={20}/>
                <Icon onClick={handleRemove} color='neutral-800' title='Удалить в корзину' style={{cursor: 'pointer', marginRight: '4px'}} name='trash' size={20}/>
              </>
            )}
            {errored && (
              <>
                <Icon onClick={handleCopyLink} color='neutral-800' title='Копировать ссылку' style={{cursor: 'pointer', marginRight: '4px'}} name='link' size={20}/>
                <Icon onClick={handleRemove} color='neutral-800' title='Удалить в корзину' style={{cursor: 'pointer', marginRight: '4px'}} name='trash' size={20}/>
              </>
            )}
          </Box>
        </Box>
        <Box mbe={8} position='relative'>
          <ProgressBar
            percentage={percentage}
            error={errored ? t('downloads.item.errored') : undefined}
          />
        </Box>
      </Box>
    </Box>
  );
};
//<Icon onClick={handleRetry} color='neutral-800' title='Повторить' style={{cursor: 'pointer', marginRight: '4px'}} name='reload' size={20}/>
export default DownloadItem;
