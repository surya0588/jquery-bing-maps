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

	$.extend($.ui.gmap.prototype, {
		 
		/**
		 * Gets the current position
		 * @param callback:function(position, status)
		 * @param geoPositionOptions:object, see https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIDOMGeoPositionOptions
		 */
		getCurrentPosition: function(a, b) {
			var c = this;
			if ( navigator.geolocation ) {
				navigator.geolocation.getCurrentPosition ( 
					function(d) {
						c._call(a, d, "OK");
					}, 
					function(error) {
						c._call(a, null, error);
					}, 
					b 
				);	
			} else {
				c._call(a, null, "NOT_SUPPORTED");
			}
		},
		
		/**
		 * Watches current position
		 * To clear watch, call navigator.geolocation.clearWatch(this.get('watch'));
		 * @param callback:function(position, status)
		 * @param geoPositionOptions:object, see https://developer.mozilla.org/en/XPCOM_Interface_Reference/nsIDOMGeoPositionOptions
		 */
		watchPosition: function(a, b) {
			var c = this;
			if ( navigator.geolocation ) {
				this.set('watch', navigator.geolocation.watchPosition ( 
					function(d) {
						c._call(a, d, "OK");
					}, 
					function(error) {
						c._call(a, null, error);
					}, 
					b 
				));	
			} else {
				c._call(a, null, "NOT_SUPPORTED");
			}
		},

		/**
		 * Clears any watches
		 */
		clearWatch: function() {
			if ( navigator.geolocation ) {
				navigator.geolocation.clearWatch(this.get('watch'));
			}
		},
		
		/**
		 * Autocomplete using Google Geocoder
		 * @param panel:string/node/jquery
		 * @param callback:function(results, status)
		 */
		autocomplete: function(a, b) {
			var self = this;
			$(this._unwrap(a)).autocomplete({
				source: function( request, response ) {
					self.search({'address':request.term}, function(results, status) {
						if ( status === 'OK' ) {
							response( $.map( results, function(item) {
								return { label: item.formatted_address, value: item.formatted_address, position: item.geometry.location }
							}));
						} else if ( status === 'OVER_QUERY_LIMIT' ) {
							alert('Google said it\'s too much!');
						}
					});
				},
				minLength: 3,
				select: function(event, ui) { 
					self._call(b, ui);
				},
				open: function() { $( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" ); },
				close: function() { $( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" ); }
			});
		},
		
		/**
		 * Page through the markers. Very simple version.
		 * @param prop:the marker property to show in display, defaults to title
		 */
		pagination: function(prop) {
			var $el = $("<div id='pagination' class='pagination shadow gradient rounded clearfix'><div class='lt btn back-btn'></div><div class='lt display'></div><div class='rt btn fwd-btn'></div></div>");
			var self = this, i = 0, prop = prop || 'title';
			self.set('p_nav', function(a, b) {
				if (a) {
					i = i + b;
					$el.find('.display').text(self.get('markers')[i][prop]);
					self.get('map').setView({'center': self.get('markers')[i].getLocation()});
				}
			});
			self.get('p_nav')(true, 0);
			$el.find('.back-btn').click(function() {
				self.get('p_nav')((i > 0), -1, this);
			});
			$el.find('.fwd-btn').click(function() {
				self.get('p_nav')((i < self.get('markers').length - 1), 1, this);
			});
			self.addControl($el, 0);			
		}
	
	});
	
} (jQuery) );