angular.module('twitterService', [])

	// super simple service
	// each function returns a promise object 
	.factory('HashtagFactory', ['$http',function($http) {
		return {
			getDefaultHashtag : function(){
				return $http.get('/api');
			},
			searchHashtag : function(query) {
				return $http.get('/api/search/%23' + query);
			},
		}
	}]);