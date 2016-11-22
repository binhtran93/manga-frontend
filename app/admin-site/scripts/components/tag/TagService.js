(function () {

    angular
        .module('AdminApp')
        .factory('TagService', TagService);

        TagService.$inject = ['Request'];

        function TagService(Request) {
            var GET_ALL_TAGS_API = Config.apiDomain + 'tags';
            var services = {
                getTags: getTags
            };

            return services;

            function getTags() {
                return Request.send('GET', GET_ALL_TAGS_API);
            }
        }
})();