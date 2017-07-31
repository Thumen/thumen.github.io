// $.noConflict();
// jQuery(document).ready(function($) {
// Code that uses jQuery's $ can follow here.
//});
var scotchApp = angular.module('scotchApp', ['ngRoute']); //textAngular
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
            controller: 'mainController'
        })



});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $http) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";


    $scope.apiGetCategories = function() {
        $http.get(root + '/api/categories')
            .success(function(response) {
                console.log(response);
                $scope.categories = response;
            })
            .error(function(data, status, headers, config) {
                console.log(response);
            });
    };

    $scope.apiGetArticles = function() {
        $http.get(root + '/api/articles')
            .success(function(response) {
                console.log(response);
                $scope.articles = response;
            })
            .error(function(data, status, headers, config) {
                console.log(response);
            });
    };

    $scope.getCategoryNameOfArticle = function(id) {

        if (undefined != $scope.categories) {
            for (i = 0; i < $scope.categories.length; i++) {
                var cat = $scope.categories[i];
                if (cat._id == id) {
                    return cat.name;
                }
            }
        };

    }


    $scope.submitCreateCategory = function() {

        if ($scope.newCategory.name.length > 0 &&
            $scope.newCategory.description.length > 0) {
            $http.post(root + "/api/categories", $scope.newCategory)
                .success(function(response) {
                    $scope.categories.push(response);
                    $scope.newCategory.name = "";
                    $scope.newCategory.description = "";

                }).error(function(data, status, headers, config) {
                    console.log(data, status, headers, config);
                });
        } else {
            alert("Input invalid");
        }

    }
    $scope.submitCreateArticle = function() {
        console.log($scope.newArticle);
        $scope.newArticle._author = "5978a22fde96e7000418148b";
        $http.post(root + '/api/articles/', $scope.newArticle)
            .success(function(response) {
                alert("Thành công")
            }).error(function(data, status, headers, config) {
                console.log(data, status, headers, config);
            });;
    };

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

        //POST Login API below:
        $http.post(root + '/api/newusers/auth', $scope.newUser)
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


    $scope.init = function() {

    }
});