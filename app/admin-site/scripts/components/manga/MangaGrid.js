(function () {

	angular
		.module('AdminApp')
		.factory('MangaGrid', MangaGrid);

		MangaGrid.$inject = ['MangaService', 'DTOptionsBuilder', 'DTColumnDefBuilder'];

		function MangaGrid(MangaService, DTOptionsBuilder, DTColumnDefBuilder) {
			var service = {
				initGrid: initGrid
			};

			return service;
 


			function initGrid($scope) {
				$scope.persons = [{
				    "id": 860,
				    "firstName": "Superman",
				    "lastName": "Yoda"
				}, {
				    "id": 870,
				    "firstName": "Foo",
				    "lastName": "Whateveryournameis"
				}, {
				    "id": 590,
				    "firstName": "Toto",
				    "lastName": "Titi"
				}, {
				    "id": 803,
				    "firstName": "Luke",
				    "lastName": "Kyle"
				}];

			    $scope.dtOptions = DTOptionsBuilder.newOptions().withPaginationType('full_numbers').withDisplayLength(2);
			    $scope.dtColumnDefs = [
			        DTColumnDefBuilder.newColumnDef(0),
			        DTColumnDefBuilder.newColumnDef(1).notVisible(),
			        DTColumnDefBuilder.newColumnDef(2).notSortable()
			    ];
			}
		}

})();