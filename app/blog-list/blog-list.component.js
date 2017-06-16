'use strict'

angular.module('blogList')
    .component('blogList', {
        template: '<div class=""><h1 class="new-class">{{ title }}</h1><button ng-click="clickFunction()">Click Me!</button></div>',
        controller: function ($scope){
            console.log('Im in controller');
            $scope.title = "Hello Gaurav!!";
            $scope.clicks = 0; 
            $scope.clickFunction = function() {
                $scope.clicks += 1; 
                $scope.title = 'Clicked '+ $scope.clicks + ' times';
            };
        }
    });
    /*.controller('BlogListController', function ($scope){
        console.log('Im in controller');
        $scope.title = "Hello Gaurav!!";
        $scope.clickFunction = function() {
            $scope.title = 'Clicked';
        };
    });*/
    //.component();