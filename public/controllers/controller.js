var myApp = angular.module('myApp', ['ngAnimate','ui.bootstrap']);

myApp.controller('newGroupBuyCtrl', function ($scope, $http, $uibModalInstance, shop, gb) {

    $scope.shop = shop;
    $scope.groupbuy = gb;
    console.log($scope.groupbuy);
    console.log($scope.shop);
    $scope.items = [];
    if(gb != null) 
        $scope.items = $scope.groupbuy.items;
    $scope.addItem = function () {
        var itemToClone = { "item_name": "", "item_price": "","item_stock_count": "" };
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
        $scope.groupbuy.batchId = 1;
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
    $scope.editMode = true;
    if(shop == null)
        $scope.editMode = false; 
    $scope.shop = shop;
    $scope.ok = function () {
      if($scope.editMode){
          console.log($scope.shop);
        $http.put('/shop/'+ $scope.shop._id, $scope.shop).success(function(response) {
            console.log(response);
         });
      }
      else{
        $http.post('/shop', $scope.shop).success(function(response) {
            console.log(response);
         });
      }
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});


myApp.controller('AppCtrl', ['$scope', '$http', '$uibModal', '$log',function($scope, $http, $uibModal, $log) {

var refresh = function() {
  $http.get('/shop').success(function(response) {
    $scope.shopList = response;
  });
  $http.get('/groupbuy').success(function(response) {
    $scope.groupbuyList = response;
  });
  $scope.groupbuy = "";
  $scope.shop = "";
};

refresh();

$scope.newGroupbuy = function(selected_shop) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newGroupBuy.html',
      controller: 'newGroupBuyCtrl',
      size: "lg",
      resolve: {
        shop: function () {
          return selected_shop;
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

$scope.newShop = function() {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newShop.html',
      controller: 'newShopCtrl',
      size: "lg",
        resolve: {
          shop: function(){return null;}
      }
    });
    
    modalInstance.result.then(function () {
     refresh();
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
};



$scope.editShop = function(selected_shop) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newShop.html',
      controller: 'newShopCtrl',
      size: "lg",
      resolve: {
          shop: function(){return selected_shop;}
      }
    });
    
    modalInstance.result.then(function () {
     refresh();
    }, function () {
      //$log.info('Modal dismissed at: ' + new Date());
    });
};



$scope.removeShop = function(id) {
  console.log(id);
  $http.delete('/shop/' + id).success(function(response) {
    refresh();
  });
};

$scope.removeGroupbuy = function(id) {
  console.log(id);
  $http.delete('/groupbuy/' + id).success(function(response) {
    refresh();
  });
};

}]);
