var scotchApp = angular.module('scotchApp', ['ngRoute']);
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);
// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/', {
            templateUrl: '/view_index/listpost.html',
            controller: 'mainController'
        })
        .when('/single', {
            templateUrl: '/view_index/single.html',
            controller: 'mainController'
        })
});

scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/category', {
            templateUrl: '/view_admin/category.html',
            controller: 'mainController'
        })
        .when('/post', {
            templateUrl: '/view_admin/allpost.html',
            controller: 'mainController'
        })
        .when('/writenew', {
            templateUrl: '/view_admin/writenew.html',
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
        $scope.newArticle._author = "5981d730b38ced0004f0c5da";
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
        $http.post(root + '/api/users/auth', $scope.newUser)
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