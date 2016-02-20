angular.module('starter.homeCtrl', ['ui.router'])

.controller('HomeCtrl', function($scope,$ionicModal,$http,$state,$ionicLoading,ionicToast) {
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
  
	$scope.showWaiter = function() {
        $ionicLoading.show({
          template: 'Loading...'
        });
	};
      
	$scope.hideWaiter = function(){
		$ionicLoading.hide();
	};

	$scope.userLogin= function(){
		var jsonResponse ;
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/UserLogin',data: $.param({_UserName: $('#userName').val() ,_Password: $('#passWord').val()}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			if(jsonResponse.boolean == "true")
			{
				$scope.hideWaiter();
				$state.go('storeTypes');
				$scope.modal.hide();
			}
			else
			{
				$scope.hideWaiter();
				ionicToast.show('Username Password don\'t match.','middle',false,2500);
			}
		}
		, function errorCallback(response) {ionicToast.show('Couldn\'t Connect','middle',false,2500);});
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
		$scope.login();
    };

});