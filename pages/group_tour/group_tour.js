// group_tour.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_Url: null,
    brief_list:null,
    tour_type:null
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
    this.setData({ image_Url: app.globalData.global_Img_Url,tour_type:app.globalData.global_tour_type });
    var self = this;
    wx.request({
      url: app.globalData.global_Url + '/iTour/route/brief/list', //仅为示例，并非真实的接口地址
      data: {
        routeType: app.globalData.global_tour_type
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
          console.log("group_tour.js--/iTour/route/brief/list--请求出错");
        }

      }
    })
  },
  recommHandler: function (e) {
    var num = e.target.dataset.num;
    //全局变量还原后再赋值
    if(num!=null){
      app.globalData.choosed_route = null;
      app.globalData.choosed_route = this.data.brief_list[num].id;
      //表示从数据库中读取的推荐线路
      app.globalData.route_price = this.data.brief_list[num].discountPrice;
      app.globalData.global_route_name = this.data.brief_list[num].name;
      app.globalData.global_day_introduction = this.data.brief_list[num].introduction;
      app.globalData.global_route_discription = this.data.brief_list[num].description;
      console.log(app.globalData.route_price);
      wx.redirectTo({ url: '../group_travel/group_travel' })
      // wx.navigateTo({
      //   url: '../recommend/recommend'
      // })
    }
  },
  high_travel:function(e) {
    var num = e.target.dataset.num;
    //全局变量还原后再赋值
    if (num != null) {
      app.globalData.choosed_route = null;
      app.globalData.choosed_route = this.data.brief_list[num].id;
      //表示从数据库中读取的推荐线路
      app.globalData.route_price = this.data.brief_list[num].discountPrice;
      app.globalData.global_route_name = this.data.brief_list[num].name;
      app.globalData.global_day_introduction = this.data.brief_list[num].introduction;
      app.globalData.global_route_discription = this.data.brief_list[num].description;
      console.log(app.globalData.route_price);
      wx.redirectTo({ url: '../high_travel/high_travel' })
      // wx.navigateTo({
      //   url: '../high_travel/high_travel'
      // })
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