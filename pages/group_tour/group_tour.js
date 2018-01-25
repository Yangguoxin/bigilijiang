// group_tour.js
var requestdao = require('../../dao/requestdao.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_Url: null,
    brief_list:null,
    tour_type:null,
    group_travel_Id: null,
    hight_travel_Id: null,
    page_num: 1,
    page_size: 7,
    //分页加载的开关
    scroll_loading: true,
    page_count: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (JSON.stringify(options) != "{}"){
      app.globalData.global_tour_type = 180;
    }
    this.setData({
      image_Url: app.globalData.global_Img_Url,
      tour_type: app.globalData.global_tour_type,
      hight_travel_Id: app.globalData.global_hight_travel_Id,
      group_travel_Id: app.globalData.global_group_travel_Id
    });
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("product.l",
        {
          "sellerId": app.globalData.global_merchant_Id,
          "categoryId": app.globalData.global_tour_type,
          "page": 1,
          "size": self.data.page_size
        }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          var order_list_tmp = [];
          if (back.reCode == "00") {
            order_list_tmp[0] = back.products;
            self.setData({
              brief_list: order_list_tmp
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
  recommHandler: function (e) {
    var num = e.target.dataset.num;
    var index = e.target.dataset.index;
    if (num != undefined && index != undefined){
      app.globalData.global_tour_productId = null;
      app.globalData.global_tour_productId = this.data.brief_list[num][index].id;

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
      app.globalData.global_tour_productId = null;
      app.globalData.global_tour_productId = this.data.brief_list[num].id;
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
  scroll_page:function(){
    var self = this;
    if (this.data.scroll_loading == true && (this.data.brief_list[this.data.page_count - 1].length == this.data.page_size)) {
      self.setData({
        scroll_loading: false
      });
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("product.l", {
          "sellerId": app.globalData.global_merchant_Id,
          "categoryId": app.globalData.global_tour_type,
          "page": (this.data.page_count + 1),
          "size": 5
        }, true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            var order_list_tmp = [];
            // order_list_tmp[0] = new Array();
            order_list_tmp = self.data.brief_list;
            order_list_tmp[self.data.page_count] = back.products;
            self.setData({
              brief_list: order_list_tmp,
              scroll_loading: true,
              page_count: (self.data.page_count + 1)
            });
            console.log(self.data.brief_list)
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