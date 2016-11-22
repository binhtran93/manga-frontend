(function () {
    angular
        .module('AdminApp')
        .factory('Request', Request);

        Request.$inject = ['$http', '$q', '$window'];

        function Request ($http, $q, $window) {

            var service = {
                get: get,
                post: post,
                send: send
            };

            return service; 

            function get(url, data) {
                return this.send('GET', url, data);
            }

            function post(url, data) {
                return this.send('POST', url, data);
            }

            function send(method, url, data) {
                var defered = $q.defer();

                var options = {
                    method: method,
                    url: url,
                    timeout: defered.promise,
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                    transformRequest: function(obj) {
                        var str = [];
                        for(var p in obj)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                        return str.join("&");
                    }
                }

                if (method.toUpperCase() == 'POST') {
                    options.data = data;
                } else if (method.toUpperCase() == 'GET') {
                    options.params = data;
                }
                
                $http(options).then(function (response) {
                    return defered.resolve(response.data);
                })
                .catch(function (err) {
                    return defered.reject(err)
                });

                defered.promise.abort = function() {
                    defered.resolve();
                };

                return defered.promise;
            }
        }
})();