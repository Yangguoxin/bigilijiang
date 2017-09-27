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
    button_loading: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    var address_information = {
      id: 1,
      personName: "杨国鑫",
      telephone: "18685961601",
      addressProvince: "上海市",
      addressCity: "上海市",
      addressCountry: "松江区",
      detailAddress: "三新北1800弄16号楼4025",
      ifDefualt: 1,
      ifChoose: 1,
      
    };
    this.setData({ defualt_information: address_information})
    
  },
  choose_addressHandle:function(){
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
    if (app.globalData.global_choose_address_switch == "ok"){
      this.setData({ defualt_information: app.globalData.global_choose_address })
      console.log(app.globalData.global_choose_address);
      app.globalData.global_choose_address_switch = "no";
    }
  },
  place_order:function(){
    var self = this;
    self.setData({ button_loading: true });
    wx.request({
      url: 'http://119.62.125.201:8888/YYAPI/phone/api.do',
      data: requestdao.setParamsData("submit.order", { "isPost": false, "openId": app.globalData.openId, "userId": app.globalData.userId , "products": [{ "productId":524 ,"num":1,"time":"2017-09-26"}] }, true),
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
        }
        else {
          //请求出错了

        }

      }
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