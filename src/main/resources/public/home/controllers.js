springDerbyApp.controller('HomeController', [ '$scope', '$rootScope', '$timeout', '$mdSidenav', 'AuthenticationService', '$location', '$controller', function($scope, $rootScope, $timeout, $mdSidenav, AuthenticationService, $location, $controller) {
    'use strict';
    
    $scope.app = {
    	name: "Spring Derby Test"	
    };

    $scope.urls = [ {
		url : "#/home/proxies",
		title : "Proxies",
		icon : "menu"
	}, {
		url : "#/home/browsers",
		title : "Browsers",
		icon : ""
	}, {
		url : "#/home/urls",
		title : "URLs",
		icon : ""
	}, {
		url : "#/home/tests",
		title : "Tests",
		icon : ""
	}, {
		url : "#/home/pages",
		title : "Pages",
		icon : ""
	}, {
		url : "#/home/configs",
		title : "Configuration Items",
		icon : ""
	} ];
    
    $controller('BaseController', {
		$scope : $scope
	});
    
    $scope.toggleLeft = buildDelayedToggler('left');

    function buildDelayedToggler(navID) {
		return debounce(function() {
			$mdSidenav(navID).toggle();
		}, 200);
	}
    
    function debounce(func, wait, context) {
		var timer;
		return function debounced() {
			var context = $scope, args = Array.prototype.slice
					.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function() {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
	}
    
    $scope.logout = function() {
        AuthenticationService.ClearCredentials();
        $location.path('/login');
    };
    
} ]);

springDerbyApp.controller('LeftController', [ '$scope', '$timeout', '$mdSidenav', function($scope, $timeout, $mdSidenav) {
	'use strict';

	$scope.close = function() {
		$mdSidenav('left').close();
	};

} ]);

springDerbyApp.controller('DefaultController', [ '$scope', '$timeout', '$mdSidenav', 'AjaxService', '$rootScope', '$mdDialog', function($scope, $timeout, $mdSidenav, AjaxService, $rootScope, $mdDialog) {
	'use strict';

    $scope.init = function() {
    	
    };
    
    $scope.load = function() {
    	
    };
	
} ]);