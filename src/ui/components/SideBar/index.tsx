import { parse } from 'url';

import { Icon } from '@rocket.chat/fuselage';
import React, { useMemo, FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { createSelector } from 'reselect';

//import { getRootWindow } from '../../main/rootWindow';
import {watch} from '../../../store';
import { RootAction } from '../../../store/actions';
import { RootState } from '../../../store/rootReducer';
import {
  //SIDE_BAR_ADD_NEW_SERVER_CLICKED,
  //SIDE_BAR_SERVER_SELECTED,
  SIDE_BAR_DOWNLOADS_BUTTON_CLICKED,
} from '../../actions';
import {MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED} from '../../actions';
import ServerButton from './ServerButton';
import {
  //AddServerButton,
  Content,
  DownloadsManagerButton,
  ServerList,
  Wrapper,
  SidebarActionButton, MainMenuSwitchButton
} from './styles';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';
import { useSorting } from './useSorting';

export const SideBar: FC = () => {
  const servers = useSelector(
    createSelector(
      ({ currentView }: RootState) => currentView,
      ({ servers }: RootState) => servers,
      (currentView, servers) =>
        servers.map((server) =>
          Object.assign(server, {
            selected:
              typeof currentView === 'object'
                ? server.url === currentView.url
                : false,
          })
        )
    )
  );
  const isSideBarEnabled = useSelector(
    ({ isSideBarEnabled }: RootState) => isSideBarEnabled
  );
  const isVisible = servers.length > 0 && isSideBarEnabled;

  const style = useMemo(
    () => servers.find(({ selected }) => selected)?.style || {},
    [servers]
  );

  const isEachShortcutVisible = useKeyboardShortcuts();
  const {
    sortedServers,
    draggedServerUrl,
    handleDragStart,
    handleDragEnd,
    handleDragEnter,
    handleDrop,
  } = useSorting(servers);

  const dispatch = useDispatch<Dispatch<RootAction>>();

  /*const handleAddServerButtonClicked = (): void => {
    dispatch({ type: SIDE_BAR_ADD_NEW_SERVER_CLICKED });
  };*/

  globalThis['have_new_downloads']=(flag:boolean)=>{
    const button=globalThis.window.document.getElementsByClassName('downloads_manager_button')[0];
    if(!button){
      return;
    }
    if(flag===true){
      button.classList.remove('haveNew');
      button.classList.add('haveNew');
      setTimeout(function(){
        button.classList.remove('haveNew');
      }, 20000);
    }
    else{
      button.classList.remove('haveNew');
    }
  }

  let isMBEnabled=false;
  watch(
    ({ isMenuBarEnabled }) => isMenuBarEnabled,
    async (isMenuBarEnabled) => {
      isMBEnabled=isMenuBarEnabled;
    }
  )

  const handelDownloadsButtonClicked = (): void => {
    globalThis['have_new_downloads'](false); 
    dispatch({ type: SIDE_BAR_DOWNLOADS_BUTTON_CLICKED });
  };
  const handelSwitchMainMenu = (): void => {
    dispatch({
      type: MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED,
      payload: !isMBEnabled
    });
  };
  const handelReload = async () =>{
    const electron = require("electron");
    const BrowserWindow = electron.remote.BrowserWindow;
    const win = BrowserWindow.getFocusedWindow();
    win?.reload();
  }

  const { t } = useTranslation();

  return (
    <Wrapper sideBarStyle={style} isVisible={isVisible}>
      <Content withWindowButtons={process.platform === 'darwin'}>
        <ServerList>
          {sortedServers.map((server, order) => (
            <ServerButton
              key={server.url}
              url={server.url}
              title={
                server.title === 'Rocket.Chat' &&
                parse(server.url).hostname !== 'rocketchat'
                  ? `${server.title} - ${server.url}`
                  : server.title ?? server.url
              }
              shortcutNumber={
                typeof order === 'number' && order <= 9
                  ? String(order + 1)
                  : null
              }
              isSelected={server.selected}
              favicon={server.favicon ?? null}
              hasUnreadMessages={!!server.badge}
              mentionCount={
                typeof server.badge === 'number' ? server.badge : undefined
              }
              isShortcutVisible={isEachShortcutVisible}
              isDragged={draggedServerUrl === server.url}
              onDragStart={handleDragStart(server.url)}
              onDragEnd={handleDragEnd}
              onDragEnter={handleDragEnter(server.url)}
              onDrop={handleDrop(server.url)}
            />
          ))}
        </ServerList>
        <DownloadsManagerButton>
            <SidebarActionButton
              tooltip={t('sidebar.downloads')}
              onClick={handelDownloadsButtonClicked}
              className='downloads_manager_button'
            >
            <Icon name='download'  />
            </SidebarActionButton>
        </DownloadsManagerButton>
        <MainMenuSwitchButton>
            <SidebarActionButton
              tooltip={'Перезагрузить'}
              onClick={handelReload}
              className='reload_button'
            >
            <Icon name='reload' />
            </SidebarActionButton>
        </MainMenuSwitchButton>
        <MainMenuSwitchButton>
            <SidebarActionButton
              tooltip={'Показать/скрыть главное меню'}
              onClick={handelSwitchMainMenu}
              className='main_menu_switch_button'
            >
            <Icon name='cog' />
            </SidebarActionButton>
        </MainMenuSwitchButton>
      </Content>
    </Wrapper>
  );
};

/*
<AddServerButton>
          <SidebarActionButton
            tooltip={t('sidebar.addNewServer')}
            onClick={handleAddServerButtonClicked}
          >
            +
          </SidebarActionButton>
        </AddServerButton>

*/