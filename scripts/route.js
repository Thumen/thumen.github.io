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
        .when('/listcat/:id', {
            templateUrl: '/view_index/listcat.html',
            controller: 'mainController'
        })
        .when('/search/:_term', {
            templateUrl: '/view_index/search.html',
            controller: 'mainController'
        })
        .when('/search/:_term', {
            templateUrl: '/view_index/search.html',
            controller: 'mainController'
        })


});