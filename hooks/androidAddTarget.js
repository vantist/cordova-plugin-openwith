const { add: addIntentFilterMime } = require('./utils/androidIntentFilterMime');
const { androidManifest: getManifestPath } = require('./utils/projectPath');
const getPluginVariable = require('./utils/getPluginVariable');
let manifestPath;

module.exports = function(context) {
  manifestPath = getManifestPath(context);
  addShareMime(getPluginVariable(context, 'ANDROID_MIME_TYPE'));
};

function addShareMime(ANDROID_MIME_TYPE) {
  if (ANDROID_MIME_TYPE.startsWith('image/') || ANDROID_MIME_TYPE.startsWith('video/') || ANDROID_MIME_TYPE.startsWith('text/plain')) {
    addIntentFilterMime(manifestPath, ANDROID_MIME_TYPE);
  } else if (ANDROID_MIME_TYPE === '*/*') {
    addIntentFilterMime(manifestPath, 'image/*');
    addIntentFilterMime(manifestPath, 'video/*');
    addIntentFilterMime(manifestPath, 'text/plain');
  } else {
    console.error(`Unsupported ANDROID_MIME_TYPE, should be [image/* | video/* | text/plain | */*], but get ${ANDROID_MIME_TYPE} instead`);
  }
}
