'use strict';

var contextMenu = {
	cut: "&Kivágás",
	copy: "&Másolás",
	paste: "&Beillesztés",
	selectAll: "Öss&zes kijelölése",
	undo: "&Visszavonás",
	redo: "&Ismétlés",
	spelling: "Helyesírás",
	spellingLanguages: "Helyesírás-ellenőrzés nyelvei",
	moreSpellingSuggestions: "Több helyesírási javaslat",
	noSpellingSuggestions: "Nincsenek javaslatok",
	copyLinkAddress: "Hivatkozás címének másolása",
	copyLinkText: "Hivatkozás szövegének másolása",
	openLink: "Hivatkozás megnyitása",
	saveImageAs: "Kép mentése másként…"
};
var dialog = {
	about: {
		title: "A {{- appName}} névjegye",
		version: "Verzió: <1>{{-version}}</1>",
		checkUpdates: "Frissítések keresése",
		checkUpdatesOnStart: "Frissítések keresése indításkor",
		noUpdatesAvailable: "Nincsenek elérhető frissítések.",
		copyright: "Copyright {{copyright}}",
		errorWhenLookingForUpdates: "Hiba történt a frissítések keresésekor"
	},
	addServer: {
		title: "Kiszolgáló hozzáadása",
		message: "Szeretné hozzáadni a(z) „{{- host}}” kiszolgálót a kiszolgálólistájához?",
		add: "Hozzáadás",
		cancel: "Mégse"
	},
	addServerError: {
		title: "Érvénytelen kiszolgáló",
		message: "A(z) „{{- host}}” kiszolgálót nem sikerült ellenőrizni, ezért nem lett hozzáadva."
	},
	certificateError: {
		title: "Tanúsítványhiba",
		message: "Megbízik a(z) „{{- issuerName}}” által kiadott tanúsítványban?",
		yes: "Igen",
		no: "Nem"
	},
	downloadRemoval: {
		title: "Biztos benne?",
		message: "Eltávolítja ezt a letöltést?",
		yes: "Igen",
		no: "Nem"
	},
	resetAppData: {
		title: "Alkalmazásadatok visszaállítása",
		message: "Ez kijelentkezteti az összes csapatból, és visszaállítja az alkalmazást az eredeti beállításokra. Ezt nem lehet visszavonni.",
		yes: "Igen",
		cancel: "Mégse"
	},
	screenshare: {
		title: "Képernyő megosztása",
		announcement: "Megosztandó képernyő kiválasztása"
	},
	update: {
		title: "Frissítés érhető el",
		announcement: "Új frissítés érhető el",
		message: "Elérhető a Rocket.Chat asztali alkalmazás új verziója!",
		currentVersion: "Jelenlegi verzió:",
		newVersion: "Új verzió:",
		install: "Frissítés telepítése",
		remindLater: "Emlékeztessen később",
		skip: "A verzió kihagyása"
	},
	updateDownloading: {
		title: "Frissítés letöltése",
		message: "Értesítést fog kapni, ha a frissítés készen áll a telepítésre",
		ok: "Rendben"
	},
	updateInstallLater: {
		title: "Telepítés később",
		message: "A frissítés akkor lesz telepítve, ha kilép az alkalmazásból",
		ok: "Rendben"
	},
	updateReady: {
		title: "A frissítés telepítésre kész",
		message: "A frissítés letöltődött",
		installNow: "Telepítés most",
		installLater: "Telepítés később"
	},
	updateSkip: {
		title: "Frissítés kihagyása",
		message: "Értesíteni fogjuk, ha a következő frissítés elérhető\nHa meggondolja magát, akkor a Névjegy menüből kereshet új frissítéseket.",
		ok: "Rendben"
	},
	selectClientCertificate: {
		announcement: "Tanúsítvány kiválasztása",
		select: "Kiválasztás",
		validDates: "Érvényes {{-validStart,}} és {{-validExpiry,}} között"
	},
	openingExternalProtocol: {
		title: "Hivatkozás egyéni protokollal",
		message: "A(z) {{- protocol }} hivatkozás külső alkalmazást igényel.",
		detail: "A kért hivatkozás: {{- url }} . Szeretné folytatni?",
		dontAskAgain: "Mindig a hozzárendelt alkalmazásban nyissa meg az ilyen típusú hivatkozásokat",
		yes: "Igen",
		no: "Nem"
	}
};
var downloads = {
	title: "Letöltések",
	filters: {
		search: "Keresés",
		server: "Kiszolgáló",
		mimeType: "Típus",
		status: "Állapot",
		clear: "Szűrők törlése",
		all: "Összes",
		mimes: {
			images: "Képek",
			videos: "Videók",
			audios: "Hangok",
			texts: "Szövegek",
			files: "Fájlok"
		},
		statuses: {
			paused: "Szüneteltetve",
			cancelled: "Megszakítva"
		}
	},
	item: {
		cancel: "Mégse",
		copyLink: "Hivatkozás másolása",
		errored: "Letöltés megszakítva",
		pause: "Szüneteltetés",
		progressSize: "{{receivedBytes, byteSize}} / {{totalBytes, byteSize}} ({{ratio, percentage}})",
		remove: "Eltávolítás a listáról",
		resume: "Folytatás",
		retry: "Újrapróbálás",
		showInFolder: "Megjelenítés mappában"
	},
	showingResults: "Eredmények megjelenítése: {{first}} - {{last}} / {{count}}"
};
var error = {
	authNeeded: "Hitelesítés szükséges, próbálja ezt: <strong>{{- auth}}</strong>",
	connectTimeout: "A kapcsolódási kísérlet túllépte az időkorlátot",
	differentCertificate: "A tanúsítvány eltér az előzőtől.\n\n {{- detail}}",
	noValidServerFound: "Nem található érvényes kiszolgáló az URL-en",
	offline: "Ellenőrizze az internetkapcsolatát!"
};
var landing = {
	invalidUrl: "Érvénytelen URL",
	validating: "Ellenőrzés…",
	inputUrl: "Kiszolgáló URL-ének megadása",
	connect: "Kapcsolódás"
};
var menus = {
	about: "A {{- appName}} névjegye",
	addNewServer: "Új &kiszolgáló hozzáadása",
	back: "&Vissza",
	clearTrustedCertificates: "Megbízható tanúsítványok törlése",
	close: "Bezárás",
	copy: "&Másolás",
	cut: "&Kivágás",
	disableGpu: "GPU letiltása",
	documentation: "Dokumentáció",
	downloads: "Letöltések",
	editMenu: "S&zerkesztés",
	fileMenu: "&Fájl",
	forward: "&Előre",
	helpMenu: "&Súgó",
	hide: "A {{- appName}} elrejtése",
	hideOthers: "Egyebek elrejtése",
	learnMore: "További információk",
	minimize: "Kis méret",
	openDevTools: "&Fejlesztői eszközök megnyitása",
	paste: "&Beillesztés",
	quit: "&Kilépés a {{- appName}} programból",
	redo: "&Ismétlés",
	reload: "Új&ratöltés",
	reloadIgnoringCache: "Újratöltés gyorsítótár mellőzésével",
	reportIssue: "Probléma jelentése",
	resetAppData: "Alkalmazásadatok visszaállítása",
	resetZoom: "Nagyítás visszaállítása",
	selectAll: "Öss&zes kijelölése",
	services: "Szolgáltatások",
	showFullScreen: "Teljes képernyő",
	showMenuBar: "Menüsáv",
	showOnUnreadMessage: "Megjelenítés olvasatlan üzeneteknél",
	showServerList: "Kiszolgálólista",
	showTrayIcon: "Tálcaikon",
	toggleDevTools: "&Fejlesztői eszközök ki- és bekapcsolása",
	undo: "&Visszavonás",
	unhide: "Összes megjelenítése",
	viewMenu: "&Nézet",
	windowMenu: "&Ablak",
	zoomIn: "Nagyítás",
	zoomOut: "Kicsinyítés"
};
var loadingError = {
	title: "Kiszolgáló betöltése sikertelen",
	announcement: "Houston, baj van!",
	reload: "Újratöltés"
};
var selfxss = {
	title: "Megállj!",
	description: "Ez a böngészőfunkció fejlesztők számára készült. Ha valaki azt mondja, hogy másoljon le és illesszen be valamit ide, azért hogy egy Rocket.Chat funkciót engedélyezzen vagy feltörje valaki más fiókját, akkor az átverés, és hozzáférést fog adni nekik az Ön Rocket.Chat fiókjához.",
	moreInfo: "További információkért nézze meg a https://go.rocket.chat/i/xss oldalt."
};
var sidebar = {
	addNewServer: "Új kiszolgáló hozzáadása",
	downloads: "Letöltések",
	item: {
		reload: "Kiszolgáló újratöltése",
		remove: "Kiszolgáló eltávolítása",
		openDevTools: "Fejlesztői eszközök megnyitása"
	}
};
var touchBar = {
	formatting: "Formázás",
	selectServer: "Kiszolgáló kiválasztása"
};
var tray = {
	menu: {
		show: "Megjelenítés",
		hide: "Elrejtés",
		quit: "Kilépés"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: nincs olvasatlan üzenet",
		unreadMention: "{{- appName}}: egy olvasatlan értesítése vagy közvetlen üzenete van",
		unreadMention_plural: "{{- appName}}: {{- count}} olvasatlan értesítése vagy közvetlen üzenete van",
		unreadMessage: "{{- appName}}: olvasatlan üzenetei vannak"
	},
	balloon: {
		stillRunning: {
			title: "A {{- appName}} továbbra is fut",
			content: "A {{- appName }} úgy lett beállítva, hogy futva maradjon a rendszertálcán vagy az értesítési területen."
		}
	}
};
var hu_i18n = {
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
exports.default = hu_i18n;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHUuaTE4bi0xMGZhZTFlOC5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
