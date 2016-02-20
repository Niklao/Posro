angular.module('starter.storesCtrl', ['ui.router'])

.controller('Stores', function($scope,$ionicModal,$state,$http,$rootScope,$ionicLoading,ionicToast) {
	var jsonResponse ;
	$scope.stores;
	
	$scope.showWaiter = function() {
        $ionicLoading.show({
          template: 'Loading...'
        });
	};
      
	$scope.hideWaiter = function(){
		$ionicLoading.hide();
	};
	
	$scope.getStore = function () {
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetStore',data: $.param({ StoreTypeID : $rootScope.storeTypeId }),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			$scope.stores =JSON.parse(jsonResponse.string.__text);
			console.log(jsonResponse);
			$scope.hideWaiter();
		}
		, function errorCallback(response) {$scope.hideWaiter();});
	};
	
	$scope.selectStore = function(ID)
	{
		$rootScope.storeId = ID;
		$state.go('app.products');	
	};
	
	$scope.getStore();
});