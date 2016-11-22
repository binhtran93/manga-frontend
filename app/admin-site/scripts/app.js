
var AdminApp = angular
	.module("AdminApp", ['ui.router', 'datatables', 'ui.bootstrap', 'ui.select', 'ui-notification', 'blockUI'])
	.config(configRouter)
	.config(configNotification)
	.config(configBlockUI);

	configRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
	configNotification.$inject = ['NotificationProvider'];
	configBlockUI.$inject = ['blockUIConfig'];

	/**
	 * COnfig router
	 * @param $stateProvider
	 * @param $urlRouterProvider
	 */
	function configRouter($stateProvider, $urlRouterProvider) {
		$urlRouterProvider.otherwise('/'); 

		$stateProvider.state('manga', {
			url: '/manga',
			templateUrl: 'admin-site/scripts/components/manga/MangaView.html',
			controller: "MangaController"
		});
	}

	/**
	 * Config noification
	 * @param NotificationProvider
	 */
	function configNotification(NotificationProvider) {
		NotificationProvider.setOptions({
			delay: 2000,
			startTop: 20,
			startRight: 10,
			verticalSpacing: 20,
			horizontalSpacing: 20,
			positionX: 'center',
			positionY: 'top'
		});
	}

	function configBlockUI(blockUIConfig) {
		// Change the default overlay message
		blockUIConfig.message = 'Loading..';

		// Change the default delay to 100ms before the blocking is visible
		blockUIConfig.delay = 100;
		blockUIConfig.autoBlock = false;

	};