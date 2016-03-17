var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/groupbuyId:gid', {
        templateUrl: 'order_view.html',
        controller: 'orderCtrl'
  })
    .when('/orderSubmitSuccess:oid', {
        templateUrl: 'order_success.html',
        controller: 'order_successCtrl'
  });
});



myApp.controller('orderCtrl', ['$scope', '$http',  '$log','$routeParams','$route',function($scope, $http, $log, $routeParams,$route) {
    $scope.groupbuyId = $routeParams.gid;
    var init = function(id) {
        $http.get('/groupbuy/' + id).success(function(response) {
            $scope.groupbuy = response;
        });
        $scope.order = {};
        $scope.orderItem = [];
        


    };
    init($scope.groupbuyId);
    
    $scope.submit_order = function() {
        $scope.order.groupbuyId = $scope.groupbuyId;
        $scope.order.items = $scope.orderItem;
        $scope.order.timestamp = +Date.now();
        for(i = 0;i<$scope.groupbuy.items.length;i++){
            $scope.order.items[i].item_name = $scope.groupbuy.items[i].item_name;
            $scope.order.items[i].item_price = $scope.groupbuy.items[i].item_price;
        }
        console.log($scope.order);
        $http.post('/order', $scope.order).success(function(response) {
            console.log(response._id);
            var order_url = '#/orderSubmitSuccess';
            window.location.href = order_url+response._id;
         });
    };
    
}]);

myApp.controller('order_successCtrl', ['$scope', '$http',  '$log','$routeParams','$route',function($scope, $http, $log, $routeParams,$route) {
    $scope.orderId = $routeParams.oid;
    var init = function(id) {
        $http.get('/order/' + id).success(function(response) {
            $scope.order = response;
        });
    };
    init($scope.orderId);
    


}]);