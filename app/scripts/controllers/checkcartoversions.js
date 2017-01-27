'use strict';

angular.module('myproj01App')
    .controller('CheckCartoVersionsController', ['$scope',
        function($scope) {

		var map1 = L.map('mapcartoFishermensBend', { 
		    scrollWheelZoom: true,
		    center: [-37.810433, 144.970944],
		    zoomControl: true,
		    zoom: 12
		   });

	// add a base layer
	  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
	    attribution: 'Carto'
	  }).addTo(map1);

	// add CARTO layer with one sublayer
	  cartodb.createLayer(map1, {
	    user_name: 'mnatoli',
        maps_api_template: 'https://mnatoli.carto.com:443',
        sql_api_template: 'https://mnatoli.carto.com:443',	    
	    type: 'namedmap',
	    named_map: {
	      name: "context_plan_named",
	      layers: [{
	        layer_name: "t",
	        interactivity: "cartodb_id"
	       }]
	     }
	    },
	    { https: true })
	    .addTo(map1)
	    .done(function(layer) {
				console.log(layer);
				console.log('SubLayer', layer.getSubLayer(0));
				//layer.setAuthToken('klgy0lWurR');
				layer.setAuthToken('vdN8fKt3KI');
				
				layer.getSubLayer(0).setInteraction(true);

				// // on mouseover
				// layer.getSubLayer(0).on('featureOver', function(e, pos, pixel, data) {
				// 	// print data to console log
				// 	console.log("Event #" + data.cartodb_id + ", Place: " + data.name + ", Name: " + data.clname);
				// });

				// // show infowindows on click
				// cdb.vis.Vis.addInfowindow(map1, layer.getSubLayer(0), ['cartodb_id','name', 'clname']);
	    });
}]);        	