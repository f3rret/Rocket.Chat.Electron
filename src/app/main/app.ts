import { app } from 'electron';
import rimraf from 'rimraf';

import { dispatch } from '../../store';
import { getRootWindow } from '../../ui/main/rootWindow';
import { APP_PATH_SET, APP_VERSION_SET } from '../actions';

export const relaunchApp = (...args: string[]): void => {
  const command = process.argv.slice(1, app.isPackaged ? 1 : 2);
  app.relaunch({ args: [...command, ...args] });
  app.exit();
};

export const performElectronStartup = async (): Promise<void> => {
  app.setAsDefaultProtocolClient('rocketchat');
  app.setAppUserModelId('chat.rocket');

  app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required');

  const args = process.argv.slice(app.isPackaged ? 1 : 2);

  if (args.includes('--reset-app-data')) {
    rimraf.sync(app.getPath('userData'));
    relaunchApp();
    return;
  }

  const canStart = process.mas || app.requestSingleInstanceLock();

  if (!canStart) {
   /* const p2pfiles:any=[];

    if(args.length){
      args.forEach((a)=>{
        if(a.indexOf('\\')>-1 || a.indexOf("/")>-1){
          p2pfiles.push(a.replaceAll("\\", "/"));
        }
      });
    }

    if(p2pfiles.length){
      const messenger=require('messenger');
      const client=messenger.createSpeaker(3010);
      const inter=setInterval(function(){
        client.request('p2p-upload', {p2pfiles: p2pfiles}, function(){
          clearInterval(inter);
          app.exit();
          return;
        });
      }, 500);

      await new Promise((resolve) => setTimeout(resolve, 3000));
    }*/

    app.exit();
    return;
  }

  if (args.includes('--disable-gpu')) {
    app.disableHardwareAcceleration();
    app.commandLine.appendSwitch('--disable-2d-canvas-image-chromium');
    app.commandLine.appendSwitch('--disable-accelerated-2d-canvas');
    app.commandLine.appendSwitch('--disable-gpu');
  }

};

export const setupApp = (): void => {
  app.addListener('activate', async () => {
    const browserWindow = await getRootWindow();

    if (!browserWindow.isVisible()) {
      browserWindow.showInactive();
    }
    browserWindow.focus();
  });

  app.addListener('window-all-closed', (): void => undefined);

  dispatch({ type: APP_PATH_SET, payload: app.getAppPath() });
  dispatch({ type: APP_VERSION_SET, payload: app.getVersion() });
};
