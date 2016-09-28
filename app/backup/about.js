'use strict';

/**
 * @ngdoc function
 * @name myproj01App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myproj01App
 */
angular.module('myproj01App')
  .controller('AboutCtrl', ['$scope', function ($scope) {

  	$scope.zoneCodeSearced = '';
  		//zoneCodeLookupData = JSON.parse(zoneCodeLookupData);
  	//console.log($scope.zoneCodeLookupData);

  	$scope.overlayUrl = '';

	$scope.generateZoneHeadUrl =  function(zoneCodeSearced)
	{
	  	console.log('Value searched',zoneCodeSearced);
	  	$.getJSON('../../resources/Planning_Scheme_Code_Lookup.json', function(response) {

	  		var cleanedZoneCodeSearched = zoneCodeSearced.replace(/\d+$/, ""); // Remove trailing numbers
	  		console.log('Value searched', cleanedZoneCodeSearched);
	  		var clauseValue = '';
			_.forEach(response, function(zoneRow){
				//console.log(zoneRow.CODE);
				if(zoneRow.CODE === cleanedZoneCodeSearched) {
					clauseValue = zoneRow.CLAUSE;
				}
			});

			if(clauseValue !== "")
				$scope.overlayUrl = 'http://planningschemes.dpcd.vic.gov.au/schemes/vpps/' + clauseValue + '.pdf';
			else
				$scope.overlayUrl = "Zone code not found";

			console.log($scope.overlayUrl);
			$scope.$apply();
		});
	};

	$scope.generateZoneScheduleUrl =  function(municipalitySearched, zoneCodeSearced) {

		$.getJSON('../../resources/Planning_Scheme_Name_Lookup.json', function(response) {
			 var planningSchemeMunicipality = '',
			 	 planningSchemeMunicipalityShortened = '';

			_.forEach(response, function(municipalityRow){
				//console.log(zoneRow.CODE);
				if(municipalityRow.Onemap_Planning_Scheme_Name === municipalitySearched) {
					planningSchemeMunicipality = municipalityRow.Gov_Planning_Scheme_Name;
					planningSchemeMunicipalityShortened = municipalityRow.UrlCode_Planning_Scheme_Name;
				}
			});

			console.log('planningSchemeMunicipality', planningSchemeMunicipality);
			console.log('planningSchemeMunicipalityShortened', planningSchemeMunicipalityShortened);
		});
	};

	$scope.generateZoneScheduleUrl('BAYSIDE');

  }]);



