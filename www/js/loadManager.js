angular.module('neo-loadManager', [])

.factory('loadManager', function($ionicLoading) {
   return { 
   		showWaiter: function () {
			$ionicLoading.show({
          		template: 'Loading...'
    		});
		},
		hideWaiter: function() {
			$ionicLoading.hide();
		},
   };
});



	