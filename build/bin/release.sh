# !/usr/bin/env sh
set -e
CURRENT=$(node -p "require('./package.json').version")
echo "Current $CURRENT"
echo "Enter release version: "
read VERSION

read -p "Releasing $VERSION - are you sure? (y/n)" -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]
then
  npm version $VERSION -m "build: release $VERSION"
  npm run build
  git push origin master
fi