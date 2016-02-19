angular.module('starter.locationCtrl', ['ui.router'])

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
});