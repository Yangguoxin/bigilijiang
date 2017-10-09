// refund.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    route_brief:null,
    imgUrl:null,
    turn_true:false,
    totalFee:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.global_refund_flag = "no";
    console.log(app.globalData.order_sequence);
    this.setData({ 
        totalFee:app.globalData.global_totalFee,
        route_brief:app.globalData.global_route_brief,
        imgUrl: app.globalData.global_Img_Url+app.globalData.global_route_brief.imgUrl
      });
  },
  refund_reason_Handle:function(){
    console.log("refund_reason_Handle is ok");
    wx.navigateTo({
      url: '../refund_reason/refund_reason'
    })

    
  },
  submit_Handle:function(){
    var self = this;
    var currunt_time = (new Date()).valueOf();
    console.log(currunt_time);
    console.log(app.globalData.global_order.travelTime);
    if ((app.globalData.global_order.travelTime - currunt_time  ) < 0){
      wx.showToast({
        title: '订单已失效',
        image: '/assets/index/warning.jpg',
        duration: 1000,
      })
      setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1500);
    }else{
      if (app.globalData.global_refund_reason == null) {
        wx.showToast({
          title: '请选择退款原因',
          image: '/assets/index/warning.jpg',
          duration: 1000,
        })
      } else {
        self.setData({ turn_true: true });
        wx.request({
          url: app.globalData.global_Url + '/iTour/travel/order/refund',
          data: {
            orderSequence: app.globalData.order_sequence,
            reason: app.globalData.global_refund_reason,
            userId: app.globalData.userId
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.statusCode == 200) {
              if (res.data.status == "success") {
                self.setData({ turn_true: false });
                app.globalData.global_refund_flag = "no";
                wx.showToast({
                  title: '退款成功',
                  image: '/assets/index/success.jpg',
                  duration: 2000,
                })
                setTimeout(function () { wx.navigateBack({ delta: 2 }) }, 1500);
                console.log(res);
              }
              else {
                self.setData({ turn_true: false });
                wx.showToast({
                  title: '退款失败',
                  image: '/assets/index/warning.jpg',
                  duration: 1000,
                })
                setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1500);
              }
            }
            else {
              self.setData({ turn_true: false });
              wx.showToast({
                title: '退款失败',
                image: '/assets/index/warning.jpg',
                duration: 1000,
              })
              setTimeout(function () { wx.navigateBack({ delta: 1 }) }, 1500);

              //访问出错了
            }

          }
        });
      }
    }
    
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
    if (app.globalData.global_refund_flag=="no"){
      app.globalData.global_refund_reason = null;
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