springDerbyApp.controller('PermissionsController', [ '$scope', '$rootScope', '$timeout', '$mdSidenav', '$routeSegment', function($scope, $rootScope, $timeout, $mdSidenav, $routeSegment) {
    'use strict';
    
    $scope.permissionsUrls = [
      	{
    		url: "#/home/permissions/groups",
    		title: "Groups",
    		icon: "icons/group.svg"
    	},
    	{
    		url: "#/home/permissions/users",
    		title: "Users",
    		icon: "icons/blood-drop.svg"
    	}
    ];
    
    $rootScope.pageTitle = "Permissions";
    
    $scope.toggleLeft = buildDelayedToggler('leftGroups');

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
    
    $scope.isSegment = function(segment) {
        return $routeSegment.name.endsWith(segment);
    };

} ]);


springDerbyApp.controller('GroupsController', [ '$scope', '$rootScope', 'AjaxService', '$mdDialog', '$mdMedia', function($scope, $rootScope, AjaxService, $mdDialog, $mdMedia) {
    'use strict';
    
    $scope.load = function() {
    	AjaxService.call('users/groups', 'GET').success(function(data, status, headers, config) {
        	$scope.groups = [];
        	for(var i = 0; i < data.length; i++) {
        		$scope.groups.push({"name": data[i]});
        	}
        });
    };
    
    $scope.addEditGroup = function(data, ev) {
    	if(data) {
    		$rootScope.temp = {
	            group : data
	        };
    	} else {
    		$rootScope.temp = {
	            group : {
	            	name: ''
	            }
	        };
    	}
    	
        $mdDialog.show({
            templateUrl : 'permissions/addEditGroup.html',
            parent : angular.element(document.body),
            targetEvent : ev,
            clickOutsideToClose : true,
            fullscreen: true
        }).then(function(answer) { }, function() {
            $scope.load();
        });
    };
    
    $scope.deleteGroup = function(group, $event) {
    	var confirm = $mdDialog.confirm()
							   .title('Are you sure to delete this Group ?')
						   	   .textContent('Group Name: ' + group.name)
						   	   .ariaLabel('Delete').targetEvent($event)
						   	   .ok('Delete').cancel('Cancel');
		$mdDialog.show(confirm).then(function() {
									AjaxService.call('users/groups/' + group.name, 'DELETE').success(function(data, status, headers, config) {
						                $scope.load();
						            });
								},
								function() {
									$mdDialog.cancel();
								});
    };
    
    $scope.viewAuthorities = function(group, $event) {
    	$rootScope.temp = {
            group : group
        };

    	$mdDialog.show({
            templateUrl : 'permissions/authorities.html',
            parent : angular.element(document.body),
            targetEvent : $event,
            clickOutsideToClose : true,
            fullscreen: true
        }).then(function(answer) { }, function() {
            $scope.load();
        });
    };
    
    $scope.viewUsers = function(group, $event) {
    	$rootScope.temp = {
            group : group
        };

    	$mdDialog.show({
            templateUrl : 'permissions/groupUsers.html',
            parent : angular.element(document.body),
            targetEvent : $event,
            clickOutsideToClose : true,
            fullscreen: true
        }).then(function(answer) { }, function() {
            $scope.load();
        });
    };

} ]);

springDerbyApp.controller('GroupController', [ '$scope', '$rootScope', 'AjaxService', '$mdDialog', function($scope, $rootScope, AjaxService, $mdDialog) {
    
    $scope.group = $rootScope.temp.group;
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.save = function() {
    	AjaxService.call('users/groups', 'POST', $scope.group.name).success(function(data, status, headers, config) {
    		$mdDialog.cancel();
        });
    };
} ]);

