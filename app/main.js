'use strict';

var tslib = require('tslib');
var electron = require('electron');
var rimraf = require('rimraf');
var redux = require('redux');
var path = require('path');
var i18next = require('i18next');
var reselect = require('reselect');
var fs = require('fs');
var ElectronStore = require('electron-store');
var url = require('url');
var semver = require('semver');
require('@bugsnag/js');
var electronUpdater = require('electron-updater');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

function _interopNamespace(e) {
    if (e && e.__esModule) return e;
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            }
        });
    }
    n['default'] = e;
    return Object.freeze(n);
}

var rimraf__default = /*#__PURE__*/_interopDefaultLegacy(rimraf);
var path__default = /*#__PURE__*/_interopDefaultLegacy(path);
var i18next__default = /*#__PURE__*/_interopDefaultLegacy(i18next);
var fs__default = /*#__PURE__*/_interopDefaultLegacy(fs);
var ElectronStore__default = /*#__PURE__*/_interopDefaultLegacy(ElectronStore);

const isFSA = (action) => typeof action === 'object' &&
    action !== null &&
    !Array.isArray(action) &&
    'type' in action &&
    typeof action.type === 'string';
const hasMeta = (action) => 'meta' in action &&
    typeof action.meta === 'object' &&
    action.meta !== null;
const isResponse = (action) => hasMeta(action) &&
    action.meta
        .response === true;
const isLocallyScoped = (action) => hasMeta(action) &&
    action.meta.scope === 'local';
const isErrored = (action) => 'meta' in action &&
    action.error === true &&
    action.payload instanceof Error;
const hasPayload = (action) => 'payload' in action;
const isResponseTo = (id, ...types) => (action) => isResponse(action) && types.includes(action.type) && action.meta.id === id;

const invoke = (webContents, channel, ...args) => new Promise((resolve, reject) => {
    const id = Math.random().toString(16).slice(2);
    electron.ipcMain.once(`${channel}@${id}`, (_, { resolved, rejected }) => {
        if (rejected) {
            const error = new Error(rejected.message);
            error.name = rejected.name;
            error.stack = rejected.stack;
            reject(error);
            return;
        }
        resolve(resolved);
    });
    webContents.send(channel, id, ...args);
});
const handle = (channel, handler) => {
    electron.ipcMain.handle(channel, (event, ...args) => handler(event.sender, ...args));
    return () => {
        electron.ipcMain.removeHandler(channel);
    };
};

const forwardToRenderers = (api) => {
    const renderers = new Set();
    handle('redux/get-initial-state', (webContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        renderers.add(webContents);
        webContents.addListener('destroyed', () => {
            renderers.delete(webContents);
        });
        return api.getState();
    }));
    handle('redux/action-dispatched', (_, action) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        api.dispatch(action);
    }));
    return (next) => (action) => {
        if (!isFSA(action) || isLocallyScoped(action)) {
            return next(action);
        }
        const rendererAction = Object.assign(Object.assign({}, action), { meta: Object.assign(Object.assign({}, (hasMeta(action) && action.meta)), { scope: "local" /* LOCAL */ }) });
        renderers.forEach((webContents) => {
            invoke(webContents, 'redux/action-dispatched', rendererAction);
        });
        return next(action);
    };
};

const APP_ERROR_THROWN = 'app/error-thrown';
const APP_PATH_SET = 'app/path-set';
const APP_VERSION_SET = 'app/version-set';
const APP_SETTINGS_LOADED = 'app/settings-loaded';

const appPath = (state = null, action) => {
    switch (action.type) {
        case APP_PATH_SET:
            return action.payload;
        default:
            return state;
    }
};

const appVersion = (state = null, action) => {
    switch (action.type) {
        case APP_VERSION_SET:
            return action.payload;
        default:
            return state;
    }
};

const DOWNLOAD_CREATED = 'downloads/created';
const DOWNLOAD_REMOVED = 'dowloads/removed';
const DOWNLOADS_CLEARED = 'downloads/cleared';
const DOWNLOAD_UPDATED = 'downloads/updated';

const downloads = (state = {}, action) => {
    var _a;
    switch (action.type) {
        case APP_SETTINGS_LOADED:
            return (_a = action.payload.downloads) !== null && _a !== void 0 ? _a : {};
        case DOWNLOAD_CREATED: {
            if (globalThis['have_new_downloads']) {
                globalThis['have_new_downloads'](true);
            }
            const download = action.payload;
            return Object.assign(Object.assign({}, state), { [download.itemId]: download });
        }
        case DOWNLOAD_UPDATED: {
            const newState = Object.assign({}, state);
            newState[action.payload.itemId] = Object.assign(Object.assign({}, newState[action.payload.itemId]), action.payload);
            return newState;
        }
        case DOWNLOAD_REMOVED: {
            const newState = Object.assign({}, state);
            delete newState[action.payload];
            return newState;
        }
        case DOWNLOADS_CLEARED:
            return {};
        default:
            return state;
    }
};

const CERTIFICATES_CLEARED = 'certificates/cleared';
const CERTIFICATES_LOADED = 'certificates/loaded';
const CERTIFICATES_CLIENT_CERTIFICATE_REQUESTED = 'certificates/client-certificate-requested';
const CERTIFICATES_UPDATED = 'certificates/updated';
const SELECT_CLIENT_CERTIFICATE_DIALOG_CERTIFICATE_SELECTED = 'select-client-certificate-dialog/certificate-selected';
const SELECT_CLIENT_CERTIFICATE_DIALOG_DISMISSED = 'select-client-certificate-dialog/dismissed';
const EXTERNAL_PROTOCOL_PERMISSION_UPDATED = 'navigation/external-protocol-permission-updated';

const clientCertificates = (state = [], action) => {
    switch (action.type) {
        case CERTIFICATES_CLIENT_CERTIFICATE_REQUESTED:
            return action.payload;
        case SELECT_CLIENT_CERTIFICATE_DIALOG_CERTIFICATE_SELECTED:
        case SELECT_CLIENT_CERTIFICATE_DIALOG_DISMISSED:
            return [];
        default:
            return state;
    }
};
const trustedCertificates = (state = {}, action) => {
    switch (action.type) {
        case CERTIFICATES_LOADED:
        case CERTIFICATES_UPDATED:
            return action.payload;
        case CERTIFICATES_CLEARED:
            return {};
        case APP_SETTINGS_LOADED: {
            const { trustedCertificates = state } = action.payload;
            return trustedCertificates;
        }
        default:
            return state;
    }
};
const externalProtocols = (state = {}, action) => {
    switch (action.type) {
        case APP_SETTINGS_LOADED: {
            const { externalProtocols = {} } = action.payload;
            state = externalProtocols;
            return state;
        }
        case EXTERNAL_PROTOCOL_PERMISSION_UPDATED: {
            state = Object.assign(Object.assign({}, state), { [action.payload.protocol]: action.payload.allowed });
            return state;
        }
        default:
            return state;
    }
};

const DEEP_LINKS_SERVER_ADDED = 'deep-links/server-added';
const DEEP_LINKS_SERVER_FOCUSED = 'deep-links/server-focused';

const ABOUT_DIALOG_DISMISSED = 'about-dialog/dismissed';
const ABOUT_DIALOG_TOGGLE_UPDATE_ON_START = 'about-dialog/toggle-update-on-start';
const ADD_SERVER_VIEW_SERVER_ADDED = 'add-server/view-server-added';
const LOADING_ERROR_VIEW_RELOAD_SERVER_CLICKED = 'loading-error-view/reload-server-clicked';
const MENU_BAR_ABOUT_CLICKED = 'menu-bar/about-clicked';
const MENU_BAR_ADD_NEW_SERVER_CLICKED = 'menu-bar/add-new-server-clicked';
const MENU_BAR_SELECT_SERVER_CLICKED = 'menu-bar/select-server-clicked';
const MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED = 'menu-bar/toggle-is-menu-bar-enabled-clicked';
const MENU_BAR_TOGGLE_IS_SHOW_WINDOW_ON_UNREAD_CHANGED_ENABLED_CLICKED = 'menu-bar/toggle-is-show-window-on-unread-changed-enabled-clicked';
const MENU_BAR_TOGGLE_IS_SIDE_BAR_ENABLED_CLICKED = 'menu-bar/toggle-is-side-bar-enabled-clicked';
const MENU_BAR_TOGGLE_IS_TRAY_ICON_ENABLED_CLICKED = 'menu-bar/toggle-is-tray-icon-enabled-clicked';
const ROOT_WINDOW_ICON_CHANGED = 'root-window/icon-changed';
const ROOT_WINDOW_STATE_CHANGED = 'root-window/state-changed';
const SIDE_BAR_ADD_NEW_SERVER_CLICKED = 'side-bar/add-new-server-clicked';
const SIDE_BAR_CONTEXT_MENU_TRIGGERED = 'side-bar/context-menu-triggered';
const SIDE_BAR_DOWNLOADS_BUTTON_CLICKED = 'side-bar/downloads-button-clicked';
const DOWNLOADS_PATH_CHANGED = 'downloads-path/change';
const SIDE_BAR_REMOVE_SERVER_CLICKED = 'side-bar/remove-server-clicked';
const SIDE_BAR_SERVER_SELECTED = 'side-bar/server-selected';
const SIDE_BAR_SERVERS_SORTED = 'side-bar/servers-sorted';
const TOUCH_BAR_FORMAT_BUTTON_TOUCHED = 'touch-bar/format-button-touched';
const TOUCH_BAR_SELECT_SERVER_TOUCHED = 'touch-bar/select-server-touched';
const UPDATE_DIALOG_DISMISSED = 'update-dialog/dismissed';
const UPDATE_DIALOG_INSTALL_BUTTON_CLICKED = 'update-dialog/install-button-clicked';
const UPDATE_DIALOG_REMIND_UPDATE_LATER_CLICKED = 'update-dialog/remind-update-later-clicked';
const UPDATE_DIALOG_SKIP_UPDATE_CLICKED = 'update-dialog/skip-update-clicked';
const WEBVIEW_ATTACHED = 'webview/attached';
const WEBVIEW_DID_FAIL_LOAD = 'webview/did-fail-load';
const WEBVIEW_DID_NAVIGATE = 'webview/did-navigate';
const WEBVIEW_DID_START_LOADING = 'webview/did-start-loading';
const WEBVIEW_FAVICON_CHANGED = 'webview/favicon-changed';
const WEBVIEW_FOCUS_REQUESTED = 'webview/focus-requested';
const WEBVIEW_MESSAGE_BOX_BLURRED = 'webview/message-box-blurred';
const WEBVIEW_MESSAGE_BOX_FOCUSED = 'webview/message-box-focused';
const WEBVIEW_SCREEN_SHARING_SOURCE_REQUESTED = 'webview/screen-sharing-source-requested';
const WEBVIEW_SCREEN_SHARING_SOURCE_RESPONDED = 'webview/screen-sharing-source-responded';
const WEBVIEW_SIDEBAR_STYLE_CHANGED = 'webview/sidebar-style-changed';
const WEBVIEW_TITLE_CHANGED = 'webview/title-changed';
const WEBVIEW_UNREAD_CHANGED = 'webview/unread-changed';

const SERVERS_LOADED = 'servers/loaded';
const SERVER_URL_RESOLUTION_REQUESTED = 'server/url-resolution-requested';
const SERVER_URL_RESOLVED = 'server/url-resolved';

const ensureUrlFormat = (serverUrl) => {
    if (serverUrl) {
        return new URL(serverUrl).href;
    }
    throw new Error('cannot handle null server URLs');
};
const upsert = (state, server) => {
    const index = state.findIndex(({ url }) => url === server.url);
    if (index === -1) {
        return [...state, server];
    }
    return state.map((_server, i) => i === index ? Object.assign(Object.assign({}, _server), server) : _server);
};
const update = (state, server) => {
    const index = state.findIndex(({ url }) => url === server.url);
    if (index === -1) {
        return state;
    }
    return state.map((_server, i) => i === index ? Object.assign(Object.assign({}, _server), server) : _server);
};
const servers = (state = [], action) => {
    switch (action.type) {
        case ADD_SERVER_VIEW_SERVER_ADDED:
        case DEEP_LINKS_SERVER_ADDED: {
            const url = action.payload;
            return upsert(state, { url, title: url });
        }
        case SIDE_BAR_REMOVE_SERVER_CLICKED: {
            const _url = action.payload;
            return state.filter(({ url }) => url !== _url);
        }
        case SIDE_BAR_SERVERS_SORTED: {
            const urls = action.payload;
            return state.sort(({ url: a }, { url: b }) => urls.indexOf(a) - urls.indexOf(b));
        }
        case WEBVIEW_TITLE_CHANGED: {
            const { url, title = url } = action.payload;
            return upsert(state, { url, title });
        }
        case WEBVIEW_UNREAD_CHANGED: {
            const { url, badge } = action.payload;
            return upsert(state, { url, badge });
        }
        case WEBVIEW_SIDEBAR_STYLE_CHANGED: {
            const { url, style } = action.payload;
            return upsert(state, { url, style });
        }
        case WEBVIEW_FAVICON_CHANGED: {
            const { url, favicon } = action.payload;
            return upsert(state, { url, favicon });
        }
        case WEBVIEW_DID_NAVIGATE: {
            const { url, pageUrl } = action.payload;
            if (pageUrl === null || pageUrl === void 0 ? void 0 : pageUrl.includes(url)) {
                return upsert(state, { url, lastPath: pageUrl });
            }
            return state;
        }
        case WEBVIEW_DID_START_LOADING: {
            const { url } = action.payload;
            return upsert(state, { url, failed: false });
        }
        case WEBVIEW_DID_FAIL_LOAD: {
            const { url, isMainFrame } = action.payload;
            if (isMainFrame) {
                return upsert(state, { url, failed: true });
            }
            return state;
        }
        case SERVERS_LOADED: {
            const { servers = state } = action.payload;
            return servers.map((server) => (Object.assign(Object.assign({}, server), { url: ensureUrlFormat(server.url) })));
        }
        case APP_SETTINGS_LOADED: {
            const { servers = state } = action.payload;
            return servers.map((server) => (Object.assign(Object.assign({}, server), { url: ensureUrlFormat(server.url) })));
        }
        case WEBVIEW_ATTACHED: {
            const { url, webContentsId } = action.payload;
            return update(state, { url, webContentsId });
        }
        default:
            return state;
    }
};

const currentView = (state = 'add-new-server', action) => {
    switch (action.type) {
        case ADD_SERVER_VIEW_SERVER_ADDED:
        case DEEP_LINKS_SERVER_ADDED:
        case DEEP_LINKS_SERVER_FOCUSED:
        case MENU_BAR_SELECT_SERVER_CLICKED:
        case TOUCH_BAR_SELECT_SERVER_TOUCHED:
        case SIDE_BAR_SERVER_SELECTED: {
            const url = action.payload;
            return { url };
        }
        case WEBVIEW_FOCUS_REQUESTED: {
            const { url } = action.payload;
            return { url };
        }
        case SERVERS_LOADED: {
            const { selected } = action.payload;
            return selected ? { url: selected } : 'add-new-server';
        }
        case APP_SETTINGS_LOADED: {
            const { currentView = state } = action.payload;
            return currentView;
        }
        case MENU_BAR_ADD_NEW_SERVER_CLICKED:
        case SIDE_BAR_ADD_NEW_SERVER_CLICKED:
            return 'add-new-server';
        case SIDE_BAR_REMOVE_SERVER_CLICKED: {
            if (typeof state === 'object' && state.url === action.payload) {
                return 'add-new-server';
            }
            return state;
        }
        case SIDE_BAR_DOWNLOADS_BUTTON_CLICKED:
            return 'downloads';
    }
    return state;
};

var downloadsPath = (state, action) => {
    var _a;
    switch (action.type) {
        case APP_SETTINGS_LOADED:
            return (_a = action.payload.downloadsPath) !== null && _a !== void 0 ? _a : '';
        case DOWNLOADS_PATH_CHANGED: {
            return action.payload;
        }
    }
    return state || '';
};

const isMenuBarEnabled = (state = true, action) => {
    switch (action.type) {
        case MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED: {
            return action.payload;
        }
        case APP_SETTINGS_LOADED: {
            const { isMenuBarEnabled = state } = action.payload;
            return isMenuBarEnabled;
        }
        default:
            return state;
    }
};

const isMessageBoxFocused = (state = false, action) => {
    switch (action.type) {
        case WEBVIEW_MESSAGE_BOX_FOCUSED:
            return true;
        case WEBVIEW_DID_START_LOADING:
        case WEBVIEW_MESSAGE_BOX_BLURRED:
        case WEBVIEW_DID_FAIL_LOAD:
            return false;
        default:
            return state;
    }
};

const isShowWindowOnUnreadChangedEnabled = (state = false, action) => {
    switch (action.type) {
        case MENU_BAR_TOGGLE_IS_SHOW_WINDOW_ON_UNREAD_CHANGED_ENABLED_CLICKED:
            return action.payload;
        case APP_SETTINGS_LOADED: {
            const { isShowWindowOnUnreadChangedEnabled = state } = action.payload;
            return isShowWindowOnUnreadChangedEnabled;
        }
        default:
            return state;
    }
};

const isSideBarEnabled = (state = true, action) => {
    switch (action.type) {
        case MENU_BAR_TOGGLE_IS_SIDE_BAR_ENABLED_CLICKED:
            return action.payload;
        case APP_SETTINGS_LOADED: {
            const { isSideBarEnabled = state } = action.payload;
            return isSideBarEnabled;
        }
        default:
            return state;
    }
};

const isTrayIconEnabled = (state = process.platform !== 'linux', action) => {
    switch (action.type) {
        case MENU_BAR_TOGGLE_IS_TRAY_ICON_ENABLED_CLICKED: {
            return action.payload;
        }
        case APP_SETTINGS_LOADED: {
            const { isTrayIconEnabled = state } = action.payload;
            return isTrayIconEnabled;
        }
        default:
            return state;
    }
};

const SCREEN_SHARING_DIALOG_DISMISSED = 'screen-sharing-dialog/dismissed';

const UPDATE_SKIPPED = 'update/skipped';
const UPDATES_CHECK_FOR_UPDATES_REQUESTED = 'updates/check-for-updates-requested';
const UPDATES_CHECKING_FOR_UPDATE = 'updates/checking-for-update';
const UPDATES_ERROR_THROWN = 'updates/error-thrown';
const UPDATES_NEW_VERSION_AVAILABLE = 'updates/new-version-available';
const UPDATES_NEW_VERSION_NOT_AVAILABLE = 'updates/new-version-not-available';
const UPDATES_READY = 'updates/ready';

const openDialog = (state = null, action) => {
    switch (action.type) {
        case MENU_BAR_ABOUT_CLICKED:
            return 'about';
        case WEBVIEW_SCREEN_SHARING_SOURCE_REQUESTED:
            return 'screen-sharing';
        case UPDATES_NEW_VERSION_AVAILABLE:
            return 'update';
        case CERTIFICATES_CLIENT_CERTIFICATE_REQUESTED:
            return 'select-client-certificate';
        case ABOUT_DIALOG_DISMISSED:
        case SCREEN_SHARING_DIALOG_DISMISSED:
        case WEBVIEW_SCREEN_SHARING_SOURCE_RESPONDED:
        case SELECT_CLIENT_CERTIFICATE_DIALOG_CERTIFICATE_SELECTED:
        case SELECT_CLIENT_CERTIFICATE_DIALOG_DISMISSED:
        case UPDATE_DIALOG_DISMISSED:
        case UPDATE_DIALOG_SKIP_UPDATE_CLICKED:
        case UPDATE_DIALOG_REMIND_UPDATE_LATER_CLICKED:
        case UPDATE_DIALOG_INSTALL_BUTTON_CLICKED:
            return null;
        default:
            return state;
    }
};

const rootWindowIcon = (state = null, action) => {
    switch (action.type) {
        case ROOT_WINDOW_ICON_CHANGED: {
            return action.payload;
        }
        default:
            return state;
    }
};

