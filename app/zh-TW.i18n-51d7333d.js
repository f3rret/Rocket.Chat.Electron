'use strict';

var contextMenu = {
	cut: "剪下 (&T)",
	copy: "複製 (&C)",
	paste: "貼上 (&P)",
	selectAll: "全選 (&A)",
	undo: "復原 (&U)",
	redo: "重做 (&R)",
	spellingLanguages: "拼字檢查",
	moreSpellingSuggestions: "更多拼字建議",
	noSpellingSuggestions: "沒有拼字建議",
	copyLinkAddress: "複製連結",
	copyLinkText: "複製連結文字",
	openLink: "開啟連結",
	saveImageAs: "儲存影像為..."
};
var dialog = {
	about: {
		title: "關於 {{- appName}}",
		version: "版本: <1>{{-version}}</1>",
		checkUpdates: "檢查更新",
		checkUpdatesOnStart: "啟動時檢查更新",
		noUpdatesAvailable: "目前沒有可用的更新",
		copyright: "版權 {{copyright}}"
	},
	addServer: {
		title: "新增伺服器",
		message: "您是否要將 \"{{- host}}\" 新增到您的伺服器列表中？",
		add: "新增",
		cancel: "取消"
	},
	addServerError: {
		title: "無效的網址",
		message: "網址 \"{{- host}}\" 無法驗證，因此沒有新增。"
	},
	certificateError: {
		title: "憑證錯誤",
		message: "您是否要信任來自 \"{{- issuerName}}\" 的憑證？",
		yes: "是",
		no: "否"
	},
	resetAppData: {
		title: "回復程式設定",
		message: "這將會把您從所有團隊中退出，並將程式回復至原廠設定。這個操作無法被復原。",
		yes: "是",
		cancel: "取消"
	},
	screenshare: {
		title: "分享您的畫面",
		announcement: "選擇要分享的畫面"
	},
	update: {
		title: "可用的更新",
		announcement: "有新的更新程式",
		message: "有新版本的 Rocket.Chat 桌面應用程式！",
		currentVersion: "目前版本:",
		newVersion: "最新版本:",
		install: "安裝更新",
		remindLater: "稍後再提醒我",
		skip: "略過這個版本"
	},
	updateDownloading: {
		title: "正在下載更新",
		message: "當準備好可以安裝更新程式的時候，您將會收到通知。",
		ok: "好"
	},
	updateInstallLater: {
		title: "稍後再安裝",
		message: "結束程式的時候將會安裝更新",
		ok: "OK"
	},
	updateReady: {
		title: "已準備好安裝更新",
		message: "更新程式已下載完畢",
		installNow: "立刻安裝",
		installLater: "稍後安裝"
	},
	updateSkip: {
		title: "忽略更新",
		message: "我們將會在下次有新的更新版本的時候通知您\n如果您改變主意想安裝此次更新，您可以從「關於」的選單中檢視更新",
		ok: "好"
	}
};
var error = {
	authNeeded: "需要驗證，請嘗試 <strong>{{- auth}}</strong>",
	connectTimeout: "連線逾時",
	differentCertificate: "憑證與之前的不同。\n\n {{- detail}}",
	noValidServerFound: "在這個網址找不到有效的伺服器",
	offline: "請檢查您的網際網路連線！"
};
var landing = {
	invalidUrl: "無效的網址",
	validating: "驗證中...",
	inputUrl: "請輸入您的伺服器網址",
	connect: "連線"
};
var menus = {
	about: "關於 {{- appName}}",
	addNewServer: "新增伺服器",
	back: "上一步 (&B)",
	clearTrustedCertificates: "清除已信任的憑證",
	close: "關閉",
	copy: "複製 (&C)",
	cut: "剪下 (&T)",
	documentation: "文件",
	editMenu: "編輯 (&E)",
	fileMenu: "檔案 (&F)",
	forward: "下一步 (&F)",
	helpMenu: "幫助 (&H)",
	learnMore: "了解更多",
	minimize: "最小化",
	openDevTools: "開啟開發工具 (&D)",
	paste: "貼上 (&P)",
	quit: "結束 (&Q) {{- appName}}",
	redo: "重做 (&R)",
	reload: "重新載入 (&R)",
	reloadIgnoringCache: "重新載入忽略的快取",
	reportIssue: "問題回報",
	resetAppData: "回復程式設定",
	resetZoom: "重置縮放比率",
	selectAll: "選擇全部 (&A)",
	showFullScreen: "全螢幕",
	showMenuBar: "選單",
	showOnUnreadMessage: "顯示未讀取的訊息",
	showServerList: "伺服器列表",
	showTrayIcon: "系統匣圖示",
	toggleDevTools: "切換開發工具 (&D)",
	undo: "還原 (&U)",
	viewMenu: "檢視 (&V)",
	windowMenu: "視窗 (&W)",
	zoomIn: "放大",
	zoomOut: "縮小"
};
var loadingError = {
	title: "伺服器載入失敗",
	announcement: "休士頓，我們遇到問題了",
	reload: "重新載入"
};
var sidebar = {
	addNewServer: "新增伺服器",
	item: {
		reload: "重新載入伺服器",
		remove: "移除伺服器",
		openDevTools: "開啟開發工具"
	}
};
var touchBar = {
	formatting: "Formatting",
	selectServer: "選擇伺服器"
};
var tray = {
	menu: {
		show: "顯示",
		hide: "隱藏",
		quit: "結束"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: 沒有未讀的訊息",
		unreadMention: "{{- appName}}: 您有未讀的直接或提及到您的訊息",
		unreadMention_plural: "{{- appName}}: 您有 {{- count}} 封未讀的直接或提及到您的訊息",
		unreadMessage: "{{- appName}}: 您有未讀的訊息"
	}
};
var zhTW_i18n = {
	contextMenu: contextMenu,
	dialog: dialog,
	error: error,
	landing: landing,
	menus: menus,
	loadingError: loadingError,
	sidebar: sidebar,
	touchBar: touchBar,
	tray: tray
};

exports.contextMenu = contextMenu;
exports.default = zhTW_i18n;
exports.dialog = dialog;
exports.error = error;
exports.landing = landing;
exports.loadingError = loadingError;
exports.menus = menus;
exports.sidebar = sidebar;
exports.touchBar = touchBar;
exports.tray = tray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemgtVFcuaTE4bi01MWQ3MzMzZC5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
