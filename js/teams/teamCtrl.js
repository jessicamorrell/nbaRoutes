var app = angular.module('nbaRoutes');
// the resolved data from the router needs to be injected into the controller
app.controller('teamCtrl', function ($scope, $stateParams, teamService, teamData) {
	$scope.teamData = teamData;
	console.log($scope.teamData)
	$scope.newGame = {};
	$scope.showNewGameForm = false;
	$scope.toggleNewGameForm = function(showNewGameForm) {
		if (showNewGameForm === false)  {
			$scope.showNewGameForm = true;
		}
		else {
			$scope.showNewGameForm = false;
		}
	}
	if ($stateParams.team === 'utahjazz') {
		$scope.homeTeam = teamService.getTeamData('utahjazz');
		$scope.logoPath = 'images/jazz-logo.png';
	} else if ($stateParams.team === 'losangeleslakers') {
		$scope.homeTeam = teamService.getTeamData('losangeleslakers')
		$scope.logoPath = 'images/lakers-logo.png'
	} else if ($stateParams.team === 'miamiheat') {
		$scope.homeTeam = teamService.getTeamData('miamiheat')
		$scope.logoPath = 'images/heat-logo.png'
	}
	$scope.submitGame = function() {
		$scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase()
		teamService.addNewGame($scope.newGame)
		.then(function(data) {
			teamService.getTeamData($scope.newGame.homeTeam)
		})
		.then(function(data) {
			$scope.teamData = data;
			$scope.newGame = {};
			$scope.showNewGameForm = false;
		})
	}
});
