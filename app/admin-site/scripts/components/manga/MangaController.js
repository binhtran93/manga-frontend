(function () {

	angular
		.module('AdminApp')
		.controller('MangaController', MangaController);

		MangaController.$inject = ['$scope', '$uibModal', '$document', 'MangaService', 'MangaGrid'];

		function MangaController($scope, $uibModal, $document, MangaService, MangaGrid) {
			var createMangaModal;
			var editMangaModal;
			var currentMangaId;
			
			$scope.persons = [];
			$scope.openEditManga = openEditManga;
			$scope.removeManga = removeManga;
			$scope.updateManga = updateManga;
			$scope.closeEditManga = closeEditManga;
			$scope.openCreateManga = openCreateManga;
			$scope.closeCreateManga = closeCreateManga;
			$scope.addManga = addManga;
			
			$scope.people = [
				{ name: 'Adam',      email: 'adam@email.com',      age: 12, country: 'United States' },
				{ name: 'Amalie',    email: 'amalie@email.com',    age: 12, country: 'Argentina' },
				{ name: 'Estefanía', email: 'estefania@email.com', age: 21, country: 'Argentina' },
				{ name: 'Adrian',    email: 'adrian@email.com',    age: 21, country: 'Ecuador' },
				{ name: 'Wladimir',  email: 'wladimir@email.com',  age: 30, country: 'Ecuador' },
				{ name: 'Samantha',  email: 'samantha@email.com',  age: 30, country: 'United States' },
				{ name: 'Nicole',    email: 'nicole@email.com',    age: 43, country: 'Colombia' },
				{ name: 'Natasha',   email: 'natasha@email.com',   age: 54, country: 'Ecuador' },
				{ name: 'Michael',   email: 'michael@email.com',   age: 15, country: 'Colombia' },
				{ name: 'Nicolás',   email: 'nicolas@email.com',    age: 43, country: 'Colombia' }
			];
			
			
			$scope.selectedAuthor = [$scope.people[5], $scope.people[4]];

			init($scope);

			function init($scope) {
				MangaGrid.initGrid($scope);
			}
			
			function openCreateManga() {
				var parentEle = $document.find('.manga-grid');
				
				createMangaModal = $uibModal.open({
					templateUrl: 'createMangaModal.html',
					scope: $scope,
					size: 'lg',
					appendTo: parentEle
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