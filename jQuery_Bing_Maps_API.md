# Dependencies #

  * jquery.core

# API version 1.0 #

## jquery.ui.map core ##

### Constructor ###

| **Constructor** | **Return value** | **Description** |
|:----------------|:-----------------|:----------------|
| gmap(opts?:[MapOptions](http://msdn.microsoft.com/en-us/library/gg427603.aspx)) | none             | Creates a new map. MapOptions is extended with an optional callback method, i.e. { 'callback':function() { } }, invoked after the map has been loaded |

### Methods ###

| **Method** | **Return value** | **Description** |
|:-----------|:-----------------|:----------------|
| addBounds([Location](http://msdn.microsoft.com/en-us/library/gg427612.aspx)) | none             | Adds a bound to the existing boundaries. |
| addControl(panel:jquery/node/string, position:int) | none             | Creates a control from the given div panel on the map. |
| addMarker(opts?:[PushpinOptions](http://msdn.microsoft.com/en-us/library/gg427629.aspx), callback?:function(map:[Map](http://msdn.microsoft.com/en-us/library/gg427609.aspx), marker:[Pushpin](http://msdn.microsoft.com/en-us/library/gg427615.aspx))) | $([Pushpin](http://msdn.microsoft.com/en-us/library/gg427615.aspx))  | Creates a marker on the map. PushpinOptions is extended with a bounds property ('bounds':boolean) to add boundaries  |
| find (type:string, object:{property/value/delimiter}, callback:function(object:object, isFound:boolean)) | none             | Find e.g. marker(s) by property |
| inViewport(marker:[Marker](http://code.google.com/intl/sv-SE/apis/maps/documentation/javascript/reference.html#Marker)) | boolean          | If a markers LatLng is visible in the viewport |
| get(name:string, obj?:object) | object           | Returns object by name. The optional obj parameter is set if the name does not exist.  |
| set(name:string, obj:object) | object           | Stores an object by name |
| addInfoWindow(opts:[InfoboxOptions](http://msdn.microsoft.com/en-us/library/gg675210.aspx), marker:[Pushpin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)) | none             | Opens an info box bound to the marker on the map. |
| openInfoWindow(opts:[InfoboxOptions](http://msdn.microsoft.com/en-us/library/gg675210.aspx), marker:[Pushpin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)) | none             | Opens an info box bound to the marker on the map. |
| load(key:string, options:object, isLoadedCallback:function) | none             | Loads the specified registered module, making its functionality available. An optional function can be specified that is called when the module is loaded. The following Bing Maps modules are available: Microsoft.Maps.Directions, Microsoft.Maps.Traffic, Microsoft.Maps.VenueMaps |
| register(key:string, url:string, options:object) | none             | Registers a module with the map control. The name of the module is specified in key, the module script is defined in scriptUrl, and the options provides the location of a **.css file to load with the module. Once you have registered a module, you can make its functionality available by loading it using load.**|
| clear(name:string) | none             | Removes a property list by name, e.g. markers, services, overlays |
| destroy()  | none             | Removes the map functionality. |

## Events ##

| **Method** | **Return value** | **Description** |
|:-----------|:-----------------|:----------------|
| triggerEvent(type:string) | none             | Trigger an event, e.g. 'resize'. |
| addEventListener(type:string, callback:function()) | none             | Adds a Google event listener or binds a jQuery event|

| **Event** | **Description** | **Supported elements** |
|:----------|:----------------|:-----------------------|
| click     | Adds a click event. | [Map](http://msdn.microsoft.com/en-us/library/gg427609.aspx), [PushPin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)|
| rightclick | Adds a right click event. | [Map](http://msdn.microsoft.com/en-us/library/gg427609.aspx), [PushPin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)|
| dblclick  | Adds a double click event. | [Map](http://msdn.microsoft.com/en-us/library/gg427609.aspx), [PushPin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)|
| mouseover | Adds a mouse over event. | [Map](http://msdn.microsoft.com/en-us/library/gg427609.aspx), [PushPin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)|
| mouseout  | Adds a mouse out event. | [Map](http://msdn.microsoft.com/en-us/library/gg427609.aspx), [PushPin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)|
| drag      | Adds a drag event. | [Map](http://msdn.microsoft.com/en-us/library/gg427609.aspx), [PushPin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)|
| dragend   | Adds a drag end event. | [Map](http://msdn.microsoft.com/en-us/library/gg427609.aspx), [PushPin](http://msdn.microsoft.com/en-us/library/gg427615.aspx)|

## jquery.ui.map overlays ##

### Methods ###

| **Method** | **Return value** | **Description** |
|:-----------|:-----------------|:----------------|
| addShape(shape:string, opts:[PolylineOptions](http://msdn.microsoft.com/en-us/library/gg427595.aspx)/[PolygonOptions](http://msdn.microsoft.com/en-us/library/gg427596.aspx)) | none             | Adds an overlay, depending on the shape: 'Polygon', 'Polyline', 'Rectangle', 'Circle'. |

## jquery.ui.map services ##

### Methods ###

| **Method** | **Return value** | **Description** |
|:-----------|:-----------------|:----------------|
| loadDirections(request:[DirectionsRequest](http://msdn.microsoft.com/en-us/library/hh312839.aspx), callback:function(result:[DirectionsResult](http://msdn.microsoft.com/en-us/library/gg636957.aspx), DirectionsStatus:OK/ERROR/ZERO\_RESULTS)) | none             | Returns directions. |
| displayDirections(request:[DirectionsRequest](http://msdn.microsoft.com/en-us/library/hh312839.aspx), opts:[DirectionsRendererOptions](http://msdn.microsoft.com/en-us/library/hh312832.aspx)) | none             | Displays directions on the map and/or in a div panel. |
| search(request: {address: 'Stockholm', location: Microsoft.Maps.Location}, callback:function(result:[GeocoderResult](http://msdn.microsoft.com/en-us/library/ff701714.aspx), status:DirectionsStatus:OK/ERROR/ZERO\_RESULTS)) | none             | Search addresses and latitude/longitude. |

## jquery.ui.map rdfa/microformat/microdata ##

### Methods ###

| **Method** | **Return value** | **Description** |
|:-----------|:-----------------|:----------------|
| rdfa(namespace:string, callback:function(object:object, item:$(node), index:int)) | none             | Iterates through selected RDFa. |
| microdata(namespace:string, callback:function(object:object, item:$(node), index:int)) | none             | Iterates through selected microdata. |
| microformat(namespace:string, callback:function(object:object, item:$(node), index:int)) | none             | Iterates through selected microformat. |

## jquery.ui.extensions ##

This is were you put your own extensions.