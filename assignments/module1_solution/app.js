(function(){
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope){

    $scope.message = "";
    $scope.countItem = function(userInput){

      if(userInput == undefined){
        $scope.message = "Please enter data first!";
      };

      var items = userInput.split(',');
      console.log(items);
      var counts = items.length;
      console.log(counts);
      if(counts == 1 && userInput == ""){
        $scope.message = "Please enter data first!";
      }else if (counts <= 3) {
        $scope.message = "Enjoy!";
      }else {
        $scope.message = "Too much!"
      };

    };

  };

})()
