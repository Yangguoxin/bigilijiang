// me.js
var app=getApp();
var logindao = require('../../dao/logindao.js');
var requestdao = require('../../dao/requestdao.js');
var md5 = require('../../dao/md5.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    test:null,
    nickName: null,
    avatarUrl:null,
    rsa_test:"test"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    logindao.check_user(res => {
      this.setData({
        nickName: app.globalData.nickName,
        avatarUrl: app.globalData.avatarUrl
      });
    })
    
    
  },
  all_orders_Handle:function(){
    console.log("test");
    wx.navigateTo({
      url: '../order_list/order_list'
    })
  },
  button_test:function(){
    wx.navigateTo({
      url: '../coupon/pages/confirm/confirm'
    })
  },
  button_news:function(){
    wx.navigateTo({
      url: '../news/news'
    })
  },
  button_address:function(){
    wx.navigateTo({
      url: '../test_web/test_web'
    })
    
  },
  button_order:function(){
    wx.navigateTo({
      url: '../tour_order/tour_order'
    })
  },
  tour_orders_Handle:function(){
    wx.navigateTo({
      url: '../tour_orders_list/tour_orders_list'
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