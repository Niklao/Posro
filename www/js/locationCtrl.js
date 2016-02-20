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
});