(function() {
  "use strict";

  angular
    .module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .directive("foundItems", foundItemsDirective)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");

  function foundItemsDirective() {
    var ddo = {
      templateUrl: "foundItems.html",
      scope: {
        found: "<",
        onRemove: "&"
      },
      controller: foundItemsDirectiveController,
      controllerAs: "menu",
      bindToController: true
    };

    return ddo;
  }

  function foundItemsDirectiveController() {
    var menu = this;
  }

  NarrowItDownController.$inject = ["MenuSearchService"];
  function NarrowItDownController(MenuSearchService) {
    var menu = this;

    menu.searchTermInList = function(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems();
      menu.itemsInList = false;
      promise
        .then(function(response) {
          menu.items = response.data;
          console.log("found", menu.items);

          var foundTermItems = [];

          console.log("searchTerm", searchTerm);

          for (var i = 0; i < menu.items.menu_items.length; i++) {
            var description = menu.items.menu_items[i].description;
            if (description.toLowerCase().indexOf(searchTerm) !== -1) {
              // found array
              foundTermItems.push(menu.items.menu_items[i]);
            }
          }
          console.log("foundTermItems", foundTermItems);
          menu.found = foundTermItems;

          if (menu.found.length === 0 || searchTerm === "undefined") {
            menu.itemsInList = true;
          }
        })
        .catch(function(error) {
          console.log("Something went terribly wrong.");
        });
    };

    menu.removeItem = function(itemIndex) {
      menu.found.splice(itemIndex, 1);
    };
  }

  MenuSearchService.$inject = ["$http", "ApiBasePath"];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;

    service.getMatchedMenuItems = function() {
      var response = $http({
        method: "GET",
        url: ApiBasePath + "/menu_items.json"
      });

      return response;
    };

    service.removeItem = function(itemIndex) {
      items.splice(itemIndex, 1);
    };
  }
})();
