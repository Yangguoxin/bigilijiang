// pages/travel/travel.js

var app = getApp()
var QQMapWX = require('../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodes_image: "/images/xq.jpg",
    goodes_detail: "/images/js.jpg",
    merchant_detail: [{
      id: 1,
      imageUrl: "/images/routeDetail/high_route1_1.jpg"
    },
    {
      id: 2,
      imageUrl: "/images/routeDetail/high_route1_2.jpg"
    },
    {
      id: 3,
      imageUrl: "/images/routeDetail/high_route1_3.jpg"
    },
    {
      id: 4,
      imageUrl: "/images/routeDetail/high_route1_4.jpg"
    }
    ],
    second_page: false,
    scroll_switch: true,
    current_choose: 0,
    route_name:null,
    route_discription:null,
    /////////////////
    image_Url: null,
    price: null,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //用来保存每一天的描述
    app.globalData.category = null;
    app.globalData.currmerchantId = null;
    var day_introduction = app.globalData.global_day_introduction;
    day_introduction = day_introduction.split("，");
    console.log(day_introduction);
    this.setData({
      image_Url: app.globalData.global_Img_Url,
      price: app.globalData.route_price,
      route_discription: app.globalData.global_route_discription,
      route_name: app.globalData.global_route_name
    });
    qqmapsdk = new QQMapWX({
      key: 'I6JBZ-NP734-DIFU2-XNDVZ-YJ3PH-VDB62'
    });


    var self = this;
    

  },
  /*实现折叠效果*/
  
  
  
  place_order: function (res) {
    wx.navigateTo({
      url: '../order/order'
    })
  },
  scroll_bottom: function () {
    if (this.data.scroll_switch == true) {
      this.setData({
        trun_true: false,
        scroll_switch: false,
        second_page: true
      });
      console.log("test");
    }

  },
  check_dateHandle: function () {
    wx.navigateTo({
      url: '../canlender/canlender'
    })
  }
})
