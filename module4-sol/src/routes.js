(function() {
  "use strict";

  angular.module("MenuApp").config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    // Redirect to home page if no other URL matches
    $urlRouterProvider.otherwise("/");

    // *** Set up UI states ***
    $stateProvider

      // Home page
      .state("home", {
        url: "/",
        templateUrl: "src/menu/templates/home.template.html"
      })

      .state("categories", {
        url: "/categories",
        templateUrl: "src/menu/templates/main-categories.template.html",
        controller: "CategoryController as categoryCtrl",
        resolve: {
          categories: [
            "MenuDataService",
            function(MenuDataService) {
              return MenuDataService.getAllCategories();
            }
          ]
        }
      })

      .state("items", {
        url: "/categories/{categoryShortName}",
        templateUrl: "src/menu/templates/main-items.template.html",
        controller: "itemsController as itemsCtrl",
        params: {
          categoryShortName: null
        },
        resolve: {
          items: [
            "$stateParams",
            "MenuDataService",
            function($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory(
                $stateParams.categoryShortName
              );
            }
          ]
        }
      });
  }
})();
