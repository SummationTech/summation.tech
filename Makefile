#
# Makefile
#

all: build

build: clean setup pug css js resx

setup:
	mkdir -p builds/resources/
	mkdir -p builds/resources/js
	mkdir -p builds/resources/css

pug:
	pug . -o builds

css:
	compass compile resources/css
	cp -v resources/css/app.css builds/resources/css/
	cp -vr resources/css/fonts builds/resources/css/fonts

js:
	cp resources/js/jquery-2.2.1.min.js builds/resources/js
	minify resources/js/app.js > builds/resources/js/app.js

resx:
	cp -vr resources/images builds/resources/
	cp -vr resources/favicons/* builds

clean:
	rm -rf builds

deploy: build
	scp -r builds/* stw:/home/summationtech/summation.tech

deploytest: build
	scp -r builds/* stw:/home/summationtech/summation.tech/test
