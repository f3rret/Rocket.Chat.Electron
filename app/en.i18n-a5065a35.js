'use strict';

var contextMenu = {
	cut: "Cu&t",
	copy: "&Copy",
	paste: "&Paste",
	selectAll: "Select &all",
	undo: "&Undo",
	redo: "&Redo",
	spelling: "Spelling",
	spellingLanguages: "Spelling languages",
	moreSpellingSuggestions: "More spelling suggestions",
	noSpellingSuggestions: "No suggestions",
	copyLinkAddress: "Copy link address",
	copyLinkText: "Copy link text",
	openLink: "Open link",
	saveImageAs: "Save image as..."
};
var dialog = {
	about: {
		title: "About {{- appName}}",
		version: "Version: <1>{{-version}}</1>",
		checkUpdates: "Check for Updates",
		checkUpdatesOnStart: "Check for Updates on Start",
		noUpdatesAvailable: "No updates are available.",
		copyright: "Copyright {{copyright}}",
		errorWhenLookingForUpdates: "As error has occurred when looking for updates"
	},
	addServer: {
		title: "Add Server",
		message: "Do you want to add \"{{- host}}\" to your list of servers?",
		add: "Add",
		cancel: "Cancel"
	},
	addServerError: {
		title: "Invalid Host",
		message: "The host \"{{- host}}\" could not be validated, so was not added."
	},
	certificateError: {
		title: "Certificate error",
		message: "Do you trust certificate from \"{{- issuerName}}\"?",
		yes: "Yes",
		no: "No"
	},
	downloadRemoval: {
		title: "Are you sure?",
		message: "Remove this download?",
		yes: "Yes",
		no: "No"
	},
	resetAppData: {
		title: "Reset app data",
		message: "This will sign you out from all your teams and reset the app back to its original settings. This cannot be undone.",
		yes: "Yes",
		cancel: "Cancel"
	},
	screenshare: {
		title: "Share Your Screen",
		announcement: "Select a screen to share"
	},
	update: {
		title: "Update Available",
		announcement: "New Update is Available",
		message: "A new version of the Rocket.Chat Desktop App is available!",
		currentVersion: "Current Version:",
		newVersion: "New Version:",
		install: "Install Update",
		remindLater: "Remind Me Later",
		skip: "Skip This Version"
	},
	updateDownloading: {
		title: "Downloading Update",
		message: "You will be notified when the update is ready to be installed",
		ok: "OK"
	},
	updateInstallLater: {
		title: "Installing Later",
		message: "Update will be installed when you exit the app",
		ok: "OK"
	},
	updateReady: {
		title: "Update Ready to Install",
		message: "Update has been downloaded",
		installNow: "Install Now",
		installLater: "Install Later"
	},
	updateSkip: {
		title: "Skip Update",
		message: "We will notify you when the next update is available\nIf you change your mind you can check for updates from the About menu.",
		ok: "OK"
	},
	selectClientCertificate: {
		announcement: "Select Certificate",
		select: "Select",
		validDates: "Valid from {{-validStart,}} to {{-validExpiry,}}"
	},
	openingExternalProtocol: {
		title: "Link with custom protocol",
		message: "{{- protocol }} link requires an external application.",
		detail: "The requested link is {{- url }} . Do you want to continue?",
		dontAskAgain: "Always open these types of links in the associated app",
		yes: "Yes",
		no: "No"
	}
};
var downloads = {
	title: "Downloads",
	filters: {
		search: "Search",
		server: "Server",
		mimeType: "Type",
		status: "Status",
		clear: "Clear filters",
		all: "All",
		mimes: {
			images: "Images",
			videos: "Videos",
			audios: "Audios",
			texts: "Texts",
			files: "Files"
		},
		statuses: {
			paused: "Paused",
			cancelled: "Cancelled"
		}
	},
	item: {
		cancel: "Cancel",
		copyLink: "Copy link",
		errored: "Download cancelled",
		pause: "Pause",
		progressSize: "{{receivedBytes, byteSize}} of {{totalBytes, byteSize}} ({{ratio, percentage}})",
		remove: "Remove from list",
		resume: "Resume",
		retry: "Retry",
		showInFolder: "Show in Folder"
	},
	showingResults: "Showing results {{first}} - {{last}} of {{count}}"
};
var error = {
	authNeeded: "Auth needed, try <strong>{{- auth}}</strong>",
	connectTimeout: "Timeout trying to connect",
	differentCertificate: "Certificate is different from previous one.\n\n {{- detail}}",
	noValidServerFound: "No valid server found at the URL",
	offline: "Check your Internet connection!"
};
var landing = {
	invalidUrl: "Invalid url",
	validating: "Validating...",
	inputUrl: "Enter your server URL",
	connect: "Connect"
};
var menus = {
	about: "About {{- appName}}",
	addNewServer: "Add &new server",
	back: "&Back",
	clearTrustedCertificates: "Clear trusted certificates",
	close: "Close",
	copy: "&Copy",
	cut: "Cu&t",
	disableGpu: "Disable GPU",
	documentation: "Documentation",
	downloads: "Downloads",
	editMenu: "&Edit",
	fileMenu: "&File",
	forward: "&Forward",
	helpMenu: "&Help",
	hide: "Hide {{- appName}}",
	hideOthers: "Hide Others",
	learnMore: "Learn more",
	minimize: "Minimize",
	openDevTools: "Open &DevTools",
	paste: "&Paste",
	quit: "&Quit {{- appName}}",
	redo: "&Redo",
	reload: "&Reload",
	reloadIgnoringCache: "Reload ignoring cache",
	reportIssue: "Report issue",
	resetAppData: "Reset app data",
	resetZoom: "Reset zoom",
	selectAll: "Select &all",
	services: "Services",
	showFullScreen: "Full screen",
	showMenuBar: "Menu bar",
	showOnUnreadMessage: "Show on unread messages",
	showServerList: "Server list",
	showTrayIcon: "Tray icon",
	toggleDevTools: "Toggle &DevTools",
	undo: "&Undo",
	unhide: "Show All",
	viewMenu: "&View",
	windowMenu: "&Window",
	zoomIn: "Zoom in",
	zoomOut: "Zoom out"
};
var loadingError = {
	title: "Server Failed to Load",
	announcement: "Houston, we have a problem",
	reload: "Reload"
};
var selfxss = {
	title: "Stop!",
	description: "This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a Rocket.Chat feature or \"hack\" someone's account, it is a scam and will give them access to your Rocket.Chat account.",
	moreInfo: "See https://go.rocket.chat/i/xss for more information."
};
var sidebar = {
	addNewServer: "Add new server",
	downloads: "Downloads",
	item: {
		reload: "Reload server",
		remove: "Remove server",
		openDevTools: "Open DevTools"
	}
};
var touchBar = {
	formatting: "Formatting",
	selectServer: "Select server"
};
var tray = {
	menu: {
		show: "Show",
		hide: "Hide",
		quit: "Quit"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: no unread message",
		unreadMention: "{{- appName}}: you have a unread mention/direct message",
		unreadMention_plural: "{{- appName}}: you have {{- count}} unread mentions/direct messages",
		unreadMessage: "{{- appName}}: you have unread messages"
	},
	balloon: {
		stillRunning: {
			title: "{{- appName}} is still running",
			content: "{{- appName }} is set to stay running in the system tray/notification area."
		}
	}
};
var en_i18n = {
	contextMenu: contextMenu,
	dialog: dialog,
	downloads: downloads,
	error: error,
	landing: landing,
	menus: menus,
	loadingError: loadingError,
	selfxss: selfxss,
	sidebar: sidebar,
	touchBar: touchBar,
	tray: tray
};

exports.contextMenu = contextMenu;
exports.default = en_i18n;
exports.dialog = dialog;
exports.downloads = downloads;
exports.error = error;
exports.landing = landing;
exports.loadingError = loadingError;
exports.menus = menus;
exports.selfxss = selfxss;
exports.sidebar = sidebar;
exports.touchBar = touchBar;
exports.tray = tray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW4uaTE4bi1hNTA2NWEzNS5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
