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

   })
	.when('/table/groupbuyId:gid', {
        templateUrl: 'group_detail_table.html',
        controller: 'gbCtrl'   
   	});
});
