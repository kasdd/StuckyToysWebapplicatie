(function () {
    'use strict'

    angular.module("stuckyToys").controller("StoriesController", StoriesController)

    StoriesController.$inject = ['storiesService']

    function StoriesController(storiesService, $stateParams) {
        var vm = this;

        var stories;

        vm.getStories = getStories;
        vm.getStory = getStory;
        vm.addStory = addStory;

        activate();

        function activate() {
            getStories();
        }

        function getStories() {
            storiesService.getAll().then(function (data) {
                vm.stories = data.data
            })
        }

        function getStory() {
            storiesService.get($stateParams.id).then(function(data) {
                vm.story = story;
            })
        }

        function addStory(){
            console.log(vm.name);
            var name = vm.name;
            vm.name = '';
            if(name === ''){return;}
            storiesService.addStory({
                name : name,
                scenarios: null
            }).then(function(data){
                vm.stories.push(data.data);
            })

        } 
    }
})();
