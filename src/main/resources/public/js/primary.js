springDerbyApp.controller('BaseController', [ '$scope', '$rootScope', 'AjaxService', '$mdDialog', '$location', function($scope, $rootScope, AjaxService, $mdDialog, $location) {
    'use strict';
    
    if(!$rootScope.temp) {
    	$rootScope.temp = {};
    }

    $rootScope.pageTitle = "";
    
    $scope.openAsDialog = function(url, $event, postClose) {
    	$mdDialog.show({
	        templateUrl : url,
	        parent : angular.element(document.body),
	        targetEvent : $event,
	        clickOutsideToClose : true,
	        fullscreen: true
	    }).then(function(answer) { }, function() {
	    	postClose();
	    });
    };
    
    $scope.confirmDialog = function(model, $event, okCallback) {
    	var confirm = $mdDialog.confirm()
							        .title(model.title)
							        .textContent(model.content)
							        .ariaLabel('Confirmation').targetEvent($event)
							        .ok(model.okLabel).cancel(model.cancelLabel);
    	$mdDialog.show(confirm).then(function() {
    		okCallback();
         },
         function() {
        	 $scope.cancel();
         });
    };
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
	$scope.getNumber = function(num) {
    	var array = [];
    	for (var int = 0; int < num;) {
			array[int] = ++int;
		}
    	return array;
    };

} ]);

springDerbyApp.controller('LoginController', [ '$scope', '$location', 'AuthenticationService', function($scope, $location, AuthenticationService) {
	'use strict';

	AuthenticationService.ClearCredentials();

	$scope.login = function() {
		$scope.errorMessage = '';
		AuthenticationService.Login($scope.user, function(response, headers) {
			if (response == 200) {
				AuthenticationService.SetCredentials($scope.user.username, headers("SESSION-KEY"), headers("USER_ROLES"), headers("USER_FULLNAME"), headers("USER_STAFF"));
				$location.path('/home');
			} else {
				var err = '';
				try {
					err = $($(response).get(3)).html();
					err = err.split('-')[1].trim();
				} catch (e) {
					err = 'Failed to Login, please contact administrator!';
				}
				$scope.errorMessage = err;
			}
		});
	};

} ]);

springDerbyApp.controller('MenuController', function($scope) {
    'use strict';
});
