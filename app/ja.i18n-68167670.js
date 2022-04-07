'use strict';

var contextMenu = {
	cut: "切り取り (&T)",
	copy: "コピー (&C)",
	paste: "貼り付け (&P)",
	selectAll: "全て選択 (&A)",
	undo: "元に戻す (&U)",
	redo: "やり直し (&R)",
	spellingLanguages: "スペルチェックの言語",
	moreSpellingSuggestions: "その他のスペルの提案",
	noSpellingSuggestions: "提案はありません",
	copyLinkAddress: "リンクURLをコピー",
	copyLinkText: "リンクテキストをコピー",
	openLink: "リンクを開く",
	saveImageAs: "画像を保存..."
};
var dialog = {
	about: {
		title: "{{- appName}} について",
		version: "バージョン: <1>{{-version}}</1>",
		checkUpdates: "アップデートを確認",
		checkUpdatesOnStart: "起動時に更新を確認",
		noUpdatesAvailable: "利用可能な更新はありません。",
		copyright: "著作権 {{copyright}}"
	},
	addServer: {
		title: "サーバーを追加",
		message: "サーバーリストに\"{{- host}}\"を追加しますか?",
		add: "追加",
		cancel: "キャンセル"
	},
	addServerError: {
		title: "無効なホスト",
		message: "ホスト \"{{- host}}\" を検証できなかったため、追加されませんでした。"
	},
	certificateError: {
		title: "証明書のエラー",
		message: "\"{{- issuerName}}\"から証明書を信頼しますか?",
		yes: "はい",
		no: "いいえ"
	},
	resetAppData: {
		title: "アプリのデータをリセット",
		message: "すべてのチームからログアウトしアプリを元の設定に戻すことができます。 これは元に戻すことはできません。",
		yes: "はい",
		cancel: "キャンセル"
	},
	screenshare: {
		title: "画面共有",
		announcement: "共有する画面を選択"
	},
	update: {
		title: "利用可能な更新",
		announcement: "新しい更新が利用可能です",
		message: "Rocket.Chat デスクトップアプリの新しいバージョンが利用可能です!",
		currentVersion: "現在のバージョン:",
		newVersion: "新しいバージョン:",
		install: "更新プログラムをインストール",
		remindLater: "後で知らせる",
		skip: "このバージョンをスキップ"
	},
	updateDownloading: {
		title: "更新プログラムをダウンロード中",
		message: "更新プログラムのインストール準備が整うと通知されます",
		ok: "OK"
	},
	updateInstallLater: {
		title: "後でインストール",
		message: "アプリを終了すると更新プログラムがインストールされます",
		ok: "OK"
	},
	updateReady: {
		title: "更新プログラムをインストールする準備が整いました",
		message: "更新プログラムがダウンロードされました",
		installNow: "今すぐインストール",
		installLater: "後でインストール"
	},
	updateSkip: {
		title: "更新をスキップ",
		message: "次回の更新プログラムが利用可能になったときにお知らせします。\n気になる場合は[バージョン情報]メニューから更新プログラムを確認できます。",
		ok: "OK"
	}
};
var error = {
	authNeeded: "認証が必要です。<strong>{{- auth}}</strong> を試してみてください。",
	connectTimeout: "再接続がタイムアウトしました",
	differentCertificate: "証明書は以前の証明書とは異なります。\n\n {{- detail}}",
	noValidServerFound: "そのURLで有効なサーバーは見つかりません",
	offline: "インターネット接続を確認してください!"
};
var landing = {
	invalidUrl: "無効なURL",
	validating: "検証中...",
	inputUrl: "サーバーのURLを入力してください",
	connect: "接続"
};
var menus = {
	about: "{{- appName}} について",
	addNewServer: "新しいサーバーを追加 (&N)",
	back: "戻る (&B)",
	clearTrustedCertificates: "信頼する証明書をクリア",
	close: "閉じる",
	copy: "コピー (&C)",
	cut: "切り取り (&T)",
	documentation: "ドキュメント",
	editMenu: "編集 (&E)",
	fileMenu: "ファイル (&F)",
	forward: "進む(&F)",
	helpMenu: "ヘルプ (&H)",
	learnMore: "もっと詳しく知る",
	minimize: "最小化",
	openDevTools: "開発ツールを開く (&D)",
	paste: "貼り付け (&P)",
	quit: "{{- appName}} を終了 (&Q)",
	redo: "やり直し (&R)",
	reload: "再読み込み(&R)",
	reloadIgnoringCache: "キャッシュを無視して再読み込み",
	reportIssue: "問題を報告する",
	resetAppData: "アプリデータをリセット",
	resetZoom: "ズームをリセット",
	selectAll: "全て選択 (&A)",
	showFullScreen: "全画面",
	showMenuBar: "メニューバー",
	showOnUnreadMessage: "未読メッセージを表示",
	showServerList: "サーバー一覧",
	showTrayIcon: "トレイアイコン",
	toggleDevTools: "開発ツールの切り替え (&D)",
	undo: "元に戻す (&U)",
	viewMenu: "表示 (&V)",
	windowMenu: "ウィンドウ (&W)",
	zoomIn: "拡大",
	zoomOut: "縮小"
};
var loadingError = {
	title: "サーバーの読み込みに失敗しました",
	announcement: "ヒューストン、我々は問題を抱えています",
	reload: "再読み込み"
};
var sidebar = {
	addNewServer: "新しいサーバーを追加",
	item: {
		reload: "サーバーを再読み込み",
		remove: "サーバーを削除",
		openDevTools: "開発ツールを開く"
	}
};
var touchBar = {
	formatting: "書式",
	selectServer: "サーバーを選択"
};
var tray = {
	menu: {
		show: "表示",
		hide: "隠す",
		quit: "終了"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: 未読のメッセージはありません",
		unreadMention: "{{- appName}}: 未読のメンション/ダイレクトメッセージがあります",
		unreadMention_plural: "{{- appName}}: 未読のメンション/ダイレクトメッセージが {{- count}} 件あります",
		unreadMessage: "{{- appName}}: 未読のメッセージがあります"
	}
};
var ja_i18n = {
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
exports.default = ja_i18n;
exports.dialog = dialog;
exports.error = error;
exports.landing = landing;
exports.loadingError = loadingError;
exports.menus = menus;
exports.sidebar = sidebar;
exports.touchBar = touchBar;
exports.tray = tray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiamEuaTE4bi02ODE2NzY3MC5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7In0=
