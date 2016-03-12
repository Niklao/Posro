angular.module('starter.storeTypesCtrl', ['ui.router'])

.controller('StoreTypes', function($scope,$ionicModal,$state,$http,$rootScope,$ionicFilterBar,ionicToast,$ionicLoading,$ionicPopup,httpManager,loadManager) {
  
	var jsonResponse ;
	$scope.storeTypes;
	$scope.password;
	$scope.newPassword;
	$scope.meetAndEvents;
	$scope.meetAndEventsCategory;
	$scope.locations;
	
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
		$state.go('product.products');
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
			, function errorCallback(response) {$scope.hideWaiter();ionicToast.show('Connection Failed.','middle',false,2500);});
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
		$state.go('product.products');	
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
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetOrderHistory',data: $.param({StoreID:'0'}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.previousOrders =JSON.parse(jsonResponse.string.__text);
				$scope.hideWaiter();
			}
			, function errorCallback(response) {scope.hideWaiter();});
	};

	$scope.getOrderHistoryList = function (id) {
		$scope.showWaiter();
		$http({method: 'POST',url: urlBase+'/GetOrderHistoryList',data: $.param({OrderID :id}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
			function successCallback(response) {
				var x2js = new X2JS();
				jsonResponse = x2js.xml_str2json(response.data);
				$scope.previousOrders =JSON.parse(jsonResponse.string.__text);
				$scope.hideWaiter();
			}
			, function errorCallback(response) {$scope.hideWaiter();});
	};
	
	$scope.closeHistory = function () {
		$scope.historyModal.hide();
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////

	$ionicModal.fromTemplateUrl('templates/settings.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.settingModal = modal;
	});

	$scope.changePassword = function () {
		var myPopup = $ionicPopup.show({
		template: '<label class="item item-input"><input type="password" placeholder="Old Password" id="oldPassword"></label><label class="item item-input"><input type="password" placeholder="New Password" id="newPassword"></label><label class="item item-input"><input type="password" placeholder="Confirm New Password" id="confirmNewPassword"></label>',
		title: 'Change Password',
		subTitle: 'Enter Old And New Password',
		scope: $scope,
		buttons: [
		  	{ text: 'Cancel' },
		  	{
			text: '<b>Apply</b>',
			type: 'button-positive',
			onTap: function(e) {
				$scope.showWaiter();
				var oldPassword = $('#oldPassword').val();
				var newPassword = $('#newPassword').val();
				var confirmNewPassword = $('#confirmNewPassword').val();
		  		if (newPassword == confirmNewPassword) {
					$http({method: 'POST',url: urlBase+'/ChangePassword',data: $.param({NewPassword : newPassword , password : oldPassword}),headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(
					function successCallback(response) {
						if(jsonResponse.boolean == "true")
						{
							$scope.hideWaiter();
							ionicToast.show('Password changed.','middle',false,2500);
						}
						else
						{
							$scope.hideWaiter();
							ionicToast.show('Old Password Incorrect','middle',false,2500);
						}
					}
					, function errorCallback(response) {$scope.hideWaiter();ionicToast.show('Excuse,System side Error.','middle',false,2500);});

			  	} else {
			  		$scope.hideWaiter();
					ionicToast.show('New Password don\'t match.','middle',false,2500);
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

	$scope.closeSettings = function () {
		$scope.settingModal.hide();
	};

	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.goToBuyNSell = function()
	{
		$state.go('buynsell.buynsells');	
	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////
	
	$scope.goToServices = function()
	{
		$state.go('service.services');	
	};
	
	/////////////////////////////////////////////////////////////////////////////////////////////////

	$ionicModal.fromTemplateUrl('templates/meetAndEvents.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.meetAndEventsModal = modal;
	});

	$scope.getCategoryForStoreTypeSuccessCallback = function(response)
	{
		jsonResponse = httpManager.jsonParser(response);
		$scope.meetAndEventsCategory = JSON.parse(jsonResponse.string.__text);
		loadManager.hideWaiter();	
	};

	$scope.getLocationSuccessCallback = function(response)
	{
		jsonResponse = httpManager.jsonParser(response);
		$scope.locations = JSON.parse(jsonResponse.string.__text);
		loadManager.hideWaiter();	
	};

	$ionicModal.fromTemplateUrl('templates/saveMeetAndEvents.html', {
		scope: $scope
	}).then(function(modal) {
		$scope.saveMeetAndEventsModal = modal;
	});

	$scope.showSaveMeetAndEventsModal = function (){
		loadManager.showWaiter();	
		$scope.saveMeetAndEventsModal.show();
		httpManager.postRequester('GetCategoryForStoreType',{StoreTypeID: '300'},$scope.getCategoryForStoreTypeSuccessCallback);
		httpManager.postRequester('GetLocation',{TalukaID: '0'},$scope.getLocationSuccessCallback);
	};

	$scope.getCategoryForStoreTypeSuccessCallback = function(response)
	{
		jsonResponse = httpManager.jsonParser(response);
		$scope.meetAndEventsCategory = JSON.parse(jsonResponse.string.__text);
		loadManager.hideWaiter();	
	}

	$scope.saveMeetNEvents = function (){
		var tob=$('#t_atBirth').html().split(':');
		httpManager.postRequester('SaveMeetNEvents',{ID:'0',categoryID: $('#categoryID').val(),eventname:$('#eventTitle').val(),locationID:$('#locationID').val(),ConveyedBy:$('#conveyedBy').val(),description:$('#description').val(),viewedBy:'everyone',venue:$('#venue').val(),contactnum1:$('#contactNo1').val(),contactnum1:$('#contactNo1').val(),DateTo : $scope.selectedDates[0].getDate()+':'+$scope.selectedDates[0].getMonth()+':'+$scope.selectedDates[0].getFullYear(),DateFrom : $scope.selectedDates[0].getDate()+':'+$scope.selectedDates[0].getMonth()+':'+$scope.selectedDates[0].getFullYear(),TimeTo : $scope.selectedDates[0].getDate()+':'+$scope.selectedDates[0].getMonth()+':'+$scope.selectedDates[0].getFullYear(),TimeFrom : $scope.selectedDates[0].getDate()+':'+$scope.selectedDates[0].getMonth()+':'+$scope.selectedDates[0].getFullYear(),ImageString:'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjFDNzcwRDdEMzI5RjExRTNCMDQxODIzRTEyRDZBM0IyIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjFDNzcwRDdFMzI5RjExRTNCMDQxODIzRTEyRDZBM0IyIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MUM3NzBEN0IzMjlGMTFFM0IwNDE4MjNFMTJENkEzQjIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MUM3NzBEN0MzMjlGMTFFM0IwNDE4MjNFMTJENkEzQjIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz71dbkLAAAPCElEQVR42uxdCZRU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'},getCategoryForStoreTypeSuccessCallback);
	};

	$scope.getMeetAndEventsSuccessCallback = function(response)
	{
		jsonResponse = httpManager.jsonParser(response);
		$scope.meetAndEvents = JSON.parse(jsonResponse.string.__text);
		loadManager.hideWaiter();	
	}

	$scope.goToMeetNEvents = function()
	{
		loadManager.showWaiter();
		$scope.meetAndEventsModal.show();
		httpManager.postRequester('GetOthers',{CategoryID: '0',StoreTypeID: '300'},$scope.getMeetAndEventsSuccessCallback);
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