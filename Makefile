install: 
	npm ci

lint:
	npx eslint .

test:
	npm test --test-reporter=spec

publish:
	npm publish --dry-run

.PHONY: test