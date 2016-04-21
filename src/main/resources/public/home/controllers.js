springDerbyApp.controller('HomeController', [ '$scope', '$rootScope', '$timeout', '$mdSidenav', 'AuthenticationService', '$location', '$controller', function($scope, $rootScope, $timeout, $mdSidenav, AuthenticationService, $location, $controller) {
    'use strict';
    
    $scope.app = {
    	name: "Spring Derby Test"	
    };

    $scope.urls = [ {
		url : "#/home/project1",
		title : "Project1",
		icon : "menu",
		subs: [
		       {
		    	   href: "#/home/project1/webpage1",
		    	   title: "Webpage1"
		       },
		       {
		    	   href: "#/home/project1/webpage2",
		    	   title: "Webpage2"
		       }
		       ]
	},
	{
		url : "#/home/project2",
		title : "Project2",
		icon : "menu",
		subs: [
		       {
		    	   href: "#/home/project2/webpage1",
		    	   title: "Webpage1"
		       },
		       {
		    	   href: "#/home/project2/webpage2",
		    	   title: "Webpage2"
		       }
		       ]
	}];
    
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