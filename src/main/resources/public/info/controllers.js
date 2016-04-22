springDerbyApp.controller('UserInfoController', [ '$scope', '$rootScope', 'AjaxService', function($scope, $rootScope, AjaxService) {
    'use strict';
    
    $rootScope.pageTitle = "User Information";
    
    $scope.init = function() {
    	AjaxService.call('users/info', 'GET').success(function(data, status, headers, config) {
        	$scope.userInfo = data;
        });
    };
    
} ]);