(function () {
    'use strict';

    angular.module("stuckyToys").factory('themeService', themeService);

    themeService.$inject = ['$http']

    function themeService($http) {

        var service = {
            getAll: getAll,
            create: create,
            get: get,
            deleteTheme: deleteTheme
        }

        return service;

        function getAll() {
            return $http.get('/themes').success(function (data) {
                return data;
            });
        };

        function create(theme) {
            return $http.post('/themes', theme).success(function (data) {
                return data;
            });
        };

        function get(id) {
            return $http.get('/themes/' + id).then(function (res) {
                return res.data;
            });
        };

        function deleteTheme(theme) {
            return $http.delete('/theme/' + theme._id, {
                headers: {
                    Authorization: 'Bearer ' + auth.getToken()
                }
            }).then(function (res) {
                return res.data;
            })
        };

    }
})();
