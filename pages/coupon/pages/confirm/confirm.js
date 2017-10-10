var app = getApp();
var logindao = require('../../../../dao/logindao.js');
Page({
  data:{
    inputdata: null,
    state:true,
    validate:false,
    validated:true,
    serviceState:"请等待客服为您预定",
    prizeCode:null,
    confirmTime:null,
    hotelName: "小宝贝",
    hotelAddress: "小宝贝",
    hotelPhone:null,
    guestName: "小宝贝",
    guestDate: "小宝贝",
    servicePhone:"17687047788"

  },
  codeInput: function (e) {
    this.setData({
      inputdata: e.detail.value
    })
  },
  change:function(){
    this.setData({
      validate: !(this.data.validate),
      validated: !(this.data.validated)
    })
  },
  tooList:function(){
    wx.navigateTo({
      url: '../list/list'
    })
  },
  toorder: function () {
    var that = this;
    wx.request({
      url: app.globalData.global_Url + '/iTour/prize/verifyCode', //兑奖码验证接口
      data: {
        weixinId:app.globalData.openId,
        prizeCode: this.data.inputdata,
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:"post",
      success: function (res) {
        
        if (res.data.result=="valid") {
          wx.showToast({
            title: "验证成功",//这里打印出登录成功
            icon: 'success',
            duration: 1000
          })
          setTimeout(function () {
            wx.hideToast()
            wx.navigateTo({
              url: '../list/list',
            })
            
          }, 2000)
          
        }
        else{
          wx.showToast({
            title: '您没有中奖',
            image: '../../../../assets/index/warning.jpg',
            duration: 1000,
          })
        }
      }
    })
  },
  onShow: function () {
    if (app.globalData.global_coupon_switch == "ok"){
      app.globalData.global_coupon_switch = "on";
      logindao.check_user(res => {
        console.log(res);
        this.get_user_info(res);
      });
    }
  },
  onLoad: function (options) {
    logindao.check_user(res => {
      console.log(res);
      this.get_user_info(res);
    });
  }, 
  get_user_info:function(e){
    var that = this;
      console.log(e.openId);
      wx.request({
        url: app.globalData.global_Url + '/iTour/prize/login', //兑奖入口登录请求接口
        data: {
          weixinId: e.openId
        },
        header: {
          'content-type': 'application/json' // 默认值
        },
        method: "post",
        success: function (res) {
          console.log(res.data.status)
          if (res.data.status == "0") {
            that.setData({
              validate: false,
              validated: true,
            })
          } else if (res.data.status == "1") {
            console.log("状态1");
            that.setData({
              validate: true,
              validated: false,
              state:true,
              serviceState: "请等待客服为您预定",
              prizeCode: res.data.prizeCode,
              confirmTime: res.data.commitTime,
            })
          } else {
            console.log("状态2");
            that.setData({
              validate: true,
              validated: false,
              state:false,
              serviceState: "客服已为您预定",
              prizeCode: res.data.prizeCode,
              confirmTime: res.data.commitTime,
              hotelName: res.data.hotelName,
              hotelAddress: res.data.hotelAddress,
              hotelPhone: res.data.hotelPhone,
              guestName: res.data.guestName,
              guestDate: res.data.guestDate,
            })
          }
        }
      })
    }
  
})