const rootWindowState = (state = {
    focused: true,
    visible: true,
    maximized: false,
    minimized: false,
    fullscreen: false,
    normal: true,
    bounds: {
        x: undefined,
        y: undefined,
        width: 1000,
        height: 600,
    },
}, action) => {
    switch (action.type) {
        case ROOT_WINDOW_STATE_CHANGED:
            return action.payload;
        case APP_SETTINGS_LOADED: {
            const { rootWindowState = state } = action.payload;
            return rootWindowState;
        }
        default:
            return state;
    }
};

const doCheckForUpdatesOnStartup = (state = true, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { doCheckForUpdatesOnStartup } = action.payload;
            return doCheckForUpdatesOnStartup;
        }
        case ABOUT_DIALOG_TOGGLE_UPDATE_ON_START: {
            const doCheckForUpdatesOnStartup = action.payload;
            return doCheckForUpdatesOnStartup;
        }
        case APP_SETTINGS_LOADED: {
            const { doCheckForUpdatesOnStartup = state } = action.payload;
            return doCheckForUpdatesOnStartup;
        }
        default:
            return state;
    }
};
const isCheckingForUpdates = (state = false, action) => {
    switch (action.type) {
        case UPDATES_CHECKING_FOR_UPDATE:
            return true;
        case UPDATES_ERROR_THROWN:
            return false;
        case UPDATES_NEW_VERSION_NOT_AVAILABLE:
            return false;
        case UPDATES_NEW_VERSION_AVAILABLE:
            return false;
        default:
            return state;
    }
};
const isEachUpdatesSettingConfigurable = (state = true, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { isEachUpdatesSettingConfigurable } = action.payload;
            return isEachUpdatesSettingConfigurable;
        }
        case APP_SETTINGS_LOADED: {
            const { isEachUpdatesSettingConfigurable = state } = action.payload;
            return isEachUpdatesSettingConfigurable;
        }
        default:
            return state;
    }
};
const isUpdatingAllowed = (state = true, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { isUpdatingAllowed } = action.payload;
            return isUpdatingAllowed;
        }
        default:
            return state;
    }
};
const isUpdatingEnabled = (state = true, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { isUpdatingEnabled } = action.payload;
            return isUpdatingEnabled;
        }
        case APP_SETTINGS_LOADED: {
            const { isUpdatingEnabled = state } = action.payload;
            return isUpdatingEnabled;
        }
        default:
            return state;
    }
};
const newUpdateVersion = (state = null, action) => {
    switch (action.type) {
        case UPDATES_NEW_VERSION_AVAILABLE:
            return action.payload;
        case UPDATES_NEW_VERSION_NOT_AVAILABLE:
            return null;
        default:
            return state;
    }
};
const skippedUpdateVersion = (state = null, action) => {
    switch (action.type) {
        case UPDATES_READY: {
            const { skippedUpdateVersion } = action.payload;
            return skippedUpdateVersion;
        }
        case UPDATE_SKIPPED: {
            const skippedUpdateVersion = action.payload;
            return skippedUpdateVersion;
        }
        case APP_SETTINGS_LOADED: {
            const { skippedUpdateVersion = state } = action.payload;
            return skippedUpdateVersion;
        }
        default:
            return state;
    }
};
const updateError = (state = null, action) => {
    switch (action.type) {
        case UPDATES_CHECKING_FOR_UPDATE:
            return null;
        case UPDATES_ERROR_THROWN:
            return action.payload;
        case UPDATES_NEW_VERSION_NOT_AVAILABLE:
            return null;
        case UPDATES_NEW_VERSION_AVAILABLE:
            return null;
        default:
            return state;
    }
};

const rootReducer = redux.combineReducers({
    appPath,
    appVersion,
    clientCertificates,
    currentView,
    doCheckForUpdatesOnStartup,
    downloads,
    downloadsPath,
    externalProtocols,
    isCheckingForUpdates,
    isEachUpdatesSettingConfigurable,
    isMenuBarEnabled,
    isMessageBoxFocused,
    isShowWindowOnUnreadChangedEnabled,
    isSideBarEnabled,
    isTrayIconEnabled,
    isUpdatingAllowed,
    isUpdatingEnabled,
    newUpdateVersion,
    openDialog,
    rootWindowIcon,
    rootWindowState,
    servers,
    skippedUpdateVersion,
    trustedCertificates,
    updateError,
});

let reduxStore;
let lastAction;
const catchLastAction = () => (next) => (action) => {
    lastAction = action;
    return next(action);
};
const createMainReduxStore = () => {
    const middlewares = redux.applyMiddleware(catchLastAction, forwardToRenderers);
    reduxStore = redux.createStore(rootReducer, {}, middlewares);
};
const dispatch = (action) => {
    reduxStore.dispatch(action);
};
const select = (selector) => selector(reduxStore.getState());
const watch = (selector, watcher) => {
    const initial = select(selector);
    watcher(initial, undefined);
    let prev = initial;
    return reduxStore.subscribe(() => {
        const curr = select(selector);
        if (Object.is(prev, curr)) {
            return;
        }
        watcher(curr, prev);
        prev = curr;
    });
};
const listen = (typeOrPredicate, listener) => {
    const effectivePredicate = typeof typeOrPredicate === 'function'
        ? typeOrPredicate
        : (action) => action.type === typeOrPredicate;
    return reduxStore.subscribe(() => {
        if (!effectivePredicate(lastAction)) {
            return;
        }
        listener(lastAction);
    });
};
class Service {
    constructor() {
        this.unsubscribers = new Set();
    }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    initialize() { }
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    destroy() { }
    watch(selector, watcher) {
        this.unsubscribers.add(watch(selector, watcher));
    }
    // eslint-disable-next-line no-dupe-class-members
    listen(typeOrPredicate, listener) {
        if (typeof typeOrPredicate === 'string') {
            this.unsubscribers.add(listen(typeOrPredicate, listener));
            return;
        }
        this.unsubscribers.add(listen(typeOrPredicate, listener));
    }
    setUp() {
        this.initialize();
    }
    tearDown() {
        this.unsubscribers.forEach((unsubscribe) => unsubscribe());
        this.destroy();
    }
}
// const isResponseTo = <Response extends RootAction>(id: unknown, type: Response['type']) =>
//   (action: RootAction): action is Response =>
//     isResponse(action) && action.type === type && action.meta.id === id;
const request = (requestAction, ...types) => new Promise((resolve, reject) => {
    const id = Math.random().toString(36).slice(2);
    const unsubscribe = listen(isResponseTo(id, ...types), (action) => {
        unsubscribe();
        if (isErrored(action)) {
            reject(action.payload);
            return;
        }
        if (hasPayload(action)) {
            resolve(action.payload);
        }
    });
    dispatch(Object.assign(Object.assign({}, requestAction), { meta: {
            request: true,
            id,
        } }));
});

const setUserDataDirectory = () => {
    electron.app.setPath('userData', path__default['default'].join(electron.app.getPath('appData'), `${electron.app.name} (development)`));
};
const setupRootWindowReload = (webContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const chokidar = yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('chokidar')); });
    chokidar
        .watch(path__default['default'].join(electron.app.getAppPath(), 'app/rootWindow.js'), {
        awaitWriteFinish: true,
    })
        .on('change', () => {
        if (webContents.isDestroyed()) {
            return;
        }
        console.log('Reloading root window...');
        webContents.reload();
    });
});
const setupPreloadReload = (webContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const chokidar = yield Promise.resolve().then(function () { return /*#__PURE__*/_interopNamespace(require('chokidar')); });
    chokidar
        .watch([
        path__default['default'].join(electron.app.getAppPath(), 'app/preload.js'),
        path__default['default'].join(electron.app.getAppPath(), 'app/injected.js'),
    ], {
        awaitWriteFinish: true,
    })
        .on('change', () => {
        if (webContents.isDestroyed()) {
            return;
        }
        console.log('Reloading webview...');
        webContents.reload();
    });
});

const selectGlobalBadge = ({ servers }) => {
    const badges = servers.map(({ badge }) => badge);
    const mentionCount = badges
        .filter((badge) => Number.isInteger(badge))
        .reduce((sum, count) => sum + count, 0);
    return mentionCount || (badges.some((badge) => !!badge) && '•') || undefined;
};
reselect.createSelector(selectGlobalBadge, (badge) => {
    if (badge === '•') {
        return '•';
    }
    if (Number.isInteger(badge)) {
        return String(badge);
    }
    return '';
});
const isBadgeCount = (badge) => Number.isInteger(badge);
const selectGlobalBadgeCount = reselect.createSelector(selectGlobalBadge, (badge) => (isBadgeCount(badge) ? badge : 0));

const getAppIconPath = ({ platform, }) => {
    if (platform !== 'win32') {
        throw Error('only win32 platform is supported');
    }
    return `${electron.app.getAppPath()}/app/images/icon.ico`;
};
const getMacOSTrayIconPath = (badge) => path__default['default'].join(electron.app.getAppPath(), `app/images/tray/darwin/${badge ? 'notification' : 'default'}Template.png`);
const getWindowsTrayIconPath = (badge) => {
    const name = (!badge && 'default') ||
        (badge === '•' && 'notification-dot') ||
        (typeof badge === 'number' && badge > 9 && 'notification-plus-9') ||
        `notification-${badge}`;
    return path__default['default'].join(electron.app.getAppPath(), `app/images/tray/win32/${name}.ico`);
};
const getLinuxTrayIconPath = (badge) => {
    const name = (!badge && 'default') ||
        (badge === '•' && 'notification-dot') ||
        (typeof badge === 'number' && badge > 9 && 'notification-plus-9') ||
        `notification-${badge}`;
    return path__default['default'].join(electron.app.getAppPath(), `app/images/tray/linux/${name}.png`);
};
const getTrayIconPath = ({ badge, platform, }) => {
    switch (platform !== null && platform !== void 0 ? platform : process.platform) {
        case 'darwin':
            return getMacOSTrayIconPath(badge);
        case 'win32':
            return getWindowsTrayIconPath(badge);
        case 'linux':
            return getLinuxTrayIconPath(badge);
        default:
            throw Error(`unsupported platform (${platform})`);
    }
};

const webPreferences = {
    nodeIntegration: true,
    nodeIntegrationInSubFrames: true,
    webviewTag: true,
    worldSafeExecuteJavaScript: true,
    enableRemoteModule: true
};
const selectRootWindowState = ({ rootWindowState }) => rootWindowState !== null && rootWindowState !== void 0 ? rootWindowState : {
    bounds: {
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    },
    focused: false,
    fullscreen: false,
    maximized: false,
    minimized: false,
    normal: false,
    visible: false,
};
let _rootWindow;
const getRootWindow = () => new Promise((resolve, reject) => {
    setImmediate(() => {
        _rootWindow ? resolve(_rootWindow) : reject(new Error());
    });
});
const createRootWindow = () => {
    _rootWindow = new electron.BrowserWindow({
        width: 1000,
        height: 600,
        minWidth: 400,
        minHeight: 400,
        titleBarStyle: 'hidden',
        backgroundColor: '#2f343d',
        show: false,
        webPreferences,
    });
    _rootWindow.addListener('close', (event) => {
        event.preventDefault();
    });
};
const isInsideSomeScreen = ({ x, y, width, height }) => electron.screen
    .getAllDisplays()
    .some(({ bounds }) => x >= bounds.x &&
    y >= bounds.y &&
    x + width <= bounds.x + bounds.width &&
    y + height <= bounds.y + bounds.height);
const applyRootWindowState = (browserWindow) => {
    const rootWindowState = select(selectRootWindowState);
    const isTrayIconEnabled = select(({ isTrayIconEnabled }) => isTrayIconEnabled);
    let { x, y } = rootWindowState.bounds;
    const { width, height } = rootWindowState.bounds;
    if (x === null ||
        x === undefined ||
        y === null ||
        y === undefined ||
        !isInsideSomeScreen({ x, y, width, height })) {
        const { bounds: { width: primaryDisplayWidth, height: primaryDisplayHeight }, } = electron.screen.getPrimaryDisplay();
        x = Math.round((primaryDisplayWidth - width) / 2);
        y = Math.round((primaryDisplayHeight - height) / 2);
    }
    if (browserWindow.isVisible()) {
        return;
    }
    if (x === null || x === undefined || y === null || y === undefined) {
        browserWindow.setBounds({ width, height });
    }
    else {
        browserWindow.setBounds({ x, y, width, height });
    }
    if (rootWindowState.maximized) {
        browserWindow.maximize();
    }
    if (rootWindowState.minimized) {
        browserWindow.minimize();
    }
    if (rootWindowState.fullscreen) {
        browserWindow.setFullScreen(true);
    }
    if (rootWindowState.visible || !isTrayIconEnabled) {
        browserWindow.show();
    }
    if (rootWindowState.focused) {
        browserWindow.focus();
    }
};
const fetchRootWindowState = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const browserWindow = yield getRootWindow();
    return {
        focused: browserWindow.isFocused(),
        visible: browserWindow.isVisible(),
        maximized: browserWindow.isMaximized(),
        minimized: browserWindow.isMinimized(),
        fullscreen: browserWindow.isFullScreen(),
        normal: browserWindow.isNormal(),
        bounds: browserWindow.getNormalBounds(),
    };
});
const setupRootWindow = () => {
    electron.nativeTheme.themeSource = 'dark';
    dispatch({
        type: MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED,
        payload: false,
    });
    //console.log('---setting up listener for WEBVIEW_FOCUS_REQUESTED---');
    listen(WEBVIEW_FOCUS_REQUESTED, () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        //console.log('---WEBVIEW_FOCUS_REQUESTED---');
        getRootWindow().then(rootWindow => {
            rootWindow.show();
            if (rootWindow.isMinimized()) {
                rootWindow.restore();
            }
            rootWindow.focus();
            /* изначально было внутри unsubscribers
            const selectIsRootWindowVisible = ({
              rootWindowState: { visible },
            }: RootState): boolean => visible;
            const isRootWindowVisible = select(selectIsRootWindowVisible);
      
            if (!isRootWindowVisible) {
              await browserWindow.show();
            }
            */
        });
    }));
    const unsubscribers = [
        watch(selectGlobalBadgeCount, (globalBadgeCount) => tslib.__awaiter(void 0, void 0, void 0, function* () {
            const browserWindow = yield getRootWindow();
            if (browserWindow.isFocused() || globalBadgeCount === 0) {
                return;
            }
            const isShowWindowOnUnreadChangedEnabled = select(({ isShowWindowOnUnreadChangedEnabled }) => isShowWindowOnUnreadChangedEnabled);
            if (isShowWindowOnUnreadChangedEnabled && !browserWindow.isVisible()) {
                const isMinimized = browserWindow.isMinimized();
                const isMaximized = browserWindow.isMaximized();
                browserWindow.showInactive();
                if (isMinimized) {
                    browserWindow.minimize();
                }
                if (isMaximized) {
                    browserWindow.maximize();
                }
                return;
            }
            if (process.platform === 'win32' || process.platform === 'darwin') {
                browserWindow.flashFrame(true);
            }
        })),
        watch(({ currentView, servers }) => {
            const currentServer = typeof currentView === 'object'
                ? servers.find(({ url }) => url === currentView.url)
                : null;
            return (currentServer && currentServer.title) || electron.app.name;
        }, (windowTitle) => tslib.__awaiter(void 0, void 0, void 0, function* () {
            const browserWindow = yield getRootWindow();
            browserWindow.setTitle(windowTitle);
        })),
        /*listen(WEBVIEW_FOCUS_REQUESTED, async () => {
           getRootWindow().then(rootWindow => {
             console.log('rootWindow:', rootWindow);
             rootWindow.show();
             rootWindow.restore();
             rootWindow.focus();
           });
     
           /*const selectIsRootWindowVisible = ({
             rootWindowState: { visible },
           }: RootState): boolean => visible;
           //const isRootWindowVisible = select(selectIsRootWindowVisible);
     
           //if (!isRootWindowVisible) {
             //await browserWindow.show();
     
          // }
           browserWindow.restore();
           browserWindow.focus();
         }),*/
    ];
    const fetchAndDispatchWindowState = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        dispatch({
            type: ROOT_WINDOW_STATE_CHANGED,
            payload: yield fetchRootWindowState(),
        });
    });
    getRootWindow().then((rootWindow) => {
        rootWindow.addListener('show', fetchAndDispatchWindowState);
        rootWindow.addListener('hide', fetchAndDispatchWindowState);
        rootWindow.addListener('focus', fetchAndDispatchWindowState);
        rootWindow.addListener('blur', fetchAndDispatchWindowState);
        rootWindow.addListener('maximize', fetchAndDispatchWindowState);
        rootWindow.addListener('unmaximize', fetchAndDispatchWindowState);
        rootWindow.addListener('minimize', fetchAndDispatchWindowState);
        rootWindow.addListener('restore', fetchAndDispatchWindowState);
        //rootWindow.addListener('resize', fetchAndDispatchWindowState);
        //rootWindow.addListener('move', fetchAndDispatchWindowState); //откл 06.12.2021
        fetchAndDispatchWindowState();
        rootWindow.addListener('focus', () => tslib.__awaiter(void 0, void 0, void 0, function* () {
            rootWindow.flashFrame(false);
        }));
        rootWindow.addListener('close', () => tslib.__awaiter(void 0, void 0, void 0, function* () {
            if (rootWindow.isFullScreen()) {
                yield new Promise((resolve) => rootWindow.once('leave-full-screen', resolve));
                rootWindow.setFullScreen(false);
            }
            rootWindow.blur();
            const isTrayIconEnabled = select(({ isTrayIconEnabled }) => isTrayIconEnabled !== null && isTrayIconEnabled !== void 0 ? isTrayIconEnabled : true);
            if (process.platform === 'darwin' || isTrayIconEnabled) {
                rootWindow.hide();
                return;
            }
            if (process.platform === 'win32') {
                rootWindow.minimize();
                return;
            }
            electron.app.quit();
        }));
        unsubscribers.push(() => {
            rootWindow.removeAllListeners();
            rootWindow.destroy();
        });
    });
    if (process.platform === 'linux' || process.platform === 'win32') {
        const selectRootWindowIcon = reselect.createStructuredSelector({
            globalBadge: selectGlobalBadge,
            rootWindowIcon: ({ rootWindowIcon }) => rootWindowIcon,
        });
        unsubscribers.push(watch(selectRootWindowIcon, ({ globalBadge, rootWindowIcon }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
            var _a;
            const browserWindow = yield getRootWindow();
            if (!rootWindowIcon) {
                browserWindow.setIcon(getTrayIconPath({
                    platform: process.platform,
                    badge: globalBadge,
                }));
                return;
            }
            const icon = electron.nativeImage.createEmpty();
            const { scaleFactor } = electron.screen.getPrimaryDisplay();
            if (process.platform === 'linux') {
                rootWindowIcon.icon.forEach((representation) => {
                    icon.addRepresentation(Object.assign(Object.assign({}, representation), { scaleFactor }));
                });
            }
            if (process.platform === 'win32') {
                for (const representation of rootWindowIcon.icon) {
                    icon.addRepresentation(Object.assign(Object.assign({}, representation), { scaleFactor: (_a = representation.width) !== null && _a !== void 0 ? _a : 0 / 32 }));
                }
            }
            browserWindow.setIcon(icon);
            if (process.platform === 'win32') {
                let overlayIcon = null;
                const overlayDescription = (typeof globalBadge === 'number' &&
                    i18next__default['default'].t('unreadMention', {
                        appName: electron.app.name,
                        count: globalBadge,
                    })) ||
                    (globalBadge === '•' &&
                        i18next__default['default'].t('unreadMessage', { appName: electron.app.name })) ||
                    i18next__default['default'].t('noUnreadMessage', { appName: electron.app.name });
                if (rootWindowIcon.overlay) {
                    overlayIcon = electron.nativeImage.createEmpty();
                    for (const representation of rootWindowIcon.overlay) {
                        overlayIcon.addRepresentation(Object.assign(Object.assign({}, representation), { scaleFactor: 1 }));
                    }
                }
                browserWindow.setOverlayIcon(overlayIcon, overlayDescription);
            }
        })), watch(({ isMenuBarEnabled }) => isMenuBarEnabled, (isMenuBarEnabled) => tslib.__awaiter(void 0, void 0, void 0, function* () {
            const browserWindow = yield getRootWindow();
            browserWindow.autoHideMenuBar = !isMenuBarEnabled;
            browserWindow.setMenuBarVisibility(isMenuBarEnabled);
        })));
    }
    electron.app.addListener('before-quit', () => {
        unsubscribers.forEach((unsubscriber) => unsubscriber());
    });
};
const showRootWindow = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const browserWindow = yield getRootWindow();
    browserWindow.loadFile(path__default['default'].join(electron.app.getAppPath(), 'app/index.html'));
    {
        setupRootWindowReload(browserWindow.webContents);
    }
    return new Promise((resolve) => {
        browserWindow.addListener('ready-to-show', () => {
            applyRootWindowState(browserWindow);
            const isTrayIconEnabled = select(({ isTrayIconEnabled }) => isTrayIconEnabled);
            if (electron.app.commandLine.hasSwitch('start-hidden') && isTrayIconEnabled) {
                console.debug('Start application in background');
                browserWindow.hide();
            }
            setupRootWindow();
            resolve();
        });
    });
});
const exportLocalStorage = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const tempWindow = new electron.BrowserWindow({
            show: false,
            webPreferences,
        });
        tempWindow.loadFile(path__default['default'].join(electron.app.getAppPath(), 'app/index.html'));
        yield new Promise((resolve) => {
            tempWindow.addListener('ready-to-show', () => {
                resolve();
            });
        });
        return tempWindow.webContents.executeJavaScript(`(() => {
      const data = ({...localStorage})
      localStorage.clear();
      return data;
    })()`);
    }
    catch (error) {
        console.error(error);
        return {};
    }
});

