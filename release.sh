#!/bin/sh

v=$(cat package.json | jq '.version' | colrm 1 1 | rev | colrm 1 1 | rev)
vm=$(echo $v | cut -d . -f 1)
vi=$(echo $v | cut -d . -f 2)
vp=$(echo $v | cut -d . -f 3)

case $1 in
  major) vm=$(($vm + 1));;
  minor) vi=$(($vi + 1));;
  patch) vp=$(($vp + 1));;
  *)
    echo "Usage: release.sh {patch,minor,major}"
    return 1
esac

echo -n "Updating $1 version $v -> "
v=$vm.$vi.$vp
echo "$v..."
cat package.json | jq ".version=\"$v\"" | cat > package.json.tmp
mv package.json{.tmp,}

echo "Building..."
npm run build

echo "Creating a release commit..."
git add .
git commit -m "[release] v$v"
git tag "v$v"

echo "Done"
