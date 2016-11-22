(function () {

	angular
		.module('AdminApp')
		.controller('MangaController', MangaController);

		MangaController.$inject = ['$scope', '$uibModal', '$document', 'MangaService', 'MangaGrid', 'TagService', 'Notification', 'blockUI'];

		function MangaController($scope, $uibModal, $document, MangaService, MangaGrid, TagService, Notification, blockUI) {
			var createMangaModal;
			var editMangaModal;
			var currentMangaId;
			
			$scope.tags = [];
			$scope.selectedTags = [];


			$scope.openEditManga = openEditManga;
			$scope.removeManga = removeManga;
			$scope.updateManga = updateManga;
			$scope.closeEditManga = closeEditManga;
			$scope.openCreateManga = openCreateManga;
			$scope.closeCreateManga = closeCreateManga;
			$scope.addManga = addManga;

			init($scope);

            /**
             * Init gid manga
             * @param $scope
             */
			function init($scope) {
				MangaGrid.initGrid($scope);
			}

            /**
             * Create Modal setting
             */
			function openCreateManga() {
				var block = blockUI.instances.get('createMangaBlock');
				var parentEle = $document.find('.manga-grid');
				createMangaModal = $uibModal.open({
					templateUrl: 'createMangaModal.html',
					scope: $scope,
					size: 'lg',
					appendTo: parentEle
				});

				block.start();
				TagService.getTags().then(function (res) {
					if ( res.status == 0 ) {
						createMangaModal.dismiss();
						Notification.error('Internal error');
						return;
					}
					$scope.tags = res.tags;
					block.stop();
				});
			}
			
			function addManga() {
				
			}
			
			function closeCreateManga() {
				createMangaModal.dismiss();
			}

			function openEditManga(mangaId) {
				currentMangaId = mangaId;
				var parentEle = $document.find('.manga-grid');
				
				editMangaModal = $uibModal.open({
					templateUrl: 'editMangaModal.html',
					scope: $scope,
					appendTo: parentEle
				});
			}
			
			function updateManga() {
				console.log('update' + currentMangaId);
			}
			
			function closeEditManga() {
				editMangaModal.dismiss();
			}

			function removeManga(mangaId) {
				console.log('remove');
			}
		    
		}

})();