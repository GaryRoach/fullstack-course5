(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .constant('BaseURL', 'https://davids-restaurant.herokuapp.com')
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      },
      controller: FoundItemsDirectiveController,
      controllerAs: 'list',
      bindToController: true
    }

    return ddo;
  }

  function FoundItemsDirectiveController() {
    var list = this;

    list.isEmpty = function () {
      return (list.foundItems && list.foundItems.length === 0);
    }
  }

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
    var list = this;
    list.searchTerm = '';
    list.narrowItDown = function() {
      list.found = null;
      if (list.searchTerm.trim() === '') {
        list.found = [];
      }
      else {
        list.nothingFound = false;
        MenuSearchService.getMatchedMenuItems(list.searchTerm).then(
          function(result) {
            list.found = result;
          }
        );
      }
    }

    list.removeItem = function(index) {
      list.found.splice(index, 1);
    }
  }

  MenuSearchService.$inject = ['$http', 'BaseURL']
  function MenuSearchService($http, BaseURL) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: 'GET',
        url: (BaseURL + '/menu_items.json')
      }).then(
        function(result) {
          var foundItems = [];
          result.data.menu_items
            .filter(item => item.description.indexOf(searchTerm) !== -1)
            .forEach(item => foundItems.push(item));

          return foundItems;
        }
      )
    }
  }
})();