'use strict';

var contextMenu = {
	cut: "Kes",
	copy: "Kopyala",
	paste: "Yapıştır",
	selectAll: "Tümünü seç",
	undo: "Geri al",
	redo: "Yinele",
	spellingLanguages: "Yazım dilleri",
	moreSpellingSuggestions: "Daha fazla yazım önerisi",
	noSpellingSuggestions: "Öneri yok",
	copyLinkAddress: "Bağlantı adresini kopyala",
	copyLinkText: "Bağlantı metnini kopyala",
	openLink: "Bağlantıyı aç",
	saveImageAs: "Görseli farklı kaydet..."
};
var dialog = {
	about: {
		title: "Hakkında {{- appName}}",
		version: "Versiyon: <1>{{-version}}</1>",
		checkUpdates: "Güncellemeleri kontrol et",
		checkUpdatesOnStart: "Başlangıçta güncellemeleri kontrol et",
		noUpdatesAvailable: "Kullanıclabilir güncelleme yok.",
		copyright: "Telif hakkı {{copyright}}"
	},
	addServer: {
		title: "Sunucu ekle",
		message: "\"{{- host}}\" sunucu listenize eklemek istiyor musunuz?",
		add: "Ekle",
		cancel: "İptal et"
	},
	addServerError: {
		title: "Geçersiz host adresi",
		message: "The host \"{{- host}}\" doğrulanamadı yani eklenmedi."
	},
	certificateError: {
		title: "Sertifika hatası",
		message: "\"{{- issuerName}}\" sertifikasına güvenmek istiyor musunuz?",
		yes: "Evet",
		no: "Hayır"
	},
	resetAppData: {
		title: "Uygulama verisini sıfırla",
		message: "Bu işlem sizi tüm sunuculardan çıkartır ve uygulamayı orijinal ayarlarına döndürür. Bu geri alınamaz.",
		yes: "Evet",
		cancel: "İptal et"
	},
	screenshare: {
		title: "Ekranınızı paylaşın",
		announcement: "Paylaşılacak ekran seçin"
	},
	update: {
		title: "Güncelleme kullanılabilir",
		announcement: "Yeni bir sürüm kullanılabilir",
		message: "Rocket.Chat için yeni bir masaüstü sürümü mevcut!",
		currentVersion: "Mevcut versiyon:",
		newVersion: "Yeni versiyon:",
		install: "Güncellemeyi yükle",
		remindLater: "Daha sonra hatırlat",
		skip: "Bu sürümü atla"
	},
	updateDownloading: {
		title: "Güncelleme indiriliyor",
		message: "Güncelleme yüklenmeye hazır olduğunda size bildirilecek.",
		ok: "TAMAM"
	},
	updateInstallLater: {
		title: "Installing Later",
		message: "Uygulamadan çıktığınızda güncelleme yüklenecek",
		ok: "TAMAM"
	},
	updateReady: {
		title: "Güncelleme Yüklemeye Hazır",
		message: "Güncelleme indirildi",
		installNow: "Şimdi yükle",
		installLater: "Daha sonra yükle"
	},
	updateSkip: {
		title: "Güncellemeyi Atla",
		message: "Bir sonraki güncellemenin ne zaman yapılacağını size bildireceğiz. Fikrinizi değiştirirseniz Hakkında menüsünden güncellemeleri manuel kontrol edebilirsiniz.",
		ok: "TAMAM"
	}
};
var error = {
	authNeeded: "Yetkilendirme gerekli, deneyin <strong>{{- auth}}</strong>",
	connectTimeout: "Bağlanmaya çalışırken zaman aşımı oluştu",
	differentCertificate: "Sertifika bir önceki sürümden farklı.\n\n {{- detail}}",
	noValidServerFound: "Bağlantınızda geçerli bir sunucu bulunamadı",
	offline: "İnternet bağlantınızı kontrol edin!"
};
var landing = {
	invalidUrl: "Geçersiz bağlantı",
	validating: "Doğrulanıyor...",
	inputUrl: "Sunucu bağlantısını girin",
	connect: "Bağlan"
};
var menus = {
	about: "Hakkında {{- appName}}",
	addNewServer: "Yeni sunucu ekle",
	back: "&Geri dön",
	clearTrustedCertificates: "Güvenilen sertifikaları temizle",
	close: "Kapat",
	copy: "&Kopyala",
	cut: "Kes",
	documentation: "Dökümantasyon",
	editMenu: "&Düzenle",
	fileMenu: "&Dosya",
	forward: "&İleri",
	helpMenu: "&Yardım",
	learnMore: "Daha fazlasını öğren",
	minimize: "Minimize et",
	openDevTools: "&DevTools aç",
	paste: "&Yapıştır",
	quit: "&Çıkış yap {{- appName}}",
	redo: "&Yinele",
	reload: "&Yeniden yükle",
	reloadIgnoringCache: "Önbelleği yok sayarak yeniden yükle",
	reportIssue: "Hata bildir",
	resetAppData: "Uygulama verisini sıfırla",
	resetZoom: "Görünümü sıfırla",
	selectAll: "Tümünü seç",
	showFullScreen: "Tam ekran",
	showMenuBar: "Menü alanını göster",
	showOnUnreadMessage: "Okunmamış mesajlarda göster",
	showServerList: "Sunucu listesi",
	showTrayIcon: "Görev çubuğu ikonu",
	toggleDevTools: "&DevTools aç",
	undo: "&Geri al",
	viewMenu: "&Görünüm",
	windowMenu: "&Pencereler",
	zoomIn: "Yakınlaştır",
	zoomOut: "Uzaklaştır"
};
var loadingError = {
	title: "Sunucu yüklenirken hata oluştu",
	announcement: "Houston, bir sorunumuz var",
	reload: "Yeniden yükle"
};
var selfxss = {
	title: "Dur!",
	description: "Bu, geliştiricilere yönelik bir tarayıcı özelliğidir. Birisi size bir Rocket.Chat özelliğini etkinleştirmeniz veya herhangi bir şeyi kopyalayıp yapıştırmanızı söylediyse, bu bir aldatmacadır ve onlara Rocket.Chat hesabınıza erişme izni verir.",
	moreInfo: "Bkz. https://go.rocket.chat/i/xss"
};
var sidebar = {
	addNewServer: "Yeni sunucu ekle",
	item: {
		reload: "Sunucuyu yeniden yükle",
		remove: "Sunucuyu sil",
		openDevTools: "DevTools aç"
	}
};
var touchBar = {
	formatting: "Bçimlendiriliyor",
	selectServer: "Sunucu seçin"
};
var tray = {
	menu: {
		show: "Göster",
		hide: "Gizle",
		quit: "Çıkış yap"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: okunmamış mesaj yok",
		unreadMention: "{{- appName}}: okunmamış bahsetme/direkt mesajınız var",
		unreadMention_plural: "{{- appName}}: {{- count}} okunmamış bahsetme/direkt mesajınız var",
		unreadMessage: "{{- appName}}: okunmamış mesajınız var"
	}
};
var trTR_i18n = {
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
exports.default = trTR_i18n;
exports.dialog = dialog;
exports.error = error;
exports.landing = landing;
exports.loadingError = loadingError;
exports.menus = menus;
exports.selfxss = selfxss;
exports.sidebar = sidebar;
exports.touchBar = touchBar;
exports.tray = tray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHItVFIuaTE4bi01OTM5NGNmOC5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
