angular.module('myproj01App')
    .controller('CartoNamedMapsController', ['$scope',
        function($scope) {

		var map1 = L.map('mapcarto', { 
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
	    user_name: 'tenant-1',
	    type: 'namedmap',
	    named_map: {
	      name: "namedmap_tutorial_open",
	      layers: [{
	        layer_name: "t",
	        interactivity: "cartodb_id"
	       }]
	     }
	    }/*,
	    {https: true  HTTPS is needed for named maps with auth tokens}*/)
	    .addTo(map1)
	    .done(function(layer) {
				console.log(layer);
				console.log('SubLayer', layer.getSubLayer(0));
				// layer.setAuthToken('world_box_one');
				layer.getSubLayer(0).setInteraction(true);

				// on mouseover
				layer.getSubLayer(0).on('featureOver', function(e, pos, pixel, data) {
					// print data to console log
					console.log("Event #" + data.cartodb_id + ", Place: " + data.name + ", Name: " + data.clname);
				});

				// show infowindows on click
				cdb.vis.Vis.addInfowindow(map1, layer.getSubLayer(0), ['cartodb_id','name', 'clname']);
	    });
}]);        	