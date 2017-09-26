// pages/travel/travel.js

var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    choose_delete:[],
    updown: [],
    recommend_data: "",
    score_change: [],
    start_status: [],
    distance:[],
    image_Url: null
  },
  onShow:function(){
    this.setData({ image_Url: app.globalData.global_Img_Url });
    if (app.globalData.jump_to_index == "ok") {
        //刷新页面
      wx.showLoading({
        title: '加载中',
      });
      var self = this;
      wx.request({
        url: app.globalData.global_Url + '/iTour/user/route/detail/search', //仅为示例，并非真实的接口地址
        data: {
          routeId: app.globalData.choosed_route,
          userId: app.globalData.userId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode == 200) {
            wx.hideLoading();
            var back = res.data;
            var updown_tmp = [];
            var choose_tmp = [];
            console.log(self);
            self.data.updown = app.globalData.global_updown;
            //这里是设置默认展示线路的第一个景点，其他的都是隐藏的
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

            for (var i = 0; i < back.length; i++) {
              choose_tmp[i] = new Array();
              for (var j = 0; j < back[i].scenery.length; j++)
                choose_tmp[i][j] = '0';

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
            self.setData({
              recommend_data: back,
              updown: self.data.updown,
              choose_delete: choose_tmp,
              score_change: self.data.score_change,
              start_status: self.data.start_status,
              distance: self.data.distance
            });
            console.log(back);
            //console.log(self.data.choose_delete);
          }
          else {
            //访问出错了
          }

        }
      })
        app.globalData.jump_to_index = "no";
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.category = null;
    app.globalData.currmerchantId = null;
    wx.showLoading({
      title: '加载中',
    });
    var self = this;
    wx.request({
      url: app.globalData.global_Url +'/iTour/user/route/detail/search', //仅为示例，并非真实的接口地址
      data: {
        routeId: app.globalData.choosed_route,
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if(res.statusCode == 200){
          wx.hideLoading();
          var back = res.data;
          var updown_tmp = [];
          var choose_tmp = [];
          console.log(self);
          //这里是设置默认展示线路的第一个景点，其他的都是隐藏的
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

          for (var i = 0; i < back.length; i++) {
            choose_tmp[i]=new Array();
            for (var j = 0; j < back[i].scenery.length;j++)
                choose_tmp[i][j] = '0';
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
          self.setData({ recommend_data: back,
                         updown: updown_tmp, 
                         choose_delete: choose_tmp, 
                         score_change: self.data.score_change, 
                         start_status: self.data.start_status,
                         distance:self.data.distance
                         });
          console.log(back);
          //console.log(self.data.choose_delete);
        }
        else{
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
  deleteHandle:function(e){
    var num = e.target.dataset.num;
    var self = this;
    this.data.choose_delete[0][num] = '1';
    this.setData({ choose_delete: this.data.choose_delete });
    var all_object = [{}];
    var object_day = {
      dayNum: null,
      change: []
    };
    object_day.dayNum = this.data.recommend_data[0].day;
    object_day.change.push({
      merchantId: this.data.recommend_data[0].scenery[num].id,
      operation: 2,
      indexNum: this.data.recommend_data[0].scenery[num].index,
    });
    all_object[0] = object_day;
    var json_object_day = JSON.stringify(all_object);

    wx.request({
      url: app.globalData.global_Url + '/iTour/user/route/detail/modify',
      data: {
        userId: app.globalData.userId,
        routeId: app.globalData.choosed_route,
        detail: json_object_day
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '成功',
            image: '/assets/index/success.jpg',
            duration: 1000,
            success: function (res) {
              for (var i = num; i < self.data.recommend_data[0].scenery.length;i++){
                if (self.data.recommend_data[0].scenery[i].index > self.data.recommend_data[0].scenery[num].index)
                  self.data.recommend_data[0].scenery[i].index-=1;
              }
              self.setData({ recommend_data: self.data.recommend_data }); 
              app.globalData.global_updown = self.data.updown;
              app.globalData.jump_to_index = "ok" 
              self.onShow();
            }
            
          })
        }
        else {
          wx.showToast({
            title: '失败',
            image: '/assets/index/warning.jpg',
            duration: 1000
          })
        }

      }
    });

  },
  deleteHandle_second:function(e) {
    var num = e.target.dataset.num;
    var id = e.target.dataset.id;
    var self = this;
    this.data.choose_delete[id][num] = '1';
    this.setData({ choose_delete: this.data.choose_delete });
    var all_object = [{}];
    var object_day = {
      dayNum: null,
      change: []
    };
    object_day.dayNum = this.data.recommend_data[id].day;
    object_day.change.push({
      merchantId: this.data.recommend_data[id].scenery[num].id,
      operation: 2,
      indexNum: this.data.recommend_data[id].scenery[num].index,
    });
    all_object[0] = object_day;
    var json_object_day = JSON.stringify(all_object);

    wx.request({
      url: app.globalData.global_Url + '/iTour/user/route/detail/modify',
      data: {
        userId: app.globalData.userId,
        routeId: app.globalData.choosed_route,
        detail: json_object_day
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '成功',
            image: '/assets/index/success.jpg',
            duration: 1000,
            success: function (res) {
              for (var i = num; i < self.data.recommend_data[id].scenery.length; i++) {
                if (self.data.recommend_data[id].scenery[i].index > self.data.recommend_data[id].scenery[num].index)
                  self.data.recommend_data[id].scenery[i].index -= 1;
              }
              self.setData({ recommend_data: self.data.recommend_data });
              app.globalData.global_updown = self.data.updown;
              app.globalData.jump_to_index = "ok"
              self.onShow();
            
            }
          })
        }
        else {
          wx.showToast({
            title: '失败',
            image: '/assets/index/warning.jpg',
            duration: 1000
          })
        }

      }
    });
  },
  choose_sceneryHandle:function(){
    app.globalData.scenery_object = this.data.recommend_data;
    app.globalData.global_updown = this.data.updown;
    wx.navigateTo({
      url: '../choose_scenery/choose_scenery'
    })
  },
  modifyHandle:function(e){
    var num = e.target.dataset.num;
    app.globalData.scenery_object = this.data.recommend_data;
    app.globalData.global_updown = this.data.updown;
    app.globalData.modify_day_index = 0;
    app.globalData.modify_scenery = num;
    app.globalData.global_type = this.data.recommend_data[0].scenery[num].category;
    wx.navigateTo({
      url: '../modify_scenery/modify_scenery'
    })
  },

  modifyHandle_second: function (e) {
    var num = e.target.dataset.num;
    var id = e.target.dataset.id;
    app.globalData.scenery_object = this.data.recommend_data;
    app.globalData.global_updown = this.data.updown;
    app.globalData.modify_day_index = id;
    app.globalData.modify_scenery = num;
    app.globalData.global_type = this.data.recommend_data[id].scenery[num].category;
    wx.navigateTo({
      url: '../modify_scenery/modify_scenery'
    })
  },

  delete_travelHandle:function(){
    wx.showModal({
      title: '提示',
      content: '是否删除整个行程',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.global_Url + '/iTour/user/route/brief/delete',
            data: {
              userId: app.globalData.userId,
              routeId: app.globalData.delete_routeId,
              id: app.globalData.delete_id
            },
            method: 'POST',
            header: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
              
              if (res.statusCode == 200) {
                wx.showToast({
                  title: '成功',
                  image: '/assets/index/success.jpg',
                  duration: 1000,
                  success: function (res) {
                      wx.navigateBack({
                        delta: 1
                      })
                  }
                })
              }
              else {
                wx.showToast({
                  title: '失败',
                  image: '/assets/index/warning.jpg',
                  duration: 1000
                })
              }

            }
          });
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
    
  },


  onUnload: function () {
    // var index = 0;
    // var all_object = [{}];
    // for (var i = 0; i < this.data.choose_delete.length;i++){
    //   var object_day = {
    //     dayNum: null,
    //     change: []
    //   };
    //   for (var j = 0; j < this.data.choose_delete[i].length; j++){
    //     if (this.data.choose_delete[i][j] == '1')
    //           {
    //             object_day.dayNum=i + 1;
    //             object_day.change.push({
    //               merchantId: this.data.recommend_data[i].scenery[j].id,
    //               operation: 2,
    //               indexNum: j+1,
    //             });
    //           } 
    //   }
    //   if (object_day.dayNum != null){
    //     all_object[index] = object_day;
    //     index++;
    //   }
        
    // }

    //console.log(test);  
  },


})