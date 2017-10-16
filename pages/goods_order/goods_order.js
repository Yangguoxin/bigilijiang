// pages/goods_order/goods_order.js
var requestdao = require('../../dao/requestdao.js');
var app =getApp();
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defualt_information:null,
    brief_list:null,
    button_loading: false,
    goods_detail:null,
    goods_type:null,
    goods_num:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    //获取默认的地址
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("address.gd", {
        "userId": app.globalData.userId
      }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          console.log(back);
          app.globalData.global_address_num = 1;
          self.setData({
            defualt_information: back.address
          });
          wx.hideLoading();
        }
        else {
          //请求出错了

        }

      }
    })
    //获取商品信息
    //商品数量
    this.setData({ 
      goods_num: app.globalData.global_goods_num,
      goods_detail: app.globalData.global_goods_detail,
      goods_type: app.globalData.global_goods_type
      });

    
  },
  choose_addressHandle:function(){
    app.globalData.global_choose_address_id = this.data.defualt_information.id;
    console.log(app.globalData.global_choose_address_id);
    wx.navigateTo({
      url: '../address/address'
    })
  },
  add_addressHandle:function(){
    app.globalData.global_order_to_address = "yes";
    wx.navigateTo({
      url: '../add_address/add_address'
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
    //检测用户地址是否还有
    if (app.globalData.global_address_num == 0){
      this.setData({ defualt_information: null })
    }
    if (app.globalData.global_choose_address_switch == "ok"){
      this.setData({ defualt_information: app.globalData.global_choose_address })
      console.log(app.globalData.global_choose_address);
      app.globalData.global_choose_address_switch = "no";
    }
  },
  place_order:function(){
    var self = this;
    if (self.data.defualt_information==null){
      wx.showToast({
        title: "请填写地址",//这里打印出登录成功
        image: '/assets/index/warning.jpg',
        duration: 500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 800)
    }else{

      self.setData({ button_loading: true });
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("submit.order", {
          "isPost": true,
          "addressId": self.data.defualt_information.id,
          "openId": app.globalData.openId,
          "userId": app.globalData.userId,
          "products": [
            {
              "productId": this.data.goods_detail.product.id,
              "num": this.data.goods_num,
              "time": "2017-09-28",
              "tourTime": "2017-09-30"
            }
          ]
        }, true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
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
                  wx.redirectTo({
                    url: '../order_list/order_list'
                  })
                  self.setData({ button_loading: false });
                }, 500)
                
              },
              'fail': function (res) {
                self.setData({ button_loading: false });
                console.log(res.errMsg);
              },
              'complete': function (res) {
                if (res.errMsg == "requestPayment:fail cancel") {
                  wx.showToast({
                    title: "支付已经取消",
                    image: '/assets/index/warning.jpg',
                    duration: 300
                  })
                  setTimeout(function () {
                    wx.hideToast()
                    wx.redirectTo({
                      url: '../order_list/order_list'
                    })
                    self.setData({ button_loading: false });
                  }, 500)
                }
                console.log(res.errMsg);
              }
            })
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