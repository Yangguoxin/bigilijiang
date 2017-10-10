// pages/address/address.js
var requestdao = require('../../dao/requestdao.js');
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      person_address_list:[]
  },
  add_address:function(){
    if (this.data.person_address_list.length <= 9){
      wx.navigateTo({
        url: '../add_address/add_address'
      })
    }else{
      wx.showToast({
        title: "地址最多10个",//这里打印出登录成功
        image: '/assets/index/warning.jpg',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }
    
  },
  change_defualt:function(e){
  },
  choose_addressHandle:function(e){
    var num = e.target.dataset.num;
    if(num != undefined){
      app.globalData.global_choose_address = this.data.person_address_list[num];
      app.globalData.global_choose_address_switch = "ok";
      wx.navigateBack({
        delta: 1
      });
    }
  },
  modify_addressHandle:function(e){
    var num = e.target.dataset.num;
    if (num != undefined){
      app.globalData.global_modify_address = this.data.person_address_list[num];
      wx.navigateTo({
        url: '../modify_address/modify_address'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("address.l", {
        "userId": app.globalData.userId,
        "page": 1,
        "size": 6,
      }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          console.log(back);
          app.globalData.global_address_num = back.addresss.length;
          for (var i = 0; i < back.addresss.length;i++){
            console.log(back.addresss.isChoose);
            if (back.addresss[i].id == app.globalData.global_choose_address_id){
              back.addresss[i].isChoose = true;
            }else{
              back.addresss[i].isChoose = false;
            }
          }
          console.log(back.addresss);
          self.setData({
            person_address_list: back.addresss
          });
        }
        else {
          //请求出错了

        }

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
    
    //检测到有地址修改，就重新加载
    if (app.globalData.global_add_to_address=="yes"){
      app.globalData.global_add_to_address="no";
      var self = this;
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("address.l", {
          "userId": app.globalData.userId,
          "page": 1,
          "size": 10,
        }, true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            app.globalData.global_address_num = back.addresss.length;
            console.log(back);
            for (var i = 0; i < back.addresss.length; i++) {
              console.log(back.addresss.isChoose);
              if (back.addresss[i].id == app.globalData.global_choose_address_id) {
                back.addresss[i].isChoose = true;
              } else {
                back.addresss[i].isChoose = false;
              }
            }
            console.log(back.addresss);
            self.setData({
              person_address_list: back.addresss
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