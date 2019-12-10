(function() {
  "use strict";

  angular
    .module("MenuApp")
    .controller("CategoryController", CategoryController);

  CategoryController.$inject = ["MenuDataService", "categories"];
  function CategoryController(MenuDataService, categories) {
    var categoryCtrl = this;
    categoryCtrl.categories = categories;
  }
})();
