#!/bin/sh

set -e

echo ""
echo "========== Starting Build of SummationTech Website =========="

echo ""
echo "Compile SCSS"
compass compile resources/css
echo "CSS Compiliation Complete"

echo ""
echo "===== Creating Builds Folder ====="
rm -rf builds
mkdir builds

echo ""
echo "=== Compiling Pug ==="
pug . -o builds

echo ""
echo "=== Copying Resources ==="
mkdir builds/resources

echo ""
echo "Copying Images"
cp -vr resources/images builds/resources/images

echo ""
echo "Copying Favicons"
cp -vr resources/favicons/* builds

echo ""
echo "Copying JavaScript Files"
cp -vr resources/js builds/resources/js

echo ""
echo "Copying CSS"
mkdir builds/resources/css
cp -v resources/css/app.css builds/resources/css/app.css
cp -vr resources/css/fonts builds/resources/css/fonts

echo ""
echo "Build Complete!"
