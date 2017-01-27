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
        vm.deleteStory = deleteStory;

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

        function deleteStory(id){
            console.log(id);
        }

        function addStory(){
            console.log(vm.name);
            var name = vm.name;
            var selected = vm.selected;
            vm.name = '';
            if(name === ''){return;}
            storiesService.addStory({
                name : name,
                spinTheStory : selected,
                scenarios: null
            }).then(function(data){
                vm.stories.push(data.data);
            })

        } 
    }
})();
