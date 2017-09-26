// 获取系统信息
function getSystemInfo() {
  var system = {};
  try {
    var res = wx.getSystemInfoSync();
    system.model = res.model;  //手机型号
    system.pixelRatio = res.pixelRatio;  //设备像素比
    system.windowWidth = res.windowWidth; //可使用窗口宽度
    system.windowHeight = res.windowHeight; //可使用窗口高度
    system.language = res.language; //微信设置的语言
    system.version = res.version; //微信版本号
    system.system = res.system; //操作系统版本
    system.platform = res.platform; //客户端平台
    system.scale = system.windowWidth / 750;  //rpx比例
  } catch (e) {
    // Do something when catch error
  }
  return system;
}

module.exports = {
  getSystemInfo: getSystemInfo
}