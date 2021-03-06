'use strict';

var contextMenu = {
	cut: "剪切 (&T)",
	copy: "复制 (&P)",
	paste: "粘贴 (&P)",
	selectAll: "全选 (&A)",
	undo: "复原 (&U)",
	redo: "重做 (&R)",
	spellingLanguages: "拼写检查",
	moreSpellingSuggestions: "其他拼写建议",
	noSpellingSuggestions: "没有拼写建议",
	copyLinkAddress: "复制链接URL",
	copyLinkText: "复制链接文字",
	openLink: "打开链接",
	saveImageAs: "保存图片..."
};
var dialog = {
	about: {
		title: "关于 {{- appName}}",
		version: "版本: <1>{{-version}}</1>",
		checkUpdates: "检查更新",
		checkUpdatesOnStart: "启动时检查更新",
		noUpdatesAvailable: "目前沒有可用的更新",
		copyright: "版权 {{copyright}}"
	},
	addServer: {
		title: "新增服务器",
		message: "您是否要将 \"{{- host}}\" 新增到您的服务器列表中？",
		add: "新增",
		cancel: "取消"
	},
	addServerError: {
		title: "无效的网址",
		message: "网址 \"{{- host}}\" 无法验证，因此沒有新增。"
	},
	certificateError: {
		title: "证书错误",
		message: "您是否要信任來自 \"{{- issuerName}}\" 的证书？",
		yes: "是",
		no: "否"
	},
	resetAppData: {
		title: "重置应用数据",
		message: "您可以退出所有团队并将应用程序恢复为其原始设置。这将无法撤消。",
		yes: "是",
		cancel: "取消"
	},
	screenshare: {
		title: "分享您的画面",
		announcement: "选择要分享的画面"
	},
	update: {
		title: "可用的更新",
		announcement: "有新的更新程序",
		message: "有新版本的 Rocket.Chat 桌面应用程序！",
		currentVersion: "目前版本:",
		newVersion: "最新版本:",
		install: "安裝更新",
		remindLater: "稍后再提醒我",
		skip: "忽略这个版本"
	},
	updateDownloading: {
		title: "正在下载更新",
		message: "当准备好可以安装更新程序的时候，您将会收到通知。",
		ok: "好"
	},
	updateInstallLater: {
		title: "稍后再安裝",
		message: "结束程序的时候将会安装更新",
		ok: "OK"
	},
	updateReady: {
		title: "已准备好安装更新",
		message: "更新程序已下载完毕",
		installNow: "立刻安裝",
		installLater: "稍后安裝"
	},
	updateSkip: {
		title: "忽略更新",
		message: "我们将会在下次有新的更新版本的时候通知您\n如果您改变主意想安装此处更新，您可以从「关于」的选项中检查更新。",
		ok: "好"
	}
};
var error = {
	authNeeded: "需要验证，请重新验证 <strong>{{- auth}}</strong>",
	connectTimeout: "连接超时",
	differentCertificate: "证书与之前的不同。\n\n {{- detail}}",
	noValidServerFound: "在这个网址找不到有效的服务器",
	offline: "请检查您的网络连接！"
};
var landing = {
	invalidUrl: "无效的网址",
	validating: "验证中...",
	inputUrl: "请输入您的服务器网址",
	connect: "连接"
};
var menus = {
	about: "关于 {{- appName}}",
	addNewServer: "新增服务器",
	back: "上一步 (&B)",
	clearTrustedCertificates: "清除已信任的证书",
	close: "关闭",
	copy: "复制 (&C)",
	cut: "剪切 (&T)",
	documentation: "文件",
	editMenu: "编辑 (&E)",
	fileMenu: "文件 (&F)",
	forward: "下一步 (&F)",
	helpMenu: "帮助 (&H)",
	learnMore: "了解更多",
	minimize: "最小化",
	openDevTools: "开启开发工具 (&D)",
	paste: "粘贴 (&P)",
	quit: "结束 (&Q) {{- appName}}",
	redo: "重做 (&R)",
	reload: "重新载入 (&R)",
	reloadIgnoringCache: "忽略缓存并重新加载",
	reportIssue: "报告问题",
	resetAppData: "重置应用数据",
	resetZoom: "重置缩放",
	selectAll: "选择全部 (&A)",
	showFullScreen: "全屏幕",
	showMenuBar: "选项",
	showOnUnreadMessage: "显示未读取的信息",
	showServerList: "服务器列表",
	showTrayIcon: "托盘图标",
	toggleDevTools: "切换开发工具 (&D)",
	undo: "还原 (&U)",
	viewMenu: "显示 (&V)",
	windowMenu: "窗口 (&W)",
	zoomIn: "放大",
	zoomOut: "缩小"
};
var loadingError = {
	title: "服务器载入失败",
	announcement: "稍等一下，我们遇到问题了",
	reload: "重新載入"
};
var sidebar = {
	addNewServer: "新增服务器",
	item: {
		reload: "重新载入服务器",
		remove: "移除服务器",
		openDevTools: "开启开发工具"
	}
};
var touchBar = {
	formatting: "格式化",
	selectServer: "选择服务器"
};
var tray = {
	menu: {
		show: "显示",
		hide: "隐藏",
		quit: "结束"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: 没有未读的信息",
		unreadMention: "{{- appName}}: 您有未读的直接或提及到您的信息",
		unreadMention_plural: "{{- appName}}: 您有 {{- count}} 封未读的直接或提及到您的信息",
		unreadMessage: "{{- appName}}: 您有未读的信息"
	}
};
var zhCN_i18n = {
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
exports.default = zhCN_i18n;
exports.dialog = dialog;
exports.error = error;
exports.landing = landing;
exports.loadingError = loadingError;
exports.menus = menus;
exports.sidebar = sidebar;
exports.touchBar = touchBar;
exports.tray = tray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiemgtQ04uaTE4bi00YzczYzMwZS5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
