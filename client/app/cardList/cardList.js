angular.module('hackSource.cardList', [])
.controller('cardListCtrl', function($scope, Data, User) {

  $scope.search = {
    category: '',
    tag: ''
  };

  $scope.setSearchCat = function(category) {
    $scope.search.category = category;
  };

  $scope.setSearchTag = function(tag) {
    $scope.search.tag = tag;
  };

  $scope.getUsername = function() {
    User.checkLoggedIn().then(function(response) {
      return response.user.username;
    });
  };
})
.directive('myCardList', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/cardList/cardList.html',
    replace: true
  };
});
