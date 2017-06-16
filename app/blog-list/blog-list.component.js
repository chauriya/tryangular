'use strict'

angular.module('blogList')
    .component('blogList', {
        templateUrl: 'app/blog-list/templates/blog-list.html',
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