const relaunchApp = (...args) => {
    const command = process.argv.slice(1, electron.app.isPackaged ? 1 : 2);
    electron.app.relaunch({ args: [...command, ...args] });
    electron.app.exit();
};
const performElectronStartup = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    electron.app.setAsDefaultProtocolClient('rocketchat');
    electron.app.setAppUserModelId('chat.rocket');
    electron.app.commandLine.appendSwitch('--autoplay-policy', 'no-user-gesture-required');
    const args = process.argv.slice(electron.app.isPackaged ? 1 : 2);
    if (args.includes('--reset-app-data')) {
        rimraf__default['default'].sync(electron.app.getPath('userData'));
        relaunchApp();
        return;
    }
    const canStart = process.mas || electron.app.requestSingleInstanceLock();
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
        electron.app.exit();
        return;
    }
    if (args.includes('--disable-gpu')) {
        electron.app.disableHardwareAcceleration();
        electron.app.commandLine.appendSwitch('--disable-2d-canvas-image-chromium');
        electron.app.commandLine.appendSwitch('--disable-accelerated-2d-canvas');
        electron.app.commandLine.appendSwitch('--disable-gpu');
    }
});
const setupApp = () => {
    electron.app.addListener('activate', () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const browserWindow = yield getRootWindow();
        if (!browserWindow.isVisible()) {
            browserWindow.showInactive();
        }
        browserWindow.focus();
    }));
    electron.app.addListener('window-all-closed', () => undefined);
    dispatch({ type: APP_PATH_SET, payload: electron.app.getAppPath() });
    dispatch({ type: APP_VERSION_SET, payload: electron.app.getVersion() });
};

const selectPersistableValues = reselect.createStructuredSelector({
    currentView: ({ currentView }) => currentView,
    doCheckForUpdatesOnStartup: ({ doCheckForUpdatesOnStartup }) => doCheckForUpdatesOnStartup,
    downloads: ({ downloads }) => downloads,
    downloadsPath: ({ downloadsPath }) => downloadsPath,
    isMenuBarEnabled: ({ isMenuBarEnabled }) => isMenuBarEnabled,
    isShowWindowOnUnreadChangedEnabled: ({ isShowWindowOnUnreadChangedEnabled, }) => isShowWindowOnUnreadChangedEnabled,
    isSideBarEnabled: ({ isSideBarEnabled }) => isSideBarEnabled,
    isTrayIconEnabled: ({ isTrayIconEnabled }) => isTrayIconEnabled,
    rootWindowState: ({ rootWindowState }) => rootWindowState,
    servers: ({ servers }) => servers,
    skippedUpdateVersion: ({ skippedUpdateVersion }) => skippedUpdateVersion,
    trustedCertificates: ({ trustedCertificates }) => trustedCertificates,
    isEachUpdatesSettingConfigurable: ({ isEachUpdatesSettingConfigurable }) => isEachUpdatesSettingConfigurable,
    isUpdatingEnabled: ({ isUpdatingEnabled }) => isUpdatingEnabled,
    externalProtocols: ({ externalProtocols }) => externalProtocols,
});

const migrations = {
    '>=3.1.0': (before) => {
        var _a;
        const { currentServerUrl } = before, rest = tslib.__rest(before, ["currentServerUrl"]);
        return Object.assign(Object.assign({}, rest), { currentView: currentServerUrl
                ? { url: currentServerUrl }
                : (_a = rest.currentView) !== null && _a !== void 0 ? _a : 'add-new-server', downloads: {} });
    },
};

let electronStore;
const getElectronStore = () => {
    if (!electronStore) {
        electronStore = new ElectronStore__default['default']({
            migrations: Object.fromEntries(Object.entries(migrations).map(([semver, transform]) => [
                semver,
                (store) => {
                    store.store = transform(store.store);
                },
            ])),
            projectVersion: electron.app.getVersion(),
        });
    }
    return electronStore;
};
const getPersistedValues = () => getElectronStore().store;
const persistValues = (values) => {
    getElectronStore().set(values);
};

const mergePersistableValues = (localStorage) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    const initialValues = select(selectPersistableValues);
    const electronStoreValues = getPersistedValues();
    const localStorageValues = Object.fromEntries(Object.entries(localStorage).map(([key, value]) => {
        try {
            return [key, JSON.parse(value)];
        }
        catch (error) {
            return [];
        }
    }));
    let values = selectPersistableValues(Object.assign(Object.assign(Object.assign({}, initialValues), electronStoreValues), localStorageValues));
    if (localStorage.autohideMenu) {
        values = Object.assign(Object.assign({}, values), { isMenuBarEnabled: localStorage.autohideMenu !== 'true' });
    }
    if (localStorage.showWindowOnUnreadChanged) {
        values = Object.assign(Object.assign({}, values), { isShowWindowOnUnreadChangedEnabled: localStorage.showWindowOnUnreadChanged === 'true' });
    }
    if (localStorage['sidebar-closed']) {
        values = Object.assign(Object.assign({}, values), { isSideBarEnabled: localStorage['sidebar-closed'] !== 'true' });
    }
    if (localStorage.hideTray) {
        values = Object.assign(Object.assign({}, values), { isTrayIconEnabled: localStorage.hideTray !== 'true' });
    }
    const userRootWindowState = yield (() => tslib.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const filePath = path__default['default'].join(electron.app.getPath('userData'), 'main-window-state.json');
            const content = yield fs__default['default'].promises.readFile(filePath, 'utf8');
            const json = JSON.parse(content);
            yield fs__default['default'].promises.unlink(filePath);
            return json && typeof json === 'object' ? json : {};
        }
        catch (error) {
            return {};
        }
    }))();
    values = Object.assign(Object.assign({}, values), { rootWindowState: {
            focused: true,
            visible: !((_a = userRootWindowState === null || userRootWindowState === void 0 ? void 0 : userRootWindowState.isHidden) !== null && _a !== void 0 ? _a : !((_b = values === null || values === void 0 ? void 0 : values.rootWindowState) === null || _b === void 0 ? void 0 : _b.visible)),
            maximized: (_c = userRootWindowState.isMaximized) !== null && _c !== void 0 ? _c : (_d = values === null || values === void 0 ? void 0 : values.rootWindowState) === null || _d === void 0 ? void 0 : _d.maximized,
            minimized: (_e = userRootWindowState.isMinimized) !== null && _e !== void 0 ? _e : (_f = values === null || values === void 0 ? void 0 : values.rootWindowState) === null || _f === void 0 ? void 0 : _f.minimized,
            fullscreen: false,
            normal: (_g = !(userRootWindowState.isMinimized || userRootWindowState.isMaximized)) !== null && _g !== void 0 ? _g : (_h = values === null || values === void 0 ? void 0 : values.rootWindowState) === null || _h === void 0 ? void 0 : _h.normal,
            bounds: {
                x: (_j = userRootWindowState.x) !== null && _j !== void 0 ? _j : (_l = (_k = values === null || values === void 0 ? void 0 : values.rootWindowState) === null || _k === void 0 ? void 0 : _k.bounds) === null || _l === void 0 ? void 0 : _l.x,
                y: (_m = userRootWindowState.y) !== null && _m !== void 0 ? _m : (_p = (_o = values === null || values === void 0 ? void 0 : values.rootWindowState) === null || _o === void 0 ? void 0 : _o.bounds) === null || _p === void 0 ? void 0 : _p.y,
                width: (_q = userRootWindowState.width) !== null && _q !== void 0 ? _q : (_s = (_r = values === null || values === void 0 ? void 0 : values.rootWindowState) === null || _r === void 0 ? void 0 : _r.bounds) === null || _s === void 0 ? void 0 : _s.width,
                height: (_t = userRootWindowState.height) !== null && _t !== void 0 ? _t : (_v = (_u = values === null || values === void 0 ? void 0 : values.rootWindowState) === null || _u === void 0 ? void 0 : _u.bounds) === null || _v === void 0 ? void 0 : _v.height,
            },
        } });
    dispatch({
        type: APP_SETTINGS_LOADED,
        payload: values,
    });
});
const watchAndPersistChanges = () => {
    watch(selectPersistableValues, (values) => {
        persistValues(values);
    });
};

const REQUIRED_SERVER_VERSION_RANGE = '>=2.0.0';
const convertToURL = (input) => {
    let url;
    if (/^https?:\/\//.test(input)) {
        url = new URL(input);
    }
    else {
        url = new URL(`https://${input}`);
    }
    const { protocol, username, password, hostname, port, pathname } = url;
    return Object.assign(new URL('https://0.0.0.0'), {
        protocol,
        username,
        password,
        hostname,
        port: (protocol === 'http' && port === '80' && undefined) ||
            (protocol === 'https' && port === '443' && undefined) ||
            port,
        pathname: /\/$/.test(pathname) ? pathname : `${pathname}/`,
    });
};
const fetchServerInformation = (url) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const { webContents } = yield getRootWindow();
    const [urlHref, version] = yield invoke(webContents, 'servers/fetch-info', url.href);
    return [convertToURL(urlHref), version];
});
const resolveServerUrl = (input) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    let url;
    try {
        url = convertToURL(input);
    }
    catch (error) {
        return [input, "invalid-url" /* INVALID_URL */, error];
    }
    let version;
    try {
        [url, version] = yield fetchServerInformation(url);
    }
    catch (error) {
        if (!/(^https?:\/\/)|(\.)|(^([^:]+:[^@]+@)?localhost(:\d+)?$)/.test(input)) {
            return resolveServerUrl(`https://${input}.rocket.chat`);
        }
        if ((error === null || error === void 0 ? void 0 : error.name) === 'AbortError') {
            return [url.href, "timeout" /* TIMEOUT */, error];
        }
        return [url.href, "invalid" /* INVALID */, error];
    }
    const semver$1 = semver.coerce(version);
    if (!semver$1 || !semver.satisfies(semver$1, REQUIRED_SERVER_VERSION_RANGE)) {
        return [
            url.href,
            "invalid" /* INVALID */,
            new Error(`incompatible server version (${version}, expected ${REQUIRED_SERVER_VERSION_RANGE})`),
        ];
    }
    return [url.href, "ok" /* OK */];
});
const loadAppServers = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path__default['default'].join(electron.app.getAppPath(), electron.app.getAppPath().endsWith('app.asar') ? '..' : '.', 'servers.json');
        const content = yield fs__default['default'].promises.readFile(filePath, 'utf8');
        const json = JSON.parse(content);
        return json && typeof json === 'object' ? json : {};
    }
    catch (error) {
        return {};
    }
});
const loadUserServers = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path__default['default'].join(electron.app.getPath('userData'), 'servers.json');
        const content = yield fs__default['default'].promises.readFile(filePath, 'utf8');
        const json = JSON.parse(content);
        yield fs__default['default'].promises.unlink(filePath);
        return json && typeof json === 'object' ? json : {};
    }
    catch (error) {
        return {};
    }
});
const setupServers = (localStorage) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    listen(SERVER_URL_RESOLUTION_REQUESTED, (action) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        if (!hasMeta(action)) {
            return;
        }
        try {
            dispatch({
                type: SERVER_URL_RESOLVED,
                payload: yield resolveServerUrl(action.payload),
                meta: {
                    response: true,
                    id: action.meta.id,
                },
            });
        }
        catch (error) {
            dispatch({
                type: SERVER_URL_RESOLVED,
                payload: error,
                error: true,
                meta: {
                    response: true,
                    id: action.meta.id,
                },
            });
        }
    }));
    let servers = select(({ servers }) => servers);
    let currentServerUrl = select(({ currentView }) => typeof currentView === 'object' ? currentView.url : null);
    const serversMap = new Map(servers
        .filter(Boolean)
        .filter(({ url, title }) => typeof url === 'string' && typeof title === 'string')
        .map((server) => [server.url, server]));
    if (localStorage['rocket.chat.hosts']) {
        try {
            const storedString = JSON.parse(localStorage['rocket.chat.hosts']);
            if (/^https?:\/\//.test(storedString)) {
                serversMap.set(storedString, {
                    url: storedString,
                    title: storedString,
                });
            }
            else {
                const storedValue = JSON.parse(storedString);
                if (Array.isArray(storedValue)) {
                    storedValue
                        .map((url) => url.replace(/\/$/, ''))
                        .forEach((url) => {
                        serversMap.set(url, { url, title: url });
                    });
                }
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    if (serversMap.size === 0) {
        const appConfiguration = yield loadAppServers();
        for (const [title, url] of Object.entries(appConfiguration)) {
            serversMap.set(url, { url, title });
        }
        const userConfiguration = yield loadUserServers();
        for (const [title, url] of Object.entries(userConfiguration)) {
            serversMap.set(url, { url, title });
        }
    }
    if (localStorage['rocket.chat.currentHost'] &&
        localStorage['rocket.chat.currentHost'] !== 'null') {
        currentServerUrl = localStorage['rocket.chat.currentHost'];
    }
    servers = Array.from(serversMap.values());
    currentServerUrl = currentServerUrl
        ? (_d = (_b = (_a = serversMap.get(currentServerUrl)) === null || _a === void 0 ? void 0 : _a.url) !== null && _b !== void 0 ? _b : (_c = servers[0]) === null || _c === void 0 ? void 0 : _c.url) !== null && _d !== void 0 ? _d : null
        : null;
    if (currentServerUrl === null && servers.length > 0) {
        currentServerUrl = servers[0].url;
        if (!currentServerUrl.endsWith('/'))
            currentServerUrl += '/';
    }
    if (localStorage['rocket.chat.sortOrder']) {
        try {
            const sorting = JSON.parse(localStorage['rocket.chat.sortOrder']);
            if (Array.isArray(sorting)) {
                servers = [...serversMap.values()].sort((a, b) => sorting.indexOf(a.url) - sorting.indexOf(b.url));
            }
        }
        catch (error) {
            console.warn(error);
        }
    }
    dispatch({
        type: SERVERS_LOADED,
        payload: {
            servers,
            selected: currentServerUrl,
        },
    });
});

const t$6 = i18next__default['default'].t.bind(i18next__default['default']);
const askForAppDataReset = (parentWindow) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    parentWindow === null || parentWindow === void 0 ? void 0 : parentWindow.show();
    const { response } = yield electron.dialog.showMessageBox(parentWindow !== null && parentWindow !== void 0 ? parentWindow : (yield getRootWindow()), {
        type: 'question',
        buttons: [t$6('dialog.resetAppData.yes'), t$6('dialog.resetAppData.cancel')],
        defaultId: 1,
        title: t$6('dialog.resetAppData.title'),
        message: t$6('dialog.resetAppData.message'),
    });
    return response === 0;
});
const askForServerAddition = (serverUrl, parentWindow) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    parentWindow === null || parentWindow === void 0 ? void 0 : parentWindow.show();
    const { response } = yield electron.dialog.showMessageBox(parentWindow !== null && parentWindow !== void 0 ? parentWindow : (yield getRootWindow()), {
        type: 'question',
        buttons: [t$6('dialog.addServer.add'), t$6('dialog.addServer.cancel')],
        defaultId: 0,
        title: t$6('dialog.addServer.title'),
        message: t$6('dialog.addServer.message', { host: serverUrl }),
    });
    return response === 0;
});
const warnAboutInvalidServerUrl = (_serverUrl, _reason, _parentWindow) => {
    // TODO
    throw Error('not implemented');
};
var AskForCertificateTrustResponse;
(function (AskForCertificateTrustResponse) {
    AskForCertificateTrustResponse[AskForCertificateTrustResponse["YES"] = 0] = "YES";
    AskForCertificateTrustResponse[AskForCertificateTrustResponse["NO"] = 1] = "NO";
})(AskForCertificateTrustResponse || (AskForCertificateTrustResponse = {}));
const warnAboutUpdateSkipped = (parentWindow) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    yield electron.dialog.showMessageBox(parentWindow !== null && parentWindow !== void 0 ? parentWindow : (yield getRootWindow()), {
        type: 'warning',
        title: t$6('dialog.updateSkip.title'),
        message: t$6('dialog.updateSkip.message'),
        buttons: [t$6('dialog.updateSkip.ok')],
        defaultId: 0,
    });
});
const askForOpeningExternalProtocol = (url, parentWindow) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const { response, checkboxChecked } = yield electron.dialog.showMessageBox(parentWindow !== null && parentWindow !== void 0 ? parentWindow : (yield getRootWindow()), {
        type: 'warning',
        buttons: [
            t$6('dialog.openingExternalProtocol.yes'),
            t$6('dialog.openingExternalProtocol.no'),
        ],
        defaultId: 1,
        title: t$6('dialog.openingExternalProtocol.title'),
        message: t$6('dialog.openingExternalProtocol.message', {
            protocol: url.protocol,
        }),
        detail: t$6('dialog.openingExternalProtocol.detail', {
            url: url.toString(),
        }),
        checkboxLabel: t$6('dialog.openingExternalProtocol.dontAskAgain'),
        checkboxChecked: false,
    });
    return {
        allowed: response === 0,
        dontAskAgain: checkboxChecked,
    };
});
const askRemoveAllDownloads = (path, parentWindow) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    parentWindow === null || parentWindow === void 0 ? void 0 : parentWindow.show();
    const { response } = yield electron.dialog.showMessageBox(parentWindow !== null && parentWindow !== void 0 ? parentWindow : (yield getRootWindow()), {
        type: 'question',
        buttons: ['Да, удалить', 'Отмена'],
        defaultId: 1,
        title: 'Удалить все загрузки',
        cancelId: 1,
        message: 'Вы уверены, что хотите очистить историю загрузок и отправить все содержимое папки "' + path + '" в корзину?'
    });
    return response === 0;
});
const showCertInstalled = (result, parentWindow) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    parentWindow === null || parentWindow === void 0 ? void 0 : parentWindow.show();
    const { response } = yield electron.dialog.showMessageBox(parentWindow !== null && parentWindow !== void 0 ? parentWindow : (yield getRootWindow()), {
        type: 'info',
        buttons: ['Ок'],
        defaultId: 0,
        title: 'Установка корневого сертификата',
        message: result
    });
    return response === 0;
});

const DownloadStatus = {
    ALL: 'All',
    PAUSED: 'Paused',
    CANCELLED: 'Cancelled',
};

