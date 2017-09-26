// pages/travel/travel.js

var app=getApp()
var logindao = require('../../dao/logindao.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brief_list:[],
    image_Url: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },
  recommHandler: function (e) {
    var num = e.target.dataset.num;
    console.log(num);
    //全局变量还原后再赋值
    app.globalData.choosed_route = null;
    app.globalData.choosed_route = this.data.brief_list[num].id;
    app.globalData.delete_id = this.data.brief_list[num].id;
    app.globalData.delete_userId = this.data.brief_list[num].userId;
    app.globalData.delete_routeId = this.data.brief_list[num].routeBriefId;
    console.log(app.globalData.delete_routeId, app.globalData.delete_userId);
    //表示用户选择的路线，而不是从数据库中list的所有线路
    app.globalData.user_choosed_flag = 0;
    console.log(app.globalData.choosed_route);
    wx.navigateTo({
      url: '../user_choose_route/user_choose_route'
    })

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.setData({ image_Url: app.globalData.global_Img_Url });
    logindao.check_user(res => {
      var self = this;
      wx.request({
        url: app.globalData.global_Url + '/iTour/user/route/brief/list', //仅为示例，并非真实的接口地址
        data: {
          userId: app.globalData.userId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            self.setData({ brief_list: back });
            console.log(self.data.brief_list);
          }
          else {
            //访问出错了
          }
        }
      })
    })
    
  },
  Add_travel:function(){
    app.globalData.jump_to_index = "ok";
    wx.switchTab({
      url: '../index/index'
    })
    // wx.navigateTo({
    //   url: '../route_list/route_list'
    //  })
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