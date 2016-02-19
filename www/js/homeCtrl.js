angular.module('starter.homeCtrl', ['ui.router'])

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