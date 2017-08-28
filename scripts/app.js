var scotchApp = angular.module('scotchApp', ['ngRoute', 'ui.bootstrap']);
scotchApp.config(['$locationProvider', function($locationProvider) {
    $locationProvider.hashPrefix('');
}]);

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function(
    $scope,
    $http,
    $routeParams,

) {
    // create a message to display in our view
    var root = "https://green-web-blog.herokuapp.com";
    var maxPopularArticlesNumber = 4;
    var maxRandomArticlesNumber = 4;
    var myId = '5981d730b38ced0004f0c5da';
    $scope.keySearch = "";


    //Begin Sort Array
    var compareValues = function(key, order = 'asc') {
        return function(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                // property doesn't exist on either object
                return 0;
            }

            const varA = (typeof a[key] === 'string') ?
                a[key].toUpperCase() : a[key];
            const varB = (typeof b[key] === 'string') ?
                b[key].toUpperCase() : b[key];

            let comparison = 0;
            if (varA > varB) {
                comparison = 1;
            } else if (varA < varB) {
                comparison = -1;
            }
            return (
                (order == 'desc') ? (comparison * -1) : comparison
            );
        };
    }


    $scope.init = function() {
        $scope.apiGetArticles();
        $scope.apiGetCategories();
        $scope.getArticle();
    }

    //Search Aritcle
    $scope.getArticleBySearchKey = function() {
        $scope.keyWord = $routeParams._term;
        $http.get(root + '/api/articles/search/' + $scope.keyWord)
            .then(function successCallbak(response) {
                $scope.articleGetByKey = response.data;
            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });
    }

    $scope.apiGetArticles = function() {
        $http.get(root + "/api/articles")
            .then(function(response) {
                $scope.articles = response.data;
            });
    };


    // $scope.submitCreateArticle = function() {
    //     console.log($scope.newArticle);
    //     $scope.newArticle._author = "5981d730b38ced0004f0c5da";
    //     $http.post(root + '/api/articles/', $scope.newArticle)
    //         .then(function successCallbak(response) {
    //             alert("Thành công");
    //             // window.location.href = 'admin.html';
    //         }, function errorCallback(response) {
    //             console.log(data, status, headers, config);
    //         });
    // };

    $scope.apiGetCategories = function() {
        $http.get(root + "/api/categories")
            .then(function(response) {
                $scope.categories = response.data;
            });
    };
    // $scope.submitCreateCategory = function() {

    //     if ($scope.newCategory.name.length > 0 &&
    //         $scope.newCategory.description.length > 0) {
    //         $http.post(root + "/api/categories", $scope.newCategory)
    //             .then(function successCallbak(response) {
    //                 alert("Thành công");
    //                 $scope.categories.push(response);
    //                 $scope.newCategory.name = "";
    //                 $scope.newCategory.description = "";

    //             }, function errorCallback(response) {
    //                 console.log(data, status, headers, config);
    //             });
    //     } else {
    //         alert("Input invalid");
    //     }

    // }

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

    $scope.getAllArticleinCategories = function() {
            $scope.currentCategoryID = $routeParams.id;
            $scope.articlesInCategory = getArticlesById($scope.currentCategoryID);
            // $scope.articlesInCategorySortedByDate = $scope.articlesInCategory.sort(compareValues('createdDate', 'desc'))

        }
        //Begin get articles by id
    var getArticlesById = function(id, maximumArticle) {
        if (maximumArticle === undefined) {
            if ($scope.articles === undefined) {
                maximumArticle = 0;
            } else {
                maximumArticle = $scope.articles.length;
            }
        }
        var articles = [];
        angular.forEach($scope.articles, function(value, key) {
            if (value._category._id === id && articles.length < maximumArticle) {
                articles.push(value);
            }
        });
        return articles;

    };

    $scope.getArticle = function() {
        $scope.currentArticleId = $routeParams.id;
    };

    // Comment
    $scope.addCommentforArticle = function() {
        $scope.newComment._user = myId;
        $http.put(root + '/api/article/comment/' + $scope.article._id, $scope.newComment)
            .then(function successCallbak(response) {
                $scope.article = response.data;
                alert("Thành công");
                console.log(response.data);
            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });
    }

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
            //Dynamic
            $scope.getAllArticleinCategories();
            //Begin Pagination
            $scope.viewby = 5;
            $scope.totalItems = newArticles.length;
            $scope.currentPage = 1;
            $scope.itemsPerPage = $scope.viewby;
            $scope.maxSize = 5;

            $scope.setPage = function(pageNo) {
                $scope.currentPage = pageNo;
            };

            $scope.pageChanged = function() {
                console.log('Page changed to: ' + $scope.currentPage);
            };

            $scope.setItemsPerPage = function(num) {
                $scope.itemsPerPage = num;
                $scope.currentPage = 1;
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
            .then(function successCallbak(response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });

    };

    $scope.signup = function() {
        //POST signup API below:
        $http.post(root + '/api/users/auth', $scope.newUser)
            .then(function successCallbak(response) {
                var isSuccess = response.success;
                if (isSuccess) {
                    console.log(response);
                } else {
                    //Raise Error
                    alert(response.message);
                }
            }, function errorCallback(response) {
                console.log(data, status, headers, config);
            });
    };

});