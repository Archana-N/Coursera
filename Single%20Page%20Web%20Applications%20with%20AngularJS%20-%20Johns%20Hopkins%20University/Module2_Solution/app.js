(function () {
	'use strict';	
				
	angular.module('ShoppingListApp',[])
	.controller('ToBuyController', ToBuyController)	
	.controller('AlreadyBoughtController', AlreadyBoughtController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);
			
	ToBuyController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyController(ShoppingListCheckOffService) {	
		var toBuyList = this;		
		toBuyList.items = ShoppingListCheckOffService.buyItems;		
				
		toBuyList.removeItem = function (itemIndex) {
			try {
				ShoppingListCheckOffService.removeItem(itemIndex);

			} catch (error) {
				toBuyList. errorMessage = error.message;
			}
		}; 
	}
	
	
	AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtController(ShoppingListCheckOffService) {		
		var boughtList = this;						
		boughtList.items = ShoppingListCheckOffService.boughtItems;
	} 
	
    function ShoppingListCheckOffService() {
		//List of shopping items
		var ToBuyListItems = [
			{ name: "Pendrive", quantity: "10"},
			{ name: "Power Bank", quantity: "5"},
			{ name: "iPhone 6s", quantity: "2"},
			{ name: "HeadPhone", quantity: "15"}	
		];
		
		var AlreadyBoughtItems = [];
		var service = this;		
		
		service.buyItems = ToBuyListItems;
		service.boughtItems = AlreadyBoughtItems;
		
		service.removeItem = function (itemIndex) {						
			AddItemToBoughtList(itemIndex);			
			ToBuyListItems.splice(itemIndex, 1);
			
			if(ToBuyListItems.length <= 0) {				
				throw new Error("Everything is bought!");				
			}
		};
		
		function AddItemToBoughtList (itemIndex) {					
			var item = {
				name: ToBuyListItems[itemIndex].name,
				quantity: ToBuyListItems[itemIndex].quantity
			};
			
			AlreadyBoughtItems.push(item);			
		}		
	} 
	
})();

