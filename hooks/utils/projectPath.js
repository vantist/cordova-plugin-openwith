const path = require('path');

module.exports = {
  root,
  packageJson,
  configXml,
  iosRoot,
  androidRoot,
  androidManifest,
}

function root(context) {
  return context.opts.projectRoot;
}

function packageJson(context) {
  return path.join(root(context), 'package.json');
}

function configXml(context) {
  return path.join(root(context), 'config.xml');
}

function iosRoot(context) {
  return path.join(root(context), 'platforms/ios');
}

function androidRoot(context) {
  return path.join(root(context), 'platforms/android');
}

function androidManifest(context) {
  return path.join(androidRoot(context), 'app/src/main/AndroidManifest.xml');
}
