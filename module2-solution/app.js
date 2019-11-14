(function() {
  "use strict";

  angular
    .module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.toBuyList = ShoppingListCheckOffService.toBuyItems;

    toBuy.removeItem = function(itemIndex, name, qn) {
      ShoppingListCheckOffService.removeItem(itemIndex, name, qn);
    };
  }

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var bought = this;

    bought.boughtList = ShoppingListCheckOffService.boughtItems;
  }

  function ShoppingListCheckOffService() {
    var service = this;

    // List of shopping items
    var buyItems = [
      { name: "cookies", quantity: 10 },
      { name: "candy", quantity: 5 },
      { name: "soft drinks", quantity: 3 },
      { name: "coursera", quantity: 6 },
      { name: "bikes", quantity: 2 },
      { name: "iphone", quantity: 220 }
    ];
    service.toBuyItems = buyItems;
    service.boughtItems = [];

    service.addItem = function(itemName, quantity) {
      var boughtItem = {
        name: itemName,
        quantity: quantity
      };
      service.boughtItems.push(boughtItem);
      console.log("boughtItems :", service.boughtItems);
    };

    service.removeItem = function(itemIdex, name, qn) {
      buyItems.splice(itemIdex, 1);
      service.addItem(name, qn);
    };
  }
})();
