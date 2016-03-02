angular.module('starter.storeTypesCtrl', ['ui.router'])

.controller('StoreTypes', function($scope,$ionicModal,$state,$http,$rootScope,$ionicFilterBar,ionicToast,$ionicLoading) {
  
	var jsonResponse ;
	$scope.storeTypes;
	
	var s0 = new Date();
	$scope.selectedDates = [s0];
	
	$scope.birthDatepickerObjectNeo = {
		templateType: 'POPUP',
		btnsIsNative: true,
		btnOk: 'OK',
		btnOkClass: 'notNeeded',
		btnCancel: 'Close',
		btnCancelClass: 'button button-neoOrange',
		btnTodayShow: true,
		btnToday: 'Today',
		btnTodayClass: 'button button-neoOrange',
		selectedDates : $scope.selectedDates,
		selectType: 'SINGLE',
		closeOnSelect: true,
		callback: function (dates) {  //Mandatory
		retSelectedBirthDates(dates);
		}
    };

	var retSelectedBirthDates = function (dates) {
		$scope.selectedDates.length = 0;
		for (var i = 0; i < dates.length; i++) {
		  $scope.selectedDates.push(angular.copy(dates[i]));
		}
	};
  
	$scope.timePickerObject24HourBirth = {
      inputEpochTime: ((new Date()).getHours() * 60 * 60 + (new Date()).getMinutes() * 60),  //Optional
      step : 1,
      format: 24,  //Optional
      titleLabel: '24-hour Format',  //Optional
      closeLabel: 'Cancel',  //Optional
      setLabel: 'Select',  //Optional
      setButtonType: 'button-balanced',  //Optional
      closeButtonType: 'button-positive',  //Optional
      callback: function (val) {    //Mandatory
        timePicker24CallbackBirth(val);
      }
    };

    function timePicker24CallbackBirth(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        $scope.timePickerObject24HourBirth.inputEpochTime = val;
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
    }
  
	$scope.showWaiter = function() {
        $ionicLoading.show({
          template: 'Loading...'
        });
	};
      
	$scope.hideWaiter = function(){
		$ionicLoading.hide();
	};
	
	$ionicModal.fromTemplateUrl('templates/meetAndEvents.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.meetAndEventsModal = modal;
	});
	
	$scope.showMeetAndEvents = function (){
		$scope.meetAndEventsModal.show();
	};
	
	$scope.closeMeetAndEvents = function (){
		$scope.meetAndEventsModal.hide();
	};

	$scope.sendMeetAndEvents = function (){
		$http({method: 'POST',url: urlBase+'/SaveMeetNEvents',data: $.param({ID: ' ',categoryID:' ',eventname:$('#eventTitle').val(),locationID:' ',ConveyesBy:$('#conveyedBy').val(),description:$('#description').val(),venue:$('#venue').val(),contactnum1:$('#contactNo1').val(),DateFrom:' ',DateTo:' '}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
		function successCallback(response) {
			var x2js = new X2JS();
			jsonResponse = x2js.xml_str2json(response.data);
			$scope.products =JSON.parse(jsonResponse.string.__text);
			console.log(jsonResponse);
			$scope.storeTypes='';
		}
		, function errorCallback(response) {alert(response);});
	};
	
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
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetStoreTypes',data: $.param({ID:0,}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.storeTypes =JSON.parse(jsonResponse.string.__text);
				console.log(jsonResponse);
				$scope.hideWaiter();
			}
			, function errorCallback(response) {$scope.hideWaiter();ionicToast.show('Username Password don\'t match.','middle',false,2500);});
	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////	

	$ionicModal.fromTemplateUrl('templates/storesModal.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.storesModal = modal;
	});
	
	$scope.showStores = function (){
		$scope.storesModal.show();
	};
	
	$scope.closeStores = function (){
		$scope.storesModal.hide();
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

	$scope.selectStoreTypes = function(ID)
	{
		$rootScope.storeTypeId = ID;
		$scope.getStore();
		$scope.showStores();
	};

	$scope.selectStore = function(ID)
	{
		$scope.closeStores();
		$rootScope.storeId = ID;
		$state.go('app.products');	
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
	
	$scope.getStoreTypes();
});