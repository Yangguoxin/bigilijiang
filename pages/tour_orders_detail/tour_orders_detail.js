// pages/tour_orders_detail/tour_orders_detail.js
var app = getApp();
var requestdao = require('../../dao/requestdao.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    product_detail:null,
    button_loading:false
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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("order.d", {
        "userId": app.globalData.userId,
        "orderId": app.globalData.global_order_id
      }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          if (back.reCode == '00') {
            wx.hideToast();
            self.setData({
              product_detail: back.order
            })
          } else {
            wx.showToast({
              title: back.reMsg,//这里打印出登录成功
              image: '/assets/index/warning.jpg',
              duration: 1000
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          }
        }
        else {
          //请求出错了

        }

      }
    })
  },
  cancelHandle:function(){
    var self = this;
    wx.showModal({
      title: '提示',
      content: '确认取消',
      success: function (res) {
        if (res.confirm) {
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
                app.globalData.global_order_list_flash = "yes";
                var back = res.data;
                console.log(back)
                self.onShow();

              }
              else {
                //请求出错了

              }

            }
          })
          console.log('用户点击确定')
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  goto_pay:function(){
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
          if (res.data.return_code == "00") {
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
                  duration: 300
                })
                setTimeout(function () {
                  wx.hideToast()
                  self.onShow();
                  app.globalData.global_order_list_flash = "yes";
                  self.setData({ button_loading: false });
                }, 500)
              },
              'fail': function (res) {
                self.setData({ button_loading: false });
                console.log(res.errMsg);
              },
              'complete': function (res) {
                wx.showToast({
                  title: "支付已经取消",
                  image: '/assets/index/warning.jpg',
                  duration: 300
                })
                setTimeout(function () {
                  wx.hideToast()
                  self.setData({ button_loading: false });
                }, 500)
                console.log(res.errMsg);
              }
            })

          } else {
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
  goto_comment: function (e) {
    app.globalData.global_productId_id = this.data.product_detail.products[0].id;
    app.globalData.global_sellerId = this.data.product_detail.sellerId;
    app.globalData.global_productId = this.data.product_detail.products[0].productId;
    app.globalData.global_goods_detail = this.data.product_detail.products[0];
    console.log(app.globalData.global_productId);
    wx.navigateTo({
      url: '../write_goods_comments/wirte_goods_comments'
    })

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