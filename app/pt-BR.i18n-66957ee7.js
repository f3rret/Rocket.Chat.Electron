'use strict';

var contextMenu = {
	cut: "Cor&tar",
	copy: "&Copiar",
	paste: "Co&lar",
	selectAll: "&Selecionar tudo",
	undo: "&Desfazer",
	redo: "&Refazer",
	spellingLanguages: "Idiomas",
	moreSpellingSuggestions: "Mais sugestões de grafia",
	noSpellingSuggestions: "Sem sugestões",
	copyLinkAddress: "Copiar endereço do link",
	copyLinkText: "Copiar texto do link",
	openLink: "Abrir link",
	saveImageAs: "Salvar imagem como..."
};
var dialog = {
	about: {
		title: "Sobre {{- appName}}",
		version: "Versão: <1>{{-version}}</1>",
		checkUpdates: "Verificar Atualizações",
		checkUpdatesOnStart: "Verificar Atualizações ao Abrir",
		noUpdatesAvailable: "Não há atualizações disponíveis.",
		copyright: "{{copyright}}. Todos os direitos reservados."
	},
	addServer: {
		title: "Adicionar Servidor",
		message: "Você quer adicionar \"{{- host}}\" a sua lista de servidores?",
		add: "Adicionar",
		cancel: "Cancelar"
	},
	addServerError: {
		title: "Host inválido",
		message: "O host \"{{- host}}\" não pôde ser validado, portanto não foi adicionado."
	},
	certificateError: {
		title: "Erro de Certificado",
		message: "Você confia no certificado de \"{{- issuerName}}\"?",
		yes: "Sim",
		no: "Não"
	},
	resetAppData: {
		title: "Limpar dados do aplicativo",
		message: "Isto vai deslogá-lo de todos os times e resetar o aplicativo para suas configurações originais. Isto não pode ser desfeito.",
		yes: "Sim",
		cancel: "Cancelar"
	},
	screenshare: {
		title: "Compartilhamento de tela",
		announcement: "Selecione uma tela para compartilhar"
	},
	update: {
		title: "Atualização Disponível",
		announcement: "Nova versão está disponível",
		message: "Uma nova versão do Rocket.Chat Desktop App está disponível!",
		currentVersion: "Versão Atual:",
		newVersion: "Nova Versão:",
		install: "Instalar Atualização",
		remindLater: "Lembrar Depois",
		skip: "Pular Versão"
	},
	updateDownloading: {
		title: "Baixando atualização",
		message: "Você será notificado quando a atualização estiver pronta para instalação",
		ok: "OK"
	},
	updateInstallLater: {
		title: "Instalando Depois",
		message: "Atualização será instalada quando você sair do aplicativo",
		ok: "OK"
	},
	updateReady: {
		title: "Atualização Pronta para Instalar",
		message: "Atualização foi baixada",
		installNow: "Instalar Agora",
		installLater: "Instalar Depois"
	},
	updateSkip: {
		title: "Pular Atualização",
		message: "Nós iremos lembrá-lo quando a próxima atualização estiver disponível.\nSe você mudar de ideia, pode verificar as atualizações no menu Sobre.",
		ok: "OK"
	}
};
var error = {
	authNeeded: "Autenticação necessária, tente <strong>{{- auth}}</strong>",
	connectTimeout: "Tempo esgotado ao conectar",
	differentCertificate: "Certificado é diferente do antigo.\n\n {{- detail}}",
	noValidServerFound: "Nenhum servidor válido encontrado neste endereço",
	offline: "Verifique sua conexão com a Internet!"
};
var landing = {
	invalidUrl: "Endereço inválido",
	validating: "Validando...",
	inputUrl: "Insira o endereço do seu servidor",
	connect: "Conectar"
};
var menus = {
	about: "Sobre {{- appName}}",
	addNewServer: "Adicionar &novo servidor",
	back: "&Voltar",
	clearTrustedCertificates: "Limpar certificados confiáveis",
	close: "Fechar",
	copy: "&Copiar",
	cut: "Cor&tar",
	disableGpu: "Desabilitar GPU",
	documentation: "Documentação",
	editMenu: "&Editar",
	fileMenu: "&Arquivo",
	forward: "&Avançar",
	helpMenu: "Aj&uda",
	learnMore: "Saiba mais",
	minimize: "Minimizar",
	openDevTools: "Abrir &DevTools",
	paste: "Co&lar",
	quit: "&Sair do {{- appName}}",
	redo: "&Refazer",
	reload: "&Recarregar",
	reloadIgnoringCache: "Recarregar ignorando o cache",
	reportIssue: "Reportar problema",
	resetAppData: "Limpar dados do aplicativo",
	resetZoom: "Redefinir zoom",
	selectAll: "&Selecionar tudo",
	showFullScreen: "Tela cheia",
	showMenuBar: "Barra de menus",
	showOnUnreadMessage: "Exibir quando há mensagens não lidas",
	showServerList: "Lista de servidores",
	showTrayIcon: "Ícone da bandeja",
	toggleDevTools: "Alternar &DevTools",
	undo: "&Desfazer",
	viewMenu: "&Exibir",
	windowMenu: "&Janela",
	zoomIn: "Aumentar zoom",
	zoomOut: "Diminuir zoom"
};
var loadingError = {
	title: "Servidor Falhou em Carregar",
	announcement: "Houston, nós temos um problema",
	reload: "Recarregar"
};
var sidebar = {
	addNewServer: "Adicionar novo servidor",
	item: {
		reload: "Recarregar servidor",
		remove: "Remover servidor",
		openDevTools: "Abrir DevTools"
	}
};
var touchBar = {
	formatting: "Formatação",
	selectServer: "Selecionar servidor"
};
var tray = {
	menu: {
		show: "Mostrar",
		hide: "Esconder",
		quit: "Sair"
	},
	tooltip: {
		noUnreadMessage: "{{- appName}}: não há mensagens não lidas",
		unreadMention: "{{- appName}}: você tem uma menção/mensagem direta não lida",
		unreadMention_plural: "{{- appName}}: você tem {{- count}} menções/mensagens diretas não lidas",
		unreadMessage: "{{- appName}}: você tem mensagens não lidas"
	}
};
var ptBR_i18n = {
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
exports.default = ptBR_i18n;
exports.dialog = dialog;
exports.error = error;
exports.landing = landing;
exports.loadingError = loadingError;
exports.menus = menus;
exports.sidebar = sidebar;
exports.touchBar = touchBar;
exports.tray = tray;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHQtQlIuaTE4bi02Njk1N2VlNy5qcyIsInNvdXJjZXMiOltdLCJzb3VyY2VzQ29udGVudCI6W10sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9
