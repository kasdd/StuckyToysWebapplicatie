var app = angular.module('stuckyToys', ['ui.router', 'ngFileUpload']);

app.config(['$stateProvider','$urlRouterProvider',function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/index.html',
      controller: 'DierenCtrl'
    })
    .state('animals', {
     url: '/animals/{id}',
    templateUrl: '/animals.html',
    controller: 'PostDierenCtrl'
    })
    .state('stories', {
        url: '/stories',
        templateUrl: '/stories.html',
        controller: 'StoriesCtrl'
    })
    .state('story', {
        url: '/story/{id}',
        templateUrl: '/story.html',
        controller: 'StoryCtrl'
    })

 $urlRouterProvider.otherwise('home');
}]);

app.factory('test', [function(){
var o = {
    animals: [ {name: 'beer', audio: 'fileName', image: 'afbeelding'},
        {name: 'bever', audio: 'fileName', image: 'afbeelding'},
        {name: 'kip', audio: 'fileName', image: 'afbeelding'},
        {name: 'leeuw', audio: 'fileName', image: 'afbeelding'},
        {name: 'nijlpaard', audio: 'fileName', image: 'afbeelding'},
        {name: 'poes', audio: 'fileName', image: 'afbeelding'},
        {name: 'ezel', audio: 'fileName', image: 'afbeelding'},
        {name: 'kip', audio: 'fileName', image: 'afbeelding'},
        {name: 'konijn', audio: 'fileName', image: 'afbeelding'},
        {name: 'ooievaar', audio: 'fileName', image: 'afbeelding'},
        {name: 'varken', audio: 'fileName', image: 'afbeelding'},
        {name: 'wormpje', audio: 'fileName', image: 'afbeelding'}],

    stories: [{name: 'monsters', thema : '' , scenarios : [{audio: 'fileNameM', image: 'afbeeldingM'}, {audio: 'fileNameM', image: 'afbeeldingM'}, {audio: 'fileNameM', image: 'afbeeldingM'}]},
    {name: 'bosdieren', thema : '', scenarios : [{audio: 'fileNameB', image: 'afbeeldingB'}]},
    {name: 'schoolspel',thema : 'pesten', scenarios : [{audio: 'fileName', image: 'afbeelding'}, {audio: 'fileName', image: 'afbeelding'}]},
    {name: 'voetbal', thema : 'leiderschap', scenarios : [{audio: 'fileName', image: 'afbeelding'}, {audio: 'fileName', image: 'afbeelding'}, {audio: 'fileName', image: 'afbeelding'}]}],

};
return o;
}]);

app.controller('DierenCtrl', [
'$scope','test',  function($scope, test){
    $scope.animals = test.animals;

    $scope.addAnimal = function(){
        if(!$scope.name || $scope.name === '') { return; }
        $scope.animals.push({name: $scope.name, audio :'fileName', image: 'afbeelding'});
        $scope.name = '';
    };

    $scope.deleteAnimal = function(item){
         $scope.animals.splice(item, 1);  
        };
}]);    

app.controller('PostDierenCtrl', [
    '$scope', '$stateParams', 'test', 'Upload', function($scope, $stateParams, test, Upload){
        $scope.animal = test.animals[$stateParams.id];

        $scope.changeAnimal = function(imageSrc, audioSrc){
            console.log($scope.animal);
            $scope.animal.audio = audioSrc;
            $scope.animal.image = imageSrc;

            console.log($scope.animal);

              imageSrc.upload = Upload.upload({
                  url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                  data : {name : $scope.animal.name, imageSrc : $scope.imageSrc}
              });
              audioSrc.upload = Upload.upload({
                  url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
                  data : {name : $scope.name, audioSrc : $scope.audioSrc}
              });

              console.log($scope.animal);
        };
    }]);

app.controller('StoriesCtrl', ['$scope', 'test', function($scope, test){
    $scope.stories = test.stories;

    $scope.addStory = function(){
        if(!$scope.name || $scope.name === '') { return; }
        $scope.stories.push({name: $scope.name, thema : $scope.thema,  scenarios : [{audio: 'fileName', image: 'afbeelding'}]});
        $scope.name = '';
        $scope.thema = '';
    }

    $scope.deleteStory = function(item){
         $scope.stories.splice(item, 1);
    };    
}]);

app.controller('StoryCtrl', ['$scope', '$stateParams', 'test', 'Upload', function($scope, $stateParams, test, Upload){
    $scope.story = test.stories[$stateParams.id]


}]);


