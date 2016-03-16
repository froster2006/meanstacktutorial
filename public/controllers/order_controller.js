var myApp = angular.module('myApp', ['ngRoute']);

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
        $http.get('/groupbuy/' + id).success(function(response) {
            $scope.groupbuy = response;
        });
        $scope.order = {};
        $scope.orderItem = {};

    };
    init($scope.groupbuyId);
    
    $scope.submit_order = function() {
        $scope.order.groupbuyId = $scope.groupbuyId;
        $scope.order.items = $scope.orderItem;
        for(i = 0;i<$scope.groupbuy.items.length;i++){
            $scope.order.items[i].item_name = $scope.groupbuy.items[i].item_name;
            $scope.order.items[i].item_price = $scope.groupbuy.items[i].item_price;
        }
        console.log($scope.order);
        $http.post('/order', $scope.order).success(function(response) {
            console.log(response);
         });
    };
    


    

    
    
}]);

