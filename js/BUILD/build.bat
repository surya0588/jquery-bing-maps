java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.js --js_output_file ../min/jquery.ui.bmap.min.js
Packer -o ../min/jquery.ui.bmap.min.js -m packer ../min/jquery.ui.bmap.min.js

java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.overlays.js --js_output_file ../min/jquery.ui.bmap.overlays.min.js
Packer -o ../min/jquery.ui.bmap.overlays.min.js -m packer ../min/jquery.ui.bmap.overlays.min.js

java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.services.js --js_output_file ../min/jquery.ui.bmap.services.min.js
Packer -o ../min/jquery.ui.bmap.services.min.js -m packer ../min/jquery.ui.bmap.services.min.js

java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.rdfa.js --js_output_file ../min/jquery.ui.bmap.rdfa.min.js
Packer -o ../min/jquery.ui.bmap.rdfa.min.js -m packer ../min/jquery.ui.bmap.rdfa.min.js

java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.microdata.js --js_output_file ../min/jquery.ui.bmap.microdata.min.js
Packer -o ../min/jquery.ui.bmap.microdata.min.js -m packer ../min/jquery.ui.bmap.microdata.min.js

java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js ../jquery.ui.bmap.microformat.js --js_output_file ../min/jquery.ui.bmap.microformat.min.js
Packer -o ../min/jquery.ui.bmap.microformat.min.js -m packer ../min/jquery.ui.bmap.microformat.min.js

pause