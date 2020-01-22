#!/bin/bash

PLUGIN="emojiconbini"
VERSION=$(awk '/Version:/{print $NF}' $PLUGIN.php)

mkdir -p release

echo "Grabbing the latest plugin version..."

git clone pull

echo "Running the build process..."

npm install && npm run build

echo "Create new release archive..."

git archive --format=zip HEAD -o release/"${PLUGIN}-${VERSION}.zip"

echo "Done!"
