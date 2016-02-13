angular.module('starter.controllers', ['ui.router'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout ) {

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

.controller('ProductsCtrl', function($scope,$ionicModal,$http,$rootScope) {

	$scope.jsonResponse;
	$scope.currentProduct;
	
	$http({method: 'POST',url: urlBase+'/webservice1.asmx/getSpecialOffers',data: $.param({ID : $rootScope.storeTypeId , StoreID : $rootScope.storeId }),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.products =JSON.parse(jsonResponse.string.__text);
		console.log($scope.products.Table);
	}
	, function errorCallback(response) {alert(response);});
	
	$http({method: 'POST',url: urlBase+'/webservice1.asmx/getCategory',data: $.param({ID: '1' , StoreID: '4'}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		var jsonResponse;
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.jsonResponse = JSON.parse(jsonResponse.string.__text);
	}
	, function errorCallback(response) {alert(response);});

  $scope.products = [
    { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    { title:'ionic',price:'200',src: 'img/ionic.png', id: 2 }
  ];
  
  $scope.addItem = function(id){
	
  	$scope.modal.hide();
  };
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
  
	$scope.addItem = function(id){
		
		$scope.modal.show();
		for (var i = 0; i <= $scope.products.Table.length ; i++) {
			if($scope.products.Table[i].ProductID == id)
			{
				$scope.currentProduct=$scope.products.Table[i];
				console.log($scope.currentProduct);
			}
		}
	};

  
  $scope.storeName="Pasro";
})

.controller('LocationCtrl', function($scope,$ionicModal) {
  $scope.products = [
    { title:'logo',price:'100',src: 'img/logo.png', id: 1 },
    { title:'ionic',price:'200',src: 'img/ionic.png', id: 2 }
  ];
  
  $scope.addItem = function(id){
	$scope.currentProduct
    $scope.modal.hide();
	for (var i = 0; i <= $scope.products.Table.length ; i++) {
		if($scope.products.Table[i].ProductID == id)
		{
			$scope.currentProduct=$scope.products.Table[i];
		}
    }
  };
  
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

.controller('StoreTypes', function($scope,$ionicModal,$state,$http,$rootScope) {
  var jsonResponse ;
  
  $scope.storeTypes;
  $http({method: 'POST',url: urlBase+'/webservice1.asmx/GetStoreTypes',data: $.param({ID:0,}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.storeTypes =JSON.parse(jsonResponse.string.__text);
		console.log(jsonResponse);
	}
	, function errorCallback(response) {alert(response);});
	
	$scope.selectStoreTypes = function(ID)
	{
		$rootScope.storeTypeId = ID;
		$state.go('stores');	
	};
})

.controller('Stores', function($scope,$ionicModal,$state,$http,$rootScope) {
  var jsonResponse ;
  
  $scope.stores;
  $http({method: 'POST',url: urlBase+'/webservice1.asmx/getStore',data: $.param({ID:$rootScope.storeTypeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.storeTypes =JSON.parse(jsonResponse.string.__text);
		console.log(jsonResponse);
	}
	, function errorCallback(response) {alert(response);});
	
	$scope.selectStore = function(ID)
	{
		$rootScope.storeId = ID;
		$state.go('app.products');	
	};
})

.controller('HomeCtrl', function($scope,$ionicModal,$http,$state) {
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  
  $ionicModal.fromTemplateUrl('templates/signUp.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.signUpModal = modal;
  });

  $scope.userLogin= function(){
	var jsonResponse ;
	$http({method: 'POST',url: urlBase+'/webservice1.asmx/UserLogin',data: $.param({_UserName: $('#userName').val() ,_Password: $('#passWord').val()}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		if(jsonResponse.boolean == "true")
		{
			$state.go('storeTypes');
			$scope.modal.hide();
		}
		else
		{
			alert('Login Failed');
		}
	}
	, function errorCallback(response) {alert(response);});
  };
  
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };
  
  $scope.closeSignUp = function() {
    $scope.signUpModal.hide();
  };
  
  $scope.signUpPage = function() {
    $scope.signUpModal.show();
  };

  $scope.login = function() {
    // $scope.modal.show();
	
		alert('yo');
		navigator.camera.getPicture(function(imageURI) {
			alert(imageURI);

		}, function(err) {

    alert('false');

  }, cameraOptions);
	
  };
  
  $scope.location = function() {
    //alert("hai");
	$scope.login();
    };

});
