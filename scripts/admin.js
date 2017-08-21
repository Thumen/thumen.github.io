var scotchApp = angular.module('myApp', ['ngRoute', 'ngTagsInput', 'textAngular']);
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/admin', {
            templateUrl: '/view_admin/listArticles.html',
            controller: 'adminController'
        })
        .when('/category', {
            templateUrl: '/view_admin/category.html',
            controller: 'adminController'
        })
        .when('/writenew', {
            templateUrl: '/view_admin/writenew.html',
            controller: 'adminController'
        })
        .when('/listArticles', {
            templateUrl: '/view_admin/listArticles.html',
            controller: 'adminController'
        })
});

// create the controller and inject Angular's $scope
scotchApp.controller('adminController', function(
    $scope,
    $http,
    $routeParams,
) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";




    $scope.init = function() {
        $scope.apiGetArticles();
        $scope.apiGetCategories();
    }


    $scope.apiGetArticles = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {
                $scope.articles = response.data;
            });
    };


    $scope.apiGetCategories = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {
                $scope.categories = response.data;
            })
    };


    $scope.getArticleID = function(id) {
        angular.forEach($scope.articles, function(value, key) {
            if (value._id === id) {

                $scope.article = value;
                return false;
            }
        });
    };
    $scope.getCategoryID = function(id) {
        angular.forEach($scope.categories, function(value, key) {
            if (value._id === id) {

                $scope.category = value;
                return false;
            }
        });
    };


    $scope.updateArticle = function() {
        $scope.article._author = "5981d730b38ced0004f0c5da";
        $http.patch(root + '/api/articles/' + $scope.article._id, $scope.article)
            .then(function successCallback(response) {
                window.location.href = '/admin.html#/listArticles';
                alert("Update Success");
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }

    $scope.updateCategory = function() {
        $scope.category._author = "5981d730b38ced0004f0c5da";
        $http.patch(root + '/api/categories/' + $scope.category._id, $scope.category)
            .then(function successCallbak(response) {

                window.location.href = '/admin.html#/category';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }

    $scope.deleteArticle = function() {
        $http.delete(root + '/api/articles/' + $scope.article._id)
            .then(function successCallback(response) {
                console.log('You have already deleted the articles')
                window.location.href = '/admin.html#/listArticles';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }
    $scope.deleteCategory = function() {
        $http.delete(root + '/api/categories/' + $scope.category._id)
            .then(function successCallback(response) {
                alert("Thành công");
                console.log('You have already deleted the categories')
                window.location.href = '/admin.html#/category';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }


    $scope.submitCreateArticle = function() {
        console.log($scope.newArticle);
        $scope.newArticle._author = "5981d730b38ced0004f0c5da";
        $http.post(root + '/api/articles/', $scope.newArticle)
            .then(function successCallbak(response) {
                alert("Thành công");
                window.location.href = '/admin.html#/listArticles';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    };
    $scope.submitCreateCategory = function() {

        if ($scope.newCategory.name.length > 0 &&
            $scope.newCategory.description.length > 0) {
            $http.post(root + "/api/categories", $scope.newCategory)
                .then(function uccessCallbak(response) {
                    alert("Thành công");
                    $scope.categories.push(response);
                    $scope.newCategory.name = "";
                    $scope.newCategory.description = "";

                }, function errorCallback(response) {
                    // console.log(data, status, headers, config);
                });
        } else {
            alert("Input invalid");
        }

    }


    $scope.getArticle = function() {
        $scope.currentArticleId = $routeParams.id;
    };

    $scope.getCategory = function() {
        $scope.currentCategoryId = $routeParams.id;
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

});