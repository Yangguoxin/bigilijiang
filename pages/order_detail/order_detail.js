// order_detail.js
var app = getApp();
var requestdao = require('../../dao/requestdao.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_detail:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.global_order_id != null){
      var self=this;
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("order.d", {
          "userId": app.globalData.userId,
          "orderId": app.globalData.global_order_id,
        }, true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            self.setData({
              order_detail: back.order
            });
          }
          else {
            //请求出错了

          }

        }
      })
    }
    
  },
  copy_goods_num:function(){
    wx.setClipboardData({
      data: '6222022409003038180',
      success: function (res) {

        wx.showToast({
          title: '您已复制',
          image: '/assets/index/success.jpg',
          duration: 1000,
        })
        setTimeout(function () { 
          wx.hideToast();
          wx.getClipboardData({
            success: function (res) {
              console.log(res.data) // data
            }
          })

         }, 1500);
        
      }
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