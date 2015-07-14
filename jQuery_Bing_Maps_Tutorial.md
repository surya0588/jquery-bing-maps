# Beginner #

## Step 1. ##

**[Sign up](http://msdn.microsoft.com/en-us/library/ff428642.aspx)** for a Bing maps key

## Step 2. ##

Add the mandatory JavaScript libraries to your HTML HEAD tag.
If you are developing a web site for mobile content add:

```
<script src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0" type="text/javascript"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js" type="text/javascript"></script>
<script src="http://code.jquery.com/mobile/1.0/jquery.mobile-1.0.min.js" type="text/javascript" ></script>
<script src="PATH_TO_PLUGIN/jquery.ui.map.full.min.js" type="text/javascript"></script>
```

If you are developing a web site without any mobile device support add:

```
<script src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0" type="text/javascript"></script>
<script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.min.js" type="text/javascript"></script>
<script src="PATH_TO_PLUGIN/jquery.ui.map.full.min.js" type="text/javascript"></script>
```

## Step 3. ##

To add a map just add

```
<script type="text/javascript">
	$(function() {
		// Also works with: var yourStartLatLng = '59.3426606750, 18.0736160278';
		var yourStartLatLng = new Microsoft.Maps.Location(59.3426606750, 18.0736160278);
		$('#map_canvas').gmap({'credentials': YOUR_BING_MAPS_CREDENTIALS, 'center': yourStartLatLng});
	});
</script>
```

and add a DIV tag within the BODY section of your HTML document

```
<div id="map_canvas" style="width:250px;height:250px;position:relative"></div>
```

[View boiler plate template ](http://jquery-bing-maps.googlecode.com/svn/trunk/examples/jquery-bing-maps-mobile-boilerplate.html) or [view boiler plate template source](http://code.google.com/p/jquery-bing-maps/source/browse/trunk/examples/jquery-bing-maps-mobile-boilerplate.html)


# Advanced #

The plugin has been split up into 4 JavaScript files:

### jquery.ui.map ###
Used when you need minimal map features e.g. adding a marker to a map and opening an infobox.

### jquery.ui.map.overlays ###

Used for e.g. polygons and polylines

### jquery.ui.map.services ###

Used for e.g. directions and geocoding

### jquery.ui.map.extensions ###

Used for your extensions and modifications of existing methods

This is how you create a new method in the extension file

```
( function($) {

	$.extend($.ui.gmap.prototype, {
		
		theBeatles : function() {
			alert('Helter skelter');
		},
		
		alertSomething: function(a) {
			alert(a);
		}
		
	});
	
} (jQuery) );
```

Or do something during the widget initialization. This will geocode the address option property and on success call the geoCallback property.

```
( function($) {

	$.extend($.ui.gmap.prototype, {
	
		// This fires after the widgets create method
		_init: function() {
			var self = this;
			// If you add the property option address in the constructor it will be geocoded 
			if ( this.options.address && this.options.geoCallback ) {
				this.search({'address': this.options.address}, function(results, status) {
					if ( status === 'OK' ) {
						self._call(self.options.geoCallback, results, status);
					}
				});
			}
		}
			
	});
        
} (jQuery) );
```