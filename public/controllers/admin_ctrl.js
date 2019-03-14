var myApp = angular.module('myApp', ['ngAnimate','ui.bootstrap']);


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

  $http.get('https://so9sbt87mb.execute-api.us-east-1.amazonaws.com/default/helloWorldPython').success(function(response) {
    $scope.testMsg = response;
  });


  $scope.groupbuy = "";
  $scope.shop = "";
};

refresh();



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

$scope.gotoGroupBuyList = function(shopId) {
    var shopId_url = '/shop.html#/shopId';
    window.location.href = shopId_url+shopId;  

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
  var msg = "请确认删除这个厨房";
  var r = confirm(msg);
  if (r == true) {
    $http.delete('/shop/' + id).success(function(response) {
      refresh();
    });
  }
};

}]);



