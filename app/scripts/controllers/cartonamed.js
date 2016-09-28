angular.module('myproj01App')
    .controller('CartoNamedMapsController', ['$scope',
        function($scope) {

	var map = L.map('mapcarto', { 
	    scrollWheelZoom: true,
	    center: [-37.810433, 144.970944],
	    zoomControl: true,
	    zoom: 12
	   });

	// add a base layer
	  L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
	    attribution: 'CARTO'
	  }).addTo(map);

	// add CARTO layer with one sublayer
	  cartodb.createLayer(map, {
	    user_name: 'tenant-1',
	    type: 'namedmap',
	    named_map: {
	      name: "namedmap_tutorial",
	      layers: [{
	        layer_name: "t",
	        interactivity: "cartodb_id, name, clname"
	       }]
	     }
	    })
	    .addTo(map)
	    .done(function(layer) {
	      layer.getSubLayer(0).setInteraction(true);

	      // on mouseover
	      layer.getSubLayer(0).on('featureOver', function(e, pos, pixel, data) {
	        // print data to console log
	        console.log("Event #" + data.cartodb_id + ", name " + data.name + ", max population: " + data.clname);
	      });
	 
	      // show infowindows on click
	      cdb.vis.Vis.addInfowindow(map, layer.getSubLayer(0), ['cartodb_id','name', 'clname']);
	    });
}]);        	