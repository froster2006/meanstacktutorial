var myApp = angular.module('myApp', []);
myApp.controller('AppCtrl', ['$scope', '$http', function($scope, $http) {

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


$scope.addShop = function() {
  console.log($scope.shop);
  $http.post('/shop', $scope.shop).success(function(response) {
    console.log(response);
    refresh();
  });
};




$scope.removeShop = function(id) {
  console.log(id);
  $http.delete('/shop/' + id).success(function(response) {
    refresh();
  });
};


$scope.addGroupbuy = function(id) {
  $scope.groupbuy.shopId = id;
  $scope.groupbuy.status = "off";
  $scope.groupbuy.batchId = 1;
  console.log($scope.groupbuy);
  $http.post('/groupbuy', $scope.groupbuy).success(function(response) {
    console.log(response);
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
