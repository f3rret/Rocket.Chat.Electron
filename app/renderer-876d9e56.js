'use strict';

var tslib = require('tslib');
var rootWindow = require('./rootWindow-266acf9c.js');
require('react');
require('react-dom');
require('electron');
require('redux');
require('i18next');
require('react-i18next');
require('react-redux');
require('@rocket.chat/fuselage');
require('@rocket.chat/fuselage-hooks');
require('@emotion/styled');
require('path');
require('fast-folder-size');
require('reselect');
require('react-keyed-flatten-children');
require('@emotion/react');
require('url');

const iconCache = new Map();
const inferContentTypeFromImageData = (data) => {
    const header = Array.from(new Uint8Array(data.slice(0, 3)))
        .map((byte) => byte.toString(16))
        .join('');
    switch (header) {
        case '89504e':
            return 'image/png';
        case '474946':
            return 'image/gif';
        case 'ffd8ff':
            return 'image/jpeg';
        default:
            return null;
    }
};
const fetchIcon = (urlHref) => tslib.__awaiter(void 0, void 0, void 0, function* () {
    const cache = iconCache.get(urlHref);
    if (cache) {
        return cache;
    }
    const response = yield fetch(urlHref);
    const arrayBuffer = yield response.arrayBuffer();
    const base64String = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)));
    const contentType = inferContentTypeFromImageData(arrayBuffer) ||
        response.headers.get('content-type');
    const dataUri = `data:${contentType};base64,${base64String}`;
    iconCache.set(urlHref, dataUri);
    return dataUri;
});
var renderer = () => {
    rootWindow.handle('notifications/fetch-icon', fetchIcon);
};

exports.default = renderer;
//# sourceMappingURL=renderer-876d9e56.js.map
