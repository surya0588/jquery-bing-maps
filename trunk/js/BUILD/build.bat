java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.js --js_output_file ../min/jquery.ui.bmap.min.js
Packer -o ../min/jquery.ui.bmap.min.js -m packer ../min/jquery.ui.bmap.min.js

java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.overlays.js --js_output_file ../min/jquery.ui.bmap.overlays.min.js
Packer -o ../min/jquery.ui.bmap.overlays.min.js -m packer ../min/jquery.ui.bmap.overlays.min.js

java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.services.js --js_output_file ../min/jquery.ui.bmap.services.min.js
Packer -o ../min/jquery.ui.bmap.services.min.js -m packer ../min/jquery.ui.bmap.services.min.js

pause