var myApp = angular.module('myApp', ['ngAnimate','ui.bootstrap']);

myApp.controller('newGroupBuyCtrl', function ($scope, $http, $uibModalInstance, shop_id) {

  $scope.shopId = shop_id;

  $scope.ok = function () {
  $scope.groupbuy.shopId = $scope.shopId;
  $scope.groupbuy.status = "off";
  $scope.groupbuy.batchId = 1;
  console.log($scope.groupbuy);
  $http.post('/groupbuy', $scope.groupbuy).success(function(response) {
    console.log(response);
    //refresh();
  });
    $uibModalInstance.close();
  };

  $scope.cancel = function () {
    $uibModalInstance.dismiss('cancel');
  };
});

myApp.controller('newShopCtrl', function ($scope, $http, $uibModalInstance, shop) {
    
    $scope.shop = shop;
    $scope.ok = function () {
      console.log($scope.shop);
      $http.post('/shop', $scope.shop).success(function(response) {
        console.log(response);

  });
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

$scope.newGroupbuy = function(id) {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: 'newGroupBuy.html',
      controller: 'newGroupBuyCtrl',
      size: "lg",
      resolve: {
        shop_id: function () {
          return id;
        }
      }
    });
    
    modalInstance.result.then(function () {
     refresh();
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
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
      $log.info('Modal dismissed at: ' + new Date());
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
      $log.info('Modal dismissed at: ' + new Date());
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
