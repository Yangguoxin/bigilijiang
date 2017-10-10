// modify_scenery.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      type_list: [],
      recommend_data:[],
      choose_add: [],
      choose_scenery: [],
      display_scenery: [],
      //这个变量是接收全局景点变量所用
      scenery_list: [],
      scenery_name: [],
      merchan_index: [],
      nav_score_change: [],
      start_status: [],
      image_Url: null
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
      this.setData({ recommend_data: app.globalData.scenery_object});
      console.log(this.data.recommend_data);  
      console.log(this.data.recommend_data[app.globalData.modify_day_index].scenery[app.globalData.modify_scenery].name); 
      console.log(app.globalData.modify_day_index);
      console.log(app.globalData.modify_scenery);
      var self = this;
      //请求所有的景点数据
      wx.showLoading({
        title: '加载中',
        mask: true
      });
      wx.request({
        url: app.globalData.global_Url + '/iTour/merchant/search/category', //仅为示例，并非真实的接口地址
        data: {
          category: "1"
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var back = res.data;
          for (var i = 0; i < back.length; i++) {
            self.data.choose_add[i] = "scenery.png";
            self.data.choose_scenery[i] = "Null";
          }
          for (var n = 0; n < back.length; n++) {
            var score_tmp;
            score_tmp = parseFloat(back[n].score);
            self.data.nav_score_change[n] = score_tmp.toFixed(1);
            score_tmp = score_tmp.toFixed(0);
            switch (score_tmp) {
              case "0":
                self.data.start_status[n] = ["star0.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "1":
                self.data.start_status[n] = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "2":
                self.data.start_status[n] = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "3":
                self.data.start_status[n] = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "4":
                self.data.start_status[n] = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "5":
                self.data.start_status[n] = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                break;
              case "6":
                self.data.start_status[n] = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                break;
              case "7":
                self.data.start_status[n] = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                break;
              case "8":
                self.data.start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                break;
              case "9":
                self.data.start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                break;
              case "10":
                self.data.start_status[n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                break;
            }
          }
          self.setData({ type_list: back, choose_add: self.data.choose_add, nav_score_change: self.data.nav_score_change, start_status: self.data.start_status });
          wx.hideLoading();
          console.log(self.data.type_list);
        }
      })
  },
  modify_sceneryHandle:function(e){
    var num = e.target.dataset.num;
    var scenery_type = null;
    var self = this;
    var all_object = [{}];
    var object_day = {
      dayNum: null,
      change: []
    };
    if(num != null){
      object_day.dayNum = this.data.recommend_data[app.globalData.modify_day_index].day;
      object_day.change.push({
        merchantId: this.data.type_list[num].id,
        operation: 3,
        indexNum: this.data.recommend_data[app.globalData.modify_day_index].scenery[app.globalData.modify_scenery].index,
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
                app.globalData.jump_to_index = "ok";
                wx.navigateBack();
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