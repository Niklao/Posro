// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

var urlBase='http://www.myposro1.somee.com';
angular.module('starter', ['ionic', 'starter.controllers'])

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

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'ProductsCtrl'
  })

  .state('app.search', {
    url: '/search',
    views: {
      'menuContent': {
        templateUrl: 'templates/search.html'
      }
    }
  })

  .state('app.products', {
    url: '/products',
    views: {
      'menuContent': {
        templateUrl: 'templates/products.html',
        controller: 'ProductsCtrl'
      }
    }
  })

 
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
