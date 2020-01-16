const { configXml: getConfigXmlPath, packageJson: getPackageJsonPath } = require('./projectPath');
const fs = require('fs');

module.exports = get;

function get(context, variableName) {
  return getProcessVariable(variableName) || getConfigXmlValue(context, variableName) || getPackageJsonVariable(context, variableName);
}

function getProcessVariable(variableName) {
  const arg = process.argv.filter(function(arg) {
    return arg.indexOf(variableName + '=') === 0;
  });
  if (arg.length >= 1) {
    return arg[0].split('=')[1];
  } else {
    return null;
  }
}

function getConfigXmlValue(context, name) {
  const configXml = fs.readFileSync(getConfigXmlPath(context), 'utf-8');
  let value = configXml.match(new RegExp('name="' + name + '" value="(.*?)"', "i"));
  if (value && value[1]) {
    return value[1];
  } else {
    return null;
  }
}

function getPackageJsonVariable(context, variableName) {
  const packageJson = require(getPackageJsonPath(context));
  return packageJson.cordova.plugins['cc.fovea.cordova.openwith'][variableName] || null;
}
