(function () {
    'use strict';

    angular.module("stuckyToys").factory('animalService', animalService);

    animalService.$inject = ['$http']

    function animalService($http) {

        var service = {
            getAll: getAll,
            create: create,
            get: get,
            deleteAnimal: deleteAnimal,
            uploadAudio: uploadAudio,
            uploadImage: uploadImage
        }

        return service;

        function getAll() {
            return $http.get('/animals').success(function (data) {
                return data;
            });
        };

        function create(animal) {
            return $http.post('/animals', animal).success(function (data) {
                return data;
            });
        };

        function get(id) {
            return $http.get('/themes/' + id).then(function (res) {
                return res.data;
            });
        };

        function deleteAnimal(animal) {
            return $http.delete('/animals/' + animal._id).then(function (res) {
                return res.data;
            })
        };

        function uploadAudio(audio) {
            return $http.post('/upload/audio', audio).success(function (data) {
                return data;
            });
        }

        function uploadImage(image) {
            return $http.post('/upload/image', image).success(function (data) {
                return data;
            });
        }
    }
})();