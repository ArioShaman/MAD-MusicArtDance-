app.controller('DeviseSessionsCtrl',['$cookies','$interval','$http','$scope','Auth',function($cookies,$interval,$http,$scope, Auth){
	var ctrl = this;
	if($cookies.get('auth')){
		$scope.auth = true;
		$scope.current_user = $cookies.get('current_user');
	}else{
		$scope.auth = false;
		$scope.current_user = 'Guest';
	}
	//if($scope.auth == false){
	//	$scope.current_user = 'Guest';
	//}else{
	//	$scope.current_user = Auth._currentUser;
	//}
	console.log(Auth._currentUser);
	console.log($cookies.getAll());
	$scope.clickLog = false;
	$scope.clickReg = false;
	$scope.isErr = false;

	
	$scope.log_click = function(){
		$('.user-inf-cont').toggleClass('inf-log-expend');
		$scope.clickLog = !$scope.clickLog;
		$scope.clickReg = false;
	};

	$scope.reg_click = function(){
		$scope.clickLog = false;
		$scope.clickReg = !$scope.clickReg;
		$('.user-inf-cont').toggleClass('inf-log-expend');
	};
	
	var credentials = {
			username: 'User2',
            email: 'user2@domain.com',
            password: 'password3',
            password_confirmation: 'password3'
    };
    
    var config = {
        headers: {
            'X-HTTP-Method-Override': 'POST'
        }
    };

    $scope.register = function(){
		Auth.register(credentials, config).then(function(registeredUser) {
	       $scope.current_user = registeredUser['username'];
	    }, function(error) {
	    	}
	    );

	    $scope.$on('devise:new-registration', function(event, user) {
	    	$scope.auth = Auth.isAuthenticated();
	    });
	}

	$scope.login = function(){
	    Auth.login(credentials, config).then(function(user) {
            $scope.current_user = Auth._currentUser['username'];
            $cookies.put('current_user',$scope.current_user)
            $cookies.put('auth',Auth.isAuthenticated());
            console.log($cookies.getAll());
        }, function(error) {
        });

        $scope.$on('devise:login', function(event, currentUser) {
        	$scope.auth = Auth.isAuthenticated();
        });

        $scope.$on('devise:new-session', function(event, currentUser) {
            $scope.auth = Auth.isAuthenticated();
        });
	};

	$scope.logout = function(){
		Auth.logout(config).then(function(oldUser) {
        }, function(error) {
            // An error occurred logging out.
        });

        $scope.$on('devise:logout', function(event, oldCurrentUser) {
        	$scope.auth = false;
        	$scope.current_user = 'Guest';
        	$cookies.put('current_user','Guest')
            $cookies.put('auth',Auth.isAuthenticated());
        });
	}
}])