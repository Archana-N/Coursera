(function () {
	'use strict';
	
	angular.module("LunchCheck",[])
	.controller("LunchCheckController", LunchCheckController);
	
	LunchCheckController.$inject = ['$scope']

	function LunchCheckController($scope) {		
		$scope.textInput = '';
		$scope.displayElements = function () {
					
			var itemsEntered = $scope.textInput;					
			itemsEntered = itemsEntered.trim();			
			
			var itemsArray = itemsEntered.split(',');			
			var newItems = '';
			
			//remove white and empty spaces
			itemsArray.filter(CheckForWhiteSpaces);
			
			function CheckForWhiteSpaces (item) {				
				var itemTrimmed = item.trim(); 				
								
				if(itemTrimmed.length > 0) {					
					newItems += item + ',';					
				}								
			}						
									
			//remove trailing ','
			if (newItems.charAt(newItems.length - 1) == ',') {
				newItems = newItems.substr(0, newItems.length - 1);
			}				
			
			var newItemsArray = newItems.split(',');			
			
			if(newItemsArray.length == 1 && newItemsArray == ''){
				$scope.message = "Please enter data first";	
				$scope.textColor = "red";				
				$scope.changeBorderColor = {"border-color":"red"};
			}
			
			else if(newItemsArray.length <= 3) {				
				$scope.message = "Enjoy!";	
				$scope.textColor = "green";
				$scope.changeBorderColor = {"border-color":"green"};
			}
			else {				
				$scope.message = "Too much!";
				$scope.textColor = "green";	
				$scope.changeBorderColor = {"border-color":"green"};				
			}				
		};		
	}	
})();
