var scotchApp = angular.module('scotchApp', ['ngRoute', 'ngTagsInput', 'textAngular']);
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function(
    $scope,
    $http,
    $routeParams,
    $location,
    $rootScope,
    $filter
) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";
    var maxPopularArticlesNumber = 4;
    var maxRandomArticlesNumber = 4;

    // var idCat1 = "5983510622fd58000478aaa8";
    // var idCat2 = "5981d787b38ced0004f0c5db";
    // var idCat3 = "5981d805b38ced0004f0c5dd";
    // var idCat4 = "5981d805b38ced0004f0c5de";
    // var idCat5 = "5982f39a79630900046aba90";
    // var idCat6 = "5981d8aab38ced0004f0c5e0";

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


    var getArticlesById = function(id) {
        var articles = [];
        angular.forEach($scope.Articles, function(value, key) {
            if (value._category === id) {
                articles.push(value);
            }

        });
        return articles;
        console.log("Articles in Id :" + id + articles)
    };
    // $scope.getArticleOfCategory = function(id, num) {
    //     var result = [];
    //     for (i = 0; i < $scope.articles.length; i++) {
    //         if (i === num) {
    //             return result;
    //         };
    //         result.push($scope.articles[i]);
    //     };
    // };


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



    $scope.getArticle = function() {
        $scope.currentArticleId = $routeParams.id;
    };




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