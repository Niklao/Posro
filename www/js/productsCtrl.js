angular.module('starter.productsCtrl', ['ui.router'])

.controller('ProductsCtrl', function($scope,$ionicModal,$http,$rootScope,$ionicFilterBar,Upload,$ionicPopup,ionicToast,$ionicLoading,loadManager) {

	$scope.jsonResponse;
	$scope.currentProduct;
	$scope.data = {showDelete: false};
	$scope.cartProducts;
	$rootScope.storeProducts;
	
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
		loadManager.showWaiter();
		$http({method: 'POST',url: urlBase+'/SaveSuggestion',data: $.param({Suggestion:$('#suggestion').html()}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			if(jsonResponse.boolean == "true")
			{
				loadManager.hideWaiter();
				$scope.feedbackModal.hide();
				ionicToast.show('Feedback Saved', 'top', true, 2500);
			}
			else
			{
				loadManager.hideWaiter();
				ionicToast.show('Activity Failed','middle',false,2500);
			}
		}
		, function errorCallback(response) {loadManager.hideWaiter();ionicToast.show('Activity Failed', 'top', true, 2500);});
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////

	$ionicModal.fromTemplateUrl('templates/addItem.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.addItemModal = modal;
	});
	
	$scope.addItem = function(id){
		$scope.addItemModal.show();
		for (var i = 0; i < $rootScope.storeProducts.Table.length ; i++) {
			if($rootScope.storeProducts.Table[i].ProductID == id)
			{
				$scope.currentProduct=$rootScope.storeProducts.Table[i];
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
						ionicToast.show($scope.currentProduct.ProductName+' Added To Cart', 'middle', false, 2500);
					else
						ionicToast.show('Product Entry Failed', 'middle', false, 2500);
				}
		, function errorCallback(response) {alert(response);});
	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////	
	
	$ionicModal.fromTemplateUrl('templates/history.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.historyModal = modal;
	});

	$ionicModal.fromTemplateUrl('templates/orderList.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.historyModal = modal;
	});


	$scope.showHistory = function () {
		$scope.historyModal.show();
		loadManager.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetOrderHistory',data: $.param({StoreID:$rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.previousOrders =JSON.parse(jsonResponse.string.__text);
				scope.hideWaiter();
			}
			, function errorCallback(response) {scope.hideWaiter();});
	};

	$scope.getOrderHistoryList = function (id) {
		loadManager.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetOrderHistoryList',data: $.param({OrderID :ID}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.previousOrders =JSON.parse(jsonResponse.string.__text);
				scope.hideWaiter();
			}
			, function errorCallback(response) {scope.hideWaiter();});
	};
	
	$scope.closeHistory = function () {
		$scope.historyModal.hide();
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
				$rootScope.storeProducts =JSON.parse(jsonResponse.string.__text);
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
		loadManager.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetProductforCategory',data: $.param({StoreID: $rootScope.storeId, CategoryID: ID,}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$rootScope.storeProducts =JSON.parse(jsonResponse.string.__text.replace('/n',' 	'));
				loadManager.hideWaiter();
			}
			, function errorCallback(response) {loadManager.hideWaiter();});
	};
	
	$scope.searchCategory();
	
	$("body").on('keyup', '#searchCategory', $scope.searchCategory );
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.getSpecialOfferAndgetCategory = function (){
		loadManager.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetSpecialOffers',data: $.param({StoreID : $rootScope.storeId }),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			$rootScope.storeProducts =JSON.parse(jsonResponse.string.__text);
			console.log($rootScope.storeProducts.Table);
		}
		, function errorCallback(response) {ionicToast.show('Load Failed.','middle',false,2500);});
		
		$http({method: 'POST',url: urlBase+'/GetCategory',data: $.param({StoreID: $rootScope.storeId}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			var jsonResponse;
			jsonResponse = x2js.xml_str2json(response.data);
			$scope.jsonResponse = JSON.parse(jsonResponse.string.__text);
			loadManager.hideWaiter();
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
			console.log($rootScope.storeProducts.Table);
		}
		, function errorCallback(response) {alert(response);});
		$scope.checkoutModal.show();
  	};

  	$scope.closeCheckOut = function () {
		$scope.checkoutModal.hide();
  	};
  
  	$scope.checkPromoCode = function() {
		$http({method: 'POST',url: urlBase+'/ApplyCoupon',data: $.param({StoreID: $rootScope.storeId , CouponCode : $('#couponCode').val()}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.offerStatus =JSON.parse(jsonResponse.string.__text);
				console.log($rootScope.storeProducts.Table);
			}
		, function errorCallback(response) {alert(response);});
	};

  	$scope.confirmOrder =function () {
		$scope.closeCheckOut();
		$http({method: 'POST',url: urlBase+'/ConfirmOrder',data: $.param({StoreID: $rootScope.storeId,comment:'sdnirfnierfni'}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			$scope.cartProducts =JSON.parse(jsonResponse.string.__text);
			console.log($rootScope.storeProducts.Table);
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
			console.log($rootScope.storeProducts.Table);
		}
		, function errorCallback(response) {alert(response);});
		$scope.cartProducts.Table.splice($scope.cartProducts.Table.indexOf(item), 1);
  	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////  

	$scope.photoOrder = function(){
		try{
			navigator.camera.getPicture(function(imageURI) {
				
				$http({method: 'POST',url: urlBase+'/OrderImage',data: $.param({Comment: 'Order Should be on time' ,FileString: $scope.image,StoreID: '1'}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
					function successCallback(response) {
						var x2js = new X2JS();
						jsonResponse = x2js.xml_str2json(response.data);
						if(jsonResponse.boolean == "true")
						{
							loadManager.hideWaiter();
							ionicToast.show('Uploaded','middle',false,2500);
							$scope.modal.hide();
						}
						else
						{
							loadManager.hideWaiter();
							ionicToast.show('Upload failed','middle',false,2500);
						}
					}
					, function errorCallback(response) {ionicToast.show('Couldn\'t Connect image upload','middle',false,2500);});
				
			}, 
			function(err) {
			alert('false');
			}, { quality: 10,
			destinationType: Camera.DestinationType.DATA_URL});
		}
		catch(err)
		{
			alert(err);
		}
	};


  	$scope.storeName="Pasro";
  
  	// $scope.$on($viewContentLoaded, function() {
	$scope.getSpecialOfferAndgetCategory();
  	// });
  	
});