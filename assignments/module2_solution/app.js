(function () {
	'use strict';

	angular.module('ShoppingListCheckOff', [])
	.controller('ToBuyShoppingController', ToBuyShoppingController)
	.controller('AlreadyBoughtShoppingController', AlreadyBoughtShoppingController)
	.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

	ToBuyShoppingController.$inject = ['ShoppingListCheckOffService'];
	function ToBuyShoppingController(ShoppingListCheckOffService) {
		var toBuy = this;

		toBuy.items = ShoppingListCheckOffService.getToBuyItems();
		toBuy.checkOffItem = function (index) {
			ShoppingListCheckOffService.checkOffItem(index);
		}
	}

	AlreadyBoughtShoppingController.$inject = ['ShoppingListCheckOffService'];
	function AlreadyBoughtShoppingController(ShoppingListCheckOffService) {
		var alreadyBought = this;

		alreadyBought.items = ShoppingListCheckOffService.getAlreadyBoughtItems();
	}

	function ShoppingListCheckOffService() {
		var service = this;
		var toBuyItems = [
			{ name: 'cookies', quantity: 10 },
			{ name: 'chocolate bars', quantity: 5 },
			{ name: 'energy drinks', quantity: 2 },
			{ name: 'twix', quantity: 7 },
			{ name: 'chips', quantity: 3 }
		];
		var alreadyBoughtItems = [];

		service.getToBuyItems = function () {
			return toBuyItems;
		}

		service.getAlreadyBoughtItems = function () {
			return alreadyBoughtItems;
		}

		service.checkOffItem = function (index) {
			var checkedOffItem = toBuyItems[index];

			toBuyItems.splice(index, 1);
			alreadyBoughtItems.push(checkedOffItem);
		}
	}
})();