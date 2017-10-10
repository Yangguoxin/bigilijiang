
var md5 = require('md5.js');
function setParamsData(method, data, isToken) {
  var dataJson = JSON.stringify(data);
  var params = {};
  params.method = "mini." + method;
  params.data = dataJson;
  params.deviceType = "3";
  params.appType = "3";
  params.apiVersion = "1.0";
  params.encryptType = "none";
  params.token = "";
  if (isToken) {
    params.sign = md5.md5(params.method + params.deviceType + params.appType + params.apiVersion + dataJson + params.token);
  } else {
    params.sign = md5.md5(params.method + params.deviceType + params.appType + params.apiVersion + dataJson);
  }
  return params
}

module.exports = {
  setParamsData: setParamsData
}