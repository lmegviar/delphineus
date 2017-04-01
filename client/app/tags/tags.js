// If we do not have CryptoJS defined; import it
if (typeof CryptoJS == 'undefined') {
  var cryptoSrc = '//cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/md5.js';
  var scriptTag = document.createElement('script');
  scriptTag.setAttribute('src', cryptoSrc);
  document.body.appendChild(scriptTag);
}

angular.module('hackSource.tags', [])
.controller('TagsCtrl', function($scope, Data) {

  var initializeTags = function () {
    Data.getPopularTags()
      .then(function (tags) {
        $scope.taglist = tags;
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  initializeTags();

})
.directive('tagList', function() {
  return {
    restrict: 'E',
    templateUrl: 'app/tags/tags.html',
    controller: 'TagsCtrl',
    replace: true
  };
});
