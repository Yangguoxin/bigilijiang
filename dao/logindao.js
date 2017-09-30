var requestdao = require('requestdao.js');
//登录
function doLogin() {
  wx.login({
    success: function (res) {
      if (res.code) {
        getUserInfo(res.code);
      }
    }
  });
}

//获取用户信息
function getUserInfo(code) {
  wx.getUserInfo({
    withCredentials: false,
    success: function (res) {
      var app = getApp();
      var userInfo = res.userInfo;
      userInfo.js_code = code;
      userInfo.appid = "wx122a174956f794cf";
      userInfo.secret = "130e677645732a9a1265360a4505b19a"
      app.globalData.nickName = userInfo.nickName;
      app.globalData.avatarUrl = userInfo.avatarUrl;
      wx.showLoading({
        title: '加载中',
        mask:false
      });
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("wechat.login",userInfo,false),
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.statusCode == 200) {
            wx.hideLoading();
            var app = getApp();
            var tmp = res.data;
            app.globalData.userId = tmp.id;
            app.globalData.openId = tmp.openId;
            console.log(res.data);
          }
          else {
            //访问出错了
          }

        }
      });
    }
  });
}


const check_user = resfun =>{
  var app = getApp();
  var code = null;
  if (app.globalData.openId){
    var response = ({
      openId : app.globalData.openId,
      userId : app.globalData.userId
    });
    console.log(response);
    resfun(response);
  }
  else{
    wx.login({
      success: function (res) {
        if (res.code) {
          code = res.code;
          wx.getUserInfo({
            withCredentials: false,
            success: function (res) {
              var app = getApp();
              var userInfo = res.userInfo;
              userInfo.js_code = code;
              console.log(userInfo);
              app.globalData.nickName = userInfo.nickName;
              app.globalData.avatarUrl = userInfo.avatarUrl;
              wx.showLoading({
                title: '加载中',
                mask: false
              });
              wx.request({
                url: app.globalData.global_Url + '/iTour/user/login',
                data: userInfo,
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                  if (res.statusCode == 200) {
                    wx.hideLoading();
                    var app = getApp();
                    var tmp = res.data;
                    console.log(res);
                    resfun(res.data);

                  }
                  else {
                    //访问出错了
                  }

                }
              });
            }
          });
        }
      }
    });
  }
  
  
}

module.exports = {
  doLogin: doLogin,
  check_user: check_user
}