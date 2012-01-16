 /*!
 * jQuery Bing Map 1.0
 * http://jquery-bing-maps.googlecode.com
 * Copyright (c) 2010 - 2012 Johan Säll Larsson
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Depends:
 *		jquery.ui.bmap.js
 */
( function($) {
	
	var GEOCODE_URL = 'http://dev.virtualearth.net/REST/v1/Locations/{0}?output=json&jsonp=?&key={1}';
	var DIRECTIONS_URL = 'http://dev.virtualearth.net/REST/v1/Routes?wp.0={0}&wp.1={1}&routePathOutput=Points&output=json&jsonp=?&key={2}';
	
	function _callback(a, b) {
		$.getJSON( a, function(c) {
			if ( c.authenticationResultCode === 'ValidCredentials' && c.resourceSets && c.resourceSets.length > 0 && c.resourceSets[0].estimatedTotal > 0 ) {
				b(c.resourceSets, 'OK');
			} else {
				b(null, 'ZERO_RESULTS');
			}
		}).error( function() { 
			b(null, 'ERROR'); 
		});
	}
	
	$.extend($.ui.gmap.prototype, {
		
		/**
		 * A service for converting between an address and a LatLng.
		 */
		search: function(a, b) {
			var q = ( typeof a.query === 'string' ) ? a.query : ( a.query.latitude + ','+ a.query.longitude );
			_callback( GEOCODE_URL.replace('{0}', q).replace('{1}', this.options.credentials), b);
		},
		
		/** 
		 * @param request:object (start, end)
		 * 
		 */
		loadDirections: function(a, b) {
			_callback( DIRECTIONS_URL.replace('{0}', a.start).replace('{1}', a.end).replace('{2}', this.options.credentials), b);
		},
		
		displayDirections: function(a, b, c) {
			var self =this;
			var d = function() {
				var d = self.get('services > DirectionsManager', new Microsoft.Maps.Directions.DirectionsManager(self.get('map')));
				d.resetDirections();
				directionsErrorEventObj = Microsoft.Maps.Events.addHandler(d, 'directionsError', function(arg) { alert(arg.message) });
				directionsUpdatedEventObj = Microsoft.Maps.Events.addHandler(d, 'directionsUpdated', function() { });
				d.setRequestOptions({ routeMode: Microsoft.Maps.Directions.RouteMode.driving });
				d.addWaypoint(new Microsoft.Maps.Directions.Waypoint(a));
				d.addWaypoint(new Microsoft.Maps.Directions.Waypoint(b));
				d.setRenderOptions(c);
				d.calculateDirections();
			}
			if ( !self.get('services > DirectionsManager') ) {
				Microsoft.Maps.loadModule('Microsoft.Maps.Directions', { callback: d });
			} else {
				d();
			}
		}

	
	});
	
} (jQuery) );