(function () {
    'use strict';

    const start = () => {
        var _a;
        var _b;
        if (typeof window.require !== 'function') {
            return;
        }
        const { Info: serverInfo = {} } = (_a = window.require('/app/utils/rocketchat.info')) !== null && _a !== void 0 ? _a : {};
        if (!serverInfo.version) {
            return;
        }
        window.RocketChatDesktop.setServerInfo(serverInfo);
        const { Meteor } = window.require('meteor/meteor');
        const { Session } = window.require('meteor/session');
        const { Tracker } = window.require('meteor/tracker');
        const { UserPresence } = window.require('meteor/konecty:user-presence');
        const { settings } = window.require('/app/settings');
        const { getUserPreference } = window.require('/app/utils');
        window.RocketChatDesktop.setUrlResolver(Meteor.absoluteUrl);
        Tracker.autorun(() => {
            const unread = Session.get('unread');
            window.RocketChatDesktop.setBadge(unread);
        });
        Tracker.autorun(() => {
            /*const { url, defaultUrl } = settings.get('Assets_favicon') || {};
            window.RocketChatDesktop.setFavicon(url || defaultUrl);*/
        });
        Tracker.autorun(() => {
            const { url, defaultUrl } = settings.get('Assets_background') || {};
            window.RocketChatDesktop.setBackground(url || defaultUrl);
        });
        Tracker.autorun(() => {
            const siteName = settings.get('Site_Name');
            window.RocketChatDesktop.setTitle(siteName);
        });
        Tracker.autorun(() => {
            const uid = Meteor.userId();
            const isAutoAwayEnabled = getUserPreference(uid, 'enableAutoAway');
            const idleThreshold = getUserPreference(uid, 'idleTimeLimit');
            if (isAutoAwayEnabled) {
                delete UserPresence.awayTime;
                UserPresence.start();
            }
            window.RocketChatDesktop.setUserPresenceDetection({
                isAutoAwayEnabled: Boolean(isAutoAwayEnabled),
                idleThreshold: idleThreshold ? Number(idleThreshold) : null,
                setUserOnline: (online) => {
                    if (!online) {
                        Meteor.call('UserPresence:away');
                        return;
                    }
                    Meteor.call('UserPresence:online');
                },
            });
        });
        const destroyPromiseSymbol = Symbol('destroyPromise');
        window.Notification = (_b = class RocketChatDesktopNotification extends EventTarget {
                constructor(title, options = {}) {
                    super();
                    this.actions = [];
                    this.badge = '';
                    this.body = '';
                    this.data = undefined;
                    this.dir = 'auto';
                    this.icon = '';
                    this.image = '';
                    this.lang = document.documentElement.lang;
                    this.onclick = null;
                    this.onclose = null;
                    this.onerror = null;
                    this.onshow = null;
                    this.renotify = false;
                    this.requireInteraction = false;
                    this.silent = false;
                    this.tag = '';
                    this.timestamp = Date.now();
                    this.title = '';
                    this.vibrate = [];
                    this.handleEvent = ({ type, detail, }) => {
                        const mainWorldEvent = new CustomEvent(type, { detail });
                        const isReplyEvent = (type, detail) => type === 'reply' &&
                            typeof detail === 'object' &&
                            detail !== null &&
                            'reply' in detail &&
                            typeof detail.reply === 'string';
                        if (isReplyEvent(type, detail)) {
                            mainWorldEvent.response = detail.reply;
                        }
                        this.dispatchEvent(mainWorldEvent);
                    };
                    for (const eventType of ['show', 'close', 'click', 'reply', 'action']) {
                        const propertyName = `on${eventType}`;
                        const propertySymbol = Symbol(propertyName);
                        Object.defineProperty(this, propertyName, {
                            get: () => this[propertySymbol],
                            set: (value) => {
                                if (this[propertySymbol]) {
                                    this.removeEventListener(eventType, this[propertySymbol]);
                                }
                                this[propertySymbol] = value;
                                if (this[propertySymbol]) {
                                    this.addEventListener(eventType, this[propertySymbol]);
                                }
                            },
                        });
                    }
                    this[destroyPromiseSymbol] = window.RocketChatDesktop.createNotification(Object.assign(Object.assign({ title }, options), { onEvent: this.handleEvent })).then((id) => () => {
                        window.RocketChatDesktop.destroyNotification(id);
                    });
                    Object.assign(this, Object.assign({ title }, options));
                }
                static requestPermission() {
                    return Promise.resolve(RocketChatDesktopNotification.permission);
                }
                close() {
                    var _a;
                    if (!this[destroyPromiseSymbol]) {
                        return;
                    }
                    (_a = this[destroyPromiseSymbol]) === null || _a === void 0 ? void 0 : _a.then((destroy) => {
                        delete this[destroyPromiseSymbol];
                        destroy();
                    });
                }
            },
            _b.permission = 'granted',
            _b.maxActions = process.platform === 'darwin' ? Number.MAX_SAFE_INTEGER : 0,
            _b);
    };
    start();

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5qZWN0ZWQuanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmplY3RlZC50cyJdLCJzb3VyY2VzQ29udGVudCI6W251bGxdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7SUFRQSxNQUFNLEtBQUssR0FBRzs7O1FBQ1osSUFBSSxPQUFPLE1BQU0sQ0FBQyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQ3hDLE9BQU87U0FDUjtRQUVELE1BQU0sRUFBRSxJQUFJLEVBQUUsVUFBVSxHQUFHLEVBQUUsRUFBRSxHQUM3QixNQUFBLE1BQU0sQ0FBQyxPQUFPLENBQUMsNEJBQTRCLENBQUMsbUNBQUksRUFBRSxDQUFDO1FBRXJELElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFO1lBQ3ZCLE9BQU87U0FDUjtRQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFbkQsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDbkQsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNyRCxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3JELE1BQU0sRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLDhCQUE4QixDQUFDLENBQUM7UUFDeEUsTUFBTSxFQUFFLFFBQVEsRUFBRSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDckQsTUFBTSxFQUFFLGlCQUFpQixFQUFFLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUzRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUU1RCxPQUFPLENBQUMsT0FBTyxDQUFD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
