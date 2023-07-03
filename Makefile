install: 
	npm ci

lint:
	npx eslint .

test:
	npm test --test-reporter=spec

publish:
	npm publish --dry-run

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest

.PHONY: test