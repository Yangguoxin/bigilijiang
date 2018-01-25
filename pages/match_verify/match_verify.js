// pages/match_verify/match_verify.js
var requestdao = require('../../dao/requestdao.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    fouced:false,
    turn_true: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  check_name_inputHandle:function(e){
    if (e.detail.value == "") {
      this.setData({
        fouced: false
      });
    } else {
      this.setData({
        fouced: true
      });
    }
  },
  submit:function(e){
    var self = this;
    //判断地址列表是否大于10
    var player_num = (e.detail.value.player_num).replace(/\s/g, '');
    if (player_num == '' ) {
      wx.showToast({
        title: "信息不能为空",//这里打印出登录成功
        image: '/assets/index/warning.jpg',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else{
      self.setData({ turn_true: true });
      wx.showLoading({
        title: '检验中',
        mask: true
      })
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("verify.n",
          {
            "userId": app.globalData.userId,
            "joinNumber": player_num
          }, true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            console.log(back);
            if (back.isNumber==true){
              wx.hideToast();
              self.setData({ turn_true: false });
              wx.redirectTo({ url: '../group_travel/group_travel' })
            }else{
              
              wx.showToast({
                title:  "验证失败",//这里打印出登录成功
                image: '/assets/index/warning.jpg',
                duration: 1000
              })
              setTimeout(function () {
                wx.hideToast()
              }, 2000)
              self.setData({ turn_true: false });
            }  
          }
          else {
            //请求出错了
            wx.showToast({
              title: "请求出错",//这里打印出登录成功
              image: '/assets/index/warning.jpg',
              duration: 1000
            })
            wx.hideToast();
            self.setData({ turn_true: false });
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})