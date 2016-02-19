angular.module('starter.storesCtrl', ['ui.router'])

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
});