'use strict';

var contextMenu = {
	cut: "&Ausschneiden",
	copy: "&Kopieren",
	paste: "&Einfügen",
	selectAll: "Alle auswählen",
	undo: "Wider&rufen",
	redo: "Wieder&holen",
	spellingLanguages: "Sprachen für die Rechtschreibprüfung",
	moreSpellingSuggestions: "Mehr Rechtschreibvorschläge",
	noSpellingSuggestions: "Keine Vorschläge",
	copyLinkAddress: "Link kopieren",
	openLink: "Link öffnen"
};
var dialog = {
	about: {
		title: "Über {{- appName}}",
		version: "Version: <1>{{-version}}</1>",
		checkUpdates: "Auf Aktualisierungen prüfen",
		checkUpdatesOnStart: "Beim Start auf Aktualisierungen prüfen",
		copyright: "Copyright {{copyright}}"
	},
	addServer: {
		title: "Server hinzufügen",
		message: "Möchten Sie \"{{- host}}\" zu Ihrer Serverliste hinzufügen?",
		add: "Hinzufügen",
		cancel: "Abbrechen"
	},
	addServerError: {
		title: "Ungültiger Host",
		message: "Der Host \"{{- host}}\" konnte nicht validiert werden, er wurde also nicht hinzugefügt."
	},
	certificateError: {
		title: "Zertifikatsfehler",
		message: "Vertrauen Sie dem Zertifikat von \"{{- issuerName}}\"?",
		yes: "Ja",
		no: "Nein"
	},
	resetAppData: {
		yes: "Ja",
		cancel: "Abbrechen"
	},
	screenshare: {
		title: "Bildschirm teilen",
		announcement: "Wählen Sie den zu teilenden Bildschirm aus"
	},
	update: {
		title: "Aktualisierung verfügbar",
		announcement: "Neue Aktualisierung verfügbar",
		message: "Eine neue Version der Rocket.Chat Desktop App ist verfügbar!",
		currentVersion: "Aktuelle Version:",
		newVersion: "Neue Version:",
		install: "Update installieren",
		remindLater: "Später erinnern",
		skip: "Diese Version überspringen"
	},
	updateDownloading: {
		title: "Aktualisierung wird heruntergeladen",
		message: "Sie werden benachrichtigt, wenn die Aktualisierung bereit zur Installation ist"
	},
	updateInstallLater: {
		title: "Wird später installiert",
		message: "Die Aktualisierung wird durchgeführt, wenn Sie die App beenden"
	},
	updateReady: {
		title: "Aktualisierung bereit zur Installation",
		message: "Aktualisierung wurde heruntergeladen",
		installNow: "Jetzt installieren",
		installLater: "Später installieren"
	},
	updateSkip: {
		title: "Aktualisierung überspringen",
		message: "Wir werden Sie benachrichtigen, wenn die nächste Aktualisierung verfügbar ist\n Wenn Sie Ihre Meinung ändern, können Sie im Über Menü nach Aktualisierungen suchen."
	}
};
var error = {
	authNeeded: "Auth benötigt, probieren Sie <strong>{{- auth}}</strong>",
	connectTimeout: "Zeitüberschreitung beim Verbindungsaufbau",
	differentCertificate: "Zertifikat unterscheidet sich vom Vorigen.\n\n {{- detail}}",
	noValidServerFound: "Kein gültiger Server unter dieser URL gefunden",
	offline: "Überprüfen Sie Ihre Internetverbindung!"
};
var landing = {
	invalidUrl: "Ungültige url",
	validating: "Validieren...",
	inputUrl: "Server URL eingeben",
	connect: "Verbinden"
};
var menus = {
	about: "Über {{- appName}}",
	addNewServer: "&Neuen server hinzufügen",
	clearTrustedCertificates: "Vertraute zertifikate löschen",
	close: "Schließen",
	copy: "&Kopieren",
	cut: "&Ausschneiden",
	documentation: "Dokumentation",
	editMenu: "&Bearbeiten",
	fileMenu: "&Datei",
	helpMenu: "&Hilfe",
	learnMore: "Mehr erfahren",
	minimize: "Minimieren",
	openDevTools: "&DevTools öffnen",
	paste: "&Einfügen",
	quit: "{{- appName}} &beenden",
	redo: "Wieder&holen",
	reload: "&Neu laden",
	reportIssue: "Problem melden",
	resetAppData: "Appdaten löschen",
	resetZoom: "Originalgröße",
	selectAll: "Alle auswählen",
	showFullScreen: "Vollbildmodus",
	showMenuBar: "MenuBar",
	showServerList: "Server liste",
	showTrayIcon: "Symbole in menüleiste",
	toggleDevTools: "&DevTools ein-/ausblenden",
	undo: "Wider&rufen",
	viewMenu: "Darstellung",
	windowMenu: "&Fenster",
	zoomIn: "Vergrößern",
	zoomOut: "Verkleinern"
};
var loadingError = {
	title: "Server konnte nicht geladen werden",
	reload: "Neu laden"
};
var sidebar = {
	addNewServer: "Neuen Server hinzufügen",
	item: {
		reload: "Server neu laden",
		remove: "Server entfernen",
		openDevTools: "DevTools öffnen"
	}
};
var tray = {
	menu: {
		show: "Anzeigen",
		hide: "Ausblenden",
		quit: "Beenden"
	}
};
var deDE_i18n = {
	contextMenu: contextMenu,
	dialog: dialog,
	error: error,
	landing: landing,
	menus: menus,
	loadingError: loadingError,
	sidebar: sidebar,
	tray: tray
};

exports.contextMenu = contextMenu;
exports.default = deDE_i18n;
exports.dialog = dialog;
exports.error = error;
exports.landing = landing;
exports.loadingError = loadingError;
exports.menus = menus;
exports.sidebar = sidebar;
exports.tray = tray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGUtREUuaTE4bi1kOGI3NzczZC5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