const wrtc = require('wrtc');
const MSG_DOWNLOAD_COMPLETE = 'загрузка завершена';
const MSG_DOWNLOAD_CANCEL = 'загрузка отменена';
const MSG_DOWNLOAD_BEGIN = 'идет загрузка..';
const downloadPeer = (param, _webContent) => {
    var SimplePeer = require('simple-peer');
    var peer = new SimplePeer({
        initiator: true,
        // reconnectTimer: 100,
        iceTransportPolicy: 'relay',
        trickle: false,
        config: {
            iceServers: [
                {
                    urls: ['stun:rocketchat:3478', 'turn:rocketchat:3478'],
                    username: "rocketchat",
                    credential: "rocketchat"
                }
            ]
        },
        wrtc: wrtc
    });
    peer.srcid = param.srcid;
    var _sumsize = param.sumsize || 0;
    var _sumrec = new Array();
    peer.setMaxListeners(100);
    peer.destroy = function () {
        try {
            peer._destroy(null, () => { });
        }
        catch (e) {
            console.log('error while destroy fileChannel:', e);
        }
    };
    peer.on('signal', (data) => {
        try {
            if (data.type)
                peer.state = data.type;
            if (data.type && data.type === 'offer') {
                data.srcid = param.srcid;
                var execjs = `
                    Meteor.call('sendMessage', {
                    _id: '` + param.randomid + `',
                    msg: '` + MSG_DOWNLOAD_BEGIN + `',
                    rid: '` + param.rid + `',
                    tmid: '` + param.srcid + `',
                    p2p: true,
                    tshow: true,
                    signal: JSON.parse('` + JSON.stringify(data).replace(/\\/g, '\\\\') + `')
                    }); `;
                _webContent.executeJavaScript(execjs);
            }
            _webContent.executeJavaScript("Meteor.p2p['" + param.srcid + "']={state: '" + data.type + "'}");
        }
        catch (e) {
            console.log(e);
        }
    });
    var SimplePeerFiles = require('simple-peer-files-electron');
    var spf = new SimplePeerFiles.default();
    var transfers = new Array();
    const writeStreams = new Array();
    const downloadItems = new Array();
    peer.downloadItems = downloadItems;
    var checkInterval;
    var checkIntervalCounter = 0;
    const checkComplete = () => {
        if (checkInterval)
            return;
        checkInterval = setInterval(function () {
            var ok = Object.keys(transfers);
            if (ok && ok.length && checkIntervalCounter < 5) {
                checkIntervalCounter++;
                return;
            }
            clearInterval(checkInterval);
            ok = Object.keys(peer.downloadItems);
            ok.forEach(fid => {
                if (peer.downloadItems[fid] && peer.downloadItems[fid].getMimeType() === 'folder') {
                    peer.downloadItems[fid].emit('done');
                    //delete downloadItems[fid];
                }
            });
            peer.emit('DOWNLOAD_PROGRESS', 100, MSG_DOWNLOAD_COMPLETE);
            peer.emit('close');
        }, 1000);
    };
    peer.on('error', (err) => {
        console.log('------peer on error--------');
        if (checkInterval)
            clearInterval(checkInterval);
        console.log(err);
        try {
            var ok = Object.keys(writeStreams);
            if (ok && ok.length) {
                ok.forEach((ws) => { if (writeStreams[ws])
                    writeStreams[ws].destroy(); });
            }
            peer.emit('close');
            ok = Object.keys(peer.downloadItems);
            if (ok && ok.length) {
                ok.forEach((d) => peer.downloadItems[d]['p2p_cancel']());
            }
        }
        catch (_a) { }
    });
    peer.on('connect', () => {
        peer.state = 'connected';
    });
    peer.on('close', (cb) => {
        try {
            if (checkInterval)
                clearInterval(checkInterval);
            if (peer.state === 'closed')
                return;
            peer.state = 'closed';
            var ok = Object.keys(transfers);
            if (ok && ok.length) {
                ok.forEach((t) => transfers[t] = undefined);
            }
            ok = Object.keys(writeStreams);
            if (ok && ok.length) {
                ok.forEach((ws) => { writeStreams[ws].destroy(); });
            }
            var execjs = `
                Meteor.call('updateMessage', {
                _id: '` + param.randomid + `',
                msg: '` + MSG_DOWNLOAD_COMPLETE + `',
                rid: '` + param.rid + `',
                tmid: '` + param.srcid + `',
                tshow: true,
                state: 'closed',
                p2p: true
                }); `;
            _webContent.executeJavaScript(execjs);
            _webContent.executeJavaScript("Meteor.p2p['" + param.srcid + "'].state='closed'");
            setTimeout(function () { peer.destroy(); }, 1000);
            if (cb)
                cb();
        }
        catch (e) {
            console.log('error on peer close:', e);
        }
    });
    peer.on('pause', () => {
        try {
            if (!peer.paused) {
                var ok = Object.keys(transfers);
                if (ok && ok.length) {
                    ok.forEach((t) => { if (transfers[t])
                        transfers[t].pause(); });
                }
                peer.paused = true;
                _webContent.executeJavaScript("Meteor.p2p['" + param.srcid + "'].paused=true");
                ok = Object.keys(peer.downloadItems);
                if (ok && ok.length) {
                    ok.forEach((d) => peer.downloadItems[d]['p2p_pause'](transfers[d].bytesReceived));
                }
            }
        }
        catch (_a) { }
    });
    peer.on('resume', () => {
        try {
            if (peer.paused) {
                var ok = Object.keys(transfers);
                if (ok && ok.length) {
                    ok.forEach((t) => { if (transfers[t])
                        transfers[t].resume(); });
                }
                peer.paused = false;
                _webContent.executeJavaScript("Meteor.p2p['" + param.srcid + "'].paused=false");
            }
        }
        catch (_a) { }
    });
    peer.on('cancel', () => {
        try {
            var ok = Object.keys(transfers);
            if (ok && ok.length) {
                ok.forEach((t) => { if (transfers[t])
                    transfers[t].cancel(); });
            }
            setTimeout(() => {
                peer.emit('close', () => _webContent.executeJavaScript("Meteor.p2p['" + param.srcid + "'].currfilename='" + MSG_DOWNLOAD_CANCEL + "'; Meteor.p2p['" + param.srcid + "'].paused=false"));
            }, 250);
            ok = Object.keys(peer.downloadItems);
            if (ok && ok.length) {
                ok.forEach((d) => peer.downloadItems[d]['p2p_cancel']());
            }
        }
        catch (e) {
            console.log(e);
        }
    });
    peer.on('data', (data) => {
        try {
            if (data.toString().substr(0, 5) === "file-") {
                let parentItemFileID = null;
                const fileID = data.toString().substr(5);
                const fileinfo = fileID.split('::');
                const relpath = fileinfo[0];
                const dirname = relpath.endsWith('/') ? relpath.slice(0, -1) : path__default['default'].dirname(relpath);
                const downloads = param.dpath;
                if (!fs__default['default'].existsSync(downloads)) {
                    fs__default['default'].mkdirSync(downloads, { recursive: true });
                }
                if (dirname !== '.') {
                    if (!fs__default['default'].existsSync(path__default['default'].join(downloads, dirname))) {
                        fs__default['default'].mkdirSync(path__default['default'].join(downloads, dirname), { recursive: true });
                    }
                    const root = relpath.substr(0, relpath.indexOf('/'));
                    var ok = Object.keys(peer.downloadItems);
                    ok.forEach((k) => {
                        if (peer.downloadItems[k].getFilename() === root) {
                            parentItemFileID = k;
                        }
                    });
                    if (!parentItemFileID) {
                        var dirsize = peer.sumsize;
                        param.filelist.forEach((f) => {
                            if (f.name === root && f.type === 'folder' && f.size) {
                                dirsize = f.size;
                                return;
                            }
                        });
                        parentItemFileID = fileID;
                        _sumrec[fileID] = 0;
                        if (dirsize > 0) {
                            _webContent.session.createInterruptedDownload({
                                path: path__default['default'].join(downloads, root),
                                urlChain: ["p2p://" + param.username + "/" + param.srcid + "%%%%" + fileID.replaceAll('/', '%%%') + "/" + root],
                                mimeType: "folder",
                                offset: 0,
                                length: dirsize || 1
                            });
                        }
                    }
                }
                else {
                    if (fileinfo[2] != 0) {
                        _webContent.session.createInterruptedDownload({
                            path: path__default['default'].join(downloads, relpath),
                            urlChain: ["p2p://" + param.username + "/" + param.srcid + "%%%%" + fileID.replaceAll('/', '%%%') + '/' + fileinfo[0]],
                            mimeType: fileinfo[1],
                            offset: 0,
                            length: parseFloat(fileinfo[2]) || 1
                        });
                    }
                }
                let basename = path__default['default'].basename(relpath);
                while (fs__default['default'].existsSync(path__default['default'].join(downloads, dirname, basename))) {
                    basename = '_' + basename;
                }
                if (fileinfo[2] == 0 && fileinfo[1] != 'folder') { //пустые файлы
                    delete transfers[fileID];
                    writeStreams[fileID] = fs__default['default'].createWriteStream(path__default['default'].join(downloads, dirname, basename));
                    writeStreams[fileID].end();
                }
                else {
                    spf.receive(peer, fileID, wrtc).then((t) => {
                        transfers[fileID] = t;
                        transfers[fileID].parentItemFileID = parentItemFileID;
                        _sumrec[fileID] = 0;
                        writeStreams[fileID] = fs__default['default'].createWriteStream(path__default['default'].join(downloads, dirname, basename));
                        transfers[fileID].fileStream = writeStreams[fileID];
                        writeStreams[fileID].on('finish', function () {
                            writeStreams[fileID].destroy();
                            delete writeStreams[fileID];
                        });
                        transfers[fileID].on("progress", (progress, bytes) => {
                            if (!progress)
                                false;
                            /*if(progress==100){
                                _sumrec[fileID]=-parseFloat(bytes);
                            }*/
                            peer.emit('DOWNLOAD_PROGRESS', bytes, fileID);
                        });
                        transfers[fileID].on("done", () => {
                            if (peer.downloadItems[fileID] && peer.downloadItems[fileID].getMimeType() !== 'folder') {
                                peer.downloadItems[fileID].emit('done');
                            }
                            setTimeout(function () {
                                delete transfers[fileID];
                                if (writeStreams[fileID])
                                    writeStreams[fileID].end();
                            }, 1000);
                        });
                        transfers[fileID].on('paused', () => {
                            if (!peer.paused)
                                peer.emit('pause');
                        });
                        transfers[fileID].on('resumed', () => {
                            if (peer.paused)
                                peer.emit('resume');
                        });
                        transfers[fileID].on('cancelled', () => {
                            if (peer.state !== 'closed')
                                peer.emit('cancel');
                        });
                    });
                }
                peer.send("start-" + fileID);
            }
            else if (data.toString() === "done!") {
                checkComplete();
            }
        }
        catch (e) {
            console.log(e);
        }
    });
    var tickMark = Date.now();
    peer.on('DOWNLOAD_PROGRESS', (p, fileID) => {
        try {
            var progress = 0;
            if (fileID === MSG_DOWNLOAD_COMPLETE && p === 100) {
                progress = 100;
            }
            else {
                var item = null;
                var folderID = null;
                if (transfers[fileID] && transfers[fileID].parentItemFileID) {
                    folderID = transfers[fileID].parentItemFileID;
                    item = peer.downloadItems[folderID];
                    _sumrec[folderID] -= Math.abs(_sumrec[fileID]); //дочерние файлы с -, основные с +
                    _sumrec[fileID] = -parseFloat(p);
                    _sumrec[folderID] += Math.abs(_sumrec[fileID]);
                }
                else {
                    _sumrec[fileID] = parseFloat(p);
                    item = peer.downloadItems[fileID];
                }
                if (Date.now() - tickMark > 250) {
                    if (item) {
                        item.emit('updated', folderID ? _sumrec[folderID] : _sumrec[fileID]);
                        var ok = Object.keys(_sumrec);
                        ok.forEach((k) => {
                            if (folderID) {
                                if (_sumrec[k] > 0)
                                    progress += _sumrec[k];
                            }
                            else {
                                progress += Math.abs(_sumrec[k]);
                            }
                        });
                        progress = (progress * 100 / _sumsize).toFixed(1);
                    }
                    else {
                        console.log('--no item:', fileID);
                    }
                    tickMark = Date.now();
                    _webContent.executeJavaScript("Meteor.p2p['" + param.srcid + "']=JSON.parse('" + JSON.stringify({ progress: progress, currfilename: folderID || fileID, state: 'connected', paused: peer.paused }) + "')");
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    });
    return peer;
};

const items = new Map();
const handleWillDownloadEvent = (_event, item, serverWebContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const itemId = Date.now();
    items.set(itemId, item);
    item.setSaveDialogOptions({
        defaultPath: path__default['default'].join(electron.app.getPath('downloads'), item.getFilename())
    });
    var server;
    var roomName;
    if (item.getURL().startsWith('p2p://')) {
        try {
            const execjs = `if(globalThis['have_new_downloads']){
        globalThis['have_new_downloads'](true);
      }`;
            electron.BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(execjs);
        }
        catch (_a) { }
        item['myId'] = itemId;
        const str = item.getURL().substr(6).split('/');
        const fileinfo = str[1].split('%%%%'); //ид пира + ид папки
        const diid = decodeURI(fileinfo[1] ? fileinfo[1].replaceAll('%%%', '/') : str[2]); //отображаемое имя загрузки
        globalThis['p2p'][fileinfo[0]].downloadItems[diid] = item;
        if (item.getMimeType() === 'folder') {
            item['isFolder'] = true; //??
        }
        item['p2p_cancel'] = () => {
            const itemId = item['myId'];
            setTimeout(function () {
                downloads_remove(itemId);
            }, 2000);
            items.delete(itemId);
        };
        item['p2p_pause'] = (b) => {
            const itemId = item['myId'];
            setTimeout(function () {
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
                        serverUrl: server === null || server === void 0 ? void 0 : server.url,
                        serverTitle: roomName || (server === null || server === void 0 ? void 0 : server.title),
                    },
                });
            }, 100);
        };
        globalThis['p2p_items'] = globalThis['p2p_items'] || {};
        globalThis['p2p_items'][item['myId']] = fileinfo[0];
        item.on('updated', (p) => {
            const itemId = item['myId'];
            item['p2p_receivedBytes'] = p;
            dispatch({
                type: DOWNLOAD_UPDATED,
                payload: {
                    itemId,
                    state: item.isPaused() ? 'paused' : 'progressing',
                    status: item.isPaused() ? DownloadStatus.PAUSED : DownloadStatus.ALL,
                    fileName: item.getFilename(),
                    receivedBytes: p,
                    totalBytes: item.getTotalBytes(),
                    startTime: item.getStartTime() * 1000,
                    endTime: Date.now(),
                    url: item.getURL(),
                    mimeType: item.getMimeType(),
                    savePath: item.getSavePath(),
                    serverUrl: server === null || server === void 0 ? void 0 : server.url,
                    serverTitle: roomName || (server === null || server === void 0 ? void 0 : server.title),
                },
            });
            items.delete(itemId);
        });
        item.on('done', () => {
            const itemId = item['myId'];
            item['p2p_receivedBytes'] = item.getTotalBytes();
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
                    serverUrl: server === null || server === void 0 ? void 0 : server.url,
                    serverTitle: roomName || (server === null || server === void 0 ? void 0 : server.title),
                },
            });
            items.delete(itemId);
            try {
                const execjs = `if(globalThis['have_new_downloads']){
          globalThis['have_new_downloads'](true);
        }`;
                electron.BrowserWindow.getAllWindows()[0].webContents.executeJavaScript(execjs);
            }
            catch (e) { }
            globalThis['p2p_items'][itemId] = undefined;
        });
        roomName = str[0];
    }
    else {
        server = select(({ servers }) => servers.find((server) => server.webContentsId === serverWebContents.id));
        /*if (!server) {
          // TODO: check if the download always comes from the main frame webContents
          throw new Error('could not match the server');
        }*/
        try {
            const execjs = yield serverWebContents.executeJavaScript('[Meteor.user().username, Session.keys]');
            const keys = execjs[1] || [];
            const username = execjs[0] || '';
            //const username=await serverWebContents.executeJavaScript('Meteor.user().username');
            if (keys.openedRoom && keys.openedRoom != 'undefined') {
                const room = JSON.parse(keys['roomData' + keys.openedRoom.replace(/['"]/igm, '')]);
                if (room) {
                    if (room.t === 'd') {
                        const users = room['usernames'].filter((f) => { return f !== username; });
                        roomName = users.join(' x ');
                    }
                    else {
                        roomName = room['name'];
                    }
                }
            }
            else {
                let lasturl = server ? server.lastPath : undefined;
                if (!lasturl && serverWebContents['history'] && serverWebContents['history'].length) {
                    lasturl = serverWebContents['history'].slice(-1);
                }
                if (lasturl) {
                    if (typeof lasturl !== 'string') {
                        lasturl = lasturl[0];
                    }
                    if (lasturl.endsWith("/")) {
                        lasturl = lasturl.slice(0, -1);
                    }
                    roomName = lasturl.slice(lasturl.lastIndexOf("/") + 1).replace(/[#\/&\?\\%]/igm, '');
                }
            }
        }
        catch (e) {
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
                    status: item.getState() === 'cancelled'
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
            if (globalThis['have_new_downloads']) {
                globalThis['have_new_downloads'](true);
            }
        });
        dispatch({
            type: DOWNLOAD_CREATED,
            payload: {
                itemId,
                state: /*item.isPaused() ? 'paused' :*/ 'progressing',
                status: /*item.isPaused() ? DownloadStatus.PAUSED :*/ DownloadStatus.ALL,
                fileName: item.getFilename(),
                receivedBytes: item.getReceivedBytes(),
                totalBytes: item.getTotalBytes(),
                startTime: item.getStartTime() * 1000,
                endTime: undefined,
                url: item.getURL(),
                serverUrl: server === null || server === void 0 ? void 0 : server.url,
                serverTitle: roomName || (server === null || server === void 0 ? void 0 : server.title),
                mimeType: item.getMimeType(),
                savePath: item.getSavePath(),
            },
        });
    }
});
const setupDownloads = () => {
    let downloadsPath = select(({ downloadsPath }) => downloadsPath);
    if (downloadsPath) {
        electron.app.setPath('downloads', downloadsPath);
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
    handle('downloads/show-downloads-path', (_webContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        electron.shell.openPath(electron.app.getPath('downloads'));
    }));
    handle('downloads/remove-all-downloads', (_webContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const dpath = electron.app.getPath('downloads');
            const approve = yield askRemoveAllDownloads(dpath);
            if (!approve)
                return;
            dispatch({
                type: DOWNLOADS_CLEARED
            });
            const forbidden = [
                process.env['ALLUSERSPROFILE'],
                process.env['USERPROFILE'],
                process.env['APPDATA'],
                process.env['SystemDrive'],
                process.env['SystemRoot'],
                process.env['ProgramFiles'],
                process.env['ProgramFiles(x86)'],
                process.env['ProgramData']
            ].filter((el) => el !== '').map((el) => {
                return el.replace(/\\$/i, '').toLowerCase();
            });
            if (forbidden.indexOf(dpath.replace(/\\$/i, '').toLowerCase()) > -1)
                return;
            const fs = require('fs');
            const list = fs.readdirSync(dpath);
            if (!list)
                return;
            list.forEach((element) => {
                electron.shell.moveItemToTrash(path__default['default'].join(dpath, element), true);
            });
        }
        catch (e) {
            console.log(e);
        }
    }));
    handle('downloads/set-downloads-path', (_webContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const paths = electron.dialog.showOpenDialogSync({
            properties: ['openDirectory']
        });
        if (!paths)
            return;
        electron.app.setPath('downloads', paths[0]);
        dispatch({
            type: DOWNLOADS_PATH_CHANGED,
            payload: paths[0],
        });
    }));
    handle('downloads/show-in-folder', (_webContents, itemId) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const download = select(({ downloads }) => downloads[itemId]);
        if (!download) {
            return;
        }
        electron.shell.showItemInFolder(download.savePath);
    }));
    handle('downloads/run-downloaded', (_webContents, itemId) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const download = select(({ downloads }) => downloads[itemId]);
        if (!download) {
            return;
        }
        electron.shell.openPath(download.savePath);
    }));
    handle('p2p-upload', (_webContent /*, param*/) => tslib.__awaiter(void 0, void 0, void 0, function* () {
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
    }));
    handle('p2p-download', (_webContent, signal) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        try {
            globalThis['p2p'] = globalThis['p2p'] || {};
            const gp = globalThis['p2p'];
            if (gp[signal.srcid] === undefined) {
                if (signal.autodownload !== true) {
                    const paths = electron.dialog.showOpenDialogSync({
                        defaultPath: electron.app.getPath('downloads'),
                        properties: ['openDirectory']
                    });
                    if (!paths) {
                        yield _webContent.executeJavaScript("Meteor.p2p['" + signal.srcid + "']={state: 'cancelled'}");
                        return;
                    }
                    signal.dpath = paths[0];
                }
                else {
                    signal.dpath = electron.app.getPath('downloads');
                }
                gp[signal.srcid] = downloadPeer(signal, _webContent);
                return;
            }
            if (gp[signal.srcid] && gp[signal.srcid].state === 'closed') {
                return;
            }
            if (gp[signal.srcid] && gp[signal.srcid].state === 'offer') {
                yield gp[signal.srcid].signal(signal);
                return;
            }
            const peer = gp[signal.srcid][signal.userid] || gp[signal.srcid];
            if (signal.pause && peer) {
                yield peer.emit('pause');
                return;
            }
            if (signal.resume && peer) {
                yield peer.emit('resume');
                return;
            }
            if (signal.cancel && peer) {
                yield peer.emit('cancel');
                return;
            }
        }
        catch (e) {
            console.log(e);
        }
    }));
    handle('downloads/copy-link', (_webContent, itemId) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const download = select(({ downloads }) => downloads[itemId]);
        if (!download) {
            return;
        }
        electron.clipboard.write({ text: download.url });
    }));
    handle('downloads/pause', (_webContent, itemId) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const peerid = globalThis['p2p_items'][itemId];
        if (peerid) {
            globalThis['p2p'][peerid].emit('pause');
            return;
        }
        if (!items.has(itemId)) {
            return;
        }
        const item = items.get(itemId);
        if (item === null || item === void 0 ? void 0 : item.isPaused()) {
            return;
        }
        item === null || item === void 0 ? void 0 : item.pause();
    }));
    handle('downloads/resume', (_webContent, itemId) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const peerid = globalThis['p2p_items'][itemId];
        if (peerid) {
            globalThis['p2p'][peerid].emit('resume');
            return;
        }
        if (!items.has(itemId)) {
            return;
        }
        const item = items.get(itemId);
        if (!(item === null || item === void 0 ? void 0 : item.canResume())) {
            return;
        }
        item === null || item === void 0 ? void 0 : item.resume();
    }));
    handle('downloads/cancel', (_webContent, itemId) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        try {
            const peerid = globalThis['p2p_items'][itemId];
            if (peerid) {
                globalThis['p2p'][peerid].emit('cancel');
                return;
            }
            if (!items.has(itemId)) {
                //console.log('no itemId:', itemId);
                return;
            }
            const item = items.get(itemId);
            item === null || item === void 0 ? void 0 : item.cancel();
        }
        catch (_a) { }
        dispatch({
            type: DOWNLOAD_REMOVED,
            payload: itemId,
        });
    }));
    handle('downloads/retry', (_webContent, itemId) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const { url, webContentsId } = select(({ downloads, servers }) => {
            var _a;
            const { url, serverUrl } = downloads[itemId];
            const { webContentsId } = (_a = servers.find((server) => server.url === serverUrl)) !== null && _a !== void 0 ? _a : {};
            return { url, webContentsId };
        });
        /*dispatch({
          type: DOWNLOAD_REMOVED,
          payload: itemId,
        });*/
        if (webContentsId) {
            electron.webContents.fromId(webContentsId).downloadURL(url);
        }
    }));
    handle('downloads/remove', (_webContent, itemId) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        downloads_remove(itemId);
    }));
};
const downloads_remove = (itemId) => {
    try {
        if (items.has(itemId)) {
            const item = items.get(itemId);
            item === null || item === void 0 ? void 0 : item.cancel();
        }
    }
    catch (_a) { }
    const download = select(({ downloads }) => downloads[itemId]);
    if (download) {
        doDelete(download.savePath);
    }
    dispatch({
        type: DOWNLOAD_REMOVED,
        payload: itemId,
    });
};
const doDelete = (p) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const fs = require('fs');
    if (fs.existsSync(p)) {
        electron.shell.moveItemToTrash(p, true);
    }
});

