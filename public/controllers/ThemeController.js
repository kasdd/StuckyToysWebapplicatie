(function () {
    'use strict'

    angular.module("stuckyToys").controller("ThemeController", ThemeController)

    ThemeController.$inject = ['storiesService','themeService', 'Upload']

    function ThemeController(storiesService,themeService, Upload) {
        var vm = this;

        vm.themes;
        vm.stories;

        vm.addTheme = addTheme;
        vm.deleteTheme = deleteTheme;
 
        activate();

        function activate() {
            getThemes();
            getStories();
        }

        function getThemes() {
            vm.themes;
            themeService.getAll().then(function (data) {
                vm.themes = data.data;
            })
        }

        function getStories(){
            storiesService.getAll().then(function(data){
                vm.stories = data.data;
            })
        }

        function addTheme(){
            if(vm.name === '' || vm.stories.lenght === 0){return ;}
            var name = vm.name;
            var array = [];
            for(var i in vm.stories){
                if(vm.stories[i].SELECTED)
                array.push(vm.stories[i]);
                vm.stories[i].SELECTED = false;
            }
            themeService.create({
                name: name,
                stories : array
            }).then(function(data){
                vm.themes.push(data.data);
            });
        }

        function deleteTheme(theme) {
            themeService.deleteTheme(theme);
                vm.themes.splice(theme._id,1);
        }
    }
})();
