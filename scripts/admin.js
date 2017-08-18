var scotchApp = angular.module('myApp', ['ngRoute', 'ngTagsInput', 'textAngular']);
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page

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


    $scope.getArticleID = function(id) {
        angular.forEach($scope.articles, function(value, key) {
            if (value._id === id) {

                $scope.article = value;
                return false;
            }
        });
    };


    $scope.updateArticle = function() {
        $scope.article._author = "5981d730b38ced0004f0c5da";
        $http.patch(root + '/api/articles/' + $scope.article._id, $scope.article)
            .then(function successCallback(response) {
                window.location.href = '/listArticles';
                alert("Update Success");
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    }

    $scope.deleteArticle = function() {
        $http.delete(root + '/api/articles/' + $scope.article._id)
            .then(function successCallback(response) {
                console.log('You have already deleted the articles')
                window.location.href = 'listArticles.html';
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
                // window.location.href = 'admin.html';
            }, function errorCallback(response) {
                // console.log(data, status, headers, config);
            });
    };

    // $scope.updatedArticle = function() {
    //     console.log($scope.updatedArticle);
    //     $scope.updatedArticle._author = "5981d730b38ced0004f0c5da";
    //     $http.post(root + '/api/articles/', $scope.updatedArticle)
    //         .success(function(response) {
    //             alert("Thành công")
    //         }).error(function(data, status, headers, config) {
    //             console.log(data, status, headers, config);
    //         });;
    // };


    // $scope.removeArticle = function(id) {
    //     $http.delete(root + '/api/articles/' + id).success(function(response) {
    //         $location.url("/")
    //     }).error(function(data, status, headers, config) {
    //         console.log(data, status, headers, config);
    //     });;
    // }

    // $scope.apiGetArticle = function() {
    //     var id = $routeParams.id;

    //     angular.forEach($scope.articles, function(value, key) {
    //         if (value._id === id) {
    //             $scope.article = value;
    //             console.log("success");
    //             return false;

    //         }
    //     });

    // };

    $scope.apiGetCategories = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {
                $scope.categories = response.data;
            })
    };


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



    $scope.getArticle = function() {
        $scope.currentArticleId = $routeParams.id;
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