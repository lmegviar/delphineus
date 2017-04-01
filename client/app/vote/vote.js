'use strict'

angular.module('hackSource.vote', [])

.factory('counter', ['$http', function($http) {
	var count = 0;
	var incrementer = function() {
		this.count++;
	}

	var addLikes = function(resourceId, userId) {
		return $http({
			method: 'POST',
			url: 'api/likes',
			data: {'resourceId': resourceId, 'userId': userId}
		})
		.then(function(data) {
			console.log('like successfully posted', data)
		})
		.catch(function(err) {
			console.log('error', err)
		});
	};

	var deleteLikes = function(resourceId, userId) {
		return $http({
			method: 'DELETE',
			url: `api/likes?resourceId=${resourceId}&userId=${userId}`
		});
	};

	var addDislikes = function(resourceId, userId) {
		return $http({
			method: 'POST',
			url: 'api/dislikes',
			data: {'resourceId': resourceId, 'userId': userId}
		})
		.then(function(data) {
			console.log('dislike successfully posted', data)
		})
		.catch(function(err) {
			console.log('error', err)
		});
	};

	var deleteDislikes = function(resourceId, userId) {
		return $http({
			method: 'DELETE',
			url: `api/dislikes?resourceId=${resourceId}&userId=${userId}`
		});
	};

	return {
		incrementer: incrementer,
		count: count,
		addLikes: addLikes,
		deleteLikes: deleteLikes,
		addDislikes: addDislikes,
		deleteDislikes: deleteDislikes
	};
}])
.controller('VoteCtrl', function($scope, counter, User) {
	$scope.upVoteFlagVariable = false;
	$scope.downVoteFlagVariable = false;
	var talkingToDB = false;
	var userId;
	var resourceId = $scope.resource.id
	User.checkLoggedIn().then(function(user) {
		if (user.user.id === undefined) {
			$scope.upVoteFlagVariable = true;
			$scope.downVoteFlagVariable = true;
		};
		userId = user.user.id; })
	.then(function() {
		$scope.vote = $scope.resource.Likes.length;
		$scope.dvote = $scope.resource.Dislikes.length;
		$scope.positivityPercentage = Math.floor(100 * ($scope.vote/($scope.vote+$scope.dvote)));
		console.log($scope.positivityPercentage)
		if ($scope.resource.Likes.filter(like => like.UserId === userId).length > 0) {
			$scope.upVoteFlagVariable = true;
		} else if ($scope.resource.Dislikes.filter(dislike => dislike.UserId === userId).length > 0) {
			$scope.downVoteFlagVariable = true;
		}
	});

	console.log($scope.positivityPercentage);
	$scope.upVote = function() {
		if (!talkingToDB) {
			talkingToDB = true;
			if (!$scope.upVoteFlagVariable) {
				if ($scope.downVoteFlagVariable) {
					counter.deleteDislikes(resourceId, userId)
					.then(function() {
						$scope.downVoteFlagVariable = false;
						$scope.dvote--;
					});
				}
				counter.addLikes(resourceId, userId)
				.then(function(data) {
					$scope.vote++;
					$scope.positivityPercentage = Math.floor(100 * ($scope.vote/($scope.vote+$scope.dvote)));
					$scope.upVoteFlagVariable = true;
					talkingToDB = false;
					console.log('successfully added like', data);
				})
				.catch(function(err) {
					console.log('error', err);
				});
			}
		}
	};

	$scope.downVote = function() {
		if (!talkingToDB) {
			talkingToDB = true;
			if (!$scope.downVoteFlagVariable) {
				if ($scope.upVoteFlagVariable) {
					counter.deleteLikes(resourceId, userId)
					.then(function() {
						$scope.upVoteFlagVariable = false;
						$scope.vote--;
					});
				}
				counter.addDislikes(resourceId, userId)
				.then(function(data) {
					$scope.dvote++;
					$scope.positivityPercentage = Math.floor(100 * ($scope.vote/($scope.vote+$scope.dvote)));
					$scope.downVoteFlagVariable = true;
					talkingToDB = false;
					console.log('successfully added dislike', data);
				})
				.catch(function(err) {
					console.log('error', err);
				});
			}
		}
	};
})

.directive('myVote', function() {

	return {
		restrict: 'E',
		// scope: {
		// 	upVote: '='
		// },
		templateUrl: 'app/vote/vote.html',
		controller: 'VoteCtrl'
	}
});
