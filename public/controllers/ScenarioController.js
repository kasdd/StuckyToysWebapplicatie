(function () {
    'use strict'

    angular.module("stuckyToys").controller('ScenarioController', ScenarioController)

    ScenarioController.$inject = ['storiesService', 'Upload', '$stateParams']

    function ScenarioController(storiesService, Upload, $stateParams) {
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
                if (vm.story.scenarios !== null) {
                    for (var i = 0; i < vm.story.scenarios.length; i++) {
                        storiesService.getScenario(vm.story.scenarios[i]).then(function (scenario) {
                            vm.scenarios.push(scenario);
                        });
                    }
                }
            });
        }

        function addScenario() {
            if (vm.image === '') {
                return;
            }
            storiesService.uploadImage(vm.image).then(function (dataImg) {
                console.log(dataImg);
                console.log('Afbeelding upgeload');
                storiesService.uploadAudio(vm.audio).then(function (dataAudio) {
                    console.log(dataImg);
                    console.log('audio klaar');
                    storiesService.uploadAudio(vm.opdracht).then(function (dataOpdracht) {
                        console.log(dataOpdracht);
                        console.log('opdracht klaar');
                        storiesService.update(vm.story._id, {
                            image: dataImg.data,
                            audio: dataAudio.data,
                            opdracht: dataOpdracht.data
                        }).then(function (data) {
                            console.log(data);
                            vm.story.scenarios = vm.story.scenarios || [];
                            console.log(vm.story);
                            console.log(data.data);
                            vm.story.scenarios.push(data.data);
                            console.log(vm.story);
                            vm.audio = '';
                            vm.image = null;
                            vm.opdracht = null;
                            getStory();
                        });
                    });
                });
            });
        }

        function deleteScenario(scenario) {
            storiesService.deleteScenario(vm.story._id, scenario);
            var index = vm.scenarios.findIndex(x => x._id == scenario._id);
            vm.story.scenarios.splice(index, 1);
        }

        function playSounds(src) {
            var thissound = new Audio(src);
            thissound.play();
        }
    };
})();