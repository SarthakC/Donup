  (function(){
	  'use strict';
	    var app = angular.module('donup');
    app.controller('UserCtrl',['$scope','UserService','$location','$cookies',function($scope,userService,$location,$cookies){
        //Models    
        $scope.user = {};
        $scope.isUserRegistered = false;
		$scope.message;
        $scope.userToken;
        $scope.dataLoading = false;
    
        $scope.registerUser = function(){
            $scope.dataLoading = true;
            userService.registerUser($scope.user).success(function(data) {
				if(data.message == 'User created!'){
					$scope.isUserRegistered = true;
				}
				$scope.message=data.message;
                $scope.user = {};
                $scope.dataLoading = false;
            });
        }
        
        $scope.loginUser = function(){
            userService.loginUser($scope.user).success(function(data) {
                $scope.dataLoading = true;
				if(data.success == true){
                    $cookies.put('usertoken',data.token);
                    $cookies.put('username',$scope.user.username);
                    $location.path('/');
				}
                $scope.message = data.message;
                $scope.user = {};
                $scope.dataLoading = false;
            });
        }
        
        $scope.logoutUser = function(){
        
        }
    }]);
  })();