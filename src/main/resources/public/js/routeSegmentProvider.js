springDerbyApp.config(function($routeSegmentProvider, $routeProvider) {

    $routeSegmentProvider.options.autoLoadTemplates = true;

    $routeSegmentProvider.
    	when('/home', 'home').
    	when('/login', 'login').
    	when('/home/project1/web1', 'home.project1web1').
    	when('/home/project1/web2', 'home.project1web2').
    	when('/home/project2/web1', 'home.project2web1').
        when('/home/project2/web2', 'home.project2web2').
        when('/home/groups', 'home.groups').
        when('/home/users', 'home.users').
    	segment('home', {
	        templateUrl : 'home/tmpl.html',
	    }).segment('login', {
            templateUrl : 'login/tmpl.html',
        });

    $routeSegmentProvider.
	    within('home').
		    segment('default', {
		    	'default': true,
		        templateUrl : 'home/default.html'
		    });
    
    $routeSegmentProvider.
    within('home').
            segment('groups', {
                templateUrl : 'permissions/groups.html'
            }).
            segment('users', {
                templateUrl : 'permissions/users.html'
            });
    
    $routeSegmentProvider.
    within('home').
            segment('project1web1', {
                templateUrl : 'project1/web1.html'
            }).
            segment('project1web2', {
                templateUrl : 'project1/web2.html'
            });
    
    $routeSegmentProvider.
    within('home').
            segment('project2web1', {
                templateUrl : 'project2/web1.html'
            }).
            segment('project2web2', {
                templateUrl : 'project2/web2.html'
            });
    
    $routeProvider.otherwise({redirectTo: '/login'}); 
});