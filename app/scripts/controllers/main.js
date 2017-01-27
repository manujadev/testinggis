'use strict';

//var handler = require('leaflet-path-drag');
/**
 * @ngdoc function
 * @name myproj01App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the myproj01App
 */
angular.module('myproj01App')
    .controller('MainCtrl', ['$scope',
        function($scope) {

            $scope.layerType = "";
            $scope.drawnGeoJSON = null;
            $scope.layerMarker = "";
            $scope.currentLayer = null;
            // create a map in the "map" div, set the view to a given place and zoom

                //----------------------- Add layers - START -----------------------
                var littleton = L.marker([39.61, -105.02]).bindPopup('This is Littleton, CO.'),
                    denver    = L.marker([39.74, -104.99]).bindPopup('This is Denver, CO.'),
                    aurora    = L.marker([39.73, -104.8]).bindPopup('This is Aurora, CO.'),
                    golden    = L.marker([39.77, -105.23]).bindPopup('This is Golden, CO.');

                var cities = L.layerGroup([littleton, denver, aurora, golden]);

                var grayscale = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {id: 'light', attribution: 'Layer1'}),
                    streets   = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_nolabels/{z}/{x}/{y}.png', {id: 'dark', attribution: 'Layer2'});

                var wmsLayer = L.tileLayer.wms('http://demo.opengeo.org/geoserver/ows?', {
                        layers: 'nasa:bluemarble',
                        attribution: 'Test <a href="http://google.com">Link</a>"'
                    });

                var p1 = L.point(10, 10),
                    p2 = L.point(40, 60);

                var map = L.map('map', {
                    center: [39.73, -104.99],
                    zoom: 10,
                    layers: [grayscale, cities]
                });

                map.setMaxBounds([[30, -115], [50, -90]]);

                var baseMaps = {
                    "Grayscale": grayscale,
                    "Streets": streets
                };

                var overlayMaps = {
                    "Cities": cities,
                    "WMS": wmsLayer
                };

                L.control.layers(baseMaps, overlayMaps).addTo(map);

                //----------------------- Add layers - END -----------------------


            //var map = L.map('map').setView([51.505, -0.09], 13);
            $scope.map = map;
            // add an OpenStreetMap tile layer
            var tileLayer = L.tileLayer('https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_nolabels/{z}/{x}/{y}.png', {
                id: 'light',
                attribution: 'Layer1'
            });

            tileLayer.addTo(map);

            tileLayer.on("load", function() {
                //console.log("all visible tiles have been loaded");
                alert("all visible tiles have been loaded");
            });

            // Initialise the FeatureGroup to store editable layers
            var drawnItems = new L.FeatureGroup();
            //drawnItems.on('click', function() { alert('Clicked on a group!'); })

            map.addLayer(drawnItems);

            // Initialise the draw control and pass it the FeatureGroup of editable layers
            var drawControl = new L.Control.Draw({
                draw: {
                    polyline: false,
                    marker: false,
                    polygon: {
                        showArea: true,
                        allowIntersection: false,
                        drawError: {
                            color: '#b00b00', // Color the shape will turn when intersects
                            message: '<strong>Error:</strong> shape edges cannot cross!' // Message that will show when intersect
                        },
                        shapeOptions: {
                            color: '#008ce3',
                            weight: 2,
                            draggable: true,
                            allowIntersection: false
                        }
                    }
                },
                edit: {
                    featureGroup: drawnItems,
                    moveMarkers: false
                }
            });

            map.addControl(drawControl);

            map.on('draw:drawstart', function() {
                // Remove previously created layers
                drawnItems.clearLayers();
            });

            map.on('draw:created', function(e) {
                var type = e.layerType,
                    layer = e.layer;
                $scope.layerMarker = type;
                $scope.currentLayer = layer;
                if (type === 'marker') {
                    layer.bindPopup('A popup!');
                }

                drawnItems.addLayer(layer);

                console.log("Draw created");

                // Get the GeoJSON of the created polygon 
                $scope.drawnGeoJSON = drawnItems.toGeoJSON();

                if(type === 'circle')
                {
                    var circleRadious = layer.getRadius();
                    $scope.drawnGeoJSON.features[0].properties.radious = circleRadious;
                }

                var drawnFeaturesString = JSON.stringify($scope.drawnGeoJSON);

                $scope.layerType = drawnFeaturesString;
                $scope.updateDrawnInfoPanel(drawnFeaturesString);

            });

            $scope.updateDrawnInfoPanel = function(drawnFeaturesString) {
                $scope.layerType = drawnFeaturesString;
                $scope.$apply();
            };


            $scope.loadGeoJSON = function(geoJSON){
                //var geoJSONFeature = '{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.0885772705078125,51.52038666343198],[-0.1153564453125,51.5091698216777],[-0.10110855102539062,51.48116908486722],[-0.055789947509765625,51.49260657816879],[-0.08806228637695311,51.5007286626542],[-0.045318603515625,51.52241608253253],[-0.0885772705078125,51.52038666343198]]]}}'
                //console.log(geoJSONFeature);
                //var myLayer = L.geoJson('{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"type":"Polygon","coordinates":[[[-0.10746002197265625,51.522095653950174],[-0.11724472045898438,51.5023315346337],[-0.11861801147460938,51.490041408695205],[-0.08651733398437499,51.489720752362466],[-0.07553100585937499,51.503400084633526],[-0.076904296875,51.51611390655047],[-0.10007858276367188,51.50051494213075],[-0.08153915405273438,51.521134354675056],[-0.09904861450195311,51.52668824818813],[-0.10746002197265625,51.522095653950174]]]}}]}').addTo($scope.map);

                console.log($scope.drawnGeoJSON);
                console.log('Layer Type',$scope.layerMarker);
                if($scope.layerMarker === 'circle'){
                    //drawnItems.clearLayers();
                    console.log('Circle coordinates',$scope.drawnGeoJSON.features[0].geometry.coordinates);
                    console.log('Circle radius', $scope.currentLayer.getRadius());
                    var radious = $scope.currentLayer.getRadius();
                    var coordinates = $scope.drawnGeoJSON.features[0].geometry.coordinates;

                    drawnItems.clearLayers();
                    var circleLayer = L.circle([coordinates[1], coordinates[0]], radious)//.addTo($scope.map);
                        circleLayer.editing.enable();
                    console.log('GeoJSON of circle drawn', circleLayer.toGeoJSON());
                    circleLayer.addTo(drawnItems);
                }
                else{
                    drawnItems.clearLayers();
                    var myLayer = L.geoJson($scope.drawnGeoJSON) //.addTo($scope.map)
                    myLayer.editing.enable();
                    myLayer.addTo(drawnItems);
                }
            };

            $scope.generatePDF = function () {
                 var mapPane = $(".leaflet-map-pane")[0];
                var mapTransform = mapPane.style.transform.replace("translate3d(", "").split(",");
                var mapX = parseFloat(mapTransform[0].replace("px", ""));
                var mapY = parseFloat(mapTransform[1].replace("px", ""));
                mapPane.style.transform = "translate3d(0px,0px,0px)";

                var myTiles = $("img.leaflet-tile");
                var tilesLeft = [];
                var tilesTop = [];
                for (var i = 0; i < myTiles.length; i++) {
                    tilesLeft.push(parseFloat(myTiles[i].style.left.replace("px", "")));
                    tilesTop.push(parseFloat(myTiles[i].style.top.replace("px", "")));
                    myTiles[i].style.left = (tilesLeft[i] + mapX) + "px";
                    myTiles[i].style.top = (tilesTop[i] + mapY) + "px";
                }

                var myDivicons = $(".myDivicon");
                var dx = [];
                var dy = [];
                var mLeft = [];
                var mTop = [];
                for (var i = 0; i < myDivicons.length; i++) {
                    mLeft.push(parseFloat(myDivicons[i].style.marginLeft.replace("px", "")));
                    mTop.push(parseFloat(myDivicons[i].style.marginTop.replace("px", "")));
                    var curTransform = myDivicons[i].style.transform;
                    var splitTransform = curTransform.replace("translate3d(", "").split(",");
                    dx.push(parseFloat(splitTransform[0].replace("px", "")));
                    dy.push(parseFloat(splitTransform[1].replace("px", "")));
                    myDivicons[i].style.transform = "translate3d(" + (dx[i] + mLeft[i] + mapX) + "px, " + (dy[i] + mTop[i] + mapY) + "px, 0px)";
                    myDivicons[i].style.marginLeft = "0px";
                    myDivicons[i].style.marginTop = "0px";
                }

                var linesLayer = $("svg.leaflet-zoom-animated")[0];
                var linesTransform = linesLayer.style.transform.replace("translate3d(", "").split(",");
                var linesX = parseFloat(linesTransform[0].replace("px", ""));
                var linesY = parseFloat(linesTransform[1].replace("px", ""));
                linesLayer.style.transform = "translate3d(" + ((linesX + mapX) / 2) + "px," + ((linesY + mapY) / 2) + "px, 0px)";

                html2canvas(document.getElementById("map"), {
                    useCORS: true,
                    onrendered: function (canvas) {
                        document.body.appendChild(canvas);

                    }
                });        
            };
        }
    ]);