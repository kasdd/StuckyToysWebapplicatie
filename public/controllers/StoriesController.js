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
                vm.stories.sort(function(a,b){
                    if(a.name < b.name) return -1;
                    if(a.name > b.name) return 1;
                });
            });
        }

        function getStory() {
            storiesService.get($stateParams.id).then(function(data) {
                vm.story = story;
            })
        }

        function deleteStory(story){
            storiesService.deleteStory(story);
            var index = vm.stories.findIndex(x=> x._id == story._id);
            vm.stories.splice(index, 1);
        }

        function addStory(){
            console.log(vm.name);
            var name = vm.name;
            var selected = vm.selected || false;
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
