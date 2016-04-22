springDerbyApp.controller('HomeController', [ '$scope', '$rootScope', '$timeout', '$mdSidenav', 'AuthenticationService', '$location', '$controller', function($scope, $rootScope, $timeout, $mdSidenav, AuthenticationService, $location, $controller) {
    'use strict';
    
    $scope.app = {
    	name: "Spring Derby Test"	
    };
    var username = "username";
    try {
        username = $rootScope.globals.currentUser.username;
    } catch (e) {
    }
    $scope.urls = [ {
        title : username,
        role: "",
        subs: [
               {
                   href: "#/",
                   title: "Logout",
                   icon: "lock_outline"
               }]
    },{
		title : "Project1",
		role: "PROJECT1",
		subs: [
		       {
		    	   href: "#/home/project1/web1",
		    	   title: "Webpage1",
                   icon: "pages"
		       },
		       {
		    	   href: "#/home/project1/web2",
		    	   title: "Webpage2",
                   icon: "pages"
		       }
		       ]
	},
	{
		title : "Project2",
		role: "PROJECT2",
		subs: [
		       {
		    	   href: "#/home/project2/web1",
		    	   title: "Webpage1",
                   icon: "pages"
		       },
		       {
		    	   href: "#/home/project2/web2",
		    	   title: "Webpage2",
                   icon: "pages"
		       }
		       ]
	},
    {
        title : "Admin",
        role: "ADMIN_INFO",
        subs: [
               {
                   href: "#/home/user/info",
                   title: "User Info",
                   icon: "info_outline"
               },
               {
                   href: "#/home/groups",
                   title: "User Groups",
                   icon: "group"
               },
               {
                   href: "#/home/users",
                   title: "Users",
                   icon: "contacts"
               },
               {
                   href: "#/home/logs",
                   title: "Log File",
                   icon: "speaker_notes"
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
    
    $scope.accessAvailable = function(role) {
        var flag = false;
        if(role == "" || $rootScope.globals.currentUser.roles.indexOf(role) > -1) {
            flag = true;
        }
        return flag;
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