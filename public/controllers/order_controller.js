var myApp = angular.module('myApp', ['ngAnimate','ui.bootstrap','ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/groupbuyId:gid', {
    templateUrl: 'order_view.html',
    controller: 'orderCtrl'
  });

});

myApp.controller('orderCtrl', ['$scope', '$http',  '$log','$routeParams','$route',function($scope, $http, $log, $routeParams,$route) {
    $scope.groupbuyId = $routeParams.gid;
    
    var init = function(id) {
        //console.log(id);
        $http.get('/groupbuy/' + id).success(function(response) {
            $scope.groupbuy = response;
            //console.log($scope.groupbuy);
        });
        $scope.order = [];
        $scope.orderItem = [];
    };
    init($scope.groupbuyId);
    
    var submit = function() {
        
        
    };
    


    

    
    
}]);

