const { remove: removeIntentFilterMime } = require('./utils/androidIntentFilterMime');
const { androidManifest: getManifestPath } = require('./utils/projectPath');
const getPluginVariable = require('./utils/getPluginVariable');
let projectContext;
let manifestPath;

module.exports = function(context) {
  projectContext = context;
  manifestPath = getManifestPath(context);
  removeShareMime();
}

function removeShareMime() {
  let ANDROID_MIME_TYPE = getPluginVariable(projectContext, 'ANDROID_MIME_TYPE');
  if (ANDROID_MIME_TYPE === '*/*') {
    removeIntentFilterMime(manifestPath, 'image/*');
    removeIntentFilterMime(manifestPath, 'video/*');
    removeIntentFilterMime(manifestPath, 'text/plain');
  } else {
    removeIntentFilterMime(manifestPath, ANDROID_MIME_TYPE);
  }
}
