// pages/travel/travel.js

var app = getApp()
var QQMapWX = require('../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    goodes_image: "/images/tongyong.jpg",
    merchant_detail: [{
      id: 1,
      imageUrl: "/images/routeBrief/route1.jpg"
    },
    {
      id: 2,
      imageUrl: "/images/routeBrief/route2.jpg"
    },
    {
      id: 3,
      imageUrl: "/images/routeBrief/route3.jpg"
    },
    {
      id: 4,
      imageUrl: "/images/routeBrief/route4.jpg"
    }
    ],
    second_page: false,
    scroll_switch: true,
    information_array: ["goods_information_fix", "goods_information", "goods_information"],
    current_choose: 0,
    route_name: null,
    route_discription: null,
    /////////////////
    updown: [],
    recommend_data: "",
    score_change: [],
    start_status: [],
    distance: [],
    image_Url: null,
    animationData: {},
    price: null,
    day_introduction: []
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
    wx.showLoading({
      title: '加载中',
      mask: 'true'
    });

    var self = this;
    wx.request({
      url: app.globalData.global_Url + '/iTour/route/detail/search', //仅为示例，并非真实的接口地址
      data: {
        routeId: app.globalData.choosed_route,
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {

        if (res.statusCode == 200) {
          wx.hideLoading();
          var back = res.data;
          var updown_tmp = [];

          console.log(self);
          //分数转化为小数点后一位
          for (var m = 0; m < back.length; m++) {
            self.data.score_change[m] = new Array();
            self.data.start_status[m] = new Array();
            for (var n = 0; n < back[m].scenery.length; n++) {
              var score_tmp;
              score_tmp = parseFloat(back[m].scenery[n].score);
              self.data.score_change[m][n] = score_tmp.toFixed(1);
              //判断评的星级
              score_tmp = score_tmp.toFixed(0);
              console.log(score_tmp);
              switch (score_tmp) {
                case "0":
                  self.data.start_status[m][n] = ["star0.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "1":
                  self.data.start_status[m][n] = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "2":
                  self.data.start_status[m][n] = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "3":
                  self.data.start_status[m][n] = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "4":
                  self.data.start_status[m][n] = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "5":
                  self.data.start_status[m][n] = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                  break;
                case "6":
                  self.data.start_status[m][n] = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                  break;
                case "7":
                  self.data.start_status[m][n] = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                  break;
                case "8":
                  self.data.start_status[m][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                  break;
                case "9":
                  self.data.start_status[m][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                  break;
                case "10":
                  self.data.start_status[m][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                  break;
              }
            }
          }
          //这里是设置默认展示线路的第一个景点，其他的都是隐藏的
          for (var i = 0; i < back.length; i++) {
            if (i < 1)
              updown_tmp[i] = '/assets/index/up.png';
            else
              updown_tmp[i] = '/assets/index/down.png';

          }

          for (var m = 0; m < back.length; m++) {
            self.data.distance[m] = new Array();
            var distance_tmp = null;
            for (var n = 0; n < back[m].distance.length; n++) {
              distance_tmp = parseFloat(back[m].distance[n].distance);
              distance_tmp *= 0.001;
              console.log(distance_tmp);
              self.data.distance[m][n] = distance_tmp.toFixed(2);
            }
          }
          //   var distance_tmp = [];
          //   var test = 0;
          //   var test_second = 0;
          // //计算两个景点的距离
          //   for (var m = 0; m < back.length;m++){
          //     self.data.distance[m] = new Array();
          //     distance_tmp[m] = new Array();
          //     for(var n = 0;n < back[m].scenery.length - 1 ;n++){  
          //       console.log(back[m].scenery[n].latitude);
          //       console.log(back[m].scenery[n].longtitude);                                                                    
          //       qqmapsdk.calculateDistance({
          //         mode:'driving',
          //         from: {
          //           latitude: back[m].scenery[n+1].latitude,
          //           longitude: back[m].scenery[n+1].longtitude
          //         },
          //         to: [{
          //           latitude: back[m].scenery[n].latitude,
          //           longitude: back[m].scenery[n].longtitude
          //         }],
          //         success: function (res) {
          //           if (res.status == 0){
          //             distance_tmp[test][test_second] = res.result.elements[0];
          //             if (test_second == (back[test].scenery.length - 2)){
          //                   test++;
          //                   test_second = 0;
          //             }
          //             else{
          //               test_second++;
          //             }
          //             console.log(test);
          //             console.log(distance_tmp);
          //             console.log(res.result.elements[0].distance, res.result.elements[0].from, res.result.elements[0].to, res.result.elements[0].duration);
          //           }
          //         },
          //         fail: function (res) {
          //           console.log(res);
          //         }
          //       });
          //     }
          //   }

          self.setData({
            recommend_data: back,
            updown: updown_tmp,
            score_change: self.data.score_change,
            start_status: self.data.start_status,
            distance: self.data.distance
          });
          console.log(back);
          console.log(self.data.updown);
          console.log(self.data.price);
        }
        else {
          //访问出错了
        }
      }
    })

  },
  /*实现折叠效果*/
  change_updown: function (e) {
    var updown = this.data.updown;
    var num = e.target.dataset.num;
    if (num !== null) {
      if (updown[num] == "/assets/index/up.png") {
        updown[num] = "/assets/index/down.png";
      } else {
        updown[num] = "/assets/index/up.png";
      }
      this.setData({ updown: updown });
    }
  },
  eventHandler: function (e) {
    var num = e.target.dataset.num;
    var tmp = this.data.recommend_data[0].scenery[num].id;
    var tmp_category = this.data.recommend_data[0].scenery[num].category;
    app.globalData.currmerchantId = tmp;
    app.globalData.category = tmp_category;
    wx.navigateTo({
      url: '../comments/comments'
    })
  },
  eventHandler_second: function (e) {
    var num = e.target.dataset.num;
    var id = e.target.dataset.id;
    var tmp = this.data.recommend_data[id].scenery[num].id;
    var tmp_category = this.data.recommend_data[id].scenery[num].category;
    app.globalData.category = tmp_category;
    app.globalData.currmerchantId = tmp;
    wx.navigateTo({
      url: '../comments/comments'
    })
  },
  test_button: function () {
    wx.request({
      url: app.globalData.global_Url + '/iTour/user/route/brief/add',
      data: {
        userId: app.globalData.userId,
        routeId: app.globalData.choosed_route
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.switchTab({
            url: '../travel/travel'
          })
        }
        else {

        }

      }
    });
  },
  place_order: function (res) {
    app.globalData.global_route_information = this.data.recommend_data;
    wx.navigateTo({
      url: '../order/order'
    })
  },
  change_informationHandle: function (e) {
    var num = e.target.dataset.num;
    var information_tmp = [];
    information_tmp = this.data.information_array;
    if (num != undefined) {
      for (var i = 0; i < information_tmp.length; i++) {
        if (i == num)
          information_tmp[i] = "goods_information_fix";
        else
          information_tmp[i] = "goods_information";
      }
      this.setData({ information_array: information_tmp, current_choose: num });
    }
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

  }
})