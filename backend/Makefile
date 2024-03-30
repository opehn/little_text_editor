ARCH=amd64
IMG_TAG=text_editor_backend:v1.0.0

all:
	cat ./Makefile

test:
	npm test

node:
	npm ci
	npm run build


image: node
	docker build --platform=linux/${ARCH} --tag ${IMG_TAG} .
