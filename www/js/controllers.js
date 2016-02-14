angular.module('starter.controllers', ['ui.router'])

.controller('AppCtrl', function($scope, $ionicModal, $timeout ) {
  
  $scope.loginData = {};

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

  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('ProductsCtrl', function($scope,$ionicModal,$http,$rootScope,ionicToast,$ionicFilterBar,Upload) {

	$scope.jsonResponse;
	$scope.currentProduct;
	$scope.data = {showDelete: false};
	$scope.cartProducts;
	$scope.products;
	
	$ionicModal.fromTemplateUrl('templates/settings.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.settingsModal = modal;
	});
	
	$ionicModal.fromTemplateUrl('templates/feedback.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.feedbackModal = modal;
	});

	$ionicModal.fromTemplateUrl('templates/addItem.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.addItemModal = modal;
	});
	
	$scope.showSettings = function (){
		$scope.settingsModal.show();
	};
	
	$scope.closeSettings = function (){
		$scope.settingsModal.hide();
	};
	
	$scope.showFeeback = function (){
		$scope.settingsModal.show();
	};
	
	$scope.closeSettings = function (){
		$scope.settingsModal.hide();
	};
	
	$scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.items,
        update: function (filteredItems, filterText) {
          $scope.items = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };
	
	$scope.searchFullStore = function(){
		var query = $('.filter-bar-search').val();
		if(query.length > 2 )
		{
			$http({method: 'POST',url: urlBase+'/SearchFullStore',data: $.param({Search:query,StoreID:$rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.products =JSON.parse(jsonResponse.string.__text);
				console.log(jsonResponse);
				$scope.storeTypes='';
			}
			, function errorCallback(response) {alert(response);});
		}
	};
	
	$("body").on('keyup', '.filter-bar-search', $scope.searchFullStore );	
	
	$scope.searchCategory = function(){

		var query = $('#searchCategory').val();
		if(query.length >2 )
		{
			$http({method: 'POST',url: urlBase+'/SearchCategory',data: $.param({Search:query,StoreID:$rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				var jsonResponse;
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.jsonResponse = JSON.parse(jsonResponse.string.__text);
			}
			, function errorCallback(response) {alert(response);});
		}
		else
		{
			$http({method: 'POST',url: urlBase+'/GetCategory',data: $.param({StoreID: $rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				var jsonResponse;
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.jsonResponse = JSON.parse(jsonResponse.string.__text);
			}
			, function errorCallback(response) {alert(response);});
		}
	};
	
	$scope.getProductForCategory = function (ID){
		$http({method: 'POST',url: urlBase+'/GetProductforCategory',data: $.param({StoreID: $rootScope.storeId, CategoryID: ID,}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				$scope.products='';
				var x2js = new X2JS();
				var jsonResponse;
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.products = JSON.parse(jsonResponse.string.__text);
				console.log($scope.products);
			}
			, function errorCallback(response) {alert(response);});
	};
	
	$scope.searchCategory();
	
	$("body").on('keyup', '#searchCategory', $scope.searchCategory );
	
	$http({method: 'POST',url: urlBase+'/GetSpecialOffers',data: $.param({StoreID : $rootScope.storeId }),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.products =JSON.parse(jsonResponse.string.__text);
		console.log($scope.products.Table);
	}
	, function errorCallback(response) {alert(response);});
	
	$http({method: 'POST',url: urlBase+'/GetCategory',data: $.param({StoreID: $rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		var jsonResponse;
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.jsonResponse = JSON.parse(jsonResponse.string.__text);
	}
	, function errorCallback(response) {alert(response);});
  
  

  $ionicModal.fromTemplateUrl('templates/checkout.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.checkoutModal = modal;
  });

  $scope.cancelAddItem = function(id){
  	$scope.addItemModal.hide();
  };
  
  $scope.checkoutStore = function(id) {
    $http({method: 'POST',url: urlBase+'/GetShoppingCart',data: $.param({StoreID: $rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.cartProducts =JSON.parse(jsonResponse.string.__text);
		console.log($scope.products.Table);
		ionicToast.show('Order Placed', 'top', true, 2500);
	}
	, function errorCallback(response) {alert(response);});
	
	$scope.checkoutModal.show();
  };

  $scope.closeCheckOut = function () {
	$scope.checkoutModal.hide();
  };
  
  $scope.confirmOrder =function () {
	$scope.closeCheckOut();
	$http({method: 'POST',url: urlBase+'/ConfirmOrder',data: $.param({StoreID: $rootScope.storeId,comment:'sdnirfnierfni'}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.cartProducts =JSON.parse(jsonResponse.string.__text);
		console.log($scope.products.Table);
	}
	, function errorCallback(response) {alert(response);});
  };
  
  $scope.onItemDelete = function(item) {
	$http({method: 'POST',url: urlBase+'/CancelOrderOrItem',data: $.param({StoreID: $rootScope.storeId,ProductID: item.ProductID}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.cartProducts =JSON.parse(jsonResponse.string.__text);
		console.log($scope.products.Table);
	}
	, function errorCallback(response) {alert(response);});
	$scope.cartProducts.Table.splice($scope.cartProducts.Table.indexOf(item), 1);
  };
  
	$scope.addItem = function(id){
		$scope.addItemModal.show();
		for (var i = 0; i <= $scope.products.Table.length ; i++) {
			if($scope.products.Table[i].ProductID == id)
			{
				$scope.currentProduct=$scope.products.Table[i];
				console.log($scope.currentProduct);
			}
		}
	};

	$scope.photoOrder = function(){
		try{
			navigator.camera.getPicture(function(imageURI) {
				Upload = $upload.upload({
                    url: 'http://myposro1.somee.com/handler2.ashx',
                    data: {file : imageURI, name: 'hi.jpg' },
                    file: imageURI, // or list of files ($files) for html5 only
                }).progress(function (evt) {
                    //console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                }).success(function (data, status, headers, config) {
                    alert('Uploaded successfully ' + file.name);
                }).error(function (err) {
                    alert('Error occured during upload');
                });
			}, 
			function(err) {
			alert('false');
			}, { quality: 50,
			destinationType: Camera.DestinationType.DATA_URL});
		}
		catch(err)
		{
			alert(err);
		}
	};
	
	$scope.addToCart = function(){
		$scope.addItemModal.hide();
		$http({method: 'POST',url: urlBase+'/AddToCart',data: $.param({ProductID:$scope.currentProduct.ProductID,Quantity:$('#quantity').val(),StoreID:$rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
				function successCallback(response) {
					var x2js = new X2JS();
					jsonResponse = x2js.xml_str2json(response.data);
					if(jsonResponse.boolean.__text == 'true')
						ionicToast.show($scope.currentProduct.ProductName+' Added To Cart', 'top', true, 2500);
					else
						ionicToast.show('Product Entry Failed', 'top', true, 2500);
				}
		, function errorCallback(response) {alert(response);});
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

.controller('StoreTypes', function($scope,$ionicModal,$state,$http,$rootScope,$ionicFilterBar) {
  
	var jsonResponse ;
	$scope.storeTypes;
  
  	$scope.searchProductInLocation = function(){
		var query = $('.filter-bar-search').val();
		if(query.length >2 )
		{
			$http({method: 'POST',url: urlBase+'/SearchProductInLocation',data: $.param({Search:query,}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.products =JSON.parse(jsonResponse.string.__text);
				console.log(jsonResponse);
				$scope.storeTypes='';
			}
			, function errorCallback(response) {alert(response);});
		}
	};
	
	$scope.goToStore = function(ID){
		$rootScope.storeId = ID;
		$state.go('app.products');
	};
	
	$("body").on('keyup', '.filter-bar-search', $scope.searchProductInLocation );	
  
	$scope.getStoreTypes = function(){
		$http({method: 'POST',url: urlBase+'/GetStoreTypes',data: $.param({ID:0,}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.storeTypes =JSON.parse(jsonResponse.string.__text);
				console.log(jsonResponse);
			}
			, function errorCallback(response) {alert(response);});
	};
	
	$scope.selectStoreTypes = function(ID)
	{
		$rootScope.storeTypeId = ID;
		$state.go('stores');	
	};
	
	$scope.showFilterBar = function () {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.items,
        update: function (filteredItems, filterText) {
          $scope.items = filteredItems;
          if (filterText) {
            console.log(filterText);
          }
        }
      });
    };
	
	$scope.getStoreTypes();
})

.controller('Stores', function($scope,$ionicModal,$state,$http,$rootScope) {
  var jsonResponse ;
  
  $scope.stores;
  $http({method: 'POST',url: urlBase+'/GetStore',data: $.param({ StoreTypeID : $rootScope.storeTypeId }),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
	function successCallback(response) {
		var x2js = new X2JS();
		jsonResponse = x2js.xml_str2json(response.data);
		$scope.stores =JSON.parse(jsonResponse.string.__text);
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
	$http({method: 'POST',url: urlBase+'/UserLogin',data: $.param({_UserName: $('#userName').val() ,_Password: $('#passWord').val()}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
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
		$scope.modal.show();
		
	};
  
  $scope.location = function() {
    //alert("hai");
	$scope.login();
    };

});
