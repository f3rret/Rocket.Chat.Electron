import path from 'path';

import { Box } from '@rocket.chat/fuselage';
import React, { CSSProperties, FC, useMemo } from 'react';

type FileIconProps = {
  fileName: string;
  mimeType: string;
  onClickHandle: ()=>void;
  style: CSSProperties;
};

const FileIcon: FC<FileIconProps> = ({ fileName, mimeType, onClickHandle, style }) => {
  let label = useMemo(() => {
    const extension = path.extname(fileName);

    if (extension) {
      return extension.slice(1);
    }

    return /^\w+\/([-.\w]+)(?:\+[-.\w]+)?$/.exec(mimeType)?.[1];
  }, [fileName, mimeType]);

  if(!label)label='';

  let known;

  switch(label){
    case 'pdf':
      known=(<Box is='img' src='images/pdf-48.png' alt={label}/>);
      break;
    case 'html':
      known=(<Box is='img' src='images/html-48.png' alt={label} />);
      break;
    case 'txt':
      known=(<Box is='img' src='images/txt-48.png' alt={label}/>);
      break;
    case 'doc':
    case 'docx':
      known=(<Box is='img' src='images/word-48.png' alt={label}/>);
      break;
    case 'xls':
    case 'xlsx':
      known=(<Box is='img' src='images/xls-48.png' alt={label}/>);
      break;
    case 'ppt':
    case 'pptx':
      known=(<Box is='img' src='images/powerpoint-48.png' alt={label}/>);
      break;
    case 'zip':
    case 'rar':
    case 'tar':
    case '7z':
    case 'gz':
    case 'gzip':
      known=(<Box is='img' src='images/archive-48.png' alt={label}/>);
      break;
    case 'mp3':
    case 'wav':
    case 'ogg':
    case 'flac':
      known=(<Box is='img' src='images/audio-48.png' alt={label}/>);
      break;
    case 'avi':
    case 'mp4':
    case 'mkv':
    case 'flv':
    case 'mov':
    case 'mpg':
    case 'mpeg':
    case 'webm':
    case 'wma':
    case 'wmv':
      known=(<Box is='img' src='images/video-48.png' alt={label}/>);
      break;
    case 'png':
    case 'ico':
    case 'bmp':
    case 'gif':
    case 'jpg':
    case 'jpeg':
    case 'svg':
    case 'gif':
      known=(<Box is='img' src='images/image-48.png' alt={label}/>);
      break;
  }

  if(mimeType==='folder')
    known=(<Box is='img' src='images/folder-48.png' alt={label}/>);

  if(known){
    return(
      <Box onClick={onClickHandle} title='Открыть' style={style} display='flex' flexDirection='column' height='48px'>{known}</Box>
    );
  }

//{mimeType==='folder' && <Box is='img' src='icons/svg/folder.svg' style={{opacity: 0.5}} alt={label} width='x32' />}

  return (
      <Box onClick={onClickHandle} title='Открыть этот файл' style={style} display='flex' flexDirection='column' height='48px'>
        <Box is='img' src='images/file-48.png' alt={label} />
        <Box
          width={42}
          mi={2}
          mbs={-30}
          style={{backgroundColor: 'white', border: 'solid 1px', padding: '2px'}}
          textAlign='center'
          color='neutral-700'
          withTruncatedText
        >
          {label}
        </Box>
      </Box>
  );
};

export default FileIcon;
