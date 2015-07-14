# jQuery Bing Maps #

The jQuery Bing Maps plugin aims at making maps on the web or mobile devices easier to set up and use. JQuery Bing Maps share both the jQuery Google Maps plugin structure and the methods, which means you could pretty much write the code one time and switch between Bing Maps and Google Maps.
The plugin extends the Bing Map framework with features such as marker property search, which comes in handy whenever you need to e.g. filter by tag or category, and load markers by metadata markup such as Microdata, Microformats and RDFa.

## Why Bing Maps? ##

Most people have only heard of Google Maps and seen Google Maps implementations, however if you are a keen Facebook user you have most likely both seen and interacted with Bing maps. Otherwise you might have seen Bing Maps searching on Bing Search.

This is not going to be a Bing Maps vs Google Maps article, but rather showcasing when Bing Maps would be the preferred mapping provider. There are alot of differences between Bing Maps and Google Maps, first one being the functions available - Google Maps have some features Bing Maps doesn't have such as Distance Matrix, Street view or Places whilst Bing Maps has Bird view (3D), Venues (e.g. stores inside a mall), and breadcrumb. If this would be a Bing Maps vs. Google Maps, Google Maps would win the features fight, however basic mapping functionality such as information boxes, geocoding, driving directions, traffic information and spatial data warehousing ([Google Fusion Tables](http://www.google.com/fusiontables/Home/) and [Bing Maps™ Locator](http://bingmapslocators.cloudapp.net/DataUploader)) is supported by both frameworks.
The second difference is the graphical user interface (GUI) and usability: Google Maps provides a set of methods to style the map itself, e.g. show/hide highways, locality names, etc, which is great for usability. Bing maps takes on another way of dealing with usability, mainly keeping it minimalistic and clean from the get go, gradually changing the granularity of the map depending on the users zoom. The responsiveness and smooth zooming is one of Bing Maps strengths.

While Google's map objects have no CSS classes Bing maps does, making it easier to style elements with CSS rather than have to extend the framework.

Depending on what sort of implementation you are doing you need to consider which mapping framework suits best; what platform are you targeting? what functions do you need?. For a mobile device you would need a responsive map with minimal kB loaded. Bing maps and Google maps framework is about the same size in kB, but the images loaded are, by default, about 200% bigger in size for Google maps, making it have a slightly higher load time. Even though maps are neat and look impressive they might not be the best for your specific implementation, a list of locations could sometimes be a better alternative.