const t$5 = i18next__default['default'].t.bind(i18next__default['default']);
const loadUserTrustedCertificates = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const filePath = path__default['default'].join(electron.app.getPath('userData'), 'certificate.json');
        const content = yield fs__default['default'].promises.readFile(filePath, 'utf8');
        const json = JSON.parse(content);
        yield fs__default['default'].promises.unlink(filePath);
        return json && typeof json === 'object' ? json : {};
    }
    catch (error) {
        return {};
    }
});
const serializeCertificate = (certificate) => `${certificate.issuerName}\n${certificate.data.toString()}`;
const queuedTrustRequests = new Map();
const setupNavigation = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    /*app.userAgentFallback = app.userAgentFallback.replace(
      `${app.name}/${app.getVersion()} `,
      ''
    );*/ //откл.14.12.2021
    electron.app.addListener('certificate-error', (event, _webContents, requestedUrl, error, certificate, callback) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        event.preventDefault();
        const serialized = serializeCertificate(certificate);
        const { host } = new URL(requestedUrl);
        let trustedCertificates = select(({ trustedCertificates }) => trustedCertificates);
        const isTrusted = !!trustedCertificates[host] && trustedCertificates[host] === serialized;
        if (isTrusted) {
            callback(true);
            return;
        }
        if (queuedTrustRequests.has(certificate.fingerprint)) {
            (_a = queuedTrustRequests.get(certificate.fingerprint)) === null || _a === void 0 ? void 0 : _a.push(callback);
            return;
        }
        queuedTrustRequests.set(certificate.fingerprint, [callback]);
        let detail = `URL: ${requestedUrl}\nError: ${error}`;
        if (trustedCertificates[host]) {
            detail = t$5('error.differentCertificate', { detail });
        }
        const response = AskForCertificateTrustResponse.YES; /*await askForCertificateTrust(
          certificate.issuerName,
          detail
        );*/
        const isTrustedByUser = response === AskForCertificateTrustResponse.YES;
        (_b = queuedTrustRequests
            .get(certificate.fingerprint)) === null || _b === void 0 ? void 0 : _b.forEach((cb) => cb(isTrustedByUser));
        queuedTrustRequests.delete(certificate.fingerprint);
        trustedCertificates = select(({ trustedCertificates }) => trustedCertificates);
        if (isTrustedByUser) {
            dispatch({
                type: CERTIFICATES_UPDATED,
                payload: Object.assign(Object.assign({}, trustedCertificates), { [host]: serialized }),
            });
        }
    }));
    electron.app.addListener('select-client-certificate', (event, _webContents, _url, certificateList, callback) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        if (certificateList.length === 1) {
            callback(certificateList[0]);
            return;
        }
        const fingerprint = yield request({
            type: CERTIFICATES_CLIENT_CERTIFICATE_REQUESTED,
            payload: JSON.parse(JSON.stringify(certificateList)),
        }, SELECT_CLIENT_CERTIFICATE_DIALOG_CERTIFICATE_SELECTED, SELECT_CLIENT_CERTIFICATE_DIALOG_DISMISSED);
        const certificate = certificateList.find((certificate) => certificate.fingerprint === fingerprint);
        if (!certificate) {
            callback(undefined);
            return;
        }
        callback(certificate);
    }));
    electron.app.addListener('login', (event, _webContents, authenticationResponseDetails, _authInfo, callback) => {
        event.preventDefault();
        const servers = select(({ servers }) => servers);
        for (const server of servers) {
            const { host: serverHost, username, password } = new URL(server.url);
            const requestHost = new URL(authenticationResponseDetails.url).host;
            if (serverHost !== requestHost || !username) {
                callback();
                return;
            }
            callback(username, password);
        }
    });
    const trustedCertificates = select(({ trustedCertificates }) => trustedCertificates);
    const userTrustedCertificates = yield loadUserTrustedCertificates();
    dispatch({
        type: CERTIFICATES_LOADED,
        payload: Object.assign(Object.assign({}, trustedCertificates), userTrustedCertificates),
    });
});
const isProtocolAllowed = (rawUrl) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const url = new URL(rawUrl);
    const instrinsicProtocols = ['http:', 'https:', 'mailto:'];
    const persistedProtocols = Object.entries(select(({ externalProtocols }) => externalProtocols))
        .filter(([, allowed]) => allowed)
        .map(([protocol]) => protocol);
    const allowedProtocols = [...instrinsicProtocols, ...persistedProtocols];
    if (allowedProtocols.includes(url.protocol)) {
        return true;
    }
    const { allowed, dontAskAgain } = yield askForOpeningExternalProtocol(url);
    if (dontAskAgain) {
        dispatch({
            type: EXTERNAL_PROTOCOL_PERMISSION_UPDATED,
            payload: {
                protocol: url.protocol,
                allowed,
            },
        });
    }
    return allowed;
});

const SPELL_CHECKING_TOGGLED = 'spell-checking/toggled';
const SPELL_CHECKING_LANGUAGE_TOGGLED = 'spell-checking/language-toggled';

const t$4 = i18next__default['default'].t.bind(i18next__default['default']);
const createSpellCheckingMenuTemplate = (serverViewWebContents, { isEditable, dictionarySuggestions }) => {
    if (!isEditable) {
        return [];
    }
    const { availableSpellCheckerLanguages } = serverViewWebContents.session;
    const spellCheckerLanguages = serverViewWebContents.session.getSpellCheckerLanguages();
    return [
        ...(spellCheckerLanguages.length > 0 && dictionarySuggestions
            ? [
                ...(dictionarySuggestions.length === 0
                    ? [
                        {
                            label: t$4('contextMenu.noSpellingSuggestions'),
                            enabled: false,
                        },
                    ]
                    : dictionarySuggestions
                        .slice(0, 6)
                        .map((dictionarySuggestion) => ({
                        label: dictionarySuggestion,
                        click: () => {
                            serverViewWebContents.replaceMisspelling(dictionarySuggestion);
                        },
                    }))),
                ...(dictionarySuggestions.length > 6
                    ? [
                        {
                            label: t$4('contextMenu.moreSpellingSuggestions'),
                            submenu: dictionarySuggestions
                                .slice(6)
                                .map((dictionarySuggestion) => ({
                                label: dictionarySuggestion,
                                click: () => {
                                    serverViewWebContents.replaceMisspelling(dictionarySuggestion);
                                },
                            })),
                        },
                    ]
                    : []),
                { type: 'separator' },
            ]
            : []),
        ...(process.platform === 'darwin'
            ? [
                {
                    label: t$4('contextMenu.spelling'),
                    type: 'checkbox',
                    checked: spellCheckerLanguages.length > 0,
                    click: ({ checked }) => {
                        dispatch({
                            type: SPELL_CHECKING_TOGGLED,
                            payload: checked,
                        });
                    },
                },
            ]
            : [
                {
                    label: t$4('contextMenu.spellingLanguages'),
                    enabled: availableSpellCheckerLanguages.length > 0,
                    submenu: [
                        ...availableSpellCheckerLanguages.map((availableSpellCheckerLanguage) => ({
                            label: availableSpellCheckerLanguage,
                            type: 'checkbox',
                            checked: spellCheckerLanguages.includes(availableSpellCheckerLanguage),
                            click: ({ checked }) => {
                                dispatch({
                                    type: SPELL_CHECKING_LANGUAGE_TOGGLED,
                                    payload: {
                                        name: availableSpellCheckerLanguage,
                                        enabled: checked,
                                    },
                                });
                            },
                        })),
                    ],
                },
            ]),
        { type: 'separator' },
    ];
};
const createImageMenuTemplate = (serverViewWebContents, { mediaType, srcURL }) => mediaType === 'image'
    ? [
        {
            label: t$4('contextMenu.saveImageAs'),
            click: () => serverViewWebContents.downloadURL(srcURL),
        },
        { type: 'separator' },
    ]
    : [];
const createLinkMenuTemplate = (_serverViewWebContents, { linkURL, linkText }) => linkURL
    ? [
        {
            label: t$4('contextMenu.openLink'),
            click: () => electron.shell.openExternal(linkURL),
        },
        {
            label: t$4('contextMenu.copyLinkText'),
            click: () => electron.clipboard.write({ text: linkText, bookmark: linkText }),
            enabled: !!linkText,
        },
        {
            label: t$4('contextMenu.copyLinkAddress'),
            click: () => electron.clipboard.write({ text: linkURL, bookmark: linkText }),
        },
        { type: 'separator' },
    ]
    : [];
const createDefaultMenuTemplate = (_serverViewWebContents, { editFlags: { canUndo = false, canRedo = false, canCut = false, canCopy = false, canPaste = false, canSelectAll = false, }, }) => [
    {
        label: t$4('contextMenu.undo'),
        role: 'undo',
        accelerator: 'CommandOrControl+Z',
        enabled: canUndo,
    },
    {
        label: t$4('contextMenu.redo'),
        role: 'redo',
        accelerator: process.platform === 'win32' ? 'Control+Y' : 'CommandOrControl+Shift+Z',
        enabled: canRedo,
    },
    { type: 'separator' },
    {
        label: t$4('contextMenu.cut'),
        role: 'cut',
        accelerator: 'CommandOrControl+X',
        enabled: canCut,
    },
    {
        label: t$4('contextMenu.copy'),
        role: 'copy',
        accelerator: 'CommandOrControl+C',
        enabled: canCopy,
    },
    {
        label: t$4('contextMenu.paste'),
        role: 'paste',
        accelerator: 'CommandOrControl+V',
        enabled: canPaste,
    },
    {
        label: t$4('contextMenu.selectAll'),
        role: 'selectAll',
        accelerator: 'CommandOrControl+A',
        enabled: canSelectAll,
    },
];
const createPopupMenuForServerView = (serverViewWebContents, params) => electron.Menu.buildFromTemplate([
    ...createSpellCheckingMenuTemplate(serverViewWebContents, params),
    ...createImageMenuTemplate(serverViewWebContents, params),
    ...createLinkMenuTemplate(serverViewWebContents, params),
    ...createDefaultMenuTemplate(serverViewWebContents, params),
]);

const t$3 = i18next__default['default'].t.bind(i18next__default['default']);
const webContentsByServerUrl = new Map();
const getWebContentsByServerUrl = (url) => webContentsByServerUrl.get(url);
const initializeServerWebContents = (serverUrl, guestWebContents, rootWindow) => {
    webContentsByServerUrl.set(serverUrl, guestWebContents);
    const webviewSession = guestWebContents.session;
    webviewSession.setProxy({ proxyRules: 'direct://' });
    guestWebContents.addListener('destroyed', () => {
        webContentsByServerUrl.delete(serverUrl);
        const canPurge = select(({ servers }) => !servers.some((server) => server.url === serverUrl));
        if (canPurge) {
            webviewSession.clearStorageData();
            return;
        }
        webviewSession.flushStorageData();
    });
    const handleDidStartLoading = () => {
        dispatch({ type: WEBVIEW_DID_START_LOADING, payload: { url: serverUrl } });
        rootWindow.webContents.send(WEBVIEW_DID_START_LOADING, serverUrl);
    };
    const handleDidFailLoad = (_event, errorCode, _errorDescription, _validatedURL, isMainFrame, _frameProcessId, _frameRoutingId) => {
        if (errorCode === -3) {
            console.warn('Ignoring likely spurious did-fail-load with errorCode -3, cf https://github.com/electron/electron/issues/14004');
            return;
        }
        dispatch({
            type: WEBVIEW_DID_FAIL_LOAD,
            payload: { url: serverUrl, isMainFrame },
        });
    };
    const handleDidNavigateInPage = (_event, pageUrl, _isMainFrame, _frameProcessId, _frameRoutingId) => {
        dispatch({
            type: WEBVIEW_DID_NAVIGATE,
            payload: {
                url: serverUrl,
                pageUrl,
            },
        });
    };
    const handleContextMenu = (event, params) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const menu = createPopupMenuForServerView(guestWebContents, params);
        menu.popup({ window: rootWindow });
    });
    const handleBeforeInputEvent = (_event, { type, key }) => {
        if (type !== 'keyUp' && type !== 'keyDown') {
            return;
        }
        const shortcutKey = process.platform === 'darwin' ? 'Meta' : 'Control';
        if (key !== shortcutKey) {
            return;
        }
        rootWindow.webContents.sendInputEvent({
            type,
            keyCode: key,
            modifiers: [],
        });
    };
    guestWebContents.addListener('did-start-loading', handleDidStartLoading);
    guestWebContents.addListener('did-fail-load', handleDidFailLoad);
    guestWebContents.addListener('did-navigate-in-page', handleDidNavigateInPage);
    guestWebContents.addListener('context-menu', handleContextMenu);
    guestWebContents.addListener('before-input-event', handleBeforeInputEvent);
};
const attachGuestWebContentsEvents = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const rootWindow = yield getRootWindow();
    const handleWillAttachWebview = (_event, webPreferences, _params) => {
        delete webPreferences.enableBlinkFeatures;
        webPreferences.preload = path__default['default'].join(electron.app.getAppPath(), 'app/preload.js');
        webPreferences.nodeIntegration = false;
        webPreferences.nodeIntegrationInWorker = true;
        webPreferences.nodeIntegrationInSubFrames = true;
        webPreferences.enableRemoteModule = false;
        webPreferences.webSecurity = true;
        webPreferences.contextIsolation = true;
        webPreferences.worldSafeExecuteJavaScript = true;
    };
    const handleDidAttachWebview = (_event, webContents) => {
        // webContents.send('console-warn', '%c%s', 'color: red; font-size: 32px;', t('selfxss.title'));
        // webContents.send('console-warn', '%c%s', 'font-size: 20px;', t('selfxss.description'));
        // webContents.send('console-warn', '%c%s', 'font-size: 20px;', t('selfxss.moreInfo'));
        {
            setupPreloadReload(webContents);
        }
        webContents.addListener('new-window', (event, url, frameName, disposition, options, _additionalFeatures, referrer, postBody) => {
            event.preventDefault();
            if (disposition === 'foreground-tab' ||
                disposition === 'background-tab') {
                isProtocolAllowed(url).then((allowed) => {
                    if (!allowed) {
                        return;
                    }
                    electron.shell.openExternal(url);
                });
                return;
            }
            const newWindow = new electron.BrowserWindow(Object.assign(Object.assign({}, options), { show: false }));
            newWindow.once('ready-to-show', () => {
                newWindow.show();
            });
            isProtocolAllowed(url).then((allowed) => {
                if (!allowed) {
                    newWindow.destroy();
                    return;
                }
                const isGoogleSignIn = frameName === 'Login' &&
                    disposition === 'new-window' &&
                    new URL(url).hostname.match(/(\.)?google\.com$/);
                newWindow.loadURL(url, Object.assign({ userAgent: isGoogleSignIn
                        ? electron.app.userAgentFallback.replace(`Electron/${process.versions.electron} `, '')
                        : electron.app.userAgentFallback, httpReferrer: referrer }, (postBody && {
                    extraHeaders: `Content-Type: ${postBody.contentType}; boundary=${postBody.boundary}`,
                    postData: postBody.data,
                })));
            });
            event.newGuest = newWindow;
        });
    };
    const handlePermissionRequest = (_webContents, permission, callback, details) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        switch (permission) {
            case 'media': {
                if (process.platform !== 'darwin') {
                    callback(true);
                    return;
                }
                const { mediaTypes = [] } = details;
                const allowed = (!mediaTypes.includes('audio') ||
                    (yield electron.systemPreferences.askForMediaAccess('microphone'))) &&
                    (!mediaTypes.includes('video') ||
                        (yield electron.systemPreferences.askForMediaAccess('camera')));
                callback(allowed);
                return;
            }
            case 'geolocation':
            case 'notifications':
            case 'midiSysex':
            case 'pointerLock':
            case 'fullscreen':
                callback(true);
                return;
            case 'openExternal': {
                if (!details.externalURL) {
                    callback(false);
                    return;
                }
                const allowed = yield isProtocolAllowed(details.externalURL);
                callback(allowed);
                return;
            }
            default:
                callback(false);
        }
    });
    listen(WEBVIEW_ATTACHED, (action) => {
        const guestWebContents = electron.webContents.fromId(action.payload.webContentsId);
        initializeServerWebContents(action.payload.url, guestWebContents, rootWindow);
        guestWebContents.session.setPermissionRequestHandler(handlePermissionRequest);
        guestWebContents.session.on('will-download', handleWillDownloadEvent);
        guestWebContents.session.allowNTLMCredentialsForDomains('*');
        guestWebContents.session.setDownloadPath(electron.app.getPath("downloads"));
    });
    listen(LOADING_ERROR_VIEW_RELOAD_SERVER_CLICKED, (action) => {
        const guestWebContents = getWebContentsByServerUrl(action.payload.url);
        guestWebContents === null || guestWebContents === void 0 ? void 0 : guestWebContents.loadURL(action.payload.url);
    });
    listen(SIDE_BAR_CONTEXT_MENU_TRIGGERED, (action) => {
        const { payload: serverUrl } = action;
        const menuTemplate = [
            {
                label: t$3('sidebar.item.reload'),
                click: () => {
                    const guestWebContents = getWebContentsByServerUrl(serverUrl);
                    guestWebContents === null || guestWebContents === void 0 ? void 0 : guestWebContents.loadURL(serverUrl);
                },
            },
            {
                label: t$3('sidebar.item.remove'),
                click: () => {
                    dispatch({
                        type: SIDE_BAR_REMOVE_SERVER_CLICKED,
                        payload: serverUrl,
                    });
                },
            },
            { type: 'separator' },
            {
                label: t$3('sidebar.item.openDevTools'),
                click: () => {
                    const guestWebContents = getWebContentsByServerUrl(serverUrl);
                    guestWebContents === null || guestWebContents === void 0 ? void 0 : guestWebContents.openDevTools();
                },
            },
        ];
        const menu = electron.Menu.buildFromTemplate(menuTemplate);
        menu.popup({
            window: rootWindow,
        });
    });
    listen(CERTIFICATES_CLEARED, () => {
        for (const serverViewWebContents of webContentsByServerUrl.values()) {
            serverViewWebContents.reloadIgnoringCache();
        }
    });
    rootWindow.webContents.addListener('will-attach-webview', handleWillAttachWebview);
    rootWindow.webContents.addListener('did-attach-webview', handleDidAttachWebview);
    handle('server-view/get-url', (webContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        var _a;
        return (_a = Array.from(webContentsByServerUrl.entries()).find(([, v]) => v === webContents)) === null || _a === void 0 ? void 0 : _a[0];
    }));
    let injectableCode;
    handle('server-view/ready', (webContents) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        if (!injectableCode) {
            injectableCode = yield fs__default['default'].promises.readFile(path__default['default'].join(electron.app.getAppPath(), 'app/injected.js'), 'utf8');
        }
        webContents.executeJavaScript(injectableCode, true);
        {
            injectableCode = undefined;
        }
    }));
});

