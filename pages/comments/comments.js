var QQMapWX = require('../lib/qqmap-wx-jssdk.js');
var qqmapsdk;
var app = getApp()
Page({
  data: {
      detail_data:"",
      nav_score_change: [],
      start_status: ["star0.png", "star0.png", "star0.png", "star0.png", "star0.png"],
      user_start_status: [],
      user_switch:[],
      description: "v4-des",
      up_down: "arrow_down.png",
      latitude:"",
      longitude:"",
      time_stamp:[],
      markers: [{
        iconPath: "/assets/index/location.jpg",
        id: 0,
        latitude: 26.876147,
        longitude: 100.233433,
        width: 32,
        height: 32,
        image_Url: null
      }]

  },
  onLoad: function (options) {
      
    if (options.merchantId){
      app.globalData.currmerchantId = options.merchantId;
    }
    console.log(options);
    qqmapsdk = new QQMapWX({
      key: 'I6JBZ-NP734-DIFU2-XNDVZ-YJ3PH-VDB62'
    });
    this.setData({ image_Url: app.globalData.global_Img_Url });
    var self = this;
    this.mapCtx = wx.createMapContext('myMap');
    //防止加载时出现问题
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    wx.request({
      url: app.globalData.global_Url + '/iTour/merchant/detail/search', //仅为示例，并非真实的接口地址
      data: {
        merchantId: app.globalData.currmerchantId,
        category: app.globalData.category
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;

          var score_tmp;
          score_tmp = parseFloat(back.score);
          self.data.nav_score_change = score_tmp.toFixed(1);
          score_tmp = score_tmp.toFixed(0);
          switch (score_tmp) {
            case "1":
              self.data.start_status = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
              break;
            case "2":
              self.data.start_status = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
              break;
            case "3":
              self.data.start_status = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
              break;
            case "4":
              self.data.start_status = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
              break;
            case "5":
              self.data.start_status = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
              break;
            case "6":
              self.data.start_status = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
              break;
            case "7":
              self.data.start_status = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
              break;
            case "8":
              self.data.start_status = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
              break;
            case "9":
              self.data.start_status = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
              break;
            case "10":
              self.data.start_status = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
              break;
          }

          //用户评星
          for (var n = 0; n < back.comment.length; n++) {
            var score_tmp_user;
            //时间戳转换
            self.data.time_stamp[n] = new Date(parseInt(back.comment[n].time)).toLocaleDateString()
            score_tmp_user = parseFloat(back.comment[n].score);
            score_tmp_user = score_tmp_user.toFixed(0);
            self.data.user_start_status[n] = new Array();
            self.data.user_switch[n] = "on";
            switch (score_tmp_user) {
              case "1":
                self.data.user_start_status[n] = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "2":
                self.data.user_start_status[n] = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "3":
                self.data.user_start_status[n] = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "4":
                self.data.user_start_status[n] = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "5":
                self.data.user_start_status[n] = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                break;
              case "6":
                self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                break;
              case "7":
                self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                break;
              case "8":
                self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                break;
              case "9":
                self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                break;
              case "10":
                self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                break;
            }
          }
          self.data.latitude = back.latitude;
          self.data.longitude = back.longitude;
          self.data.markers[0].latitude = back.latitude;
          self.data.markers[0].longitude = back.longitude;
          self.setData({
            detail_data: back,
            nav_score_change: self.data.nav_score_change,
            start_status: self.data.start_status,
            user_start_status: self.data.user_start_status,
            user_switch: self.data.user_switch,
            latitude: self.data.latitude,
            longitude: self.data.longitude,
            markers: self.data.markers,
            time_stamp: self.data.time_stamp
          });
          wx.hideLoading();
          console.log(self.data.longitude);
          console.log(self.data.latitude);
          console.log(self.data.markers);
        }
        else {
          //访问出错了
        }

      }
    }) 
  },
  onShow:function(){
      this.setData({ image_Url: app.globalData.global_Img_Url });
      var self = this;
      if (app.globalData.jump_to_comments == "ok"){
        this.mapCtx = wx.createMapContext('myMap');
        //防止加载时出现问题
        wx.showLoading({
          title: '加载中',
          mask: true
        });
        wx.request({
          url: app.globalData.global_Url + '/iTour/merchant/detail/search', //仅为示例，并非真实的接口地址
          data: {
            merchantId: app.globalData.currmerchantId,
            category: app.globalData.category
          },
          header: {
            'content-type': 'application/json'
          },
          success: function (res) {
            if (res.statusCode == 200) {
              var back = res.data;

              var score_tmp;
              score_tmp = parseFloat(back.score);
              self.data.nav_score_change = score_tmp.toFixed(1);
              score_tmp = score_tmp.toFixed(0);
              switch (score_tmp) {
                case "1":
                  self.data.start_status = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "2":
                  self.data.start_status = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "3":
                  self.data.start_status = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "4":
                  self.data.start_status = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "5":
                  self.data.start_status = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                  break;
                case "6":
                  self.data.start_status = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                  break;
                case "7":
                  self.data.start_status = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                  break;
                case "8":
                  self.data.start_status = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                  break;
                case "9":
                  self.data.start_status = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                  break;
                case "10":
                  self.data.start_status = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                  break;
              }

              //用户评星
              for (var n = 0; n < back.comment.length; n++) {
                var score_tmp_user;
                //时间戳转换
                self.data.time_stamp[n] = new Date(parseInt(back.comment[n].time)).toLocaleDateString()
                score_tmp_user = parseFloat(back.comment[n].score);
                score_tmp_user = score_tmp_user.toFixed(0);
                self.data.user_start_status[n] = new Array();
                self.data.user_switch[n] = "on";
                switch (score_tmp_user) {
                  case "1":
                    self.data.user_start_status[n] = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                    break;
                  case "2":
                    self.data.user_start_status[n] = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                    break;
                  case "3":
                    self.data.user_start_status[n] = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                    break;
                  case "4":
                    self.data.user_start_status[n] = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                    break;
                  case "5":
                    self.data.user_start_status[n] = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                    break;
                  case "6":
                    self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                    break;
                  case "7":
                    self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                    break;
                  case "8":
                    self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                    break;
                  case "9":
                    self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                    break;
                  case "10":
                    self.data.user_start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                    break;
                }
              }
              self.data.latitude = back.latitude;
              self.data.longitude = back.longitude;
              self.data.markers[0].latitude = back.latitude;
              self.data.markers[0].longitude = back.longitude;
              self.setData({
                detail_data: back,
                nav_score_change: self.data.nav_score_change,
                start_status: self.data.start_status,
                user_start_status: self.data.user_start_status,
                user_switch: self.data.user_switch,
                latitude: self.data.latitude,
                longitude: self.data.longitude,
                markers: self.data.markers,
                time_stamp: self.data.time_stamp
              });
              app.globalData.jump_to_comments = "no";
              wx.hideLoading();
              console.log(self.data.longitude);
              console.log(self.data.latitude);
              console.log(self.data.markers);
            }
            else {
              app.globalData.jump_to_comments = "no";
              //访问出错了
            }

          }
        })   
      }
      
  },
  write_comments:function(){
    app.globalData.currscenery = this.data.detail_data;
    wx.navigateTo({
      url: '../write_comments/write_comments'
    })
  },
  all_commentsHandel:function(){
    wx.navigateTo({
      url: '../all_comments/all_comments'
    })
  },
  change_cssHandle:function(e){
    if (this.data.up_down =="arrow_down.png"){
      this.data.up_down = "arrow_up.png";
      this.data.description = "v4-des_change";
    }
      
    else{
      this.data.up_down = "arrow_down.png";
      this.data.description = "v4-des";
    }
    this.setData({ up_down: this.data.up_down, description: this.data.description});
  
  },
  openMapHandle:function(){
    wx.openLocation({
      scale: 18,
      latitude: this.data.latitude,
      longitude: this.data.longitude,
      name: this.data.detail_data.name,
      address: this.data.detail_data.address
    });
  }
  
})