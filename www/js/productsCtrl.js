angular.module('starter.productsCtrl', ['ui.router'])

.controller('ProductsCtrl', function($scope,$ionicModal,$http,$rootScope,$ionicFilterBar,Upload,$ionicPopup,ionicToast,$ionicLoading) {

	$scope.jsonResponse;
	$scope.currentProduct;
	$scope.data = {showDelete: false};
	$scope.cartProducts;
	$scope.products;
	
	$scope.showWaiter = function() {
        $ionicLoading.show({
          template: 'Loading...'
        });
	};
      
	$scope.hideWaiter = function(){
		$ionicLoading.hide();
	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$ionicModal.fromTemplateUrl('templates/settings.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.settingsModal = modal;
	});

	$scope.showSettings = function (){
		$scope.settingsModal.show();
	};
	
	$scope.closeSettings = function (){
		$scope.settingsModal.hide();
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////

	$ionicModal.fromTemplateUrl('templates/feedback.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.feedbackModal = modal;
	});

	$scope.showFeeback = function (){
		$scope.feedbackModal.show();
	};
	
	$scope.closeFeedback = function (){
		$scope.feedbackModal.hide();
	};

	$scope.sendFeedback = function (){
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/SaveSuggestion',data: $.param({Suggestion:$('#suggestion').html()}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			if(jsonResponse.boolean == "true")
			{
				$scope.hideWaiter();
				$scope.feedbackModal.hide();
				ionicToast.show('Feedback Saved', 'top', true, 2500);
			}
			else
			{
				$scope.hideWaiter();
				ionicToast.show('Activity Failed','middle',false,2500);
			}
		}
		, function errorCallback(response) {$scope.hideWaiter();ionicToast.show('Activity Failed', 'top', true, 2500);});
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////

	$ionicModal.fromTemplateUrl('templates/addItem.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.addItemModal = modal;
	});
	
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

	$scope.cancelAddItem = function(id){
  		$scope.addItemModal.hide();
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
	
	/////////////////////////////////////////////////////////////////////////////////////////////////	
	
	$ionicModal.fromTemplateUrl('templates/history.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.historyModal = modal;
	});

	$scope.showHistory = function () {
		$scope.historyModal.show();
		$http({method: 'POST',url: urlBase+'/getOrderHistory',data: $.param({StoreID:$rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.previousOrders =JSON.parse(jsonResponse.string.__text);
			}
			, function errorCallback(response) {alert(response);});
	};
	
	$scope.closeHistory = function () {
		$scope.historyModal.hide();
	};

	$scope.openHistory = function () {
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////
	
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
			}
			, function errorCallback(response) {alert(response);});
		}
	};
	
	$("body").on('keyup', '.filter-bar-search', $scope.searchFullStore );	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////

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
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.getSpecialOfferAndgetCategory = function (){
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetSpecialOffers',data: $.param({StoreID : $rootScope.storeId }),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			$scope.products =JSON.parse(jsonResponse.string.__text);
			console.log($scope.products.Table);
		}
		, function errorCallback(response) {ionicToast.show('Load Failed.','middle',false,2500);});
		
		$http({method: 'POST',url: urlBase+'/GetCategory',data: $.param({StoreID: $rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			var jsonResponse;
			jsonResponse = x2js.xml_str2json(response.data);
			$scope.jsonResponse = JSON.parse(jsonResponse.string.__text);
			$scope.hideWaiter();
		}
		, function errorCallback(response) {ionicToast.show('Load Failed.','middle',false,2500);});
	};
  
	$scope.filterResult = function (){
		var myPopup = $ionicPopup.show({
		template: '<input type="password" ng-model="data.wifi">',
		title: 'Filters',
		subTitle: 'Please use normal things',
		scope: $scope,
		buttons: [
		  { text: 'Cancel' },
		  {
			text: '<b>Apply</b>',
			type: 'button-positive',
			onTap: function(e) {
			  if (!$scope.data.wifi) {
				e.preventDefault();
			  } else {
				return $scope.data.wifi;
			  }
			}
		  }
		]
	  });

		myPopup.then(function(res) {
			console.log('Tapped!', res);
		});

		$timeout(function() {
			myPopup.close();
		}, 3000);
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////

  	$ionicModal.fromTemplateUrl('templates/checkout.html', {
    	scope: $scope
  	}).then(function(modal) {
    	$scope.checkoutModal = modal;
  	});

  	$scope.checkoutStore = function(id) {
    	$http({method: 'POST',url: urlBase+'/GetShoppingCart',data: $.param({StoreID: $rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			$scope.cartProducts =JSON.parse(jsonResponse.string.__text);
			console.log($scope.products.Table);
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
			ionicToast.show('Order Placed', 'top', true, 2500);
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
	
	/////////////////////////////////////////////////////////////////////////////////////////////////  

	$scope.photoOrder = function(){
		// try{
			// navigator.camera.getPicture(function(imageURI) {
				// Upload = $upload.upload({
                    // url: 'http://myposro1.somee.com/handler2.ashx',
                    // data: {file : imageURI, name: 'hi.jpg' },
                // }).progress(function (evt) {
                    // file: imageURI, // or list of files ($files) for html5 only
                    // console.log('percent: ' + parseInt(100.0 * evt.loaded / evt.total));
                // }).success(function (data, status, headers, config) {
                    // alert('Uploaded successfully ' + file.name);
                // }).error(function (err) {
                    // alert('Error occured during upload');
                // });
			// }, 
			// function(err) {
			// alert('false');
			// }, { quality: 50,
			// destinationType: Camera.DestinationType.DATA_URL});
		// }
		// catch(err)
		// {
			// alert(err);
		// }
	};


  	$scope.storeName="Pasro";
  
  	// $scope.$on($viewContentLoaded, function() {
    	$scope.getSpecialOfferAndgetCategory();
  	// });
  	
});