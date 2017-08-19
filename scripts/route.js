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
        .when('/detailcat/{{cat._id}}', {
            templateUrl: '/view_index/detailcat.html',
            controller: 'mainController'
        })


});