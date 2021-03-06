'use strict';

var contextMenu = {
	cut: "В&ырезать",
	copy: "&Копировать",
	paste: "&Вставить",
	selectAll: "Выделить все",
	undo: "&Отменить",
	redo: "&Повторить",
	spelling: "Правописание",
	spellingLanguages: "Языки орфографии",
	moreSpellingSuggestions: "Другие варианты написания",
	noSpellingSuggestions: "Нет предложений",
	copyLinkAddress: "Копировать ссылку",
	copyLinkText: "Копировать текст ссылки",
	openLink: "Открыть ссылку",
	saveImageAs: "Сохранить изображение как..."
};
var dialog = {
	about: {
		title: "О {{- appName}}",
		version: "Версия: <1>{{-version}}</1>",
		checkUpdates: "Проверить обновления",
		checkUpdatesOnStart: "Проверять обновления при запуске",
		noUpdatesAvailable: "Нет обновлений.",
		copyright: "Все права защищены {{copyright}}",
		errorWhenLookingForUpdates: "При поиске обновлений произошла ошибка"
	},
	addServer: {
		title: "Добавить сервер",
		message: "Вы хотите добавить \"{{- host}}\" в Ваш список серверов?",
		add: "Добавить",
		cancel: "Отменить"
	},
	addServerError: {
		title: "Неверный Хост",
		message: "Не удалось проверить хост \"{{- host}}\", поэтому он не был добавлен."
	},
	certificateError: {
		title: "Ошибка сертификата",
		message: "Вы доверяете сертификату от \"{{- issuerName}}\"?",
		yes: "Да",
		no: "Нет"
	},
	downloadRemoval: {
		title: "Вы уверены?",
		message: "Удалить эту загрузку?",
		yes: "Да",
		no: "Нет"
	},
	resetAppData: {
		title: "Сброс данных приложения",
		message: "Это осуществит выход из всех Ваших команд и вернет настройки по умолчанию. Это действие невозможно отменить.",
		yes: "Да",
		cancel: "Отменить"
	},
	screenshare: {
		title: "Демонстрация Вашего экрана",
		announcement: "Выберите экран для демонстрации"
	},
	update: {
		title: "Доступно обновление",
		announcement: "Доступно новое обновление",
		message: "Доступна новая версия приложения Rocket.Chat!",
		currentVersion: "Текущая версия:",
		newVersion: "Новая версия:",
		install: "Установить обновление",
		remindLater: "Напомнить позже",
		skip: "Пропустить эту версию"
	},
	updateDownloading: {
		title: "Загрузка обновления",
		message: "Вы будете оповещены, когда обновление будет готово к установке",
		ok: "OK"
	},
	updateInstallLater: {
		title: "Обновление будет установлено позже",
		message: "Обновление будет установлено, когда Вы закроете приложение",
		ok: "OK"
	},
	updateReady: {
		title: "Обновление готово к установке",
		message: "Обновление загружено",
		installNow: "Установить сейчас",
		installLater: "Установить позже"
	},
	updateSkip: {
		title: "Пропустить обновление",
		message: "Мы оповестим Вас, когда следующее обновление будет доступно.\nЕсли Вы передумаете, Вы можете проверить наличие обновлений в меню \"О Rocket.Chat\".",
		ok: "OK"
	},
	selectClientCertificate: {
		announcement: "Выберите сертификат",
		select: "Выбрать",
		validDates: "Действует от {{-validStart,}} до {{-validExpiry,}}"
	},
	openingExternalProtocol: {
		title: "Связь с кастомным протоколом",
		message: "ссылка для {{- protocol }} требует внешнего приложения.",
		detail: "Запрашиваемая ссылка - {{- url }} . Вы хотите продолжить?",
		dontAskAgain: "Всегда открывать ссылки данного типа в соответствующем приложении",
		yes: "Да",
		no: "Нет"
	}
};
var downloads = {
	title: "Загрузки",
	filters: {
		search: "Поиск",
		server: "Сервер",
		mimeType: "Тип",
		status: "Статус",
		clear: "Очистить фильтры",
		all: "Все",
		mimes: {
			images: "Изображения",
			videos: "Видео",
			audios: "Аудиозаписи",
			texts: "Тексты",
			files: "Файлы"
		},
		statuses: {
			paused: "На паузе",
			cancelled: "Отменено"
		}
	},
	item: {
		cancel: "Отменить",
		copyLink: "Копировать ссылку",
		errored: "Загрузка отменена",
		pause: "Пауза",
		progressSize: "{{receivedBytes, byteSize}} из {{totalBytes, byteSize}} ({{ratio, percentage}})",
		remove: "Убрать из списка",
		resume: "Возобновить",
		retry: "Повторить",
		showInFolder: "Показать в папке"
	},
	showingResults: "Показать результаты {{first}} - {{last}} из {{count}}"
};
var error = {
	authNeeded: "Требуется авторизация, попробуйте <strong>{{- auth}}</strong>",
	connectTimeout: "Превышено время ожидания при попытке подключения",
	differentCertificate: "Сертификат отличается от предыдущего.\n\n {{- detail}}",
	noValidServerFound: "По заданному URL не найден подходящий сервер",
	offline: "Проверьте Ваше интернет-соединение!"
};
var landing = {
	invalidUrl: "Некорректный url",
	validating: "Проверяем...",
	inputUrl: "Введите URL Вашего сервера",
	connect: "Подключиться"
};
var menus = {
	about: "О {{- appName}}",
	addNewServer: "Добавить &новый сервер",
	back: "&Назад",
	clearTrustedCertificates: "Очистить доверенные сертификаты",
	close: "Закрыть",
	copy: "&Копировать",
	cut: "В&ырезать",
	disableGpu: "Отключить GPU",
	documentation: "Документация",
	downloads: "Загрузки",
	editMenu: "&Правка",
	fileMenu: "&Файл",
	forward: "Вперед",
	helpMenu: "&Справка",
	hide: "Скрыть {{- appName}}",
	hideOthers: "Скрыть других",
	learnMore: "Узнать больше",
	minimize: "Свернуть",
	openDevTools: "Открыть &DevTools",
	paste: "&Вставить",
	quit: "Вы&йти из {{- appName}}",
	redo: "&Повторить",
	reload: "П&ерезагрузить",
	reloadIgnoringCache: "Перезагрузить игнорируя кэш",
	reportIssue: "Сообщить о проблеме",
	resetAppData: "Сбросить данные приложения",
	resetZoom: "Восстановить масштаб",
	selectAll: "Выделить все",
	services: "Сервисы",
	showFullScreen: "Полноэкранный режим",
	showMenuBar: "Главное меню",
	showOnUnreadMessage: "Развернуть при поступлении новых сообщений",
	showServerList: "Список серверов",
	showTrayIcon: "Значок в трее",
	toggleDevTools: "Открыть &DevTools",
	undo: "&Отменить",
	unhide: "Показать все",
	viewMenu: "&Вид",
	windowMenu: "&Окна",
	zoomIn: "Увеличить",
	zoomOut: "Уменьшить"
};
var loadingError = {
	title: "Не удалось загрузить сервер",
	announcement: "Хьюстон, у нас проблемы",
	reload: "Перезагрузить"
};
var selfxss = {
	title: "Стоп!",
	description: "Это функция браузера, предназначенная для разработчиков. Если кто-то сказал вам скопировать-вставить что-то сюда, чтобы включить функцию Rocket.Chat или \"взломать\" чей-то аккаунт, это мошенничество и даст им доступ к вашему аккаунту Rocket.Chat.",
	moreInfo: "Дополнительная информация доступна по адресу https://go.rocket.chat/i/xss."
};
var sidebar = {
	addNewServer: "Добавить новый сервер",
	downloads: "Загрузки",
	item: {
		reload: "Перезагрузить вкладку сервера",
		remove: "Удалить сервер",
		openDevTools: "Открыть DevTools"
	}
};
var touchBar = {
	formatting: "Форматирование",
	selectServer: "Выбрать сервер"
};
var tray = {
	menu: {
		show: "Показать",
		hide: "Скрыть",
		quit: "Выйти"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: нет непрочитанных сообщений",
		unreadMention: "{{- appName}}: у вас есть непрочитанное упоминание/личное сообщение",
		unreadMention_plural: "{{- appName}}: у вас есть {{- count}} непрочитанных упоминаний/личных сообщений",
		unreadMessage: "{{- appName}}: у Вас нет непрочитанных сообщений"
	},
	balloon: {
		stillRunning: {
			title: "{{- appName}} все еще работает",
			content: "{{- appName }} настроен на постоянное размещение в системном трее/области уведомлений."
		}
	}
};
var ru_i18n = {
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
exports.default = ru_i18n;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnUuaTE4bi04NmRjZjU0ZC5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzsifQ==
