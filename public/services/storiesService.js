(function () {
    'use strict';

    angular.module("stuckyToys").factory('storiesService', storiesService);

    storiesService.$inject = ['$http']

    function storiesService($http) {

        var service = {
            getAll: getAll,
            addStory: create,
            getStoryById: get,
            deleteStory: deleteStory,
            addScenario: addScenario,
            deleteScenario : deleteScenario,
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
            return $http.delete('/stories/' + story._id).then(function (res) {
                return res.data;
            });
        };

        function addScenario(id, scenario) {
            return $http.post('/stories/' + id + '/scenarios', scenario);
        }

        function deleteScenario(id, scenario){
            return $http.delete('/stories/' + id + '/scenarios/' + scenario._id, scenario).then(function(res){
                return res.data;
            });
        }
        function update(id, scenario){
            return $http.put('/stories/' + id, scenario).success(function(data){
                return data;
            });
        }

        function uploadAudio(audio) {
            return $http.post('/upload/audio', audio).then(function (data) {
                return data;
            });
        }

        function uploadImage(image) {
            return $http.post('/upload/image', image).then(function (data) {
                return data;
            });
        }
    }
})();
