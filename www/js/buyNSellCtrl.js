angular.module('starter.buyNSellCtrl', ['ui.router'])

.controller('BuyNSellCtrl', function($scope,$ionicModal,$http,$rootScope,$ionicFilterBar,Upload,$ionicPopup,ionicToast,$ionicLoading) {
		
	$scope.image ='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDNzcwRDdEMzI5RjExRTNCMDQxODIzRTEyRDZBM0IyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDNzcwRDdFMzI5RjExRTNCMDQxODIzRTEyRDZBM0IyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUM3NzBEN0IzMjlGMTFFM0IwNDE4MjNFMTJENkEzQjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUM3NzBEN0MzMjlGMTFFM0IwNDE4MjNFMTJENkEzQjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz71dbkLAAAPCElEQVR42uxdCZRU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';
	
	$rootScope.buynsellproducts;
	$scope.currentProduct;
	
	$scope.showWaiter = function() {
        $ionicLoading.show({
          template: 'Loading...'
        });
	};
      
	$scope.hideWaiter = function(){
		$ionicLoading.hide();
	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$ionicModal.fromTemplateUrl('templates/itemDetails.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.itemDetailsModal = modal;
	});

	$scope.showItemDetails = function (id){
		$scope.showWaiter();
		$scope.itemDetailsModal.show();
		for (var i = 0; i <= $rootScope.buynsellproducts.Table.length ; i++) {
			if($rootScope.buynsellproducts.Table[i].BuySellID == id) {
				$scope.currentProduct = $rootScope.buynsellproducts.Table[i];
				$scope.hideWaiter();
			}
		}
		
	};
	
	$scope.closeItemDetails = function (){
		$scope.itemDetailsModal.hide();
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.getOther =function ()
	{
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetOthers',data: $.param({CategoryID: '0',StoreTypeID: '100'}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			$rootScope.buynsellproducts =JSON.parse(jsonResponse.string.__text);
			console.log($rootScope.buynsellproducts.Table);
			$scope.hideWaiter();
		}
		, function errorCallback(response) {ionicToast.show('Load Failed.','middle',false,2500);$scope.hideWaiter();});
	};
	
	$scope.getCategoryForStoreType =function ()
	{
		$http({method: 'POST',url: urlBase+'/GetCategoryForStoreType',data: $.param({StoreTypeID: '100'}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			var jsonResponse;
			jsonResponse = x2js.xml_str2json(response.data);
			$scope.jsonResponse = JSON.parse(jsonResponse.string.__text);
			$scope.hideWaiter();
		}
		, function errorCallback(response) {ionicToast.show('Load Failed.','middle',false,2500);});
	};
	
	$scope.getProductForCategory = function (id){
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetOthers',data: $.param({CategoryID: id,StoreTypeID: '100'}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			$rootScope.buynsellproducts =JSON.parse(jsonResponse.string.__text);
			console.log($rootScope.buynsellproducts.Table);
			$scope.hideWaiter();
		}
		, function errorCallback(response) {ionicToast.show('Load Failed.','middle',false,2500);$scope.hideWaiter();});
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
				$rootScope.buynsellproducts =JSON.parse(jsonResponse.string.__text);
			}
			, function errorCallback(response) {alert(response);});
		}
	};
	
	$("body").on('keyup', '.filter-bar-search', $scope.searchFullStore );	
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$ionicModal.fromTemplateUrl('templates/saveBuyNSell.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.buyNSellModal = modal;
	});

	$scope.showBuyNSell = function (){
		$scope.buyNSellModal.show();
	};
	
	$scope.closeBuyNSell = function (){
		$scope.buyNSellModal.hide();
	};
	
	$scope.itemPhoto = function (){
		try{
			navigator.camera.getPicture(function(imageURI) {
				$scope.itemImage=imageURI;
			}, 
			function(err) {
			alert('Image failure');
			}, { quality: 10,
			destinationType: Camera.DestinationType.DATA_URL});
		}
		catch(err)
		{
			alert(err);
		}
	};
	
	$scope.saveBuyNSell= function (){
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/SaveBuyNsell',data: $.param({ID:'0',categoryID: $('#categoryID').val() ,itemname: $('#itemName').val(),locationName:$('#locationName').val(),description:$('#description').val(),sellingPrice:$('#sellingPrice').val(),mrp:$('#mrp').val(),contactnum1:$('#contactnum1').val(),itemage:$('#usage').val(),ImageString:$scope.itemImage}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			if(jsonResponse.boolean == "true")
			{
				$scope.hideWaiter();
				$state.go('storeTypes');
				$scope.signUpModal.hide();
				$scope.modal.hide();
				$scope.closeBuyNSell
			}
			else
			{
				$scope.hideWaiter();
				ionicToast.show('Error In Form.','middle',false,2500);
			}
		}
		, function errorCallback(response) {ionicToast.show('Couldn\'t Connect','middle',false,2500);$scope.hideWaiter();});
	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$ionicModal.fromTemplateUrl('templates/customerBuyNSell.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.customerBuyNSellModal = modal;
	});

	$scope.showCustomerBuyNSell = function (){
		$scope.customerBuyNSellModal.show();
		$http({method: 'POST',url: urlBase+'/gGetCustomerPostedBuyNsellet',data: $.param({ID:'0',categoryID: $('#categoryID').val() ,itemname: $('#itemName').val(),locationName:$('#locationName').val(),description:$('#description').val(),sellingPrice:$('#sellingPrice').val(),mrp:$('#mrp').val(),contactnum1:$('#contactnum1').val(),itemage:$('#usage').val(),ImageString:$scope.itemImage}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			if(jsonResponse.boolean == "true")
			{
				$scope.hideWaiter();
				$state.go('storeTypes');
				$scope.signUpModal.hide();
				$scope.modal.hide();
				$scope.closeBuyNSell
			}
			else
			{
				$scope.hideWaiter();
				ionicToast.show('Error In Form.','middle',false,2500);
			}
		}
		, function errorCallback(response) {ionicToast.show('Couldn\'t Connect','middle',false,2500);$scope.hideWaiter();});
	};
	
	$scope.closeCutomerBuyNSell = function (){
		$scope.customerBuyNSellModal.hide();
	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.getOther();
	$scope.getCategoryForStoreType();
	
	$scope.title = 'Buy N Sell';
});