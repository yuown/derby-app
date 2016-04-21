springDerbyApp.config(function($routeSegmentProvider, $routeProvider) {

    $routeSegmentProvider.options.autoLoadTemplates = true;

    $routeSegmentProvider.
    	when('/home', 'home').
    	when('/login', 'login').
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
    
    $routeProvider.otherwise({redirectTo: '/login'}); 
});