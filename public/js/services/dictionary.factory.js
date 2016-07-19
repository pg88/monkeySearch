angular.module('dictionaryService', [])

	// super simple service
	// each function returns a promise object 
	.factory('DictionaryFactory', ['$http',function($http) {
		return {
			getDictionarRecommendations : function(query,params){
				return $http.get('http://api.pearson.com/v2/dictionaries/entries',{params:{headword:query,limit:params.limit || 6}});
			}
		}
	}]);