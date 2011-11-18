 /*!
 * jQuery Bing Map 0.1
 * http://jquery-bing-maps.googlecode.com
 * Copyright (c) 2010 - 2011 Johan Säll Larsson
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 */
( function($) {
	
	/**
	 * This is how you write unmaintainable code :) - the size is small though.
	 * @param namespace:string
	 * @param name:string
	 * @param base:object
	 */
	$.a = function( a, b, c ) {
		var d = [];
		$[a] = $[a] || {};
		$[a][b] = function(options, element) {
			if ( arguments.length ) {
				this._s(options, element);
			}
		};
		$[a][b].prototype = c;
		$.fn[b] = function(options) {
			var id = this.attr('id');
			if ( d[id] && d[id][options] ) {
				return d[id][options].apply(d[id], Array.prototype.slice.call(arguments, 1));
			} else if ( typeof options === 'object' || ! options ) {
				d[id] = new $[a][b](options, this);
				return this;
			}  
		};
	};
	
	$.a("ui", "gmap", {
		
		/**
		 * Map options
		 * @see http://msdn.microsoft.com/en-us/library/gg427603.aspx
		 */
		options: { 'center': (Microsoft) ? new Microsoft.Maps.Location(0.0, 0.0) : null, 'zoom': 5	},
		
		/**
		 * Get or set options
		 * @param key:string
		 * @param options:object
		 */
		option: function(a, b) {
			if (!b) {
				return this.options[a];
			} else {
				this._u(a, b);
			}
		},
		
		/**
		 * Setup plugin basics, 
		 * Set the jQuery UI Widget this.element, so extensions will work on both plugins
		 */
		_s: function( a, b ) {
			this.id = b.attr('id');
			this.instances = [];
			this.element = b;
			this.options = jQuery.extend(this.options, a);
			this._create();
			if ( this._init ) {
				this._init();
			}
		},
		
		/**
		 * Create
		 * @return $(Microsoft.Maps.Map)
		 */
		_create: function() {
			this.options.center = this._latLng(this.options.center);
			var a = this.element;
			var b = this.instances[this.id] = { map: new Microsoft.Maps.Map( a[0], this.options ), markers: [], services: [], overlays: [] };
			this._call(this.options.callback, b.map, this);
			setTimeout( function() { a.trigger('init', b.map); }, 1);
			return $(b.map);
		},
		
		/**
		 * Set map options
		 * @param key:string
		 * @param value:object
		 */
		_u: function(a, b) {
			var c = this.get('map');
			this.options[a] = b;
			jQuery.extend(this.options, { 'center': c.getCenter(), 'mapTypeId': c.getMapTypeId(), 'zoom': c.getZoom() } );
			c.setOptions(this.options);
		},
		
		/**
		 * Adds a latitude longitude pair to the bounds.
		 * @param Microsoft.Maps.Location/string
		 */
		addBounds: function(a) {
			this.get('bounds', []).push(this._latLng(a));
			if ( this.get('bounds').length > 1 ) {
				this.get('map').setView({ 'bounds': Microsoft.Maps.LocationRect.fromLocations(this.get('bounds'))});
			} else {
				this.get('map').setView({ 'zoom': this.get('map').getZoomRange().max, 'center': this.get('bounds')[0] })
			}
		},
		
		/**
		 * Adds a custom control to the map
		 * @param panel:jquery/node/string	
		 * @param position:int	 
		 */
		addControl: function(a, b) {
			var node = $(this._unwrap(a));
			var map = this.get('map');
			var css = {'position': 'absolute', 'z-index': 99999 };
			if ( b < 3 ) {
				css.top = 0;
			} else if ( b > 2 && b < 6 ) {
				css.top = ( map.getHeight() - node.height() ) / 2;
			} else if ( b > 5 ) {
				css.bottom = 0;
			}
			if ( b == 0 || b == 3 || b == 6 ) {
				css.left = 0;
			} else if ( b == 1 || b == 4 || b == 7 ) {
				css.left = ( map.getWidth() - node.width() ) / 2;
			} else if ( b == 2 || b == 5 || b == 8 ) {
				css.right = 0;
			}
			node.css(css);
			this.element[0].appendChild(node[0]);
			return node;
		},
		
		/**
		 * Adds a Marker to the map
		 * @param pushpinOptions:Microsoft.Maps.PushpinOptions (optional)
		 * @param callback:function(Microsoft.Maps.Map, Microsoft.Maps.Pushpin) (optional)
		 * @param Pushpin:Microsoft.Maps.Pushpin (optional)
		 * @return $(Microsoft.Maps.Pushpin)
		 * @see http://msdn.microsoft.com/en-us/library/gg427629.aspx
		 */
		addMarker: function(a, b, c) {
			var d = this.get('map');
			var c = c || Microsoft.Maps.Pushpin;
			a = (this._convert) ? this._convert('addMarker', a) : a;
			a.location = this._latLng(a.location);
			var e = new c(a.location, a);
			for ( prop in a ) {
				e[prop] = a[prop];
			}
			var f = this.get('markers', []);
			if ( e.getId() ) {
				f[e.getId()] = e;
			} else {
				f.push(e);
			}
			if ( a.bounds ) {
				this.addBounds(e.getLocation());
			}
			d.entities.push(e);
			this._call(b, d, e);
			return $(e);
		},
		
		/**
		 * Adds an Infobox to the map
		 * @param infoboxOptions:Microsoft.Maps.InfoboxOptions
		 * @param pushpin:Microsoft.Maps.Pushpin
		 * @param callback:function(Microsoft.Maps.Infobox) (optional)
		 * @return $(Microsoft.Maps.Infobox)
		 * @see http://msdn.microsoft.com/en-us/library/gg675210.aspx
		 */
		addInfoWindow: function(a, b, c) {
			var d = new Microsoft.Maps.Infobox(b.getLocation(), a); 
			this.get('map > entities').push(d);
			this._call(c, d);
			return $(d);
		},
		
		/**
		 * Triggers an InfoWindow to open
		 * @param infoboxOptions:Microsoft.Maps.InfoboxOptions
		 * @param pushpin:Microsoft.Maps.Pushpin (optional)
		 * @see http://msdn.microsoft.com/en-us/library/gg675210.aspx
		 */
		openInfoWindow: function(a, b) {
			var self = this;
			a.offset = a.offset || new Microsoft.Maps.Point(0,15);
			a.zIndex = a.zIndex || 99999;
			a = (this._convert) ? this._convert('openInfoWindow', a) : a;
			var b = self._unwrap(b);
			if ( b == null ) {
				c = a.location;
			} else if ( b instanceof Microsoft.Maps.Pushpin ) {
				c = b.getLocation();
			} else {
				c = b.target.getLocation();
			}
			
			if ( this.get('iw') != null && this.get('map > entities').indexOf(this.get('iw')) > -1 ) {
				this.get('map > entities').remove(this.get('iw'));
			} 

			if (a.htmlContent) {
				if ( a.htmlContent instanceof Object ) {
					a.htmlContent = '<div class="Infobox">'+a.htmlContent.innerHTML+'</div>';
				} else {
					if ( a.htmlContent.match(RegExp(/<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/)) == null ) {
						a.description = a.htmlContent;
					}
				}
			}

			this.set('iw', new Microsoft.Maps.Infobox(c, a));
			this.get('map > entities').push(this.get('iw'));
			self.get('map').setView({'center': c});
		},
		
		/**
		 * Clears by type
		 * @param type:string i.e. markers, overlays, services
		 */
		clear: function(a) {
			this._c(this.get(a));
			this.set(a, []);
		},
		
		_c: function(a) {
			for ( b in a ) {
				if ( a[b] instanceof Microsoft.Maps.Pushpin || a[b] instanceof Microsoft.Maps.Infobox || a[b] instanceof Microsoft.Maps.Map ) {
					Microsoft.Maps.Events.removeHandler(a[b]);
					this.get('map > entities').remove(a[b]);
				} else if ( a[b] instanceof Array ) {
					this._c(a[b]);
				}
				a[b] = null;
			}
		},
		
		/**
		 * Returns the marker(s) with a specific property and value, e.g. 'category', 'tags'
		 * @param property:string the property to search within
		 * @param value:string
		 * @param delimiter:string/boolean	a delimiter if it's multi-valued otherwise false
		 * @param callback:function(marker:google.maps.Marker, isFound:boolean)
		 */
		findMarker: function(a, b, c, d) {
			var e = this.get('markers');
			for ( f in e ) {
				var g = ( c && e[f][a] ) ? ( e[f][a].split(c).indexOf(b) > -1 ) : ( e[f][a] === b );
				this._call(d, e[f], g);
			};
		},
		
		/**
		 * Loads the specified registered module, making its functionality available. An optional function can be specified that is called when the module is loaded.
		 * The following Bing Maps modules are available: Microsoft.Maps.Directions, Microsoft.Maps.Traffic, Microsoft.Maps.VenueMaps 
		 * @param key:string
		 * @param callback:function(?) (optional)
		 * @param callback:function() (optional) - if the module is loaded
		 */
		load: function(a, b, c) {
            if ( !Microsoft.Maps.moduleLoaded(a) ) {
				Microsoft.Maps.loadModule(a, b);
			} else {
				if (c) { c(); }
			}
		},
		
		/**
		 * Registers a module with the map control. The name of the module is specified in key, the module script is defined in scriptUrl, and the options provides the location of a *.css file to load with the module.
		 * Once you have registered a module, you can make its functionality available by loading it using load. 
		 * @param key:string
		 * @param url:string
		 * @param options:{styleURLs} (optional)
		 */
		register: function(a, b, c) {
			Microsoft.Maps.registerModule(a, b, c);
		},

		/**
		 * Returns an instance property by key. Has the ability to set an object if the property does not exist
		 * @param key:string
		 * @param value:object(optional)
		 */
		get: function(a, b) {
			var c = this.instances[this.id];
			if (!c[a]) {
				if ( a.indexOf('>') > -1 ) {
					var e = a.replace(/ /g, '').split('>');
					for ( var i = 0; i < e.length; i++ ) {
						if ( !c[e[i]] ) {
							if (b) {
								c[e[i]] = ( (i + 1) < e.length ) ? [] : b;
							} else {
								return null;
							}
						}
						c = c[e[i]];
					}
					return c;
				} else if ( b && !c[a] ) {
					this.set(a, b);
				}
			}
			return c[a];
		},
		
		/**
		 * Sets an instance property
		 * @param key:string
		 * @param value:object
		 */
		set: function(a, b) {
			this.instances[this.id][a] = b;
		},
		
		/**
		 * Destroys the plugin.
		 */
		destroy: function() {
			this.clear('markers');
			this.clear('services');
			this.clear('overlays'); 
			var a = this.instances[this.id];
			a.map.dispose();
			for ( b in a ) {
				a[b] = null;
			}
		},
		
		/**
		 * Helper method for calling a function
		 * @param callback
		 */
		_call: function(a) {
			if ( $.isFunction(a) ) {
				a.apply(this, Array.prototype.slice.call(arguments, 1));
			}
		},
		
		/**
		 * Helper method for Microsoft.Maps.Location
		 * @param callback
		 */
		_latLng: function(a) {
			if ( a instanceof Microsoft.Maps.Location ) {
				return a;
			} else {
				var b = a.replace(/ /g,'').split(',');
				return new Microsoft.Maps.Location(b[0], b[1]);
			}
		},
		
		/**
		 * Helper method for unwrapping jQuery/DOM/string elements
		 * @param callback
		 */
		_unwrap: function(a) {
			if ( !a ) {
				return null;
			} else if ( a instanceof jQuery ) {
				return a[0];
			} else if ( a instanceof Object ) {
				return a;
			}
			return $('#'+a)[0];
		}
		
	});
	
	jQuery.fn.extend( {
		
		click: function(a) { 
			return this.addEventListener('click', a);
		},
		
		rightclick: function(a) {
			return this.addEventListener('rightclick', a);
		},
		
		dblclick: function(a) {
			return this.addEventListener('dblclick', a);
		},
		
		mouseover: function(a) {
			return this.addEventListener('mouseover', a);
		},
		
		mouseout: function(a) {
			return this.addEventListener('mouseout', a);
		},
		
		drag: function(a) {
			return this.addEventListener('drag', a );
		},
		
		dragend: function(a) {
			return this.addEventListener('dragend', a );
		},
		
		triggerEvent: function(a) {
			Microsoft.Maps.Events.invoke(this[0], a);		
		},

		addEventListener: function(a, b) {
			if ( this[0] instanceof Microsoft.Maps.Pushpin || this[0] instanceof Microsoft.Maps.Infobox || this[0] instanceof Microsoft.Maps.Map ) {
				Microsoft.Maps.Events.addHandler(this[0], a, b);
			} else {
				this.bind(a, b);	
			}
			return this;
		}
		
	});
	
} (jQuery) );