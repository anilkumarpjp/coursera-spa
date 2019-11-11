(function() {
  "use strict";

  angular
    .module("LunchCheck", [])
    .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ["$scope"];

  function LunchCheckController($scope) {
    $scope.dishes = "";
    $scope.msg = "";

    $scope.lunchCheck = function() {
      if ($scope.dishes.length == 0) {
        $scope.msg = "Please enter data first!";
      } else {
        var numOfItems = $scope.dishes.split(",");

        if (numOfItems.length <= 3) {
          $scope.msg = "Enjoy!";
        } else {
          $scope.msg = "Too much!";
        }
      }
    };
  }
})();