const isRocketChatUrl = (parsedUrl) => parsedUrl.protocol === 'rocketchat:';
const isGoRocketChatUrl = (parsedUrl) => parsedUrl.protocol === 'https:' && parsedUrl.hostname === 'go.rocket.chat';
const parseDeepLink = (input) => {
    if (/^--/.test(input)) {
        // input is a CLI flag
        return null;
    }
    let url$1;
    try {
        url$1 = new url.URL(input);
    }
    catch (error) {
        return null;
    }
    if (isRocketChatUrl(url$1)) {
        const action = url$1.hostname;
        const args = url$1.searchParams;
        return { action, args };
    }
    if (isGoRocketChatUrl(url$1)) {
        const action = url$1.pathname;
        const args = url$1.searchParams;
        return { action, args };
    }
    return null;
};
let processDeepLinksInArgs = () => tslib.__awaiter(void 0, void 0, void 0, function* () { return undefined; });
const performOnServer = (url, action) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const [serverUrl, status, error] = yield resolveServerUrl(url);
    if (status !== "ok" /* OK */) {
        yield warnAboutInvalidServerUrl(serverUrl, (_a = error === null || error === void 0 ? void 0 : error.message) !== null && _a !== void 0 ? _a : '');
        return;
    }
    const isServerAdded = select(({ servers }) => servers.some((server) => server.url === serverUrl));
    if (isServerAdded) {
        dispatch({ type: DEEP_LINKS_SERVER_FOCUSED, payload: serverUrl });
        yield action(serverUrl);
        return;
    }
    const permitted = yield askForServerAddition(serverUrl);
    if (!permitted) {
        return;
    }
    dispatch({
        type: DEEP_LINKS_SERVER_ADDED,
        payload: serverUrl,
    });
    yield action(serverUrl);
});
const getWebContents = (serverUrl) => new Promise((resolve) => {
    const poll = () => {
        const webContents = getWebContentsByServerUrl(serverUrl);
        if (webContents) {
            resolve(webContents);
            return;
        }
        setTimeout(poll, 100);
    };
    poll();
});
const performAuthentication = ({ host, token, userId, }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    return performOnServer(host, (serverUrl) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const url$1 = new url.URL('home', serverUrl);
        url$1.searchParams.append('resumeToken', token);
        url$1.searchParams.append('userId', userId);
        const webContents = yield getWebContents(serverUrl);
        webContents.loadURL(url$1.href);
    }));
});
const performOpenRoom = ({ host, path }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    return performOnServer(host, (serverUrl) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        if (!path) {
            return;
        }
        const webContents = yield getWebContents(serverUrl);
        webContents.loadURL(new url.URL(path, serverUrl).href);
    }));
});
const performInvite = ({ host, path }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    return performOnServer(host, (serverUrl) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        if (!/^invite\//.test(path)) {
            return;
        }
        const webContents = yield getWebContents(serverUrl);
        webContents.loadURL(new url.URL(path, serverUrl).href);
    }));
});
const processDeepLink = (deepLink) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    var _b, _c, _d, _e, _f, _g, _h, _j, _k;
    const parsedDeepLink = parseDeepLink(deepLink);
    if (!parsedDeepLink) {
        return;
    }
    const { action, args } = parsedDeepLink;
    switch (action) {
        case 'auth': {
            const host = (_b = args.get('host')) !== null && _b !== void 0 ? _b : undefined;
            const token = (_c = args.get('token')) !== null && _c !== void 0 ? _c : undefined;
            const userId = (_d = args.get('userId')) !== null && _d !== void 0 ? _d : undefined;
            if (host && token && userId) {
                yield performAuthentication({ host, token, userId });
            }
            break;
        }
        case 'room': {
            const host = (_e = args.get('host')) !== null && _e !== void 0 ? _e : undefined;
            const path = (_f = args.get('path')) !== null && _f !== void 0 ? _f : undefined;
            const rid = (_g = args.get('rid')) !== null && _g !== void 0 ? _g : undefined;
            if (host && rid) {
                yield performOpenRoom({ host, path, rid });
            }
            break;
        }
        case 'invite': {
            const host = (_h = args.get('host')) !== null && _h !== void 0 ? _h : undefined;
            const path = (_j = args.get('path')) !== null && _j !== void 0 ? _j : undefined;
            const rid = (_k = args.get('rid')) !== null && _k !== void 0 ? _k : undefined;
            if (host && path && rid) {
                yield performInvite({ host, path, rid });
            }
        }
    }
});
const setupDeepLinks = () => {
    electron.app.addListener('open-url', (event, url) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const browserWindow = yield getRootWindow();
        if (!browserWindow.isVisible()) {
            browserWindow.showInactive();
        }
        browserWindow.focus();
        yield processDeepLink(url);
    }));
    electron.app.addListener('second-instance', (event, argv) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        event.preventDefault();
        const browserWindow = yield getRootWindow();
        if (!browserWindow.isVisible()) {
            browserWindow.showInactive();
        }
        browserWindow.focus();
        const args = argv.slice(electron.app.isPackaged ? 1 : 2);
        for (const arg of args) {
            // eslint-disable-next-line no-await-in-loop
            yield processDeepLink(arg);
        }
    }));
    processDeepLinksInArgs = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const args = process.argv.slice(electron.app.isPackaged ? 1 : 2);
        for (const arg of args) {
            // eslint-disable-next-line no-await-in-loop
            yield processDeepLink(arg);
        }
    });
};

const setupMainErrorHandling = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    process.addListener('uncaughtException', (error) => {
        console.error(error);
        electron.app.exit(1);
    });
    process.addListener('unhandledRejection', (reason) => {
        console.error(reason);
        electron.app.exit(1);
    });
    yield electron.app.whenReady();
    listen(APP_ERROR_THROWN, (action) => {
        console.error(action.payload);
    });
});

const I18N_LNG_REQUESTED = 'i18n/lng-requested';
const I18N_LNG_RESPONDED = 'i18n/lng-responded';

const fallbackLng = 'en';
const byteUnits = [
    'byte',
    'kilobyte',
    'megabyte',
    'gigabyte',
    'terabyte',
    'petabyte',
];
const formatBytes = (bytes) => {
    const order = Math.min(Math.floor(Math.log(bytes) / Math.log(1024)), byteUnits.length - 1);
    const unit = byteUnits[order];
    const formatter = new Intl.NumberFormat(undefined, {
        notation: 'compact',
        style: 'unit',
        unit,
        maximumFractionDigits: 1,
    });
    return formatter.format(bytes / Math.pow(1024, order));
};
const formatByteSpeed = (bytesPerSecond) => {
    const order = Math.min(Math.floor(Math.log(bytesPerSecond) / Math.log(1024)), byteUnits.length - 1);
    const unit = `${byteUnits[order]}-per-second`;
    const formatter = new Intl.NumberFormat(undefined, {
        notation: 'compact',
        style: 'unit',
        unit,
        maximumFractionDigits: 1,
    });
    return formatter.format(bytesPerSecond / Math.pow(1024, order));
};
const formatPercentage = (ratio) => {
    const formatter = new Intl.NumberFormat(undefined, {
        style: 'percent',
        maximumFractionDigits: 0,
    });
    return formatter.format(ratio);
};
const formatDuration = (duration) => {
    const formatter = new Intl.RelativeTimeFormat(undefined, {
        style: 'narrow',
        numeric: 'always',
    });
    duration = duration / 1000;
    if (duration / 60 < 1) {
        return formatter.format(Math.ceil(duration), 'second');
    }
    duration /= 60;
    if (duration / 60 < 1) {
        return formatter.format(Math.ceil(duration), 'minute');
    }
    duration /= 60;
    if (duration / 24 < 1) {
        return formatter.format(Math.ceil(duration), 'hour');
    }
    duration /= 24;
    if (duration / 7 < 1) {
        return formatter.format(duration, 'day');
    }
    duration /= 7;
    if (duration / 30 < 1) {
        return formatter.format(duration, 'week');
    }
    duration /= 30;
    if (duration / 12 < 1) {
        return formatter.format(duration, 'month');
    }
    duration /= 12;
    return formatter.format(duration, 'year');
};
const interpolation = {
    format: (value, format, lng) => {
        if (value instanceof Date && !Number.isNaN(value.getTime())) {
            return new Intl.DateTimeFormat(lng).format(value);
        }
        switch (format) {
            case 'byteSize':
                return formatBytes(value);
            case 'byteSpeed':
                return formatByteSpeed(value);
            case 'percentage':
                return formatPercentage(value);
            case 'duration':
                return formatDuration(value);
        }
        return String(value);
    },
};

var resources = {
    'de-DE': () => Promise.resolve().then(function () { return require('./de-DE.i18n-d8b7773d.js'); }),
    'en': () => Promise.resolve().then(function () { return require('./en.i18n-a5065a35.js'); }),
    'fr': () => Promise.resolve().then(function () { return require('./fr.i18n-642d2a20.js'); }),
    'hu': () => Promise.resolve().then(function () { return require('./hu.i18n-10fae1e8.js'); }),
    'ja': () => Promise.resolve().then(function () { return require('./ja.i18n-68167670.js'); }),
    'pl': () => Promise.resolve().then(function () { return require('./pl.i18n-c8888758.js'); }),
    'pt-BR': () => Promise.resolve().then(function () { return require('./pt-BR.i18n-66957ee7.js'); }),
    'ru': () => Promise.resolve().then(function () { return require('./ru.i18n-86dcf54d.js'); }),
    'tr-TR': () => Promise.resolve().then(function () { return require('./tr-TR.i18n-59394cf8.js'); }),
    'uk-UA': () => Promise.resolve().then(function () { return require('./uk-UA.i18n-50db5176.js'); }),
    'zh-CN': () => Promise.resolve().then(function () { return require('./zh-CN.i18n-4c73c30e.js'); }),
    'zh-TW': () => Promise.resolve().then(function () { return require('./zh-TW.i18n-51d7333d.js'); }),
};

const hasLng = (lng) => lng in resources;
const getLng = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    yield electron.app.whenReady();
    const locale = electron.app.getLocale();
    let [languageCode, countryCode] = locale.split(/[-_]/);
    if (!languageCode || languageCode.length !== 2) {
        return fallbackLng;
    }
    languageCode = languageCode.toLowerCase();
    if (!countryCode || countryCode.length !== 2) {
        countryCode = null;
    }
    else {
        countryCode = countryCode.toUpperCase();
    }
    const lng = countryCode ? `${languageCode}-${countryCode}` : languageCode;
    if (hasLng(lng)) {
        return lng;
    }
    return undefined;
});
class I18nService extends Service {
    constructor() {
        super(...arguments);
        this.t = i18next__default['default'].t.bind(i18next__default['default']);
    }
    initializeAsync() {
        return tslib.__awaiter(this, void 0, void 0, function* () {
            const lng = yield getLng();
            this.t = yield i18next__default['default'].init({
                lng,
                fallbackLng,
                resources: Object.assign(Object.assign({}, (lng &&
                    lng in resources && {
                    [lng]: {
                        translation: yield resources[lng](),
                    },
                })), { [fallbackLng]: {
                        translation: yield resources[fallbackLng](),
                    } }),
                interpolation,
                initImmediate: true,
            });
        });
    }
    initialize() {
        this.initialization = this.initializeAsync();
        this.listen(I18N_LNG_REQUESTED, (action) => {
            var _a;
            if (!hasMeta(action) || !action.meta.id) {
                return;
            }
            dispatch({
                type: I18N_LNG_RESPONDED,
                payload: hasLng(i18next__default['default'].language) ? i18next__default['default'].language : fallbackLng,
                meta: {
                    response: true,
                    id: (_a = action.meta) === null || _a === void 0 ? void 0 : _a.id,
                },
            });
        });
    }
    wait() {
        var _a;
        return (_a = this.initialization) !== null && _a !== void 0 ? _a : Promise.reject(new Error('not initialized'));
    }
}
var i18n = new I18nService();

const NOTIFICATIONS_CREATE_REQUESTED = 'notifications/create-requested';
const NOTIFICATIONS_CREATE_RESPONDED = 'notifications/create-responded';
const NOTIFICATIONS_NOTIFICATION_ACTIONED = 'notifications/notification-actioned';
const NOTIFICATIONS_NOTIFICATION_CLICKED = 'notifications/notification-clicked';
const NOTIFICATIONS_NOTIFICATION_CLOSED = 'notifications/notification-closed';
const NOTIFICATIONS_NOTIFICATION_DISMISSED = 'notifications/notification-dismissed';
const NOTIFICATIONS_NOTIFICATION_REPLIED = 'notifications/notification-replied';
const NOTIFICATIONS_NOTIFICATION_SHOWN = 'notifications/notification-shown';

const resolveIcon = (iconUrl) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    if (!iconUrl) {
        return undefined;
    }
    if (/^data:/.test(iconUrl)) {
        return electron.nativeImage.createFromDataURL(iconUrl);
    }
    try {
        const { webContents } = yield getRootWindow();
        const dataUri = yield invoke(webContents, 'notifications/fetch-icon', iconUrl);
        return electron.nativeImage.createFromDataURL(dataUri);
    }
    catch (error) {
        console.error(error);
        return undefined;
    }
});
const notifications = new Map();
const createNotification = (id, { title, body, icon, silent, canReply, actions }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const notification = new electron.Notification({
        title,
        body: body !== null && body !== void 0 ? body : '',
        icon: yield resolveIcon(icon),
        silent,
        hasReply: canReply,
        actions: actions === null || actions === void 0 ? void 0 : actions.map((action) => ({
            type: 'button',
            text: action.title,
        })),
    });
    notification.addListener('show', () => {
        dispatch({ type: NOTIFICATIONS_NOTIFICATION_SHOWN, payload: { id } });
    });
    notification.addListener('close', () => {
        dispatch({ type: NOTIFICATIONS_NOTIFICATION_CLOSED, payload: { id } });
        notifications.delete(id);
    });
    notification.addListener('click', () => {
        //console.log('----------------------------------------click---------------------');
        dispatch({ type: NOTIFICATIONS_NOTIFICATION_CLICKED, payload: { id } });
    });
    notification.addListener('reply', (_event, reply) => {
        dispatch({
            type: NOTIFICATIONS_NOTIFICATION_REPLIED,
            payload: { id, reply },
        });
    });
    notification.addListener('action', (_event, index) => {
        //console.log('----------------------------------------action---------------------');
        dispatch({
            type: NOTIFICATIONS_NOTIFICATION_ACTIONED,
            payload: { id, index },
        });
    });
    notifications.set(id, notification);
    notification.show();
    return id;
});
const updateNotification = (id, { title, body, silent, renotify }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const notification = notifications.get(id);
    if (title) {
        notification.title = title;
    }
    if (body) {
        notification.body = body;
    }
    if (silent) {
        notification.silent = silent;
    }
    if (renotify) {
        notification.show();
    }
    return id;
});
const handleCreateEvent = (_a) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    var { tag } = _a, options = tslib.__rest(_a, ["tag"]);
    if (tag && notifications.has(tag)) {
        return updateNotification(tag, options);
    }
    const id = tag || Math.random().toString(36).slice(2);
    return createNotification(id, options);
});
const setupNotifications = () => {
    listen(NOTIFICATIONS_CREATE_REQUESTED, (action) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        if (!hasMeta(action)) {
            return;
        }
        dispatch({
            type: NOTIFICATIONS_CREATE_RESPONDED,
            payload: yield handleCreateEvent(action.payload),
            meta: {
                id: action.meta.id,
                response: true,
            },
        });
    }));
    listen(NOTIFICATIONS_NOTIFICATION_DISMISSED, (action) => {
        var _a;
        (_a = notifications.get(action.payload.id)) === null || _a === void 0 ? void 0 : _a.close();
    });
};

const setSpellCheckerLanguages = (languages) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    yield electron.app.whenReady();
    const filteredLanguages = Array.from(languages).filter((language) => electron.session.defaultSession.availableSpellCheckerLanguages.includes(language));
    electron.session.defaultSession.setSpellCheckerLanguages(filteredLanguages);
    electron.webContents.getAllWebContents().forEach((webContents) => {
        webContents.session.setSpellCheckerLanguages(filteredLanguages);
    });
});
const setupSpellChecking = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    setSpellCheckerLanguages(new Set(electron.session.defaultSession.getSpellCheckerLanguages()));
    listen(SPELL_CHECKING_TOGGLED, (action) => {
        const spellCheckerLanguages = new Set(action.payload ? electron.session.defaultSession.getSpellCheckerLanguages() : []);
        setSpellCheckerLanguages(spellCheckerLanguages);
    });
    listen(SPELL_CHECKING_LANGUAGE_TOGGLED, (action) => {
        const spellCheckerLanguages = new Set(electron.session.defaultSession.getSpellCheckerLanguages());
        if (action.payload.enabled) {
            spellCheckerLanguages.add(action.payload.name);
        }
        else {
            spellCheckerLanguages.delete(action.payload.name);
        }
        setSpellCheckerLanguages(spellCheckerLanguages);
    });
});

