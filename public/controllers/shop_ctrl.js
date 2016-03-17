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
        
    };
    
    $scope.pickupOrder = function(id) 
    {
        
    };
    
    $scope.editOrder = function(selected_gb) 
    {
        
    };
    
    $scope.refresh = function() {
        
        
    };

}]);

