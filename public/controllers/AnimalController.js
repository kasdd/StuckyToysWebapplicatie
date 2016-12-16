(function () {
    'use strict'

    angular.module("stuckyToys").controller("AnimalController", AnimalController)

    AnimalController.$inject = ['animalService', 'Upload']

    function AnimalController(animalService, Upload) {
        var vm = this;

        vm.animals;
        vm.addAnimal = addAnimal;
        vm.deleteAnimal = deleteAnimal;
        vm.playSounds = playSounds;

        activate();

        function activate() {
            getAnimals();
        }

        function getAnimals() {
            animalService.getAll().then(function (data) {
                vm.animals = data.data;
            })
        }

        function addAnimal() {
            var name = vm.name;
            var image = vm.image;
            var audio = vm.audio;
            if (vm.name === '' || vm.image === '' || vm.audio === '') {
                return;
            }
            animalService.uploadImage(vm.image).success(function (dataImg) {
                animalService.uploadAudio(vm.audio).success(function (dataAudio) {
                    animalService.create({
                        name: name,
                        image: dataImg,
                        audio: dataAudio
                    }).then(function (data) {

                        vm.animals.push(data.data)
                        vm.name = '';
                        vm.audio = null;
                        vm.image = null;
                    });
                });
            });
        }

        function deleteAnimal(animal) {
            animalService.deleteAnimal(animal);
                vm.animals.splice(animal._id,1);
        }

        function playSounds(src) {
            var thissound = new Audio(src);
            thissound.play();
        }
    }
})();