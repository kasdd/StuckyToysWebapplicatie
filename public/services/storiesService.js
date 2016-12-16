(function () {
    'use strict';

    angular.module("stuckyToys").factory('storiesService', storiesService);

    storiesService.$inject = ['$http']

    function storiesService($http) {

        var service = {
            getAll: getAll,
            addStory: create,
            get: get,
            deleteStory: deleteStory,
            addScenario: addScenario,
            uploadAudio: uploadAudio,
            uploadImage: uploadImage,
            update : update,
            getScenario : getScenario
        }

        return service;

        function getAll() {
            return $http.get('/stories').success(function (data) {
                return data;
            });
        };

        function create(story) {
            console.log(story);
            return $http.post('/stories', story).success(function (data) {
                return data;
            });
        };

        function get(id) {
            return $http.get('/stories/' + id).then(function (res) {
                return res.data;
            });
        };

        function getScenario(id){
            return $http.get('/scenarios/' + id).then(function(res){
                return res.data;
            });
        };

        function deleteStory(story) {
            return $http.delete('/story/' + story._id).then(function (res) {
                return res.data;
            })
        };

        function addScenario(id, scenario) {
            return $http.post('/stories/' + id + '/scenarios', scenario);
        }

        function deleteScenario(id, scenario){
            return $http.delete('/stories/' + id + '/scenarios', scenario);
        }

        function update(id, story){
            return $http.put('/stories/' + id, story).success(function(data){
                return data;
            });
        }

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
