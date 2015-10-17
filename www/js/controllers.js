angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ProductsCtrl', function($scope,$ionicModal) {
  $scope.products = [
    { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    { title:'ionic',price:'200',src: 'img/ionic.png', id: 2 }
  ];
  $scope.addItem = function(id){
  	$scope.modal.hide();
  }
  $ionicModal.fromTemplateUrl('templates/addItem.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $ionicModal.fromTemplateUrl('templates/checkout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.checkoutStore = function(id) {
    //alert
    $scope.modal2.show();
  };

  // Open product choosing Modal
  $scope.addItem = function(id) {
  		$scope.productSubs = [
    		{ title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    		{ title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    		{ title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    		{ title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    		{ title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    		{ title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    		{ title:'logo',price:'100',src: 'img/logo.png', id: 1 }
  		];
  		
		$scope.name=id;
		$scope.description="Loren ipsum Loren ipsumLoren ipsumLoren ipsumLoren ipsumLoren ipsumLoren ipsumLoren ipsum";    
    $scope.modal.show();
  };
  $scope.storeName="Pasro";
})

.controller('LocationCtrl', function($scope,$ionicModal) {
  $scope.products = [
    { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    { title:'ionic',price:'200',src: 'img/ionic.png', id: 2 }
  ];
  $scope.addItem = function(id){
    $scope.modal.hide();
  }
  $ionicModal.fromTemplateUrl('templates/addItem.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.addItem = function(id) {
      $scope.productSubs = [
        { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
        { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
        { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
        { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
        { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
        { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
        { title:'logo',price:'100',src: 'img/logo.png', id: 1 }
      ];
      
    $scope.name=id;
    $scope.description="Loren ipsum Loren ipsumLoren ipsumLoren ipsumLoren ipsumLoren ipsumLoren ipsumLoren ipsum";    
    $scope.modal.show();
  };
  $scope.storeName="Pasro";
})

.controller('HomeCtrl', function($scope,$ionicModal) {  
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  $scope.login = function() {
    $scope.modal.show();
  };

  $scope.location = function() {
    alert("hai");
    // $state.go('location');
  };


});
