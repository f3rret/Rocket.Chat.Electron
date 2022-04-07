'use strict';

var contextMenu = {
	cut: "Cou&per",
	copy: "&Copier",
	paste: "&Coller",
	selectAll: "&Tout sélectionner",
	undo: "&Annuler",
	redo: "&Rétablir",
	spelling: "Orthographe",
	spellingLanguages: "Langues d'orthographe",
	moreSpellingSuggestions: "Plus de suggestions d'orthographe",
	noSpellingSuggestions: "Pas de suggestions",
	copyLinkAddress: "Copier le lien",
	copyLinkText: "Copier le texte du lien",
	openLink: "Ouvrir le lien",
	saveImageAs: "Enregistrer l'image sous..."
};
var dialog = {
	about: {
		title: "À propos de {{- appName}}",
		version: "Version : <1>{{-version}}</1>",
		checkUpdates: "Vérifier les mises à jour",
		checkUpdatesOnStart: "Vérifier les mises à jour au démarrage",
		noUpdatesAvailable: "Aucune mise à jour n'est disponible.",
		copyright: "Copyright {{copyright}}",
		errorWhenLookingForUpdates: "Une erreur s'est produite lors de la recherche de mises à jour"
	},
	addServer: {
		title: "Ajouter un serveur",
		message: "Vous voulez ajouter \"{{- host}}\" à votre liste de serveurs ?",
		add: "Ajouter",
		cancel: "Annuler"
	},
	addServerError: {
		title: "Hôte invalide",
		message: "L'hôte \"{{- host}}\" n'a pas pu être validé, donc n'a pas été ajouté."
	},
	certificateError: {
		title: "Erreur de certificat",
		message: "Faites-vous confiance au certificat de \"{{- issuerName}}\" ?",
		yes: "Oui",
		no: "Non"
	},
	downloadRemoval: {
		title: "Etes-vous sûr ?",
		message: "Supprimer ce téléchargement ?",
		yes: "Oui",
		no: "Non"
	},
	resetAppData: {
		title: "Réinitialiser les données de l'application",
		message: "Cela vous déconnectera de toutes vos équipes et réinitialisera l'application à ses paramètres d'origine. Ceci ne peut pas être annulé.",
		yes: "Oui",
		cancel: "Annuler"
	},
	screenshare: {
		title: "Partagez votre écran",
		announcement: "Sélectionnez un écran à partager"
	},
	update: {
		title: "Une mise à jour est disponible",
		announcement: "Une nouvelle mise à jour est disponible",
		message: "Une mise à jour de Rocket.Chat Desktop App est disponible !",
		currentVersion: "Version actuelle :",
		newVersion: "Nouvelle version :",
		install: "Installer la mise à jour",
		remindLater: "Me rappeler plus tard",
		skip: "Ignorer cette version"
	},
	updateDownloading: {
		title: "Téléchargement de la mise à jour",
		message: "Vous serez averti quand la mise à jour sera prête à être installée",
		ok: "OK"
	},
	updateInstallLater: {
		title: "L'installation se fera plus tard",
		message: "La mise à jour sera installé à la fermeture de l'application",
		ok: "OK"
	},
	updateReady: {
		title: "La mise à jour est prête a être installée",
		message: "La mise à jour a été téléchargée",
		installNow: "Installer maintenant",
		installLater: "Installer plus tard"
	},
	updateSkip: {
		title: "Ignorer la mise à jour",
		message: "Vous serez averti quand la prochaine mise à jour sera disponible\nSi vous changez d'avis, vous pouvez vérifier les mises à jour dans le menu A propos.",
		ok: "OK"
	},
	selectClientCertificate: {
		announcement: "Sélectionnez un certificat",
		select: "Sélectionner",
		validDates: "Valable du {{-validStart,}} au {{-validExpiry,}}"
	},
	openingExternalProtocol: {
		title: "Lien avec un protocole personnalisé",
		message: "Lien {{- protocol }} nécessite une application externe.",
		detail: "Le lien demandé est {{- url }}. Voulez-vous continuer ?",
		dontAskAgain: "Ouvrez toujours ces types de liens dans l'application associée",
		yes: "Oui",
		no: "Non"
	}
};
var downloads = {
	title: "Téléchargements",
	filters: {
		search: "Rechercher",
		server: "Serveur",
		mimeType: "Type",
		status: "Statut",
		clear: "Effacer les filtres",
		all: "Tout",
		mimes: {
			images: "Images",
			videos: "Vidéos",
			audios: "Audios",
			texts: "Textes",
			files: "Fichiers"
		},
		statuses: {
			paused: "Mis en pause",
			cancelled: "Annulé"
		}
	},
	item: {
		cancel: "Annuler",
		copyLink: "Copier le lien",
		errored: "Téléchargement annulé",
		pause: "Pause",
		progressSize: "{{receivedBytes, byteSize}} de {{totalBytes, byteSize}} ({{ratio, percentage}})",
		remove: "Retirer de la liste",
		resume: "Reprendre",
		retry: "Réessayer",
		showInFolder: "Afficher dans le dossier"
	},
	showingResults: "Affichage des résultats {{first}} - {{last}} de {{count}}"
};
var error = {
	authNeeded: "Authentification requise, essayez <strong>{{- auth}}</strong>",
	connectTimeout: "Délai d'attente lors de la connexion",
	differentCertificate: "Le certificat est different du dernier utilisé.\n\n {{- detail}}",
	noValidServerFound: "Aucun serveur valide trouvé à cette adresse",
	offline: "Vérifiez votre connexion Internet !"
};
var landing = {
	invalidUrl: "URL invalide",
	validating: "Validation...",
	inputUrl: "Ajouter l'URL du serveur",
	connect: "Connexion"
};
var menus = {
	about: "À propos de {{- appName}}",
	addNewServer: "Ajouter un &nouveau serveur",
	back: "&Retour",
	clearTrustedCertificates: "Effacer les certificats de confiance",
	close: "Fermer",
	copy: "&Copier",
	cut: "Cou&per",
	disableGpu: "Désactiver le GPU",
	documentation: "Documentation",
	downloads: "Téléchargements",
	editMenu: "&Éditer",
	fileMenu: "&Fichier",
	forward: "&Suivant",
	helpMenu: "&Aide",
	hide: "Masquer {{- appName}}",
	hideOthers: "Masquer les autres",
	learnMore: "En savoir plus",
	minimize: "Réduire",
	openDevTools: "Ouvrir &DevTools",
	paste: "&Coller",
	quit: "&Quitter {{- appName}}",
	redo: "&Rétablir",
	reload: "Recharger",
	reloadIgnoringCache: "Recharger en ignorant le cache",
	reportIssue: "Signaler un problème",
	resetAppData: "Effacer les données de l'application",
	resetZoom: "Réinitialiser le zoom",
	selectAll: "Sélectionner tout",
	services: "Services",
	showFullScreen: "Plein écran",
	showMenuBar: "Barre des menus",
	showOnUnreadMessage: "Afficher la fenêtre quand il y a des messages non lus",
	showServerList: "Liste des serveurs",
	showTrayIcon: "Icône dans la barre des tâches",
	toggleDevTools: "Afficher &DevTools",
	undo: "&Annuler",
	unhide: "Afficher tout",
	viewMenu: "&Voir",
	windowMenu: "&Fenêtre",
	zoomIn: "Zoomer",
	zoomOut: "Zoom arrière"
};
var loadingError = {
	title: "Echec du chargement du serveur",
	announcement: "Houston, nous avons un problème",
	reload: "Recharger"
};
var selfxss = {
	title: "Stop !",
	description: "Il s'agit d'une fonctionnalité de navigateur destinée aux développeurs. Si quelqu'un vous a dit de copier-coller quelque chose ici pour activer une fonctionnalité Rocket.Chat ou \"pirater\" le compte de quelqu'un, il s'agit d'une arnaque et ça lui donnera accès à votre compte Rocket.Chat.",
	moreInfo: "Voir https://go.rocket.chat/i/xss pour plus d'informations."
};
var sidebar = {
	addNewServer: "Ajouter un nouveau serveur",
	downloads: "Téléchargements",
	item: {
		reload: "Recharger le serveur",
		remove: "Retirer le serveur",
		openDevTools: "Ouvrir DevTools"
	}
};
var touchBar = {
	formatting: "Mise en page",
	selectServer: "Sélectionnez un serveur"
};
var tray = {
	menu: {
		show: "Afficher",
		hide: "Cacher",
		quit: "Quitter"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: aucun message non lu",
		unreadMention: "{{- appName}}: vous avez une mention / un message privé non lu",
		unreadMention_plural: "{{- appName}}: vous avez {{- count}} mentions / messages privés non lus",
		unreadMessage: "{{- appName}}: vous avez des messages non lus"
	},
	balloon: {
		stillRunning: {
			title: "{{- appName}} est toujours en cours d'exécution",
			content: "{{- appName }} est configuré pour continuer à fonctionner dans la barre d'état système / zone de notification."
		}
	}
};
var fr_i18n = {
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
exports.default = fr_i18n;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnIuaTE4bi02NDJkMmEyMC5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
