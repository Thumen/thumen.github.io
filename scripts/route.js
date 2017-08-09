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
        .when('/admin', {
            templateUrl: '/view_admin/allpost.html',
            controller: 'mainController'
        })
        .when('/category', {
            templateUrl: '/view_admin/category.html',
            controller: 'mainController'
        })
        .when('/writenew', {
            templateUrl: '/view_admin/writenew.html',
            controller: 'mainController'
        })
        .when('/listArticles', {
            templateUrl: '/view_admin/allpost.html',
            controller: 'mainController'
        })
        .when('/article/edit', {
            templateUrl: '/view_admin/article_edit.html',
            controller: 'mainController'
        })
});