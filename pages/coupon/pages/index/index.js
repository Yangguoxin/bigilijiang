//index.js
//获取应用实例
var app = getApp()

Page({
  data: {
    motto: 'hello world',
    userInfo: {}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //新添加的demo页面
  bindViewDemo:function(){
    
    /*wx.navigateTo({
      url: '../confirm/confirm',
    })*/
  },
  onLoad: function () {
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
    wx.request({
      url: 'http://ijita.ngrok.cc/iLijiang-B/index.json', //仅为示例，并非真实的接口地址
      /*data: {
        code: this.data.inputdata,
      },*/
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        if (res.data[0].id == 1) {
          wx.navigateTo({
            url: '../confirm/confirm',
          })
        } else {
          wx.navigateTo({
            url: '../list/list',
          })
        }

        /* if (res.data[0].id == 1) {
           wx.navigateTo({
             url: '../confirm/confirm',
           })
         } else {
           wx.navigateTo({
             url: '../list/list',
           })
         }*/
      }
    }) 
   
   
  }
})
