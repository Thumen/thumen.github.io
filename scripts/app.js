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
        .when('/single/:id', {
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
scotchApp.controller('mainController', function(
    $scope,
    $http,
    $routeParams,
    $location
) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";
    $scope.init = function() {
        $scope.apiGetArticles();
    }



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


    $scope.apiGetArticle = function() {
        var id = $routeParams.id;

        angular.forEach($scope.articles, function(value, key) {
            if (value._id === id) {
                $scope.article = value;
                console.log("success");
                return false;

            }
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


    // $scope.getArticleOfCategory = function(id, num) {
    //     var result = [];
    //     for (i = 0; i < $scope.articles.length; i++) {
    //         if (i === num) {
    //             return result;
    //         };
    //         result.push($scope.articles[i]);
    //     };
    // };

    // $scope.getArticle = function() {
    //     $scope.currentArticleId = $routeParams.id;
    // };


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



    $scope.getArticlesInCategory = function() {
        var id = $routeParams.id;
        var articlesInCategoryId = [];
        // alert(id);
        angular.forEach($scope.articles, function(value, key) {
            if (value.category._id === id) {
                articlesInCategoryId.push(value);
            }
        });
        $scope.articles = articlesInCategoryId;
    };




    $scope.$watchCollection("articles", function(newArticles, oldArticles) {
        angular.forEach(newArticles, function(value, key) {
            if (value._id === $scope.currentArticleId) {
                console.log("Find article of CurrentArticle");
                $scope.article = value;
                return false;
            }
        });
    });






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

        //POST signup API below:
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



});