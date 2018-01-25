// pages/match_goods_list/match_goods_list.js
var requestdao = require('../../dao/requestdao.js');
var app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    brief_list: null,
    tour_type: null,
    match_type:null,
    turn_true: false,
    match_goods:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (JSON.stringify(options) != "{}") {

      this.setData({
        match_type: app.globalData.global_match_type_Id,
        match_goods: options.match_goods
      })
      this.get_goods_list();
    }else{
      wx.showToast({
        title: "请求列表出错",
        image: '/assets/index/warning.jpg',
        duration: 300
      })
    }
    
  },
  get_goods_list:function(){
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("verify.pl",
        {
          "productIds": this.data.match_goods
        }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          if (back.code == "00") {
            self.setData({
              brief_list: back.products
            })
            wx.hideToast();
            console.log(back);
          } else {
            wx.showToast({
              title: "请求列表出错",
              image: '/assets/index/warning.jpg',
              duration: 300
            })
            setTimeout(function () {
              wx.hideToast()
            }, 500)
          }
        }
        else {
          //请求出错了
          wx.hideToast();
        }

      }
    })
  },
  verify_user: function () {
    var self = this; 
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("verify.u",
        {
          "userId": app.globalData.userId
        }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          if (back.isDiscount == true) {
            self.setData({ turn_true: false });
            wx.hideToast();
            wx.navigateTo({ url: '../group_travel/group_travel' })
          } else if (back.isDiscount == false) {
            self.setData({ turn_true: false });
            wx.hideToast();
            wx.navigateTo({ url: '../match_verify/match_verify' })
          }
          else{
            self.setData({ turn_true: false });
            wx.showToast({
              title: "请求列表出错",
              image: '/assets/index/warning.jpg',
              duration: 300
            })
            setTimeout(function () {
              wx.hideToast()
            }, 500)
          }
        }
        else {
          //请求出错了
          wx.hideToast();
        }

      }
    })
  },
  match_buyHandle:function(e){
    var num = e.target.dataset.num;
    if (num != undefined ) {
      app.globalData.global_tour_productId = null;
      app.globalData.global_tour_productId = this.data.brief_list[num].id;
      this.setData({ turn_true: true });
      wx.showLoading({
        title: '跳转中',
        mask: true
      });
      if (app.globalData.userId) {
        this.verify_user();
      } else {
        console.log('test');
        var self = this;
        wx.login({
          success: function (res) {
            if (res.code) {
              var code = res.code;
              wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                  var app = getApp();
                  var userInfo = res.userInfo;
                  userInfo.js_code = code;
                  userInfo.appid = "wx122a174956f794cf";
                  userInfo.secret = "130e677645732a9a1265360a4505b19a";
                  app.globalData.nickName = userInfo.nickName;
                  app.globalData.avatarUrl = userInfo.avatarUrl;
                  wx.request({
                    url: app.globalData.global_lijiang_Url,
                    data: requestdao.setParamsData("wechat.login", userInfo, false),
                    method: 'POST',
                    header: {
                      'content-type': 'application/x-www-form-urlencoded'
                    },
                    success: function (res) {
                      if (res.statusCode == 200) {
                        var app = getApp();
                        var tmp = res.data;
                        app.globalData.userId = tmp.id;
                        app.globalData.openId = tmp.openId;
                        self.verify_user();
                      }
                      else {
                        //访问出错了
                      }

                    }
                  });
                }
              });
            }
          }
        });

      }
      // wx.navigateTo({
      //   url: '../recommend/recommend'
      // })
    }
  },
  buyHandle:function(e){
    var num = e.target.dataset.num;
    if (num != undefined) {
      app.globalData.global_tour_productId = null;
      app.globalData.global_tour_productId = this.data.brief_list[num].id;
      wx.navigateTo({ url: '../group_travel/group_travel' })
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