springDerbyApp.controller('AuthoritiesController', [ '$scope', '$rootScope', 'AjaxService', '$mdDialog', function($scope, $rootScope, AjaxService, $mdDialog) {
    
    $scope.group = $rootScope.temp.group;
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.getAllAuthorities = function() {
        AjaxService.call('users/groups/authorities', 'GET').success(function(data, status, headers, config) {
            $scope.authorities = [];
            for(var i = 0; i < data.length; i++) {
                $scope.authorities.push({"name": data[i]});
            }
        });
    };
    
    $scope.load = function() {
    	$scope.getAllAuthorities();
    	AjaxService.call('users/groups/auth/' + $scope.group.name, 'GET').success(function(dataInner, status, headers, config) {
			$scope.grantedAuths = dataInner;
			for(var j = 0; j < $scope.grantedAuths.length; j++) {
				for(var i = 0; i < $scope.authorities.length; i++) {
					if($scope.authorities[i].name == $scope.grantedAuths[j]) {
						$scope.authorities[i].selected = true;
						break;
					}
				}
			}
		});
    };
    
    $scope.save = function() {
    	var authsToSave = [];
        for(var i=0;i<$scope.authorities.length;i++) {
            if($scope.authorities[i].selected == true) {
                authsToSave.push($scope.authorities[i].name)
            }
        }
        AjaxService.call('users/groups/auth/' + $scope.group.name, 'POST', authsToSave).success(function(data, status, headers, config) {
        	$mdDialog.cancel();
        });
    };

} ]);

springDerbyApp.controller('GroupUsersController', [ '$scope', '$rootScope', 'AjaxService', '$mdDialog', function($scope, $rootScope, AjaxService, $mdDialog) {
    
	$scope.group = $rootScope.temp.group;
	
	$scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.init = function() {
    	$scope.selectedUser = '';
    	$scope.loadGroupUsers();
    };
	
    $scope.loadGroupUsers = function() {
        AjaxService.call('users/groups/user/' + $scope.group.name, 'GET').success(function(data, status, headers, config) {
            $scope.groupUsers = [];
            for(var i = 0; i < data.length; i++) {
                $scope.groupUsers.push({"username": data[i]});
            }
            $scope.loadUsersList();
        });
    };
    
    $scope.removeUserFromGroup = function(groupName, selecteduser) {
        AjaxService.call('users/groups/user/' + groupName, 'DELETE', selecteduser).success(function(data, status, headers, config) {
            $scope.loadGroupUsers();
        });
    };
    
    $scope.loadUsersList = function() {
        AjaxService.call('users', 'GET').success(function(data, status, headers, config) {
            $scope.users = [];
            for(var j = 0; j < data.length; j++) {
                if(!contains($scope.groupUsers, data[j], 'username')) {
                    $scope.users.push(data[j]);
                }
            }
        });
    };
    
    $scope.confirmAddUserToGroup = function(selecteduser) {
        AjaxService.call('users/groups/user/' + $scope.group.name, 'POST', selecteduser).success(function(data, status, headers, config) {
            $scope.init();
        });
    };
}] );

springDerbyApp.controller('UsersController', [ '$scope', '$rootScope', 'AjaxService', '$mdDialog', function($scope, $rootScope, AjaxService, $mdDialog) {
    
    $scope.init = function() {
    	AjaxService.call('users', 'GET').success(function(data, status, headers, config) {
            $scope.users = data;
        });
    };
    
    $scope.addEditUser = function(user, $event) {
    	if(user) {
    		$rootScope.temp = {
	            user : user
	        };
    	} else {
    		$rootScope.temp = {
	            user : {
	            	username: ''
	            }
	        };
    	}
    	
        $mdDialog.show({
            templateUrl : 'permissions/addEditUser.html',
            parent : angular.element(document.body),
            targetEvent : $event,
            clickOutsideToClose : true,
            fullscreen: true
        }).then(function(answer) { }, function() {
            $scope.init();
        });
    };
    
    $scope.enableUser = function(user) {
        AjaxService.call('users/enable', 'POST', user).success(function(data, status, headers, config) {
            user = data;
        });
    };
	
}] );

springDerbyApp.controller('AddEditUserController', [ '$scope', '$rootScope', 'AjaxService', '$mdDialog', function($scope, $rootScope, AjaxService, $mdDialog) {
    
    $scope.user = $rootScope.temp.user;
    
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    
    $scope.save = function() {
    	$scope.errorMessage = false
        if($scope.user.password != $scope.user.confirmPassword) {
            $scope.errorMessage = true;
        } else {
            AjaxService.call('users', 'POST', $scope.user).success(function(data, status, headers, config) {
            	$mdDialog.cancel();
            });
        }
    };
} ]);