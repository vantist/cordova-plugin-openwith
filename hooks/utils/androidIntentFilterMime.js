const fs = require('fs');
const cheerio = require('cheerio');
const formatXml = require('xml-beautifier');

module.exports = {
  add: addIntentFilterMime,
  remove: removeIntentFilterMime,
}

function addIntentFilterMime(manifestPath, mime) {
  let xmlString = readAndroidManifest(manifestPath);
  let $ = load$(xmlString);
  $('activity').first().append(`
    <intent-filter>
        <data android:mimeType="${mime}" />
        <action android:name="android.intent.action.SEND" />
        <category android:name="android.intent.category.DEFAULT" />
    </intent-filter>
  `);
  writeAndroidManifest(manifestPath, $.xml());
}

function removeIntentFilterMime(manifestPath, mime) {
  let xmlString = readAndroidManifest(manifestPath);
  let $ = load$(xmlString);
  $('intent-filter').has(`data[android\\:mimeType='${mime}']`).remove();
  writeAndroidManifest(manifestPath, $.xml());
}

function readAndroidManifest(manifestPath) {
  return fs.readFileSync(manifestPath).toString();
}

function writeAndroidManifest(manifestPath, xmlString) {
  fs.writeFileSync(manifestPath, formatXml(xmlString));
}

function load$(xmlString) {
  return cheerio.load(xmlString, {
    xmlMode: true
  });
}
