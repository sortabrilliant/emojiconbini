#!/bin/bash

PLUGIN="emojiconbini"
VERSION=$(awk '/Version:/{print $NF}' $PLUGIN.php)
REPOSITORY="https://github.com/sortabrilliant/emojiconbini"
WORKING_DIR=`pwd`

mkdir -p release/$PLUGIN
git clone $REPOSITORY release/repo

cd $WORKING_DIR/release/repo
npm install && npm run build
cd $WORKING_DIR/release

rsync -av --progress --exclude={'.*','bin','node_modules','src','release','.gitignore','composer*','package*','webpack*','phpcs.xml','README.md'} repo/* $PLUGIN
zip -r "${PLUGIN}-${VERSION}.zip" $PLUGIN
rm -rf repo
