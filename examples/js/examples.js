	
	// Configuration
	window.demo = { 'credentials': 'Arkh4--7e-cy1ek_QH9oq3qerZut_jOPrR8h8C0Z69RKgE8aUuBe0inLrDWZvacw', 'url': 'jquery-bing-maps.googlecode.com', 'forum': 'http://groups.google.com/group/jquery-ui-map-discuss/feed/rss_v2_0_msgs.xml', 'subscribe': 'http://groups.google.com/group/jquery-ui-map-discuss/boxsubscribe', 'exception': 'Unable to load due to either poor internet connection or some CDN\'s aren\'t as responsive as we would like them to be. Try refreshing the page :D.', 'load': [] };
	window._gaq = [['_setAccount', 'UA-17614686-5'], ['_trackPageview'], ['_trackPageLoadTime']];
	
	// Exceptions
	if ( !window.jQuery || !window.Microsoft) {
	
		alert(demo.exception);
	
	} else {
	
		// Google Analytics
		Modernizr.load({ 'test': ( location.href.indexOf(demo.url) > -1 ), 'yep': '//www.google-analytics.com/ga.js' });
		
		// Forum posts
		ForumCollection = Backbone.Collection.extend({ 'url': 'http://ajax.googleapis.com/ajax/services/feed/load?v=1.0&callback=?&q='+ encodeURIComponent(demo.forum), 'parse': function(response) { return response.responseData.feed.entries; } });
		ForumPost = Backbone.View.extend({ 'tagName': 'li', 'className': 'group-item', 'template': _.template('<a href="<%=link%>"><%=title%></a></h3>'), 'render': function() { $(this.el).html(this.template(this.model.toJSON())); return this; } }); 
		Forum = Backbone.View.extend({ 'el': $("#forum"), 'initialize': function() { this.col = new ForumCollection(); this.col.bind('reset', this.load, this); this.col.fetch(); }, 'add': function(post) { var view = new ForumPost({'model': post}); $('#forum_posts').append(view.render().el); }, 'load': function () { this.col.each(this.add); $('#forum_subscribe').attr('action', demo.subscribe); $(this.el).show(); } });
		var app = new Forum();
		
		// Examples
		$(function() {
			/**
			 * Bing map constructor options:
			 * mapTypeId: Microsoft.Maps.MapTypeId.birdseye, 
			 * labelOverlay: Microsoft.Maps.LabelOverlay.hidden,
			 * enableClickableLogo: false,
			 * enableSearchLogo: false,
			 * showDashboard: true,
			 * showMapTypeSelector:false,
			 * showScalebar: false,
			 * useInertia: true,
			 * inertiaIntensity: 0.85,
			 * tileBuffer: 3,
			 * backgroundColor : new Microsoft.Maps.Color('ff4400'),
			 * disablePanning: false,
			 * disableZooming: false,
			 * labelOverlay: Microsoft.Maps.LabelOverlay.hidden,
			 * zoom: 8,
			 * showBreadcrumb: true,
			 * disableBirdseye: true 
			 */
			demo.load = {
				// Example 1, basic example
				'example_1': function() {
					$('#map_canvas').gmap({'credentials': demo.credentials, 'enableSearchLogo': false, 'showBreadcrumb': true, 'enableClickableLogo': false, 'showScalebar': false}).bind('init', function(ev, map) {
						$('#map_canvas').gmap('addMarker', { 'location': '57.7973333,12.0502107', 'bounds': true }).click( function() {
							$('#map_canvas').gmap('openInfoWindow', { 'title': 'Hello World!' }, this);
						});	
					});
				},
				// Example 2, filter by property
				'example_2': function() {
					$('#map_canvas').gmap({'credentials': demo.credentials, 'enableSearchLogo': false, 'showBreadcrumb': true, 'enableClickableLogo': false, 'showScalebar': false}).bind('init', function(event, map) { 	
						var bounds = map.getBounds();
						var southWest = bounds.getSoutheast();
						var northEast = bounds.getNorthwest();
						var lngSpan = northEast.longitude - southWest.longitude;
						var latSpan = northEast.latitude - southWest.latitude;
						var images = [ 'http://google-maps-icons.googlecode.com/files/friends.png', 'http://google-maps-icons.googlecode.com/files/home.png', 'http://google-maps-icons.googlecode.com/files/girlfriend.png', 'http://google-maps-icons.googlecode.com/files/dates.png', 'http://google-maps-icons.googlecode.com/files/realestate.png', 'http://google-maps-icons.googlecode.com/files/apartment.png', 'http://google-maps-icons.googlecode.com/files/family.png' ];
						var tags = [ 'jQuery', 'Google maps', 'Plugin', 'SEO', 'Reddit', 'Homer', 'Bart', 'Lisa', 'Marge', 'Maggie' ];
						$('#tags').append('<option value="all">All</option>');
						$.each(tags, function(i, tag) {
							$('#tags').append('<option value="'+ tag + '">' + tag + '</option>');
						});
						for ( i = 0; i < 50; i++ ) {
							var temp = [];
							for ( j = 0; j < Math.random()*5; j++ ) {
								temp.push(tags[Math.floor(Math.random()*10)]);
							}
							$('#map_canvas').gmap('addMarker', { 'id': 'm_'+i, 'icon': images[(Math.floor(Math.random()*7))], 'height': 37, 'width': 32, 'tags': temp.toString(), 'bounds':true, 'location': new Microsoft.Maps.Location(southWest.latitude + latSpan * Math.random(), southWest.longitude + lngSpan * Math.random()) }).click(function() {
								$('#map_canvas').gmap('openInfoWindow', { 'title': 'Tags', 'description': this.target.tags }, this);
							});
						}
						$('#map_canvas').gmap('addControl', 'filter_control', 2);
						$("#tags").change(function() {
							var tag = $(this).val();
							$('#map_canvas').gmap('set', 'bounds', null);
							if  ( $('#map_canvas').gmap('get', 'iw') != null ) {
								$('#map_canvas').gmap('get', 'iw').setOptions({'visible': false });
							}
							if ( tag == 'all' ) {
								$('#map_canvas').gmap('findMarker', 'tags', tag, false, function(marker, found) {
									marker.setOptions({'visible':true});
									$('#map_canvas').gmap('addBounds', marker.getLocation());
								});
							} else {
								$('#map_canvas').gmap('findMarker', 'tags', tag, ',', function(marker, found) {
									if (found) {
										marker.setOptions({'visible':true});
										$('#map_canvas').gmap('addBounds', marker.getLocation());
									} else {
										marker.setOptions({'visible':false});
									}
								});
							}
						});
					});
				},
				// Example 3, load markers with JSON
				'example_3': function() {
					$('#map_canvas').gmap({'credentials': demo.credentials, 'enableSearchLogo': false, 'showBreadcrumb': true, 'enableClickableLogo': false, 'showScalebar': false}).bind('init', function() { 
						$('#map_canvas').gmap('addControl', 'earthquake_control', 2);
						$.getJSON( 'http://api.geonames.org/earthquakesJSON?north=44.1&south=-9.9&east=-22.4&west=55.2&username=johansalllarsson', function(response) { 
							if (!response.status) {
								$('#earthquake_control').show();
								$.each( response.earthquakes, function(i, obj) {
									$('#earthquakes').append('<li>Magnitude: '+obj.magnitude+'</li>');
									$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(obj.lat, obj.lng), 'bounds': true, 'datetime': obj.datetime, 'magnitude': obj.magnitude, 'source': obj.src } ).click(function() {
										$('#map_canvas').gmap('openInfoWindow', { 'title': this.target.datetime, 'description': 'Magnitude: ' + this.target.magnitude + ', source: ' + this.target.source  }, this);
									});
								});
							} else {
								alert(response.status.message);
							}
						});
					});
				}
			}
		});
	}