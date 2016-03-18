var myApp = angular.module('myApp', ['ngRoute','ngAnimate','ui.bootstrap','toggle-switch']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/groupbuyId:gid', {
        templateUrl: 'group_detail.html',
        controller: 'shopCtrl'
  });

});

myApp.controller('shopCtrl', ['$scope', '$http',  '$log','$routeParams','$route','$uibModal',function($scope, $http, $log, $routeParams,$route,$uibModal) {
    $scope.groupbuyId = $routeParams.gid;
    
    var init = function(id) {
        $http.get('/groupbuy/' + id).success(function(response) {
            $scope.groupbuy = response;
            if($scope.groupbuy.status === "off")
                $scope.switchStatus = false;
            else
                $scope.switchStatus = true;
        });
    
        $http.get('/orderByGroupbuyId/' + id).success(function(response) {
            $scope.orders = response;
        });
        
    };
    init($scope.groupbuyId);

    $scope.toggle = function()
    {
        var status = {"status":"on"};
        if($scope.switchStatus === false)
            status = {"status":"off"};
        $http.put('/togglegroupbuy/' + $scope.groupbuy._id, status).success(function(response) {
            
        });
        $scope.refresh();
    }

    $scope.removeOrder = function(id) 
    {
        $http.delete('/order/' + id).success(function(response) {
            $scope.orders = response;
        });
        $scope.refresh();
    };
    
    $scope.pickupOrder = function(id) 
    {
        $http.put('/pickuporder/' + id ).success(function(response) {

        });
        $scope.refresh();
    };
    $scope.highlightRow = function(order)
    {
        if(order.pickedup)
            return "success";
        else
            return "";
    }
    $scope.editOrder = function(selected_order) 
    {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'newOrder.html',
            controller: 'newOrderCtrl',
            size: "lg",
            resolve: {
                gb: function() {return $scope.groupbuy;},
                order: function() {return selected_order;}
            }
        });
    
        modalInstance.result.then(function () {
         $scope.refresh();
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });

    };
    
    $scope.refresh = function() {
        $http.get('/orderByGroupbuyId/' + $scope.groupbuyId).success(function(response) {
            $scope.orders = response;
        });
    };
    $scope.addOrder = function()
    {
        var modalInstance = $uibModal.open({
            animation: true,
            templateUrl: 'newOrder.html',
            controller: 'newOrderCtrl',
            size: "lg",
            resolve: {
                gb: function() {return $scope.groupbuy;},
                order: function() {return null;}
            }
        });
        
        modalInstance.result.then(function () {
         $scope.refresh();
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
    };

}]);

myApp.controller('newOrderCtrl', function ($scope, $http, $uibModalInstance, gb, order) {

    $scope.groupbuy = gb;
    $scope.order = order;
    $scope.orderItem = [];
    $scope.editMode = true;
    if(order == null)
        $scope.editMode = false; 
    else
        $scope.orderItem = order.items;
    $scope.ok = function () {
      if($scope.editMode) {

        $http.put('/order/'+$scope.order._id, $scope.order).success(function(response) {
                console.log(response);
        });
      } else {
        $scope.order.groupbuyId = $scope.groupbuy._id;
        $scope.order.items = $scope.orderItem;
        $scope.order.timestamp = +Date.now();
        $scope.order.pickedup = false;
        $scope.order.batchId = $scope.groupbuy.batchId;
        for(i = 0;i<$scope.groupbuy.items.length;i++){
            $scope.order.items[i].item_name = $scope.groupbuy.items[i].item_name;
            $scope.order.items[i].item_price = $scope.groupbuy.items[i].item_price;
        }
        console.log($scope.order);
        $http.post('/order', $scope.order).success(function(response) {
            console.log(response._id);
         });
      }
     
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

});
