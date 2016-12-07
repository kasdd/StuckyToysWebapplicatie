var app = angular.module('stuckyToys', ['ui.router', 'ngFileUpload', 'ng-file-model']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('home', {
            url: '/home',
            templateUrl: '/home.html',
            controller: 'DierenCtrl',
            resolve: {
                postPromise: ['animals', function (animals) {
                    return animals.getAll();
                }]
            }
        })
        .state('animals', {
            url: '/animals/:id',
            templateUrl: '/animals.html',
            controller: 'PostDierenCtrl',
            resolve: {
                animal: ['$stateParams', 'animals', function ($stateParams, animals) {
                    return animals.get($stateParams.id)
                }]
            }
        })
        .state('stories', {
            url: '/stories',
            templateUrl: '/stories.html',
            controller: 'StoriesCtrl',
            resolve: {
                stories: ['stories', function (animals) {
                    return stories.getAll();
                }]
            }
        })
        .state('story', {
            url: '/story/:id',
            templateUrl: '/story.html',
            controller: 'StoryCtrl'
        })
        .state('theme', {
            url: '/theme',
            templateUrl: '/theme.html',
            controller: 'ThemeCtrl'
        })

    $urlRouterProvider.otherwise('home');
}]);

app.factory('themes', ['$http', function($http){
    var o = {
        themes : []
    }

    o.getAll = function(){
        return $http.get('/themes').success(function(data){
            angular.copy(data, o.themes);
        });
    }

    o.create = function(thema){
        return $http.post('/themes', thema).success(function(data){
            o.themes.push(data);
        });
    };

    o.get = function(id){
        return $http.get('/themes/' + id).then(function(res){
            return res.data;
        });
    };

    o.addStory = function(id, story){
        return $http.post('/themes/' + id + '/stories', story);
    }
    
}]);

app.factory('stories', ['$http', function ($http) {
    var o = {
        stories: []
    }

    o.getAll = function () {
        return $http.get('/stories').success(function (data) {
            angular.copy(data, o.stories);
        });
    }

    o.create = function (story) {
        return $http.post('/stories', story).success(function (data) {
            o.stories.push(data);
        });
    };

    o.get = function (id) {
        return $http.get('/stories/' + id).then(function (res) {
            return res.data;
        });
    };

    o.addScenario = function (id, scenario) {
        return $http.post('/stories/' + id + '/scenarios', scenario);
    }
}]);

app.factory('animals', ['$http', function ($http) {
    var o = {
        animals: []
    };
    o.getAll = function () {
        return $http.get('/animals').success(function (data) {
            angular.copy(data, o.animals);
        });
    }

    o.create = function (animal) {
        return $http.post('/animals', animal).success(function (data) {
            o.animals.push(data);
        });
    }

    o.delete = function (id) {
        return $http.delete('/animals/' + id).then(function (res) {
            console.log(o.animals);
            o.animals.splice(id, 1);
            console.log(o.animals);
        });
    }

    o.uploadAudio = function (audio) {
        return $http.post('/upload/audio', audio).success(function(res){
            console.log(res);
        });
    }

    o.uploadImages = function (image) {
        return $http.post('/upload/image', image).success(function (res) {
            console.log(res);
        });
    }

    return o;
}]);

app.controller('DierenCtrl', ['$scope', 'animals', 'Upload',
    function ($scope, animals, Upload) {
        $scope.animals = animals.animals;
        $scope.addAnimal = function () {
            var name = $scope.name;
            if (name === '' || $scope.image === '' || $scope) {
                return;
            }
            animals.uploadImages($scope.image).success(function(dataImg){
                console.log($scope.audio);
                animals.uploadAudio($scope.audio).success(function(dataAudio){
                    animals.create({
                        name: name,
                        image: dataImg,
                        audio: dataAudio
                    });
                });
            })

            $scope.name = '';
            $scope.audio = '';
            $scope.image = '';
        };

        $scope.deleteAnimal = function (item) {
            animals.delete(item._id);
        };

        $scope.playSounds = function(src){
            var thissound = new Audio(src);
            thissound.play();
        }
    }
]);

/*app.controller('PostDierenCtrl', [
    '$scope', 'animals', 'animal',
    function ($scope, animals, animal) {
        $scope.animals = animals.animals;
        $scope.animal = animal;

        $scope.changeAnimal = function (imageSrc, audioSrc) {
            $scope.animal.audio = audioSrc;
            $scope.animal.image = imageSrc;

            imageSrc.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                    name: $scope.animal.name,
                    imageSrc: $scope.imageSrc
                }
            });
            audioSrc.upload = Upload.upload({
                url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                data: {
                    name: $scope.name,
                    audioSrc: $scope.audioSrc
                }
            });
        };
    }
]);*/

app.controller('StoriesCtrl', ['$scope', 'stories', function ($scope, stories) {
    $scope.stories = stories.stories;
    $scope.scenario = {};
    $scope.addScenario = function () {
        if (!$scope.name || $scope.name === '') {
            return;
        }
        $scope.stories.push({
            name: $scope.name,
            thema: $scope.thema,
            scenarios: [{
                audio: 'fileName',
                image: 'afbeelding'
            }]
        });
        $scope.name = '';
        $scope.thema = '';
    }

    $scope.deleteStory = function (item) {
        $scope.stories.splice(item, 1);
    };
}]);

/*app.controller('StoryCtrl', ['$scope', 'stories','story' ,'Upload', function ($scope, stories, story, Upload) {
    $scope.stories = stories.stories;
}]);

app.controller('ThemeCtrl', ['$scope', 'themes', function ($scope, themes) {
    $scope.themes = themes.themes;
    $scope.stories = test.stories;  //AANPASSEN

    $scope.addTheme = function (name, stories) {
        if (!$scope.name || $scope.name === '') {
            return;
        }
        var array = [];
        for (var i in stories) {
            if (stories[i].SELECTED)
                array.push(stories[i]);
            $scope.stories[i].SELECTED = false;
        }
        $scope.themes.push({
            name: name,
            stories: array
        });
        $scope.name = '';
    }

    $scope.deleteTheme = function (item) {
        $scope.themes.splice(item, 1);
    }
}]);*/