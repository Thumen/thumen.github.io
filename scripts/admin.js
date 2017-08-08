scotchApp.config(function($routeProvider) {
    $routeProvider

    // route for the home page
        .when('/admin', {
            templateUrl: '/view_admin/allpost.html',
            controller: 'MyCtrl'
        })
        .when('/category', {
            templateUrl: '/view_admin/category.html',
            controller: 'MyCtrl'
        })
        .when('/writenew', {
            templateUrl: '/view_admin/writenew.html',
            controller: 'MyCtrl'
        })
});

// create the controller and inject Angular's $scope
scotchApp.controller('MyCtrl', function(
    $scope,
    $http,
    $routeParams,
    $location,
    $rootScope
) {

});