(function () {
    'use strict'

    angular.module("stuckyToys").controller("ThemeController", ThemeController)

    ThemeController.$inject = ['storiesService', 'themeService', 'Upload']

    function ThemeController(storiesService, themeService, Upload) {
        var vm = this;
        vm.story;
        vm.themes;
        vm.stories;
        vm.addTheme = addTheme;
        vm.deleteTheme = deleteTheme;
        vm.check = check;

        activate();

        function activate() {
            getThemes();
            getStories();
        }

        function getThemes() {
            themeService.getAll().then(function (data) {
                vm.themes = data.data;
            });
        }

        function check(story, thema){
            for(var id = 0; id<thema.stories.length; id++){
                console.log(thema.stories[id]);
                if(story._id == thema.stories[id]){
                    return true;
                }
            }
            return false;
        }

        function getStories() {
            storiesService.getAll().then(function (data) {
                vm.stories = data.data;
            });
        }

        function addTheme() {
            if (vm.name === '' || vm.stories.lenght === 0) {
                return;
            }
            var name = vm.name;
            var array = [];
            for (var i in vm.stories) {
                if (vm.stories[i].SELECTED)
                    array.push(vm.stories[i]);
                vm.stories[i].SELECTED = false;
            }
            themeService.create({
                name: name,
                stories: array
            }).then(function (data) {
                vm.themes.push(data.data);
            });
            vm.name='';
        }

        function deleteTheme(theme) {
            themeService.deleteTheme(theme);
            var index = vm.themes.findIndex(x => x._id == theme._id);
            vm.themes.splice(index, 1);
        }
    }
})();