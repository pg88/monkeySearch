angular.module('searchController', [])

	// inject the Todo service factory into our controller
	.controller('mainController', ['$scope','$http','HashtagFactory', 'DictionaryFactory', function($scope, $http, HashtagFactory,DictionaryFactory) {
		this._ = _;

		$scope.hashtags = [];
		$scope.showError = false;
		$scope.hideHashtags = false;
		$scope.source = 'twitter.com';
		var defaultString = '#monkey';
		var params = {limit:6};

		// GET =====================================================================
		// use the service to get all the hashtags

		var getDictionaryRecommendations = function(query,limit){
			DictionaryFactory.getDictionarRecommendations(query,limit)
				.success(function(data){
					$scope.hideHashtags = true;
					$scope.source = 'dictionary.com';
					$scope.hashtags = data.results;
				})
		};

		$scope.searchHashTag = function(query){
			if(!_.isEmpty(query)){
				$scope.showError = false;
				HashtagFactory.searchHashtag(query)
					.success(function(data) {
						if(_.size(data.data)==0 || _.size(data.data.statuses)==0){
							getDictionaryRecommendations(query,params)
						}else{
							$scope.hashtags = data.data;
						}
					});
			}else{
				$scope.showError = true;
			}
		};
		$scope.init = function(){
			HashtagFactory.getDefaultHashtag()
				.success(function(data){
					if(_.size(data.data)==0) {
						getDictionaryRecommendations(defaultString,params)
					}else{
						$scope.hashtags = data.data;
					}
			})
		};
		$scope.init();

	}]);