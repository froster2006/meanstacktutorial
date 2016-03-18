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
        $scope.order = {};
        $scope.orderItem = [];
        $scope.groupbuyON = true;
        $scope.hasError = false;
        $http.get('/groupbuy/' + id).success(function(response) {
            $scope.groupbuy = response;
            if($scope.groupbuy.status === 'off')
                $scope.groupbuyON = false;
            $scope.orderItem = $scope.groupbuy.items;
        });

    };
    init($scope.groupbuyId);

    $scope.submit_order = function() {
        $scope.submit_check_message="";
        $scope.hasError = false;
        $scope.order.groupbuyId = $scope.groupbuyId;
        $scope.order.items = $scope.orderItem;
        $scope.order.timestamp = +Date.now();
        $scope.order.pickedup = false;
        $scope.order.batchId = $scope.groupbuy.batchId;
        var total_count = 0;
        for(i = 0;i<$scope.order.items.length;i++){
            total_count += $scope.order.items[i].item_count;
        }
        //console.log($scope.order);
        $scope.submit_check_message="";
        if(total_count === 0){
            $scope.submit_check_message="订单数不能为0";
            $scope.hasError = true;
        }
        else if($scope.order.name ==="" || $scope.order.name === null || 
            $scope.order.phone_number ==="" || $scope.order.phone_number == null ) {
            $scope.submit_check_message="请填写微信名及电话";
            $scope.hasError = true;
        }
        else{
            $http.post('/order', $scope.order).success(function(response) {
                console.log(response._id);
                var order_url = '#/orderSubmitSuccess';
                window.location.href = order_url+response._id;
             });
        }
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