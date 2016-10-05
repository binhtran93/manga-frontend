(function () {

	angular
		.module('AdminApp')
		.factory('MangaService', MangaService);

		MangaService.$inject = [];

		function MangaService() {
			var service = {
				get: get
			};

			return service;

			function get() {
				console.log('get from sv');
			}
		}

})();