
var AdminApp = angular.module("AdminApp", ['ui.router', 'datatables', 'ui.bootstrap', 'ui.select']);
	AdminApp.config(configRouter);

	configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];

	function configRouter($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/'); 

		$stateProvider.state('manga', {
			url: '/manga',
			templateUrl: 'admin-site/scripts/components/manga/MangaView.html',
			controller: "MangaController"
		});
	}