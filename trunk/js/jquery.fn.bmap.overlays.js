 /*!
 * jQuery Bing Map 0.1
 * http://jquery-bing-maps.googlecode.com
 * Copyright (c) 2010 - 2011 Johan Säll Larsson
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 *
 * Depends:
 *      jquery.ui.map.js
 */
( function($) {

	$.extend($.ui.gmap.prototype, {
		
		/**
		 * Adds a shape to the map
		 * @param type:string Polygon, Polyline, Rectangle, Circle
		 * @param options:object
		 * @return object
		 */
		addShape: function(a, b) {
			return $(this.get('overlays > ' + a, []).push(new google.maps[a](jQuery.extend({'map': this.get('map')}, b))));
		},
	
	});
	
} (jQuery) );