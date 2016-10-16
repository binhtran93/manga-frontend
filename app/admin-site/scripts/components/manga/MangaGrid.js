(function () {

	angular
		.module('AdminApp')
		.factory('MangaGrid', MangaGrid);

		MangaGrid.$inject = ['$compile', 'MangaService', 'DTOptionsBuilder', 'DTColumnBuilder', 'DTColumnDefBuilder'];

		function MangaGrid($compile, MangaService, DTOptionsBuilder, DTColumnBuilder, DTColumnDefBuilder) {

			var MANGA_LIST_API = Config.apiDomain + 'mangas';

			var service = {
				initGrid: initGrid
			};

			return service;
 
			function initGrid($scope) {

			    $scope.dtOptions = DTOptionsBuilder.newOptions()
			    	.withOption('ajax', {
			    		url: MANGA_LIST_API,
			    		type: 'GET', 
			    		data: function (data, dtInstance) {
			    			data.offset = data.start;
			    			data.limit = data.length;
			    			data.search = data.search.value;
			    			data.column = data.order[0].column;
			    			data.order = data.order[0].dir;
			    		}
			    	})
			    	.withDataProp('data')
     				.withOption('serverSide', true)
			    	.withPaginationType('simple_numbers')
	                .withOption('drawCallback', drawCallback.bind(null, $scope))

			    $scope.dtColumns = [
			        DTColumnBuilder.newColumn('manga_name'),
			        DTColumnBuilder.newColumn('slug'),
			        DTColumnBuilder.newColumn('view_count'),
			        DTColumnBuilder.newColumn('like_count'),
			        DTColumnBuilder.newColumn('id'),
			    ];

			    $scope.dtColumnDefs = [
			        DTColumnDefBuilder.newColumnDef(0),
			        DTColumnDefBuilder.newColumnDef(1).notSortable(),
			        DTColumnDefBuilder.newColumnDef(2).notSortable(),
			        DTColumnDefBuilder.newColumnDef(3).notSortable(),
			        DTColumnDefBuilder.newColumnDef(4).notSortable().withOption('width', '20%').renderWith(function (data, type, full) {
			        	
			        	// return data;
			        	return renderAction(data);
			        })
			    ];
			}


			function renderAction(data) {
				var button = '<div class="action">' +
							 '<button type="button" class="btn btn-primary update" ng-click="openEditManga('+ data +')">Edit</button> ' +
						     '<button type="button" class="btn btn-danger remove"  ng-click="removeManga('+ data +')">Remove</button>' +
						     '</div>';

				return button;
			}

			function drawCallback($scope, data) {
				var actionEle = angular.element('.action');
				angular.forEach( actionEle, function (ele) {
					var template = $compile(angular.element(ele).html())($scope);
					angular.element(ele).html(template);
				});
			}
		}

})();