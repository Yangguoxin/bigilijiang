// pages/route_list/route_list.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brief_list: []
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
    this.setData({ image_Url: app.globalData.global_Img_Url });
    var self = this;
    wx.request({
      url: app.globalData.global_Url + '/iTour/route/brief/list', //仅为示例，并非真实的接口地址
      data: {
        routeType: 1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          self.setData({ brief_list: back });
          console.log(self.data.brief_list);
        }
        else {
          //请求出错了
        }

      }
    })
  },
  recommHandler: function (e) {
    var num = e.target.dataset.num;
    //全局变量还原后再赋值
    app.globalData.choosed_route = null;
    app.globalData.choosed_route = this.data.brief_list[num].id;
    //表示从数据库中读取的推荐线路
    app.globalData.route_price = this.data.brief_list[num].discountPrice;
    app.globalData.global_route_name = this.data.brief_list[num].name;
    app.globalData.global_day_introduction = this.data.brief_list[num].introduction;
    app.globalData.user_choosed_flag = 1;
    console.log(app.globalData.route_price);
    wx.navigateTo({
      url: '../recommend/recommend'
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