(function () {

	angular
		.module('AdminApp')
		.controller('MangaController', MangaController);

		MangaController.$inject = ['$scope', 'MangaService', 'MangaGrid'];

		function MangaController($scope, MangaService, MangaGrid) {
			
			$scope.persons = [];

			init($scope);

			function init($scope) {
				MangaGrid.initGrid($scope);
			}
		    
		}

})();