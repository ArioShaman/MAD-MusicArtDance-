app.controller('DeviseSessionsCtrl',['$scope','Auth',function($scope, Auth){
	var ctrl = this;
	$scope.auth = Auth.isAuthenticated();
	if($scope.auth == false){
		$scope.current_user = 'Guest';
	}else{
		$scope.current_user = Auth._currentUser;
	}
	$scope.clickLog = false;
	$scope.clickReg = false;
	$scope.log_click = function(){
		$('.user-inf-cont').toggleClass('inf-log-expend');
		$scope.clickLog = !$scope.clickLog;
		$scope.clickReg = false;
	};

	$scope.reg_click = function(){
		$scope.clickLog = false;
		$('.user-inf-cont').toggleClass('inf-reg-expend');
	};
}])