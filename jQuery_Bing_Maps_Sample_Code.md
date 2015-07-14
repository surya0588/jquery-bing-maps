# Version 1.0 #

## Example constructor call ##

Make the selected element a Bing map.

```
$('#map_canvas').gmap();
```

[Map options](http://msdn.microsoft.com/en-us/library/gg427603.aspx) are added in the constructor or set with the option method

```
$('#map_canvas').gmap({ 'center': '42.345573,-71.098326' });
```

The map options is extended with a callback function which will execute when the Bing Map object has been instanciated.

```
$('#map_canvas').gmap({ 'callback': function(map) {
	// The keyword 'this' refers to the plugin object itself. Which means you can execute shorthand code; e.g. this.addMarker({...});  
	// do something
}});
```

When the map is initialized it will trigger the 'init' event.

```
$('#map_canvas').gmap().bind('init', function(event, map) { 
	// do something																									  
});
```

All properties in the [MapOption](http://msdn.microsoft.com/en-us/library/gg427603.aspx) object can be set and retrieved by the "option" method

Get e.g. the zoom
```
var zoom = $('#map_canvas').gmap('option', 'zoom');
```

Set e.g. the zoom
```
$('#map_canvas').gmap('option', 'zoom', 7);
```

## Example add custom control ##

```
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('addControl', 'control', 0);																										  
});
```

```
$('#map_canvas').gmap({'callback':function() {
	this.addControl('control', 0);	
}});
```

```
$('#map_canvas').gmap('addControl', 'control', 0);
```

## Example add marker ##

The position can be set with a string representation of a latitude/longitude ('xx.xx,xx.xx') or with a Microsoft.Maps.Location().
If you set the property bounds to true the map will calculate the viewport and zoom automagically, overriding any zoom set in the contructor.
If a property 'id' is added to the addMarker method the marker will be retrievable by it's id with the 'get' method.
All options: http://msdn.microsoft.com/en-us/library/gg427629.aspx

```
$('#map_canvas').gmap().bind('init', function(evt, map) { 
	$('#map_canvas').gmap('addMarker', { /*id:'m_1',*/ 'location': '42.345573,-71.098326', 'bounds': true } );																										  
});
```

```
$('#map_canvas').gmap({'callback':function() {
	this.addMarker( { /*id:'m_1',*/ 'location': '42.345573,-71.098326', 'bounds': true } );																										  
}});
```

```
$('#map_canvas').gmap('addMarker', { /*id:'m_1',*/ 'location': '42.345573,-71.098326', 'bounds': true } );
```

## Example InfoWindow ##

Showing an InfoWindow on a click event, use 'title' and 'description' as properties for the info window if you
don't want to add HTML content.
All options: http://msdn.microsoft.com/en-us/library/gg675210.aspx

```
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('addMarker', { 'location':  '42.345573,-71.098326', 'bounds': true }).click(function() {
		$('#map_canvas').gmap('openInfoWindow', { 'htmlContent': 'HTML_IN_INFOWINDOW' }, this);
	});                                                                                                                                                                                                                               
});
```

```
$('#map_canvas').gmap({'callback':function() {
	var self = this;
	self.addMarker({ 'location':  '42.345573,-71.098326', 'bounds': true }).click(function() {
		self.openInfoWindow({ 'htmlContent': 'TEXT_AND_HTML_IN_INFOWINDOW' }, this);
	});                                                                                                                                                                                                                               
}});
```

```
$('#map_canvas').gmap('addMarker', { 'location':  '42.345573,-71.098326', 'bounds': true }).click(function() {
	$('#map_canvas').gmap('openInfoWindow', { 'htmlContent': 'TEXT_AND_HTML_IN_INFOWINDOW' }, this);
});
```

## Example add markers with JSON ##

Example JSON response

```
{"markers":[
	{ "latitude":0.0, "longitude":0.0 }
]}
```

```
$('#map_canvas').gmap().bind('init', function(evt, map) { 
	$.getJSON( 'URL_TO_JSON', function(data) { 
		$.each( data.markers, function(i, m) {
			$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(m.latitude, m.longitude), 'bounds':true } );
		});
	});																											  
});
```

```
$('#map_canvas').gmap({'callback':function() {
	var self = this;
	$.getJSON( 'URL_TO_JSON', function(data) { 
		$.each( data.markers, function(i, m) {
			self.addMarker( { 'location': new Microsoft.Maps.Location(m.latitude, m.longitude), 'bounds':true } );
		});
	});																											  
}});
```

```
$.getJSON( 'URL_TO_JSON', function(data) { 
	$.each( data.markers, function(i, m) {
		$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(m.latitude, m.longitude), 'bounds':true } );
	});
});																											  
```

## Example loadDirections ##

```
$('#map_canvas').gmap().bind('init', function(evt, map) { 
	$('#map_canvas').gmap('loadDirections', { 'origin': 'Los Angeles, USA', 'destination': 'New York, USA' }, function(result, status) {
		if ( status === 'OK' ) {
			alert('Results found!');
		}
	});																											  
});
```

## Example displayDirections ##

```
$('#map_canvas').gmap().bind('init', function(evt, map) { 
	$('#map_canvas').gmap('displayDirections', { 'origin': 'Los Angeles, USA', 'destination': 'New York, USA', 'routeMode': Microsoft.Maps.Directions.RouteMode.driving }, { 'panel': document.getElementById('panel') } );																											  
});
```

```
$('#map_canvas').gmap({'callback':function() { 
	this.displayDirections({ 'origin': 'Los Angeles, USA', 'destination': 'New York, USA', 'routeMode': Microsoft.Maps.Directions.RouteMode.driving }, { 'panel': document.getElementById('panel') } );																											  
}});
```

```
$('#map_canvas').gmap('displayDirections', { 'origin': 'Los Angeles, USA', 'destination': 'New York, USA', 'routeMode': Microsoft.Maps.Directions.RouteMode.driving }, { 'panel': document.getElementById('panel') } );																											  
```

## Example filter tags, categories, etc with find ##

Find an object by searching a single property with a single value.

All options:
  * property
  * value
  * delimiter (optional)

```
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('addMarker', { 'tags':'foo', 'location': '42.345573,-71.098326', 'bounds':true });
	$('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': 'foo' }, function(marker, isFound) {
		marker.setOptions({ 'visible': isFound });
	});
});
```

```
$('#map_canvas').gmap({'callback':function() {
	this.addMarker({ 'tags':'foo', 'location': '42.345573,-71.098326', 'bounds':true });
	this.find('markers', { 'property': 'tags', 'value': 'foo' }, function(marker, isFound) {
		marker.setOptions({ 'visible': isFound });
	});
}});
```

```
$('#map_canvas').gmap('addMarker', { 'tags':'foo', 'location': '42.345573,-71.098326', 'bounds':true });
$('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': 'foo' }, function(marker, isFound) {
	marker.setOptions({ 'visible': isFound });
});
```

Find an object by searching a single property with multiple values.

All options:
  * property
  * value
  * delimiter (optional)

```
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('addMarker', { 'tags':'foo, bar, baz', 'location': '42.345573,-71.098326', 'bounds':true });
	$('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': 'foo', 'delimiter': ', '}, function(marker, isFound) {
		marker.setOptions({ 'visible': isFound });
	});
});
```

```
$('#map_canvas').gmap({'callback':function() {
	this.addMarker({ 'tags':'foo, bar, baz', 'location': '42.345573,-71.098326', 'bounds':true });
	this.find('markers', { 'property': 'tags', 'value': 'foo', 'delimiter': ', '}, function(marker, isFound) {
		marker.setOptions({ 'visible': isFound });
	});
}});
```

```
$('#map_canvas').gmap('addMarker', { 'tags':'foo, bar, baz', 'location': '42.345573,-71.098326', 'bounds':true });
$('#map_canvas').gmap('find', 'markers', { 'property': 'tags', 'value': 'foo', 'delimiter': ', '}, function(marker, isFound) {
	marker.setOptions({ 'visible': isFound });
});
```

## Example RDFa ##

```
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('rdfa', 'v:Event', function(result, item, index) {
		var lat = result.location[0].geo[0].latitude;
		var lng = result.location[0].geo[0].longitude;
		$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
	});
});
```

```
$('#map_canvas').gmap({'callback':function() { 
	var self = this;
	self.rdfa('v:Event', function(result, item, index) {
		var lat = result.location[0].geo[0].latitude;
		var lng = result.location[0].geo[0].longitude;
		self.addMarker({ 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
	});
}});
```

```
$('#map_canvas').gmap('rdfa', 'v:Event', function(result, item, index) {
	var lat = result.location[0].geo[0].latitude;
	var lng = result.location[0].geo[0].longitude;
	$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
});
```

## Example Microdata ##

```
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('microdata', 'http://data-vocabulary.org/Event', function(result, item, index) {
		var lat = result.location[0].geo[0].latitude;
		var lng = result.location[0].geo[0].longitude;
		$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
	});
});
```

```
$('#map_canvas').gmap({'callback':function() { 
	var self = this;
	self.microdata('http://data-vocabulary.org/Event', function(result, item, index) {
		var lat = result.location[0].geo[0].latitude;
		var lng = result.location[0].geo[0].longitude;
		self.addMarker({ 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
	});
}});
```

```
$('#map_canvas').gmap('microdata', 'http://data-vocabulary.org/Event', function(result, item, index) {
	var lat = result.location[0].geo[0].latitude;
	var lng = result.location[0].geo[0].longitude;
	$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
});
```

## Example Microformat ##

```
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('microformat', '.vevent', function(result, item, index) {
		var lat = result.location[0].geo[0].latitude['value-title'];
		var lng = result.location[0].geo[0].longitude['value-title'];
		$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
	});
});
```

```
$('#map_canvas').gmap({'callback':function() { 
	var self = this;
	self.microformat('.vevent', function(result, item, index) {
		var lat = result.location[0].geo[0].latitude['value-title'];
		var lng = result.location[0].geo[0].longitude['value-title'];
		self.addMarker({ 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
	});
}});
```

```
$('#map_canvas').gmap('microformat', '.vevent', function(result, item, index) {
	var lat = result.location[0].geo[0].latitude['value-title'];
	var lng = result.location[0].geo[0].longitude['value-title'];
	$('#map_canvas').gmap('addMarker', { 'location': new Microsoft.Maps.Location(lat, lng), 'bounds': true });
});
```


## Example Polygon/Polyline ##

```
var polylines = ['0.0,0.0', '1.0,1.0'];
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('addShape', 'Polyline', { 'paths': polylines, 'strokeColor': new Microsoft.Maps.Color(200, 100, 0, 100), 'strokeThickness': 5, 'strokeDashArray': '5 2' });
});
```

```
var polygons = ['20,-20', '20,20', '-20,20', '-20,-20', '20,-20'];
$('#map_canvas').gmap().bind('init', function() { 
	$('#map_canvas').gmap('addShape', 'Polygon', { 'paths': polygons, 'fillColor': new Microsoft.Maps.Color(100,100,0,100), 'strokeColor': new Microsoft.Maps.Color(200,0,100,100),'strokeThickness': 5 });
});
```

```
var polylines = ['0.0,0.0', '1.0,1.0'];
$('#map_canvas').gmap({'callback':function() {  
	var self = this;
	self.addShape('Polyline', { 'paths': polylines, 'strokeColor': new Microsoft.Maps.Color(200, 100, 0, 100), 'strokeThickness': 5, 'strokeDashArray': '5 2' });
}});
```

```
var polygons = ['20,-20', '20,20', '-20,20', '-20,-20', '20,-20', '20,-20'];
$('#map_canvas').gmap({'callback':function() {  
	var self = this;
	self.addShape('Polygon', { 'paths': polygons, 'fillColor': new Microsoft.Maps.Color(100,100,0,100), 'strokeColor': new Microsoft.Maps.Color(200,0,100,100),'strokeThickness': 5 });
}});
```

## Search ##

```
$('#map_canvas').gmap().bind('init', function() {
	$('#map_canvas').gmap('search', { 'address': 'Stockholm' }, function(results, status) {
		if ( status === 'OK' ) {
			var location = new Microsoft.Maps.Location(item.point.coordinates[0],item.point.coordinates[1]);
			$('#map_canvas').gmap('get', 'map').setView({'center':location});
		}
	});
}});
```

```
$('#map_canvas').gmap({'callback':function() {
	var self = this;
	self.search({ 'address': 'Stockholm' }, function(results, status) {
		if ( status === 'OK' ) {
			var location = new Microsoft.Maps.Location(item.point.coordinates[0],item.point.coordinates[1]);
			self.get('map').setView({'center':location});
		}
	});
}});
```

```
$('#map_canvas').gmap('search', { 'address': 'Stockholm' }, function(results, status) {
    if ( status === 'OK' ) {
		var location = new Microsoft.Maps.Location(item.point.coordinates[0],item.point.coordinates[1]);
		$('#map_canvas').gmap('get', 'map').setView({'center':location});
	}
});
```

## Clear markers ##

```
$('#map_canvas').gmap('clear', 'markers');
```

## Example destroy ##

```
$('#map_canvas').gmap('destroy');
```

## Set/Get ##

You can use the set and get methods to store an object/function

```
$('#map_canvas').gmap('set', 'alert', function() { alert('test'); } );
$('#map_canvas').gmap('get', 'alert')();
```

Set 'foo' to the object { 'bar': 'baz' }

```
$('#map_canvas').gmap('set', 'foo', {'bar':'baz'} } );
```

Get 'foo'

```
$('#map_canvas').gmap('get', 'foo').bar;
// or
$('#map_canvas').gmap('get', 'foo > bar');
```

You can get an object and set a default value if it doesn't exist
```
var theAlertFunction = $('#map_canvas').gmap('get', 'alert', function() { alert('test'); } )();
```


## Get markers, services, and more ##

Get all markers as an array

```
var markers = $('#map_canvas').gmap('get', 'markers');
```

If you call the method addMarkers and set the id property the $('#map\_canvas').gmap('get', 'markers') will return an associative array which means you cannot use .length to count the markers.

Get a marker with the id 'm\_1'

```
var marker = $('#map_canvas').gmap('get', 'markers > m_1');
var marker = $('#map_canvas').gmap('get', 'markers')['m_1'];
var marker = $('#map_canvas').gmap('get', 'markers').m_1;
```

Get the first marker if not using id's

```
var marker = $('#map_canvas').gmap('get', 'markers > 0');
var marker = $('#map_canvas').gmap('get', 'markers')[0];
```

Get all services

```
$('#map_canvas').gmap('get', 'services');
```

Get a specific service implementation

```
$('#map_canvas').gmap('get', 'services > DirectionsManager');
$('#map_canvas').gmap('get', 'services')['DirectionsManager'];
$('#map_canvas').gmap('get', 'services').DirectionsManager;
```

Get all overlays

```
$('#map_canvas').gmap('get', 'overlays');
```

Polygons/Circles/etc are stored in an array

```
var arrayOfPolygons = $('#map_canvas').gmap('get', 'overlays > Polygon');
```

Get bounds set by the addMarker property, not the map.bounds

```
$('#map_canvas').gmap('get', 'bounds');
```

Clear bounds set by the addMarker property, not the map.bounds

```
$('#map_canvas').gmap('set', 'bounds', null);
```