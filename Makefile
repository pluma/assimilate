LICENSE_COMMENT="/*! assimilate 0.1.0 Copyright (c) 2013 Alan Plum. MIT licensed. */"

test:
	@./node_modules/.bin/mocha \
		--growl \
		--reporter spec \
		spec/*.spec.js

clean:
	@rm -rf dist

dist/vendor: clean
	@mkdir -p dist/vendor

dist/assimilate.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/assimilate.js
	@cat src/assimilate.js >> dist/assimilate.js

dist/assimilate.globals.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/assimilate.globals.js
	@echo "(function(root){\
	var module={};" >> dist/assimilate.globals.js
	@cat src/assimilate.js >> dist/assimilate.globals.js
	@echo "root.assimilate = module.exports;\
	}(this));" >> dist/assimilate.globals.js

dist/assimilate.amd.js: dist/vendor
	@echo $(LICENSE_COMMENT) > dist/assimilate.amd.js
	@echo "define(function() {\
	var module = {};" >> dist/assimilate.amd.js
	@cat src/assimilate.js >> dist/assimilate.amd.js
	@echo "return module.exports;\
	});" >> dist/assimilate.amd.js

dist/assimilate.min.js: dist/assimilate.js
	@./node_modules/.bin/uglifyjs dist/assimilate.js > dist/assimilate.min.js

dist/assimilate.globals.min.js: dist/assimilate.globals.js
	@./node_modules/.bin/uglifyjs dist/assimilate.globals.js > dist/assimilate.globals.min.js

dist/assimilate.amd.min.js: dist/assimilate.amd.js
	@./node_modules/.bin/uglifyjs dist/assimilate.amd.js > dist/assimilate.amd.min.js

dist: dist/assimilate.min.js dist/assimilate.globals.min.js dist/assimilate.amd.min.js

lint:
	@./node_modules/.bin/jshint src/assimilate.js spec

.PHONY: lint test clean
