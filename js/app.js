var app = angular.module('nbaRoutes', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    // routing configuration code
    $stateProvider
    	.state('home', {
    		url: '/',
    		controller: 'homeCtrl',
    		templateUrl: 'js/home/homeTmpl.html'
    	})
    	.state('teams', {
    		url: '/teams/:team',
    		controller: 'teamCtrl',
    		templateUrl: 'js/teams/teamTmpl.html',
    		resolve: {
    			teamData: function(teamService, $stateParams) {
    				return teamService.getTeamData($stateParams.team);
    			}
    		}
    	})
    $urlRouterProvider
    	.otherwise('/');
});
