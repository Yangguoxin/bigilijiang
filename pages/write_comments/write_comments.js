var app = getApp()
// write_comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail_data:null,
    start_statues: ["start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png","start2.png"],
    score:0,
    image_Url: null,
    turn_true:false
  },
  change_start:function(e){
    var num = e.target.dataset.num;
    if(num !== null){
      switch(num){
        case "1":
          this.data.start_statues = ["start3.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png"];
          this.data.score = 1.0;
          break;
        
        case "2":
          this.data.start_statues = ["start3.png", "start4.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png"];
          this.data.score = 2.0;
          break;
        
        case "3":
          this.data.start_statues = ["start3.png", "start4.png", "start3.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png"];
          this.data.score = 3.0;
          break;
        
        case "4":
          this.data.start_statues = ["start3.png", "start4.png", "start3.png", "start4.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png"];
          this.data.score = 4.0;
          break;
        
        case "5":
          this.data.start_statues = ["start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png"];
          this.data.score = 5.0;
          break;
        
        case "6":
          this.data.start_statues = ["start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png", "start1.png", "start2.png", "start1.png", "start2.png"];
          this.data.score = 6.0;
          break;
        
        case "7":
          this.data.start_statues = ["start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start2.png", "start1.png", "start2.png"];
          this.data.score = 7.0;
          break;

        case "8":
          this.data.start_statues = ["start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png", "start1.png", "start2.png"];
          this.data.score = 8.0;
          break;

        case "9":
          this.data.start_statues = ["start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start2.png"];
          this.data.score = 9.0;
          break;

        case "10":
          this.data.start_statues = ["start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png", "start3.png", "start4.png"];
          this.data.score = 10.0;
          break;  
      }
      console.log(this.data.start_statues);
      this.setData({ start_statues: this.data.start_statues, score: this.data.score });  
    }
    console.log(num);
  },
  submit:function(e){
    
    var timestamp = (new Date()).valueOf();
    var self = this;
    self.data.content = e.detail.value.textarea;
    console.log(self.data.content); 
    console.log(self.data.content.replace(/\s/g, ''));
    if (self.data.score == "0" || self.data.content.replace(/\s/g, '') == "" || self.data.content == undefined ){
      wx.showToast({
        title: '需要评论和给评分哦',
        image: '/assets/index/warning.jpg',
        duration: 1000,
      })
      return false;
    }else{
      self.setData({ turn_true: true });
      wx.request({
        url: app.globalData.global_Url + '/iTour/comment/user/add',
        data: {
          userId: app.globalData.global_lj_userId,
          merchantId: app.globalData.currmerchantId,
          score: self.data.score,
          content: e.detail.value.textarea,
          time: timestamp,
          category: app.globalData.category
          
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.statusCode == 200) {
            
            app.globalData.jump_to_comments = "ok";
            wx.navigateBack({
              delta: 1
            })
            self.setData({ turn_true: false });
            wx.hideLoading();
          }
          else {
            self.setData({ turn_true: false });
            //访问出错了
          }

        }
      });
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    console.log(app.globalData.currscenery);
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
    this.data.detail_data = app.globalData.currscenery;
    this.setData({ detail_data: this.data.detail_data });

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