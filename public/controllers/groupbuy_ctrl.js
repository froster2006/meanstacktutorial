myApp.controller('gbCtrl', ['$scope', '$http',  '$log','$routeParams','$route','$uibModal',function($scope, $http, $log, $routeParams,$route,$uibModal) {
    $scope.groupbuyId = $routeParams.gid;
    
    var init = function(id) {
        $http.get('/distinctBatchId/' + id).success(function(response) {
            $scope.groupbuyBatchIdArray = response;
            $http.get('/groupbuy/' + id).success(function(response) {
                $scope.groupbuy = response;
                if($scope.groupbuy.status === "off")
                    $scope.switchStatus = false;
                else
                    $scope.switchStatus = true;
                if($scope.groupbuyBatchIdArray.indexOf($scope.groupbuy.batchId) === -1)
                    $scope.groupbuyBatchIdArray.push($scope.groupbuy.batchId);
                $scope.groupbuyBatchIdArray.sort().reverse();
                $scope.selectedBatchId=$scope.groupbuyBatchIdArray[0];
                $http.get('/orderBybatchId/' + id+ '/'+$scope.selectedBatchId).success(function(response) {
                    $scope.orders = response;
                    $scope.totalItemCount={};
                    $scope.wechat_msg ="";
                    for(var i = 0;i<$scope.orders.length;i++)
                    {
                        $scope.totalItemCount[$scope.orders[i].item_name] = +$scope.totalItemCount[$scope.orders[i].item_name] + +$scope.orders[i].item_count;
                        if(!$scope.orders[i].pickedup)
                            $scope.wechat_msg +="@" + $scope.orders[i].name + " ";
                        //console.log($scope.totalItemCount);
                    }
                    if($scope.wechat_msg !="")
                        $scope.wechat_msg +="可以来提货了 谢谢";
                    //console.log($scope.totalItemCount);
                });
            });
        });

    };

    init($scope.groupbuyId);


    $scope.create_groupbuyURL = function(){
        var order_url = "/order.html#/groupbuyId";
        return order_url+$scope.groupbuyId;
    };

    $scope.toggle = function()
    {
        var status = {"status":"on"};
        if($scope.switchStatus === false)
            status = {"status":"off"};
        $http.put('/togglegroupbuy/' + $scope.groupbuy._id, status).success(function(response) {
            
        });
        $scope.refresh();
    }

    $scope.removeOrder = function(order) 
    {
        var msg = "请确认删除"+order.name+"的订单";
        var r = confirm(msg);
        if (r == true) {
            $http.delete('/order/' + order._id).success(function(response) {
                $scope.orders = response;
            });
        } 

        $scope.refresh();
    };
    
    $scope.pickupOrder = function(id) 
    {
        $http.put('/pickuporder/' + id ).success(function(response) {
            $scope.refresh();
        });
        
    };
    $scope.highlightRow = function(order)
    {
        if(order.pickedup)
            return "panel-success";
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
                order: function() {return selected_order;},
                gbBatchIds: function() {return $scope.groupbuyBatchIdArray;},
                currentBatchId : function(){return null;}
            }
        });
    
        modalInstance.result.then(function () {
         $scope.refresh();
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });

    };
    
    $scope.refresh = function() {

        $http.get('/orderBybatchId/' + $scope.groupbuy._id+ '/'+$scope.selectedBatchId).success(function(response) {
                $scope.orders = response;
                _orders = response;
                $scope.wechat_msg ="";
                $scope.totalItemCount = {};
                for(var i = 0;i<$scope.orders.length;i++) {
                    $scope.totalItemCount[$scope.orders[i].item_name] = +$scope.totalItemCount[$scope.orders[i].item_name] + +$scope.orders[i].item_count;
                    if(!$scope.orders[i].pickedup)
                        $scope.wechat_msg +="@" + $scope.orders[i].name + " ";
                }
                if($scope.wechat_msg !="")
                    $scope.wechat_msg +="可以来提货了 谢谢";
                //console.log($scope.totalItemCount);
                
        });
        $scope.tableInit();
    };

    $scope.selectTextArea =function($event)
    {
         $event.target.select();
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
                order: function() {return null;},
                gbBatchIds: function() {return $scope.groupbuyBatchIdArray;},
                currentBatchId : function(){return $scope.selectedBatchId;}
            }
        });
        
        modalInstance.result.then(function () {
         $scope.refresh();
        }, function () {
          //$log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.tableInit = function()
    {
        $scope.totalOrderItemCount = {};
    };
}]);

myApp.controller('newOrderCtrl', function ($scope, $http, $uibModalInstance, gb, order,gbBatchIds, currentBatchId) {

    $scope.groupbuy = gb;
    $scope.order = order;
    $scope.orderItem = [];
    $scope.editMode = true;
    $scope.gbBatchIds = gbBatchIds;
    $scope.selectedBatchId = currentBatchId;
    if(order == null)
        $scope.editMode = false; 
    else {
        $scope.orderItem = order.items;
        $scope.selectedBatchId = order.batchId;
    }
    $scope.ok = function () {
      if($scope.editMode) {
        $scope.order.batchId = $scope.selectedBatchId;
        for(i = 0;i<$scope.groupbuy.items.length;i++){
            $scope.order.items[i].item_name = $scope.groupbuy.items[i].item_name;
            $scope.order.items[i].item_price = $scope.groupbuy.items[i].item_price;
        }
        $http.put('/order/'+$scope.order._id, $scope.order).success(function(response) {
                //console.log(response);
        });
      } else {
        $scope.order.batchId = $scope.selectedBatchId;
        $scope.order.groupbuyId = $scope.groupbuy._id;
        $scope.order.items = $scope.orderItem;
        $scope.order.timestamp = +Date.now();
        $scope.order.pickedup = false;
        for(i = 0;i<$scope.groupbuy.items.length;i++){
            $scope.order.items[i].item_name = $scope.groupbuy.items[i].item_name;
            $scope.order.items[i].item_price = $scope.groupbuy.items[i].item_price;
        }
        //console.log($scope.order);
        $http.post('/order', $scope.order).success(function(response) {
            //console.log(response._id);
         });
      }
     
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.unpickup = function () {
        $http.put('/unpickuporder/' + $scope.order._id ).success(function(response) {

        });
        $uibModalInstance.close();
    };

});
