var myApp = angular.module('myApp', ['ngAnimate','ui.bootstrap','ngRoute']);

myApp.controller('orderCtrl', ['$scope', '$http',  '$log','$routeParams','$route',function($scope, $http, $log, $routeParams,$route) {
    $scope.groupbuyId = $routeParams;
    console.log($scope.groupbuyId);
    console.log($routeParams);
}]);

myApp.config(function($routeProvider, $locationProvider) {
  $routeProvider
   .when('#/groupbuyId:gid', {
    templateUrl: 'order.html',
    controller: 'orderCtrl'
  })
  .when('/Book/:bookId/ch/:chapterId', {
    templateUrl: 'chapter.html',
    controller: 'ChapterController'
  });
});