// order_detail.js
var app = getApp();
var requestdao = require('../../dao/requestdao.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_detail:null,
    button_loading:false,
    cancel_button_loading:false
  },
  cancel_orderHandle:function(){
    var self = this;
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("order.co", {
        "userId": app.globalData.userId,
        "orderId": app.globalData.global_order_id
      }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          console.log(back)
          self.onShow();
        }
        else {
          //请求出错了

        }

      }
    })
  },
  replace_orderHandle:function(){
    var tmp = this.data.order_detail.products[0].productId;
    wx.redirectTo({
      url: '../merchant_detail/merchant_detail'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
  goto_pay:function(){
    console.log("go_to_pay");
    var self = this;
    self.setData({ button_loading: true });
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("order.prepay", {
        "userId": app.globalData.userId,
        "orderId": app.globalData.global_order_id,
        "openId": app.globalData.openId
      }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.return_code == "00"){
              //订单发起微信支付
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,   //字符串随机数
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                'success': function (res) {
                  console.log(res);    //requestPayment:ok==>调用支付成功
                  wx.showToast({
                    title: '支付成功',//这里打印出报名成功
                    image: '/assets/index/success.jpg',
                    duration: 1000
                  })
                  self.setData({ button_loading: false });
                },
                'fail': function (res) {
                  self.setData({ button_loading: false });
                  console.log(res.errMsg);
                },
                'complete': function (res) {
                  self.setData({ button_loading: false });
                  if (res.errMsg == "requestPayment:fail cancel") {
                    wx.showToast({
                      title: "支付已经取消",
                      image: '/assets/index/warning.jpg',
                      duration: 1000
                    })
                  }
                  console.log(res.errMsg);
                }
              })

          }else{
                self.setData({ button_loading: false });
                wx.showToast({
                  title: "支付失败",
                  image: '/assets/index/warning.jpg',
                  duration: 1000
                })
          }
          
        }
        else {
          //请求出错了

        }

      }
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if (app.globalData.global_order_id != null) {
      var self = this;
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