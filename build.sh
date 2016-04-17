#!/bin/sh

set -e

echo "\n========== Starting Build of SummationTech Website =========="

echo "\nCompile SCSS"
compass compile resources/css
echo "CSS Compiliation Complete"

echo "\n===== Creating Builds Folder ====="
rm -rf builds
mkdir builds

echo "\n=== Compiling Pug ==="
pug . -o builds

echo "\n=== Copying Resources ==="
mkdir builds/resources

echo "\nCopying Images"
cp -vr resources/images builds/resources/images

echo "\nCopying JavaScript Files"
cp -vr resources/js builds/resources/js

echo "\nCopying CSS"
mkdir builds/resources/css
cp -v resources/css/app.css builds/resources/css/app.css

echo "\nBuild Complete!\n"
