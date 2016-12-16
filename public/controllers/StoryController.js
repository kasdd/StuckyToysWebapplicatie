(function () {
    'use strict'

    angular.module("stuckyToys").controller('StoryController', StoryController)

    StoryController.$inject = ['storiesService', 'Upload', '$stateParams']

    function StoryController(storiesService, Upload, $stateParams) {
        var vm = this;

        vm.story;
        vm.scenarios;
        vm.addScenario = addScenario;
        vm.deleteScenario = deleteScenario;
        vm.playSounds = playSounds;

        activate();

        function activate() {
            getStory();  
        }
        
        function getStory() {
            vm.scenarios = [];
            return storiesService.get($stateParams.id).then(function (story) {
                vm.story = story;
                    for (var i = 0; i < vm.story.scenarios.length; i++){
                    storiesService.getScenario(vm.story.scenarios[i]).then(function(scenario){
                        vm.scenarios.push(scenario);
                    });
                    }
            });
        }

        function addScenario() {
            var image = vm.image;
            var audio = vm.audio;
            if (vm.image === '') {
                return;
            }
            storiesService.uploadImage(vm.image).success(function (dataImg) {
                storiesService.uploadAudio(vm.audio).success(function (dataAudio) {
                    console.log(dataAudio);
                    storiesService.update(vm.story._id, {
                        name: vm.name,
                        image: dataImg,
                        audio: dataAudio
                    }).then(function (data) {
                        console.log(data);
                        console.log(vm.story);
                        vm.story.scenarios = vm.story.scenarios || [];    
                        vm.story.scenarios.push(data.data)
                        vm.audio = '';
                        vm.image = null;
                        console.log(vm.story.scenarios);
                    });
                });
            });
        }

        function deleteScenario(scenario) {
            storiesService.deleteScenario(vm.post.id, scenario);
            vm.story.scenarios.splice(scenario.id, 1);
        }

        function playSounds(src) {
            var thissound = new Audio(src);
            thissound.play();
        }
    };
})();