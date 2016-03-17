var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/groupbuyId:gid', {
        templateUrl: 'group_detail.html',
        controller: 'shopCtrl'
  });

});

myApp.controller('shopCtrl', ['$scope', '$http',  '$log','$routeParams','$route',function($scope, $http, $log, $routeParams,$route) {
    $scope.groupbuyId = $routeParams.gid;

    var init = function(id) {
        $http.get('/groupbuy/' + id).success(function(response) {
            $scope.groupbuy = response;
        });
    
        $http.get('/orderByGroupbuyId/' + id).success(function(response) {
            $scope.orders = response;
        });
    };
    init($scope.groupbuyId);

    $scope.removeOrder = function(id) 
    {
        $http.delete('/order/' + id).success(function(response) {
            $scope.orders = response;
        });
        $scope.refresh();
    };
    
    $scope.pickupOrder = function(id) 
    {
        $scope.refresh();
    };
    
    $scope.editOrder = function(selected_gb) 
    {
        $scope.refresh();
    };
    
    $scope.refresh = function() {
        $http.get('/orderByGroupbuyId/' + $scope.groupbuyId).success(function(response) {
            $scope.orders = response;
        });
    };
    $scope.addOrder = function()
    {
        
    };
}]);

