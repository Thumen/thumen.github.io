$.noConflict();
jQuery(document).ready(function($) {
    // Code that uses jQuery's $ can follow here.
});
var scotchApp = angular.module('scotchApp', ['ngRoute']);
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: '/listpost.html',
            controller: 'mainController'
        })
        .when('/single', {
            templateUrl: '/single.html',
            controller: 'singleController'
        })



});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $http) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";

    $scope.message = 'Everyone come and see how good I look!';

    $scope.login = function() {
        //console.log($scope.user);

        //POST Login API below:
        $http.post(root + '/api/users/auth', $scope.user)
            .success(function(response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            })
            .error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });

    };
    $scope.signup = function() {

    }

    $scope.init = function() {
        $http.get(root + '/api/categories')
            .success(function(response) {
                console.log(response);
                $scope.categories = response;
            })
            .error(function(data, status, headers, config) {

            });
    }

});