'use strict';

/**
 * @ngdoc function
 * @name myproj01App.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the myproj01App
 */
angular.module('myproj01App')
  .controller('AboutCtrl', ['$scope', '$q', '$http', function ($scope, $q, $http) {

  	$scope.zoneCodeSearced = '';
  	$scope.overlayUrl = '';

	$scope.getZoneClauseData = function() {
		  var deferred = $q.defer();

	   $http.get('../../resources/Planning_Scheme_Code_Lookup.json')
	   .success(function(response) {
	  		if (response && response.length > 0) {
					deferred.resolve(response);
				}
				else {
					deferred.resolve(null)
				}
			});
	   return deferred.promise;
	};

	$scope.generateZoneHeadUrl =  function(zoneCodeSearced)
	{
			var clauseValue = ''
			var cleanedZoneCodeSearched = zoneCodeSearced.replace(/\d+$/, ""); // Remove trailing numbers
			$q
	         .when($scope.getZoneClauseData(zoneCodeSearced))
	         .then (function (data) {
	         	console.log('Data returned', data);

				_.forEach(data, function(zoneRow){
					//console.log(zoneRow.CODE);
						if(zoneRow.CODE === zoneCodeSearced) {
							clauseValue = zoneRow.CLAUSE;
						}
				})

				if(clauseValue !== "")
					$scope.overlayUrl = 'http://planningschemes.dpcd.vic.gov.au/schemes/vpps/' + clauseValue + '.pdf';
				else
					$scope.overlayUrl = "Zone code not found";
	         });
	};



	$scope.generateZoneScheduleUrl =  function (municipalitySearched, zoneCodeSearced) {
		var scheduleUrl = '';
		$http.get('../../resources/Planning_Scheme_Name_Lookup.json')
		.success(function(response) {
			 var planningSchemeMunicipality = '',
			 	 planningSchemeMunicipalityShortened = '',
			 	 clauseValue = '',
			 	 zoneSuffixNumber = '';


			_.forEach(response, function(municipalityRow) {
				//console.log(zoneRow.CODE);
				if(municipalityRow.Onemap_Planning_Scheme_Name === municipalitySearched) {
					planningSchemeMunicipality = municipalityRow.Gov_Planning_Scheme_Name;
					planningSchemeMunicipalityShortened = municipalityRow.UrlCode_Planning_Scheme_Name;
				}
			});

			console.log('planningSchemeMunicipality', planningSchemeMunicipality);
			console.log('planningSchemeMunicipalityShortened', planningSchemeMunicipalityShortened);

			var zoneCleanedAfterHyphen = zoneCodeSearced.substr(0, (zoneCodeSearced.indexOf('-') > -1 ? zoneCodeSearced.indexOf('-') : zoneCodeSearced.length))

			zoneSuffixNumber = getTwoDigitZoneSuffix(getTrailingDigits(zoneCleanedAfterHyphen));

			var cleanedZoneCodeSearched = zoneCleanedAfterHyphen.replace(/\d+$/, ""); // Remove trailing numbers
				$q
	         .when($scope.getZoneClauseData())
	         .then (function (data) {
				_.forEach(data, function(zoneRow) {
					if(zoneRow.CODE === cleanedZoneCodeSearched) {
						clauseValue = zoneRow.CLAUSE;
					}
				})
			
				console.log('clauseValue', clauseValue);
				scheduleUrl = 'http://planningschemes.dpcd.vic.gov.au/schemes/' + planningSchemeMunicipality + '/ordinance/' + clauseValue + 's' + zoneSuffixNumber + '_' + planningSchemeMunicipalityShortened + '.pdf';
				console.log(scheduleUrl);

	        });
		});
	};

	var getTrailingDigits = function(zoneCode){
		var numberReturned = '';
		 var match = zoneCode.match(/\d+$/);
		 if(match)
		     numberReturned = match[0];

		console.log(numberReturned);
		return numberReturned;
	};

	var getTwoDigitZoneSuffix = function (zoneSuffixNumber) {
		if(parseInt(zoneSuffixNumber))
    		return zoneSuffixNumber > 9 ? '' + zoneSuffixNumber : '0' + zoneSuffixNumber;
    	else
    		return '';
	};

	$scope.generateZoneScheduleUrl('HUME', 'CA');
	$scope.generateZoneScheduleUrl('BOROONDARA', 'C2Z');
	$scope.generateZoneScheduleUrl('MELBOURNE', 'C2Z');
	$scope.generateZoneScheduleUrl('BANYULE', 'DDO11-1');
	$scope.generateZoneScheduleUrl('MAROONDAH', 'HO1');
	getTrailingDigits('C5A12');
	getTrailingDigits('CA1');


}]);



