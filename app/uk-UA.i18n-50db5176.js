'use strict';

var contextMenu = {
	cut: "В&ирізатити",
	copy: "Ко&піювати",
	paste: "Вс&тавити",
	selectAll: "Виділити все",
	undo: "&Скасувати",
	redo: "&Повторити",
	spellingLanguages: "Правопис",
	moreSpellingSuggestions: "Інші варіанти написання",
	noSpellingSuggestions: "Пропозицій немає",
	copyLinkAddress: "Копіювати посилання",
	openLink: "Відкрити посилання",
	saveImageAs: "Зберегти зображення як..."
};
var dialog = {
	about: {
		title: "Про {{- appName}}",
		version: "Версія: <1> {{-version}} </ 1>",
		checkUpdates: "Перевірити оновлення",
		checkUpdatesOnStart: "Перевіряти оновлення при запуску",
		noUpdatesAvailable: "Оновлень немає.",
		copyright: "Copyright {{copyright}}",
		errorWhenLookingForUpdates: "Під час пошуку оновлень сталася помилка"
	},
	addServer: {
		title: "Додати сервер",
		message: "Ви хочете додати \"{{- host}}\"у Ваш список серверів?",
		add: "Додати",
		cancel: "Скасувати"
	},
	addServerError: {
		title: "Неправильний Хост",
		message: "Не вдалося перевірити Хост \"{{- host}}\", тому він не був доданий."
	},
	certificateError: {
		title: "Помилка сертифіката",
		message: "Ви довіряєте сертифікату від \"{{- issuerName}}\"?",
		yes: "Так",
		no: "Ні"
	},
	resetAppData: {
		title: "Скинути даних програми",
		message: "Це здійснить вихід з усіх Ваших команд і поверне налаштування до типових. Цю дія неможливо скасувати.",
		yes: "Так",
		cancel: "Скасувати"
	},
	screenshare: {
		title: "Демонстрація Вашого екрану",
		announcement: "Виберіть екран для спільного використання"
	},
	update: {
		title: "Доступне оновлення",
		announcement: "Є нове оновлення",
		message: "Доступна нова версія застосунку Rocket.Chat!",
		currentVersion: "Поточна версія:",
		newVersion: "Нова версія:",
		install: "Встановити оновлення",
		remindLater: "Нагадати пізніше",
		skip: "Пропустити цю версію"
	},
	updateDownloading: {
		title: "Завантаження оновлення",
		message: "Ви будете сповіщені, коли оновлення буде готове до встановлення",
		ok: "Гаразд"
	},
	updateInstallLater: {
		title: "Оновлення буде встановлено пізніше",
		message: "Оновлення буде встановлено, коли Ви закриєте застосунок",
		ok: "Гаразд"
	},
	updateReady: {
		title: "Оновлення готове до встановлення",
		message: "Оновлення завантажено",
		installNow: "Встановити зараз"
	},
	updateSkip: {
		title: "Пропустити оновлення",
		message: "Ми повідомимо Вас, коли наступне оновлення буде доступно. \nЯкщо Ви передумаєте, Ви можете перевірити наявність оновлень у меню \"Про Rocket.Chat\".",
		ok: "Гаразд"
	},
	selectClientCertificate: {
		announcement: "Вибрати сертифікат",
		select: "Вибрати",
		validDates: "Дійсний з {{-validStart,}} по {{-validExpiry,}}"
	}
};
var error = {
	authNeeded: "Необхідно ввійти, спробуйте <strong>{{- auth}}</strong>",
	differentCertificate: "Сертифікат відрізняється від попереднього. \n\n {{- detail}}",
	noValidServerFound: "За вказаним URL не знайдено відповідного сервера",
	offline: "Перевірте Ваше інтернет з'єднання!"
};
var landing = {
	invalidUrl: "Некоректнй url",
	validating: "Перевіряємо ...",
	inputUrl: "Введіть URL Вашого сервера",
	connect: "Під'єднатися"
};
var menus = {
	about: "Про {{- appName}}",
	addNewServer: "Додати &новий сервер",
	back: "&Назад",
	clearTrustedCertificates: "Очистити довірені сертифікати",
	close: "Закрити",
	copy: "Ко&піювати",
	cut: "В&ирізати",
	documentation: "Документація",
	editMenu: "&Редагувати",
	fileMenu: "&Файл",
	forward: "Вперед",
	helpMenu: "&Довідка",
	hide: "Приховати {{- appName}}",
	hideOthers: "Приховати інші",
	learnMore: "Дізнатися більше",
	minimize: "Згорнути",
	openDevTools: "Відкрити &DevTools",
	paste: "Вс&тавити",
	quit: "Ви&йти з {{- appName}}",
	redo: "По&вторити",
	reload: "П&ерезавантажити",
	reloadIgnoringCache: "Перезавантажити ігноруючи кеш",
	reportIssue: "Повідомити про проблему",
	resetAppData: "Скинути дані додатка",
	resetZoom: "Відновити масштаб",
	selectAll: "Виділити все",
	services: "Служби",
	showFullScreen: "На весь екран",
	showMenuBar: "Головне меню",
	showOnUnreadMessage: "Показувати з непрочитатих повідомленнях",
	showServerList: "Список серверів",
	showTrayIcon: "Значок в треї",
	toggleDevTools: "Відкрити &DevTools",
	undo: "&Скасувати",
	unhide: "Показати все",
	viewMenu: "&Вигляд",
	windowMenu: "В&ікно",
	zoomIn: "Збільшити",
	zoomOut: "Зменшити"
};
var loadingError = {
	title: "Не вдалося завантажити сервер",
	announcement: "Г’юстон, у нас проблеми",
	reload: "Перезавантажити"
};
var selfxss = {
	title: "Стій!",
	description: "Ця функція браузера призначена для розробників. Якщо хтось сказав вам, скопіюйте щось тут, щоб увімкнути функцію Rocket.Chat чи \"зламати\" чужий обліковий запис — це шахрайство і Ви надасте доступ до вашого облікового запису Rocket.Chat.",
	moreInfo: "Дивіться https://go.rocket.chat/i/xss для більшої інформації."
};
var sidebar = {
	addNewServer: "Додати новий сервер",
	item: {
		reload: "Перезавантажити сервер",
		remove: "Видалити сервер",
		openDevTools: "Відкрити DevTools"
	}
};
var touchBar = {
	formatting: "Форматування",
	selectServer: "Вибрати сервер"
};
var tray = {
	menu: {
		show: "Показати",
		hide: "Приховати",
		quit: "Вийти"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: немає непрочитаних повідомлень",
		unreadMention: "{{- appName}}: у Вас непрочитане згадування/приватне повідомлення",
		unreadMention_plural: "{{- appName}}: у Вас {{- count}} непрочитаних  згадувань/приватних повідомлень",
		unreadMessage: "{{- appName}}: у Вас непрочитаних повідомлень"
	},
	balloon: {
		stillRunning: {
			title: "{{- appName}} досі працює",
			content: "{{- appName }} налаштовано, щоб продовжувати працювати в системному треї/області сповіщень."
		}
	}
};
var ukUA_i18n = {
	contextMenu: contextMenu,
	dialog: dialog,
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
exports.default = ukUA_i18n;
exports.dialog = dialog;
exports.error = error;
exports.landing = landing;
exports.loadingError = loadingError;
exports.menus = menus;
exports.selfxss = selfxss;
exports.sidebar = sidebar;
exports.touchBar = touchBar;
exports.tray = tray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidWstVUEuaTE4bi01MGRiNTE3Ni5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
