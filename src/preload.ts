import { ipcRenderer, contextBridge } from 'electron';

import { setupRendererErrorHandling } from './errors';
import { invoke } from './ipc/renderer';
import { JitsiMeetElectron, JitsiMeetElectronAPI } from './jitsi/preload';
import { listenToNotificationsRequests } from './notifications/preload';
import { listenToScreenSharingRequests } from './screenSharing/preload';
import {
  RocketChatDesktop,
  RocketChatDesktopAPI,
  serverInfo,
} from './servers/preload/api';
import { setServerUrl } from './servers/preload/urls';
import { createRendererReduxStore } from './store';
import { listenToMessageBoxEvents } from './ui/preload/messageBox';
import { handleTrafficLightsSpacing } from './ui/preload/sidebar';
import { whenReady } from './whenReady';

declare global {
  interface Window {
    JitsiMeetElectron: JitsiMeetElectronAPI;
    RocketChatDesktop: RocketChatDesktopAPI;
  }
}

const start = async (): Promise<void> => {

  window.addEventListener('p2p-download', function(ev:any){
    ipcRenderer.invoke("p2p-download", ev.detail);
  }/*, true*/);

  window.addEventListener('p2p-upload', function(ev:any){
    ipcRenderer.invoke("p2p-upload", ev.detail);
  }/*, true*/);

  const serverUrl = await invoke('server-view/get-url');

  contextBridge.exposeInMainWorld('JitsiMeetElectron', JitsiMeetElectron);

  if (!serverUrl) {
    return;
  }

  contextBridge.exposeInMainWorld('RocketChatDesktop', RocketChatDesktop);

  setServerUrl(serverUrl);

  await createRendererReduxStore();

  await whenReady();

  setupRendererErrorHandling('webviewPreload');

  await invoke('server-view/ready');
  listenToNotificationsRequests();
  if (!serverInfo) {
    return;
  }

  //listenToNotificationsRequests();
  listenToScreenSharingRequests();
  listenToMessageBoxEvents();
  handleTrafficLightsSpacing();
  
};

start();
