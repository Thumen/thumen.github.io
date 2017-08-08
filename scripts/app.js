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


// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function(
    $scope,
    $http,
    $routeParams,
    $location,
    $rootScope
) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";
    var maxPopularArticlesNumber = 5;
    var maxRandomArticlesNumber = 5;


    $scope.init = function() {
        $scope.apiGetArticles();
        $scope.apiGetCategories();
    }

    $scope.apiGetCategories = function() {
        $http.get(root + '/api/categories')
            .success(function(response) {
                $scope.categories = response;
            })
            .error(function(data, status, headers, config) {
                console.log(response);
            });
    };

    $scope.apiGetArticles = function() {
        $http.get(root + '/api/articles')
            .success(function(response) {
                $scope.articles = response;
            })
            .error(function(data, status, headers, config) {
                console.log(response);
            });
    };


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

    $scope.getArticle = function() {
        $scope.currentArticleId = $routeParams.id;
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



    // $scope.getArticlesInCategory = function(id, max) {
    //     // var id = $routeParams.id;
    //     var articlesInCategoryId = [];
    //     // alert(id);
    //     angular.forEach($scope.articles, function(value, key) {
    //         if (value.category._id === id) {
    //             articlesInCategoryId.push(value);
    //         }
    //     });
    //     $scope.articles = articlesInCategoryId;
    // };




    $scope.$watchCollection("articles", function(newArticles, oldArticles) {

        if ($scope.articles != undefined && $scope.articles.length > 0) {
            //Update current Article object
            if ($scope.currentArticleId != undefined) {
                angular.forEach(newArticles, function(value, key) {
                    if (value._id === $scope.currentArticleId) {
                        $scope.article = value;
                        return false;
                    }
                });
            }

            //Update  Popular Articles
            $scope.popularArticles = newArticles.slice(0, maxPopularArticlesNumber);

            //Update Random Acticles
            $scope.randomArticles = [];
            var listArticles = newArticles.slice();
            for (var i = 0; i < maxRandomArticlesNumber; i++) {
                if (listArticles.length > 0) {
                    var random = Math.floor(Math.random() * listArticles.length);
                    $scope.randomArticles.push(listArticles[random]);
                    listArticles.splice(random, 1);
                };
            };
            console.log($scope.randomArticles);

            $scope.numberOfArticleInCategories = [];

        };
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