const t$2 = i18next__default['default'].t.bind(i18next__default['default']);
const on = (condition, getMenuItems) => (condition ? getMenuItems() : []);
const createAppMenu = reselect.createSelector(() => undefined, () => ({
    id: 'appMenu',
    label: process.platform === 'darwin' ? electron.app.name : t$2('menus.fileMenu'),
    submenu: [
        ...on(process.platform === 'darwin', () => [
            {
                id: 'about',
                label: t$2('menus.about', { appName: electron.app.name }),
                click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                    const browserWindow = yield getRootWindow();
                    if (!browserWindow.isVisible()) {
                        browserWindow.showInactive();
                    }
                    browserWindow.focus();
                    dispatch({ type: MENU_BAR_ABOUT_CLICKED });
                }),
            },
            { type: 'separator' },
            {
                id: 'services',
                label: t$2('menus.services'),
                role: 'services',
            },
            { type: 'separator' },
            {
                id: 'hide',
                label: t$2('menus.hide', { appName: electron.app.name }),
                role: 'hide',
            },
            {
                id: 'hideOthers',
                label: t$2('menus.hideOthers'),
                role: 'hideOthers',
            },
            {
                id: 'unhide',
                label: t$2('menus.unhide'),
                role: 'unhide',
            },
            { type: 'separator' },
        ]),
        ...on(process.platform !== 'darwin', () => [
            {
                id: 'addNewServer',
                label: t$2('menus.addNewServer'),
                accelerator: 'CommandOrControl+N',
                click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                    const browserWindow = yield getRootWindow();
                    if (!browserWindow.isVisible()) {
                        browserWindow.showInactive();
                    }
                    browserWindow.focus();
                    dispatch({ type: MENU_BAR_ADD_NEW_SERVER_CLICKED });
                }),
            },
            { type: 'separator' },
        ]),
        {
            id: 'disableGpu',
            label: t$2('menus.disableGpu'),
            enabled: !electron.app.commandLine.hasSwitch('disable-gpu'),
            click: () => {
                relaunchApp('--disable-gpu');
            },
        },
        { type: 'separator' },
        {
            id: 'quit',
            label: t$2('menus.quit', { appName: electron.app.name }),
            accelerator: 'CommandOrControl+Q',
            click: () => {
                electron.app.quit();
            },
        },
    ],
}));
const createEditMenu = reselect.createSelector(() => undefined, () => ({
    id: 'editMenu',
    label: t$2('menus.editMenu'),
    submenu: [
        {
            id: 'undo',
            label: t$2('menus.undo'),
            role: 'undo',
        },
        {
            id: 'redo',
            label: t$2('menus.redo'),
            role: 'redo',
        },
        { type: 'separator' },
        {
            id: 'cut',
            label: t$2('menus.cut'),
            role: 'cut',
        },
        {
            id: 'copy',
            label: t$2('menus.copy'),
            role: 'copy',
        },
        {
            id: 'paste',
            label: t$2('menus.paste'),
            role: 'paste',
        },
        {
            id: 'selectAll',
            label: t$2('menus.selectAll'),
            role: 'selectAll',
        },
    ],
}));
const selectViewDeps = reselect.createStructuredSelector({
    currentView: ({ currentView }) => currentView,
    isSideBarEnabled: ({ isSideBarEnabled }) => isSideBarEnabled,
    isTrayIconEnabled: ({ isTrayIconEnabled }) => isTrayIconEnabled,
    isMenuBarEnabled: ({ isMenuBarEnabled }) => isMenuBarEnabled,
    rootWindowState: ({ rootWindowState }) => rootWindowState,
});
const createViewMenu = reselect.createSelector(selectViewDeps, ({ currentView, 
//isSideBarEnabled,
isTrayIconEnabled, isMenuBarEnabled, rootWindowState, }) => ({
    id: 'viewMenu',
    label: t$2('menus.viewMenu'),
    submenu: [
        {
            id: 'reload',
            label: t$2('menus.reload'),
            accelerator: 'CommandOrControl+R',
            enabled: typeof currentView === 'object' && !!currentView.url,
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                const guestWebContents = typeof currentView === 'object'
                    ? getWebContentsByServerUrl(currentView.url)
                    : null;
                guestWebContents === null || guestWebContents === void 0 ? void 0 : guestWebContents.reload();
            }),
        },
        {
            id: 'reloadIgnoringCache',
            label: t$2('menus.reloadIgnoringCache'),
            enabled: typeof currentView === 'object' && !!currentView.url,
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                const guestWebContents = typeof currentView === 'object'
                    ? getWebContentsByServerUrl(currentView.url)
                    : null;
                guestWebContents === null || guestWebContents === void 0 ? void 0 : guestWebContents.reloadIgnoringCache();
            }),
        },
        {
            id: 'openDevTools',
            label: t$2('menus.openDevTools'),
            enabled: typeof currentView === 'object' && !!currentView.url,
            accelerator: process.platform === 'darwin' ? 'Command+Alt+I' : 'Ctrl+Shift+I',
            click: () => {
                const guestWebContents = typeof currentView === 'object'
                    ? getWebContentsByServerUrl(currentView.url)
                    : null;
                guestWebContents === null || guestWebContents === void 0 ? void 0 : guestWebContents.toggleDevTools();
            },
        },
        { type: 'separator' },
        {
            id: 'back',
            label: t$2('menus.back'),
            enabled: typeof currentView === 'object' && !!currentView.url,
            accelerator: process.platform === 'darwin' ? 'Command+[' : 'Alt+Left',
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                const guestWebContents = typeof currentView === 'object'
                    ? getWebContentsByServerUrl(currentView.url)
                    : null;
                guestWebContents === null || guestWebContents === void 0 ? void 0 : guestWebContents.goBack();
            }),
        },
        {
            id: 'forward',
            label: t$2('menus.forward'),
            enabled: typeof currentView === 'object' && !!currentView.url,
            accelerator: process.platform === 'darwin' ? 'Command+]' : 'Alt+Right',
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                const guestWebContents = typeof currentView === 'object'
                    ? getWebContentsByServerUrl(currentView.url)
                    : null;
                guestWebContents === null || guestWebContents === void 0 ? void 0 : guestWebContents.goForward();
            }),
        },
        { type: 'separator' },
        {
            id: 'showTrayIcon',
            label: t$2('menus.showTrayIcon'),
            type: 'checkbox',
            checked: isTrayIconEnabled,
            click: ({ checked }) => {
                dispatch({
                    type: MENU_BAR_TOGGLE_IS_TRAY_ICON_ENABLED_CLICKED,
                    payload: checked,
                });
            },
        },
        ...on(process.platform === 'darwin', () => [
            {
                id: 'showFullScreen',
                label: t$2('menus.showFullScreen'),
                type: 'checkbox',
                checked: rootWindowState.fullscreen,
                accelerator: 'Control+Command+F',
                click: ({ checked: enabled }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
                    const browserWindow = yield getRootWindow();
                    if (!browserWindow.isVisible()) {
                        browserWindow.showInactive();
                    }
                    browserWindow.focus();
                    browserWindow.setFullScreen(enabled);
                }),
            },
        ]),
        ...on(process.platform !== 'darwin', () => [
            {
                id: 'showMenuBar',
                label: t$2('menus.showMenuBar'),
                type: 'checkbox',
                checked: isMenuBarEnabled,
                click: ({ checked }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
                    const browserWindow = yield getRootWindow();
                    if (!browserWindow.isVisible()) {
                        browserWindow.showInactive();
                    }
                    browserWindow.focus();
                    dispatch({
                        type: MENU_BAR_TOGGLE_IS_MENU_BAR_ENABLED_CLICKED,
                        payload: checked,
                    });
                }),
            },
        ]),
        /*{
          id: 'showServerList',
          label: t('menus.showServerList'),
          type: 'checkbox',
          checked: isSideBarEnabled,
          click: async ({ checked }) => {
            const browserWindow = await getRootWindow();
  
            if (!browserWindow.isVisible()) {
              browserWindow.showInactive();
            }
            browserWindow.focus();
            dispatch({
              type: MENU_BAR_TOGGLE_IS_SIDE_BAR_ENABLED_CLICKED,
              payload: checked,
            });
          },
        },*/
        { type: 'separator' },
        {
            id: 'resetZoom',
            label: t$2('menus.resetZoom'),
            accelerator: 'CommandOrControl+0',
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                browserWindow.webContents.zoomLevel = 0;
            }),
        },
        {
            id: 'zoomIn',
            label: t$2('menus.zoomIn'),
            accelerator: 'CommandOrControl+Plus',
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                if (browserWindow.webContents.zoomLevel >= 9) {
                    return;
                }
                browserWindow.webContents.zoomLevel++;
            }),
        },
        {
            id: 'zoomOut',
            label: t$2('menus.zoomOut'),
            accelerator: 'CommandOrControl+-',
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                if (browserWindow.webContents.zoomLevel <= -9) {
                    return;
                }
                browserWindow.webContents.zoomLevel--;
            }),
        },
    ],
}));
const selectWindowDeps = reselect.createStructuredSelector({
    servers: ({ servers }) => servers,
    currentView: ({ currentView }) => currentView,
    isShowWindowOnUnreadChangedEnabled: ({ isShowWindowOnUnreadChangedEnabled, }) => isShowWindowOnUnreadChangedEnabled,
});
const createWindowMenu = reselect.createSelector(selectWindowDeps, ({ servers, currentView, isShowWindowOnUnreadChangedEnabled, }) => ({
    id: 'windowMenu',
    label: t$2('menus.windowMenu'),
    role: 'windowMenu',
    submenu: [
        ...on(process.platform === 'darwin', () => [
            {
                id: 'addNewServer',
                label: t$2('menus.addNewServer'),
                accelerator: 'CommandOrControl+N',
                click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                    const browserWindow = yield getRootWindow();
                    if (!browserWindow.isVisible()) {
                        browserWindow.showInactive();
                    }
                    browserWindow.focus();
                    dispatch({ type: MENU_BAR_ADD_NEW_SERVER_CLICKED });
                }),
            },
            { type: 'separator' },
        ]),
        ...on(servers.length > 0, () => [
            ...servers.map((server, i) => {
                var _a;
                return ({
                    id: server.url,
                    type: typeof currentView === 'object' && currentView.url === server.url
                        ? 'checkbox'
                        : 'normal',
                    label: (_a = server.title) === null || _a === void 0 ? void 0 : _a.replace(/&/g, '&&'),
                    checked: typeof currentView === 'object' && currentView.url === server.url,
                    accelerator: `CommandOrControl+${i + 1}`,
                    click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                        const browserWindow = yield getRootWindow();
                        if (!browserWindow.isVisible()) {
                            browserWindow.showInactive();
                        }
                        browserWindow.focus();
                        dispatch({
                            type: MENU_BAR_SELECT_SERVER_CLICKED,
                            payload: server.url,
                        });
                    }),
                });
            }),
            { type: 'separator' },
        ]),
        {
            id: 'downloads',
            label: t$2('menus.downloads'),
            checked: currentView === 'downloads',
            accelerator: 'CommandOrControl+D',
            click: () => {
                dispatch({ type: SIDE_BAR_DOWNLOADS_BUTTON_CLICKED });
            },
        },
        {
            id: 'showOnUnreadMessage',
            type: 'checkbox',
            label: t$2('menus.showOnUnreadMessage'),
            checked: isShowWindowOnUnreadChangedEnabled,
            click: ({ checked }) => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                dispatch({
                    type: MENU_BAR_TOGGLE_IS_SHOW_WINDOW_ON_UNREAD_CHANGED_ENABLED_CLICKED,
                    payload: checked,
                });
            }),
        },
        { type: 'separator' },
        {
            id: 'minimize',
            role: 'minimize',
            label: t$2('menus.minimize'),
            accelerator: 'CommandOrControl+M',
        },
        {
            id: 'close',
            role: 'close',
            label: t$2('menus.close'),
            accelerator: 'CommandOrControl+W',
        },
    ],
}));
const createHelpMenu = reselect.createSelector(() => undefined, () => ({
    id: 'helpMenu',
    label: t$2('menus.helpMenu'),
    role: 'help',
    submenu: [
        {
            id: 'install-root-crt',
            label: 'Установить сертификат',
            click: () => {
                const cp = require('child_process');
                cp.exec('certutil -addstore "Root" ./resources/rocketchat.cer', {}, (error, stdout /*, stderr:any*/) => {
                    if (error) {
                        showCertInstalled(stdout.toString());
                        return;
                    }
                    else {
                        showCertInstalled('Корневой сертификат успешно установлен.');
                    }
                    //console.log("----stderr: ", stderr);
                });
            },
        },
        {
            id: 'reload-window',
            label: t$2('menus.reload'),
            accelerator: 'CommandOrControl+Shift+R',
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                browserWindow.webContents.reload();
            }),
        },
        {
            id: 'toggleDevTools',
            label: t$2('menus.toggleDevTools'),
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                browserWindow.webContents.toggleDevTools();
            }),
        },
        { type: 'separator' },
        {
            id: 'clearTrustedCertificates',
            label: t$2('menus.clearTrustedCertificates'),
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const browserWindow = yield getRootWindow();
                if (!browserWindow.isVisible()) {
                    browserWindow.showInactive();
                }
                browserWindow.focus();
                dispatch({ type: CERTIFICATES_CLEARED });
            }),
        },
        {
            id: 'resetAppData',
            label: t$2('menus.resetAppData'),
            click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                const permitted = yield askForAppDataReset();
                if (permitted) {
                    relaunchApp('--reset-app-data');
                }
            }),
        },
        { type: 'separator' },
        ...on(process.platform !== 'darwin', () => [
            {
                id: 'about',
                label: t$2('menus.about', { appName: electron.app.name }),
                click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                    const browserWindow = yield getRootWindow();
                    if (!browserWindow.isVisible()) {
                        browserWindow.showInactive();
                    }
                    browserWindow.focus();
                    dispatch({ type: MENU_BAR_ABOUT_CLICKED });
                }),
            },
        ]),
    ],
}));
const selectMenuBarTemplate = reselect.createSelector([
    createAppMenu,
    createEditMenu,
    createViewMenu,
    createWindowMenu,
    createHelpMenu,
], (...menus) => menus);
const selectMenuBarTemplateAsJson = reselect.createSelector(selectMenuBarTemplate, (template) => JSON.stringify(template));
class MenuBarService extends Service {
    initialize() {
        this.watch(selectMenuBarTemplateAsJson, () => tslib.__awaiter(this, void 0, void 0, function* () {
            const menuBarTemplate = select(selectMenuBarTemplate);
            const menu = electron.Menu.buildFromTemplate(menuBarTemplate);
            if (process.platform === 'darwin') {
                electron.Menu.setApplicationMenu(menu);
                return;
            }
            electron.Menu.setApplicationMenu(null);
            (yield getRootWindow()).setMenu(menu);
        }));
    }
}
var menuBar = new MenuBarService();

const t$1 = i18next__default['default'].t.bind(i18next__default['default']);
const ids = ['bold', 'italic', 'strike', 'inline_code', 'multi_line'];
const createTouchBar = () => {
    const serverSelectionScrubber = new electron.TouchBar.TouchBarScrubber({
        selectedStyle: 'background',
        mode: 'free',
        continuous: false,
        items: [],
        select: (index) => tslib.__awaiter(void 0, void 0, void 0, function* () {
            const browserWindow = yield getRootWindow();
            if (!browserWindow.isVisible()) {
                browserWindow.showInactive();
            }
            browserWindow.focus();
            const url = select(({ servers }) => servers[index].url);
            dispatch({ type: TOUCH_BAR_SELECT_SERVER_TOUCHED, payload: url });
        }),
    });
    const serverSelectionPopover = new electron.TouchBar.TouchBarPopover({
        label: t$1('touchBar.selectServer'),
        icon: undefined,
        items: new electron.TouchBar({
            items: [serverSelectionScrubber],
        }),
        showCloseButton: true,
    });
    const messageBoxFormattingButtons = new electron.TouchBar.TouchBarSegmentedControl({
        mode: 'buttons',
        segments: ids.map((id) => ({
            icon: electron.nativeImage.createFromPath(`${electron.app.getAppPath()}/app/images/touch-bar/${id}.png`),
            enabled: false,
        })),
        change: (selectedIndex) => tslib.__awaiter(void 0, void 0, void 0, function* () {
            const browserWindow = yield getRootWindow();
            if (!browserWindow.isVisible()) {
                browserWindow.showInactive();
            }
            browserWindow.focus();
            dispatch({
                type: TOUCH_BAR_FORMAT_BUTTON_TOUCHED,
                payload: ids[selectedIndex],
            });
        }),
    });
    const touchBar = new electron.TouchBar({
        items: [
            serverSelectionPopover,
            new electron.TouchBar.TouchBarSpacer({ size: 'flexible' }),
            messageBoxFormattingButtons,
            new electron.TouchBar.TouchBarSpacer({ size: 'flexible' }),
        ],
    });
    getRootWindow().then((browserWindow) => browserWindow.setTouchBar(touchBar));
    return [
        touchBar,
        serverSelectionPopover,
        serverSelectionScrubber,
        messageBoxFormattingButtons,
    ];
};
const updateServerSelectionPopover = (serverSelectionPopover, currentServer) => {
    var _a;
    serverSelectionPopover.label =
        (_a = currentServer === null || currentServer === void 0 ? void 0 : currentServer.title) !== null && _a !== void 0 ? _a : t$1('touchBar.selectServer');
    serverSelectionPopover.icon = (currentServer === null || currentServer === void 0 ? void 0 : currentServer.favicon)
        ? electron.nativeImage.createFromDataURL(currentServer === null || currentServer === void 0 ? void 0 : currentServer.favicon)
        : electron.nativeImage.createEmpty();
};
const updateServerSelectionScrubber = (serverSelectionScrubber, servers) => {
    serverSelectionScrubber.items = servers.map((server) => {
        var _a;
        return ({
            label: (_a = server.title) === null || _a === void 0 ? void 0 : _a.padEnd(30),
            icon: server.favicon
                ? electron.nativeImage.createFromDataURL(server.favicon)
                : undefined,
        });
    });
};
const toggleMessageFormattingButtons = (messageBoxFormattingButtons, isEnabled) => {
    messageBoxFormattingButtons.segments.forEach((segment) => {
        segment.enabled = isEnabled;
    });
};
const selectCurrentServer = ({ servers, currentView, }) => {
    var _a;
    return typeof currentView === 'object'
        ? (_a = servers.find(({ url }) => url === currentView.url)) !== null && _a !== void 0 ? _a : null
        : null;
};
class TouchBarService extends Service {
    initialize() {
        if (process.platform !== 'darwin') {
            return;
        }
        const [touchBar, serverSelectionPopover, serverSelectionScrubber, messageBoxFormattingButtons,] = createTouchBar();
        this.watch(selectCurrentServer, (currentServer) => {
            updateServerSelectionPopover(serverSelectionPopover, currentServer);
            getRootWindow().then((browserWindow) => browserWindow.setTouchBar(touchBar));
        });
        this.watch(({ servers }) => servers, (servers) => {
            updateServerSelectionScrubber(serverSelectionScrubber, servers);
            getRootWindow().then((browserWindow) => browserWindow.setTouchBar(touchBar));
        });
        this.watch(({ isMessageBoxFocused }) => isMessageBoxFocused !== null && isMessageBoxFocused !== void 0 ? isMessageBoxFocused : false, (isMessageBoxFocused) => {
            toggleMessageFormattingButtons(messageBoxFormattingButtons, isMessageBoxFocused);
            getRootWindow().then((browserWindow) => browserWindow.setTouchBar(touchBar));
        });
    }
}
var touchBar = new TouchBarService();

