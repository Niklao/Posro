// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

// var urlBase='http://myposro.somee.com/webservice/MyPosroWebservice.asmx';
var urlBase='http://myposro1.somee.com/webservice1.asmx';

angular.module('starter', ['ionic','starter.productsCtrl','starter.homeCtrl','starter.storesCtrl','starter.storeTypesCtrl','starter.locationCtrl','starter.buyNSellCtrl','starter.servicesCtrl','jett.ionic.filter.bar','ionic-toast','ngFileUpload','ionic-timepicker', 'ionic-multi-date-picker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider

    .state('home', {
		url: '/home',
		cache: false ,
		templateUrl: 'templates/home.html',
		controller: 'HomeCtrl'
	})

    .state('location', {
		url: '/location',
		cache: false ,
		templateUrl: 'templates/location.html',
		controller: 'LocationCtrl'
	})
  
    .state('storeTypes', {
		url: '/storetypes',
		cache: false ,
		templateUrl: 'templates/storeTypes.html',
		controller: 'StoreTypes'
	})
  
	.state('stores', {
		url: '/stores',
		cache: false ,
		templateUrl: 'templates/stores.html',
		controller: 'Stores'
	})

    .state('product', {
		url: '/product',
		abstract: true,
		templateUrl: 'templates/productMenu.html',
		controller: 'ProductsCtrl'
	})

	.state('product.products', {
		url: '/products',
		views: {
		  'menuContent': {
			templateUrl: 'templates/products.html',
			controller: 'ProductsCtrl'
		  }
		}
	})
	
	.state('buynsell', {
		url: '/buynsell',
		abstract: true,
		templateUrl: 'templates/buyNSellMenu.html',
		controller: 'BuyNSellCtrl'
	})

	.state('buynsell.buynsells', {
		url: '/buynsells',
		views: {
		  'menuContent': {
			templateUrl: 'templates/buyNSells.html',
			controller: 'BuyNSellCtrl'
		  }
		}
	})
	
	.state('service', {
		url: '/service',
		abstract: true,
		templateUrl: 'templates/serviceMenu.html',
		controller: 'ServicesCtrl'
	})

	.state('service.services', {
		url: '/services',
		views: {
		  'menuContent': {
			templateUrl: 'templates/service.html',
			controller: 'ServicesCtrl'
		  }
		}
	})

	$urlRouterProvider.otherwise('/home');
})

 .directive('standardTimeNoMeridian', function () {
        return {
            restrict: 'AE',
            replace: true,
            scope: {
                etime: '=etime'
            },
            template: "<strong>{{stime}}</strong>",
            link: function (scope, elem, attrs) {

                scope.stime = epochParser(scope.etime, 'time');

                function prependZero(param) {
                    if (String(param).length < 2) {
                        return "0" + String(param);
                    }
                    return param;
                }

                function epochParser(val, opType) {
                    if (val === null) {
                        return "00:00";
                    } else {
                        if (opType === 'time') {
                            var hours = parseInt(val / 3600);
                            var minutes = (val / 60) % 60;

                            return (prependZero(hours) + ":" + prependZero(minutes));
                        }
                    }
                }

                scope.$watch('etime', function (newValue, oldValue) {
                    scope.stime = epochParser(scope.etime, 'time');
                });

            }
        };
    });
