(function () {

  angular.module('eliteAdmin').service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
	
  function authentication ($http, $window) {

    var saveToken = function (token) {
      $window.localStorage['mean-token'] = token;
    };

    var getToken = function () {
      return $window.localStorage['mean-token'];
    };

    var logout = function() {
      $window.localStorage.removeItem('mean-token');
    };
	  
	var isLoggedIn = function() {
	  var token = getToken();
	  var payload;

	  if(token){
		  
		payload = token.split('.')[1];
		payload = $window.atob(payload);
		payload = JSON.parse(payload);

		return payload.exp > Date.now() / 1000;
		  
	  } else {
		  
		return false;
		  
	  }
	};	  
	  
	var currentUser = function() {
		
	  if(isLoggedIn()){
		  
		var token = getToken();
		var payload = token.split('.')[1];
		  
		payload = $window.atob(payload);
		payload = JSON.parse(payload);
		  
		return {
		  name : payload.username
		};
	  }
	};
	  
	return {
      saveToken : saveToken,
      getToken : getToken,
      logout : logout,
	  isLoggedIn: isLoggedIn,
	  currentUser: currentUser
    };
	  
	  
	/*
	register = function(user) {
	  return $http.post('/api/register', user).success(function(data){
		saveToken(data.token);
	  });
	};

	login = function(user) {
	  return $http.post('/api/login', user).success(function(data) {
		saveToken(data.token);
	  });
	};
	*/
  }

})();