var myApp = angular.module('myApp', ['ngRoute','ngAnimate','ui.bootstrap','toggle-switch']);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('/groupbuyId:gid', {
        templateUrl: 'group_detail.html',
        controller: 'gbCtrl'
  })
   .when('/shopId:shopId', {
        templateUrl: 'shop_detail.html',
        controller: 'shopCtrl'   

   });
});


myApp.controller('shopCtrl', ['$scope', '$http',  '$log','$routeParams','$route','$uibModal',function($scope, $http, $log, $routeParams,$route,$uibModal) {
    $scope.shopId = $routeParams.shopId;

var refresh = function() {
  $http.get('/shop/'+$scope.shopId).success(function(response) {
    $scope.shop = response;
  });
  $http.get('/groupbuyByShopId/'+$scope.shopId).success(function(response) {
    $scope.groupbuyList = response;
  });

};

refresh();

$scope.newGroupbuy = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newGroupBuy.html',
      controller: 'newGroupBuyCtrl',
      size: "lg",
      resolve: {
        shop: function () {
          return $scope.shop;
        },
        gb: function () {
          return null;
        }
      }
    });
    
    modalInstance.result.then(function () {
     refresh();
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
};

$scope.editGroupbuy = function(selected_gb) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newGroupBuy.html',
      controller: 'newGroupBuyCtrl',
      size: "lg",
      resolve: {
        shop: function() {return null;},
        gb: function() {return selected_gb;}
      }
    });
    
    modalInstance.result.then(function () {
     refresh();
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
};

$scope.editShop = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newShop.html',
      controller: 'newShopCtrl',
      size: "lg",
      resolve: {
          shop: function(){return $scope.shop;}
      }
    });
    
    modalInstance.result.then(function () {
     refresh();
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
};

$scope.removeGroupbuy = function(id) {
  console.log(id);
  var msg = "请确认删除这个团购";
  var r = confirm(msg);
  if (r == true) {
    $http.delete('/groupbuy/' + id).success(function(response) {
      refresh();
    });
  }
};


$scope.gotoGroupbuy = function(gid){
    var order_url = "/order.html#/groupbuyId";

    window.location.href = order_url+gid;   
};



$scope.gotoGroupbuyOrders = function(id) {
    var shop_groupbuy_url = '/shop.html#/groupbuyId';
    window.location.href = shop_groupbuy_url+id;   
};


}]);

myApp.controller('newGroupBuyCtrl', function ($scope, $http, $uibModalInstance, shop, gb) {

    $scope.shop = shop;
    $scope.groupbuy = gb;
    console.log($scope.groupbuy);
    console.log($scope.shop);
    $scope.items = [];
    if(gb != null) 
        $scope.items = $scope.groupbuy.items;
    $scope.addItem = function () {
        var itemToClone = { "item_name": "", "item_price": "","stock_count": "" };
        $scope.items.push(itemToClone);
    };
    $scope.removeItem = function (itemIndex) {
        $scope.items.splice(itemIndex, 1);
    };
    $scope.editMode = true;
    if(gb == null)
        $scope.editMode = false; 
    $scope.ok = function () {
      if($scope.editMode) {
        $scope.groupbuy.items = $scope.items;
        console.log($scope.groupbuy);
        $http.put('/groupbuy/'+$scope.groupbuy._id, $scope.groupbuy).success(function(response) {
                console.log(response);
        });
      } else {
        $scope.groupbuy.shopId = $scope.shop._id;
        $scope.groupbuy.shopName = $scope.shop.name;
        $scope.groupbuy.status = "off";
        $scope.groupbuy.items = $scope.items;
        console.log($scope.groupbuy);
        $http.post('/groupbuy', $scope.groupbuy).success(function(response) {
        console.log(response);
      });
     }
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

myApp.controller('newShopCtrl', function ($scope, $http, $uibModalInstance, shop) {

    $scope.shop = shop;
    $scope.ok = function () {
        $http.put('/shop/'+ $scope.shop._id, $scope.shop)
        .success(function(response) {
            console.log(response);
         })
        .error(function(response){ 
          console.log(response);
        });
        $uibModalInstance.close();
    };
  

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});



