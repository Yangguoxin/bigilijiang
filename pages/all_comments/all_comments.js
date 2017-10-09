// all_comments.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_comments:[],
    good_comments:[],
    mid_comments:[],
    bad_comments:[],
    change_css: ["text_container_fix", "text_container", "text_container","text_container"],
    choose_mode:0,
    user_start_status: [],
    good_start_status: [],
    mid_start_status: [],
    bad_start_status:[],
    good_time_stamp: [],
    mid_time_stamp: [],
    bad_time_stamp: [],
    time_stamp:[],
    image_Url:null
  },
  change_bar:function(e){
    var num = e.target.dataset.num;
    var change_css = this.data.change_css;
    var tmp_good = [];
    var tmp_bad = [];
    var tmp_mid = [];
    var index = 0;
      if(num != null){
        for (var i = 0;i < 4;i++){
          if(num == i){
            change_css[i] = "text_container_fix";
          }
          else{
            change_css[i] = "text_container";
          }
            
        }
        console.log(this.data.choose_mode);
        switch(num){
          case "0":
            this.setData({ change_css: change_css, choose_mode: num });
            break;

          case "1":
            for (var n = 0; n < this.data.all_comments.length; n++){
              if (this.data.all_comments[n].score > 8){
                this.data.good_start_status[index] = this.data.user_start_status[n];
                this.data.good_time_stamp[index] = this.data.time_stamp[n];
                tmp_good[index] = this.data.all_comments[n];
                index++;
              }
            }
            this.setData({ change_css: change_css,
                           choose_mode: num, 
                           good_comments: tmp_good, 
                           good_start_status: this.data.good_start_status,
                           good_time_stamp:this.data.good_time_stamp
                           });
            console.log(this.data.good_time_stamp);
            break;

          case "2":
            for (var n = 0; n < this.data.all_comments.length; n++) {
              if (this.data.all_comments[n].score > 4 && this.data.all_comments[n].score <= 8) {
                this.data.mid_start_status[index] = this.data.user_start_status[n];
                this.data.mid_time_stamp[index] = this.data.time_stamp[n];
                tmp_mid[index] = this.data.all_comments[n];
                index++;
              }
            }
            this.setData({ change_css: change_css,
                           choose_mode: num, 
                           mid_comments: tmp_mid, 
                           mid_start_status:this.data.mid_start_status,
                           mid_time_stamp:this.data.mid_time_stamp
                            });
            break;

          case "3":
            for (var n = 0; n < this.data.all_comments.length; n++) {
              if (this.data.all_comments[n].score <= 4) {
                this.data.bad_start_status[index] = this.data.user_start_status[n];
                this.data.bad_time_stamp[index] = this.data.time_stamp[n];
                tmp_bad[index] = this.data.all_comments[n];
                index++;
              }
            }
            this.setData({ change_css: change_css, 
                           choose_mode: num, 
                           bad_comments: tmp_bad, 
                           bad_start_status:this.data.bad_start_status,
                           bad_time_stamp:this.data.bad_time_stamp
                            });
            break;
        }
         
      }
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
      url: app.globalData.global_Url + '/iTour/comment/search/merchantId', //仅为示例，并非真实的接口地址
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
          
          for (var n = 0; n < back.length; n++) {
            var score_tmp_user;
            //时间戳转换
            self.data.time_stamp[n] = new Date(parseInt(back[n].time)).toLocaleDateString()
            score_tmp_user = parseFloat(back[n].score);
            score_tmp_user = score_tmp_user.toFixed(0);
            console.log(score_tmp_user);
            self.data.user_start_status[n] = new Array();
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
          self.setData({ all_comments: back, user_start_status: self.data.user_start_status, time_stamp:self.data.time_stamp });
          console.log(self.data.all_comments);
        }
        else {
          //访问出错了
        }
      }
    });
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