angular.module('hackSource.cards', ['infinite-scroll', '720kb.socialshare'])
.controller('cardsCtrl', function($scope, Data, User) {

  var generateColor = function() {
    var palette = ['#FF8A65', '#7986CB', '#3F51B5', '#E0E0E0'];
    var index = Math.floor(Math.random() * (palette.length));
    console.log('Index: ', index);
    return palette[index];
  }

  Data.getAllResources()
    .then(function(data) {
      $scope.allData = data.reverse(); //$scope.data
      $scope.data = $scope.allData.slice(0, 2);
      data.forEach((resource, index) => {
        if (resource.imgUrl === 'https://i.stack.imgur.com/Mmww2.png') {
          resource.defaultImg = true;
          resource.color = generateColor();
        } else {
          resource.defaultImg = false;
        }
          console.log('Resource --> ', resource);
      })
    });

  User.checkLoggedIn().then(function(result) {
    $scope.user = result.user;
  });

  $scope.addView = function(id) {
    Data.addView({id: id});
  };

  $scope.loadMore = function() {
    if ($scope.data === undefined) {
      return ;
    }
    var last =  $scope.data.length;
   var newCards = [];

    for (var i = last; i < $scope.allData.length; i++) {
      $scope.data.push($scope.allData[i]);
    }
  };

  $scope.deleteResource = function(id, title) {
    if (confirm('Delete resource "' + title + '"?')) {
      Data.deleteResource({id: id});
    }
  };

})
.directive('myCard', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/cards/cards.html'
  };
});