const t = i18next__default['default'].t.bind(i18next__default['default']);
const selectIsRootWindowVisible = ({ rootWindowState: { visible }, }) => visible;
const createTrayIcon = () => {
    const image = getTrayIconPath({
        platform: process.platform,
        badge: undefined,
    });
    const trayIcon = new electron.Tray(image);
    if (process.platform !== 'darwin') {
        trayIcon.addListener('click', () => tslib.__awaiter(void 0, void 0, void 0, function* () {
            const isRootWindowVisible = select(selectIsRootWindowVisible);
            const browserWindow = yield getRootWindow();
            if (isRootWindowVisible) {
                browserWindow.hide();
                return;
            }
            browserWindow.show();
        }));
    }
    trayIcon.addListener('balloon-click', () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        const isRootWindowVisible = select(selectIsRootWindowVisible);
        const browserWindow = yield getRootWindow();
        if (isRootWindowVisible) {
            browserWindow.hide();
            return;
        }
        browserWindow.show();
    }));
    trayIcon.addListener('right-click', (_event, bounds) => {
        trayIcon.popUpContextMenu(undefined, bounds);
    });
    return trayIcon;
};
const updateTrayIconImage = (trayIcon, badge) => {
    const image = getTrayIconPath({
        platform: process.platform,
        badge,
    });
    trayIcon.setImage(image);
};
const updateTrayIconTitle = (trayIcon, globalBadge) => {
    const title = Number.isInteger(globalBadge) ? String(globalBadge) : '';
    trayIcon.setTitle(title);
};
const updateTrayIconToolTip = (trayIcon, globalBadge) => {
    if (globalBadge === '•') {
        trayIcon.setToolTip(t('tray.tooltip.unreadMessage', { appName: electron.app.name }));
        return;
    }
    if (Number.isInteger(globalBadge)) {
        trayIcon.setToolTip(t('tray.tooltip.unreadMention', { appName: electron.app.name, count: globalBadge }));
        return;
    }
    trayIcon.setToolTip(t('tray.tooltip.noUnreadMessage', { appName: electron.app.name }));
};
const warnStillRunning = (trayIcon) => {
    if (process.platform !== 'win32') {
        return;
    }
    trayIcon.displayBalloon({
        icon: getAppIconPath({ platform: process.platform }),
        title: t('tray.balloon.stillRunning.title', { appName: electron.app.name }),
        content: t('tray.balloon.stillRunning.content', { appName: electron.app.name }),
    });
};
const manageTrayIcon = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const trayIcon = createTrayIcon();
    const unwatchGlobalBadge = watch(selectGlobalBadge, (globalBadge) => {
        updateTrayIconImage(trayIcon, globalBadge);
        updateTrayIconTitle(trayIcon, globalBadge);
        updateTrayIconToolTip(trayIcon, globalBadge);
    });
    let firstTrayIconBalloonShown = false;
    const unwatchIsRootWindowVisible = watch(selectIsRootWindowVisible, (isRootWindowVisible, prevIsRootWindowVisible) => {
        const menuTemplate = [
            {
                label: isRootWindowVisible
                    ? t('tray.menu.hide')
                    : t('tray.menu.show'),
                click: () => tslib.__awaiter(void 0, void 0, void 0, function* () {
                    const isRootWindowVisible = select(selectIsRootWindowVisible);
                    const browserWindow = yield getRootWindow();
                    if (isRootWindowVisible) {
                        browserWindow.hide();
                        return;
                    }
                    browserWindow.show();
                }),
            },
            {
                label: t('tray.menu.quit'),
                click: () => {
                    electron.app.quit();
                },
            },
        ];
        const menu = electron.Menu.buildFromTemplate(menuTemplate);
        trayIcon.setContextMenu(menu);
        if (prevIsRootWindowVisible &&
            !isRootWindowVisible &&
            process.platform === 'win32' &&
            !firstTrayIconBalloonShown) {
            warnStillRunning(trayIcon);
            firstTrayIconBalloonShown = true;
        }
    });
    return () => {
        unwatchGlobalBadge();
        unwatchIsRootWindowVisible();
        trayIcon.destroy();
    };
});
class TrayIconService extends Service {
    constructor() {
        super(...arguments);
        this.tearDownPromise = null;
    }
    initialize() {
        this.watch(({ isTrayIconEnabled }) => isTrayIconEnabled !== null && isTrayIconEnabled !== void 0 ? isTrayIconEnabled : true, (isTrayIconEnabled) => {
            if (!this.tearDownPromise && isTrayIconEnabled) {
                this.tearDownPromise = manageTrayIcon();
            }
            else if (this.tearDownPromise && !isTrayIconEnabled) {
                this.tearDownPromise.then((cleanUp) => cleanUp());
                this.tearDownPromise = null;
            }
        });
    }
    destroy() {
        var _a;
        (_a = this.tearDownPromise) === null || _a === void 0 ? void 0 : _a.then((cleanUp) => cleanUp());
        this.tearDownPromise = null;
    }
}
var trayIcon = new TrayIconService();

const readJsonObject = (filePath) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield fs__default['default'].promises.readFile(filePath, 'utf8');
        const json = JSON.parse(content);
        return json && typeof json === 'object' && !Array.isArray(json) ? json : {};
    }
    catch (error) {
        return {};
    }
});
const readAppJsonObject = (basename) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const filePath = path__default['default'].join(electron.app.getAppPath(), electron.app.getAppPath().endsWith('app.asar') ? '..' : '.', basename);
    return readJsonObject(filePath);
});
const readUserJsonObject = (basename) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const filePath = path__default['default'].join(electron.app.getPath('userData'), basename);
    return readJsonObject(filePath);
});
const loadAppConfiguration = () => tslib.__awaiter(void 0, void 0, void 0, function* () { return readAppJsonObject('update.json'); });
const loadUserConfiguration = () => tslib.__awaiter(void 0, void 0, void 0, function* () { return readUserJsonObject('update.json'); });
const mergeConfigurations = (defaultConfiguration, appConfiguration, userConfiguration) => {
    const configuration = Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, defaultConfiguration), (typeof appConfiguration.forced === 'boolean' && {
        isEachUpdatesSettingConfigurable: !appConfiguration.forced,
    })), (typeof appConfiguration.canUpdate === 'boolean' && {
        isUpdatingEnabled: appConfiguration.canUpdate,
    })), (typeof appConfiguration.autoUpdate === 'boolean' && {
        doCheckForUpdatesOnStartup: appConfiguration.autoUpdate,
    })), (typeof appConfiguration.skip === 'string' && {
        skippedUpdateVersion: appConfiguration.skip,
    }));
    if (typeof userConfiguration.autoUpdate === 'boolean' &&
        (configuration.isEachUpdatesSettingConfigurable ||
            typeof appConfiguration.autoUpdate === 'undefined')) {
        configuration.doCheckForUpdatesOnStartup = userConfiguration.autoUpdate;
    }
    if (typeof userConfiguration.skip === 'string' &&
        (configuration.isEachUpdatesSettingConfigurable ||
            typeof appConfiguration.skip === 'undefined')) {
        configuration.skippedUpdateVersion = userConfiguration.skip;
    }
    return configuration;
};
const loadConfiguration = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const defaultConfiguration = select(({ isUpdatingEnabled, doCheckForUpdatesOnStartup, skippedUpdateVersion, }) => ({
        isUpdatingAllowed: (process.platform === 'linux' && !!process.env.APPIMAGE) ||
            (process.platform === 'win32' && !process.windowsStore) ||
            (process.platform === 'darwin' && !process.mas),
        isEachUpdatesSettingConfigurable: true,
        isUpdatingEnabled,
        doCheckForUpdatesOnStartup,
        skippedUpdateVersion,
    }));
    const appConfiguration = yield loadAppConfiguration();
    const userConfiguration = yield loadUserConfiguration();
    return mergeConfigurations(defaultConfiguration, appConfiguration, userConfiguration);
});
const setupUpdates = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    electronUpdater.autoUpdater.autoDownload = false;
    const { isUpdatingAllowed, isEachUpdatesSettingConfigurable, isUpdatingEnabled, doCheckForUpdatesOnStartup, skippedUpdateVersion, } = yield loadConfiguration();
    dispatch({
        type: UPDATES_READY,
        payload: {
            isUpdatingAllowed,
            isEachUpdatesSettingConfigurable,
            isUpdatingEnabled,
            doCheckForUpdatesOnStartup,
            skippedUpdateVersion,
        },
    });
    if (!isUpdatingAllowed || !isUpdatingEnabled) {
        return;
    }
    electronUpdater.autoUpdater.addListener('checking-for-update', () => {
        dispatch({ type: UPDATES_CHECKING_FOR_UPDATE });
    });
    electronUpdater.autoUpdater.addListener('update-available', ({ version }) => {
        /*const skippedUpdateVersion = select(
          ({ skippedUpdateVersion }) => skippedUpdateVersion
        );
        if (skippedUpdateVersion === version) {
          dispatch({ type: UPDATES_NEW_VERSION_NOT_AVAILABLE });
          return;
        }*/ //откл 05.12.2021
        dispatch({ type: ABOUT_DIALOG_DISMISSED });
        setTimeout(function () {
            dispatch({
                type: UPDATES_NEW_VERSION_AVAILABLE,
                payload: version,
            });
        }, 250);
    });
    electronUpdater.autoUpdater.addListener('update-not-available', () => {
        dispatch({ type: UPDATES_NEW_VERSION_NOT_AVAILABLE });
    });
    electronUpdater.autoUpdater.addListener('update-downloaded', () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        /*const response = await askUpdateInstall();
    
        if (response === AskUpdateInstallResponse.INSTALL_LATER) {
          await warnAboutInstallUpdateLater();
          return;
        }*/
        try {
            electron.app.removeAllListeners('window-all-closed');
            electronUpdater.autoUpdater.quitAndInstall(true, true);
        }
        catch (error) {
            dispatch({
                type: UPDATES_ERROR_THROWN,
                payload: {
                    message: error.message,
                    stack: error.stack,
                    name: error.name,
                },
            });
        }
    }));
    electronUpdater.autoUpdater.addListener('error', (error) => {
        dispatch({
            type: UPDATES_ERROR_THROWN,
            payload: {
                message: error.message,
                stack: error.stack,
                name: error.name,
            },
        });
    });
    if (doCheckForUpdatesOnStartup) {
        try {
            yield electronUpdater.autoUpdater.checkForUpdates();
        }
        catch (error) {
            dispatch({
                type: UPDATES_ERROR_THROWN,
                payload: {
                    message: error.message,
                    stack: error.stack,
                    name: error.name,
                },
            });
        }
    }
    listen(UPDATES_CHECK_FOR_UPDATES_REQUESTED, () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        try {
            yield electronUpdater.autoUpdater.checkForUpdates();
        }
        catch (error) {
            dispatch({
                type: UPDATES_ERROR_THROWN,
                payload: {
                    message: error.message,
                    stack: error.stack,
                    name: error.name,
                },
            });
        }
    }));
    listen(UPDATE_DIALOG_SKIP_UPDATE_CLICKED, (action) => tslib.__awaiter(void 0, void 0, void 0, function* () {
        yield warnAboutUpdateSkipped();
        dispatch({
            type: UPDATE_SKIPPED,
            payload: action.payload,
        });
    }));
    listen(UPDATE_DIALOG_INSTALL_BUTTON_CLICKED, () => tslib.__awaiter(void 0, void 0, void 0, function* () {
        //await warnAboutUpdateDownload();
        try {
            electronUpdater.autoUpdater.downloadUpdate();
        }
        catch (error) {
            dispatch({
                type: UPDATES_ERROR_THROWN,
                payload: {
                    message: error.message,
                    stack: error.stack,
                    name: error.name,
                },
            });
        }
    }));
});

const SYSTEM_LOCKING_SCREEN = 'system/locking-screen';
const SYSTEM_SUSPENDING = 'system/suspending';

const setupPowerMonitor = () => {
    electron.powerMonitor.addListener('suspend', () => {
        dispatch({ type: SYSTEM_SUSPENDING });
    });
    electron.powerMonitor.addListener('lock-screen', () => {
        dispatch({ type: SYSTEM_LOCKING_SCREEN });
    });
    handle('power-monitor/get-system-idle-state', (_webContents, idleThreshold) => tslib.__awaiter(void 0, void 0, void 0, function* () { return electron.powerMonitor.getSystemIdleState(idleThreshold); }));
};

/*
 const log=require('electron-log');
  log.log('123123123');
*/
const start = () => tslib.__awaiter(void 0, void 0, void 0, function* () {
    setUserDataDirectory();
    setupMainErrorHandling();
    performElectronStartup();
    createMainReduxStore();
    yield electron.app.whenReady();
    const localStorage = yield exportLocalStorage();
    yield mergePersistableValues(localStorage);
    yield setupServers(localStorage);
    i18n.setUp();
    yield i18n.wait();
    setupApp();
    createRootWindow();
    attachGuestWebContentsEvents();
    yield showRootWindow();
    // React DevTools is currently incompatible with Electron 10
    // if ("development" === 'development') {
    //   installDevTools();
    // }
    setupNotifications();
    //setupScreenSharing(); //откл. 05.12.2021
    yield setupSpellChecking();
    setupDeepLinks();
    yield setupNavigation();
    setupPowerMonitor();
    yield setupUpdates();
    setupDownloads();
    //dock.setUp(); //откл. 05.12.2021
    menuBar.setUp();
    touchBar.setUp();
    trayIcon.setUp();
    electron.app.addListener('before-quit', () => {
        //dock.tearDown(); //откл. 05.12.2021
        menuBar.tearDown();
        touchBar.tearDown();
        trayIcon.tearDown();
    });
    watchAndPersistChanges();
    yield processDeepLinksInArgs();
});
if (require.main === module) {
    start();
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vc3JjL3N0b3JlL2ZzYS50cyIsIi4uL3NyYy9pcGMvbWFpbi50cyIsIi4uL3NyYy9zdG9yZS9pcGMudHMiLCIuLi9zcmMvYXBwL2FjdGlvbnMudHMiLCIuLi9zcmMvYXBwL3JlZHVjZXJzL2FwcFBhdGgudHMiLCIuLi9zcmMvYXBwL3JlZHVjZXJzL2FwcFZlcnNpb24udHMiLCIuLi9zcmMvZG93bmxvYWRzL2FjdGlvbnMudHMiLCIuLi9zcmMvZG93bmxvYWRzL3JlZHVjZXJzL2Rvd25sb2Fkcy50cyIsIi4uL3NyYy9uYXZpZ2F0aW9uL2FjdGlvbnMudHMiLCIuLi9zcmMvbmF2aWdhdGlvbi9yZWR1Y2Vycy50cyIsIi4uL3NyYy9kZWVwTGlua3MvYWN0aW9ucy50cyIsIi4uL3NyYy91aS9hY3Rpb25zLnRzIiwiLi4vc3JjL3NlcnZlcnMvYWN0aW9ucy50cyIsIi4uL3NyYy9zZXJ2ZXJzL3JlZHVjZXJzLnRzIiwiLi4vc3JjL3VpL3JlZHVjZXJzL2N1cnJlbnRWaWV3LnRzIiwiLi4vc3JjL3VpL3JlZHVjZXJzL2Rvd25sb2Fkc1BhdGgudHMiLCIuLi9zcmMvdWkvcmVkdWNlcnMvaXNNZW51QmFyRW5hYmxlZC50cyIsIi4uL3NyYy91aS9yZWR1Y2Vycy9pc01lc3NhZ2VCb3hGb2N1c2VkLnRzIiwiLi4vc3JjL3VpL3JlZHVjZXJzL2lzU2hvd1dpbmRvd09uVW5yZWFkQ2hhbmdlZEVuYWJsZWQudHMiLCIuLi9zcmMvdWkvcmVkdWNlcnMvaXNTaWRlQmFyRW5hYmxlZC50cyIsIi4uL3NyYy91aS9yZWR1Y2Vycy9pc1RyYXlJY29uRW5hYmxlZC50cyIsIi4uL3NyYy9zY3JlZW5TaGFyaW5nL2FjdGlvbnMudHMiLCIuLi9zcmMvdXBkYXRlcy9hY3Rpb25zLnRzIiwiLi4vc3JjL3VpL3JlZHVjZXJzL29wZW5EaWFsb2cudHMiLCIuLi9zcmMvdWkvcmVkdWNlcnMvcm9vdFdpbmRvd0ljb24udHMiLCIuLi9zcmMvdWkvcmVkdWNlcnMvcm9vdFdpbmRvd1N0YXRlLnRzIiwiLi4vc3JjL3VwZGF0ZXMvcmVkdWNlcnMudHMiLCIuLi9zcmMvc3RvcmUvcm9vdFJlZHVjZXIudHMiLCIuLi9zcmMvc3RvcmUvaW5kZXgudHMiLCIuLi9zcmMvYXBwL21haW4vZGV2LnRzIiwiLi4vc3JjL3VpL3NlbGVjdG9ycy50cyIsIi4uL3NyYy91aS9tYWluL2ljb25zLnRzIiwiLi4vc3JjL3VpL21haW4vcm9vdFdpbmRvdy50cyIsIi4uL3NyYy9hcHAvbWFpbi9hcHAudHMiLCIuLi9zcmMvYXBwL3NlbGVjdG9ycy50cyIsIi4uL3NyYy9hcHAvUGVyc2lzdGFibGVWYWx1ZXMudHMiLCIuLi9zcmMvYXBwL21haW4vcGVyc2lzdGVuY2UudHMiLCIuLi9zcmMvYXBwL21haW4vZGF0YS50cyIsIi4uL3NyYy9zZXJ2ZXJzL21haW4udHMiLCIuLi9zcmMvdWkvbWFpbi9kaWFsb2dzLnRzIiwiLi4vc3JjL2Rvd25sb2Fkcy9jb21tb24udHMiLCIuLi9zcmMvZG93bmxvYWRzL2Rvd25sb2FkUGVlci50cyIsIi4uL3NyYy9kb3dubG9hZHMvbWFpbi50cyIsIi4uL3NyYy9uYXZpZ2F0aW9uL21haW4udHMiLCIuLi9zcmMvc3BlbGxDaGVja2luZy9hY3Rpb25zLnRzIiwiLi4vc3JjL3VpL21haW4vc2VydmVyVmlldy9wb3B1cE1lbnUudHMiLCIuLi9zcmMvdWkvbWFpbi9zZXJ2ZXJWaWV3L2luZGV4LnRzIiwiLi4vc3JjL2RlZXBMaW5rcy9tYWluLnRzIiwiLi4vc3JjL2Vycm9ycy50cyIsIi4uL3NyYy9pMThuL2FjdGlvbnMudHMiLCIuLi9zcmMvaTE4bi9jb21tb24udHMiLCIuLi9zcmMvaTE4bi9yZXNvdXJjZXMudHMiLCIuLi9zcmMvaTE4bi9tYWluLnRzIiwiLi4vc3JjL25vdGlmaWNhdGlvbnMvYWN0aW9ucy50cyIsIi4uL3NyYy9ub3RpZmljYXRpb25zL21haW4udHMiLCIuLi9zcmMvc3BlbGxDaGVja2luZy9tYWluLnRzIiwiLi4vc3JjL3VpL21haW4vbWVudUJhci50cyIsIi4uL3NyYy91aS9tYWluL3RvdWNoQmFyLnRzIiwiLi4vc3JjL3VpL21haW4vdHJheUljb24udHMiLCIuLi9zcmMvdXBkYXRlcy9tYWluLnRzIiwiLi4vc3JjL3VzZXJQcmVzZW5jZS9hY3Rpb25zLnRzIiwiLi4vc3JjL3VzZXJQcmVzZW5jZS9tYWluLnRzIiwiLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOltudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbF0sIm5hbWVzIjpbImlwY01haW4iLCJoYW5kbGVPbk1haW4iLCJpbnZva2VGcm9tTWFpbiIsImNvbWJpbmVSZWR1Y2VycyIsImFwcGx5TWlkZGxld2FyZSIsImNyZWF0ZVN0b3JlIiwiYXBwIiwicGF0aCIsImNyZWF0ZVNlbGVjdG9yIiwiQnJvd3NlcldpbmRvdyIsInNjcmVlbiIsIm5hdGl2ZVRoZW1lIiwiY3JlYXRlU3RydWN0dXJlZFNlbGVjdG9yIiwibmF0aXZlSW1hZ2UiLCJpMThuZXh0IiwicmltcmFmIiwiRWxlY3Ryb25TdG9yZSIsImZzIiwic2VtdmVyIiwiY29lcmNlIiwic2F0aXNmaWVzIiwidCIsImRpYWxvZyIsInNoZWxsIiwiY2xpcGJvYXJkIiwid2ViQ29udGVudHMiLCJNZW51Iiwic3lzdGVtUHJlZmVyZW5jZXMiLCJ1cmwiLCJVUkwiLCJOb3RpZmljYXRpb24iLCJzZXNzaW9uIiwiVG91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
