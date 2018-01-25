var app = getApp();
var requestdao = require('../../dao/requestdao.js');
// write_comments.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    start_statues: ["start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png", "start1.png", "start2.png"],
    score: 0,
    image_Url: null,
    turn_true: false,
    photos_list:[],
    image_array:[],
    goods_detail:null
  },
  change_start: function (e) {
    var num = e.target.dataset.num;
    if (num !== null) {
      switch (num) {
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
  submit: function (e) {

    var timestamp = (new Date()).valueOf();
    var self = this;
    self.data.content = e.detail.value.textarea;
    console.log(self.data.content);
    console.log(self.data.content.replace(/\s/g, ''));
    if (self.data.score == "0" || self.data.content.replace(/\s/g, '') == "" || self.data.content == undefined) {
      wx.showToast({
        title: '需要评论和给评分哦',
        image: '/assets/index/warning.jpg',
        duration: 1000,
      })
      return false;
    } else {
      self.setData({ turn_true: true });
      var image_string = null;
      for (var i = 0; i < self.data.image_array.length;i++){
          if( i==0 ){
            image_string = self.data.image_array[i];
          }else{
            image_string = image_string + ',' + self.data.image_array[i];
          }
      }
      console.log(app.globalData.userId + ',' + app.globalData.global_productId_id + ',' + app.globalData.global_sellerId + ',' + self.data.content + ',' + app.globalData.global_productId);
      console.log(image_string);
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("comment.i", 
        { 
          "userId": app.globalData.userId, 
          "orderProductId": app.globalData.global_productId_id, 
          "type": 0, 
          "sellerId": app.globalData.global_sellerId,
          "remark": self.data.content,
          "imgs": image_string,
          "productId": app.globalData.global_productId,
          "star": (self.data.score/2)
        }
        , true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            console.log(back.reCode);
            if (back.reCode == "00"){
              wx.showToast({
                title: '感谢您的提交',
                image: '/assets/index/success.jpg',
                duration: 1000,
              })
              setTimeout(function () {
                app.globalData.global_order_list_flash = "yes";
                wx.navigateBack({
                  delta: 1
                })
              }, 1000)
              self.setData({ turn_true: false });
            }else{
              wx.showToast({
                title: '内容有表情包',
                image: '/assets/index/warning.jpg',
                duration: 1000,
              })
              setTimeout(function () {
                app.globalData.global_order_list_flash = "yes";
              }, 1000)
              self.setData({ turn_true: false });
            }
            
          }
          else {
            //请求出错了
            self.setData({ turn_true: false });
          }

        }
      })
    }

  },
  choose_photosHandle:function(){
    var self = this;
    self.setData({ turn_true: true });
    this.data.image_array = [];
    wx.chooseImage({
      count: 5, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        //返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        self.setData({
          photos_list: tempFilePaths
        });
        var count = 0;
        for (var i = 0; i < tempFilePaths.length; i++){
          const uploadTask = wx.uploadFile({
            url: app.globalData.global_upload_url, //仅为示例，非真实的接口地址
            filePath: tempFilePaths[i],
            name: 'file',
            success: function (res) {
              var tmpImage = [];
              var data = res.data
              data = JSON.parse(data);
              tmpImage = self.data.image_array;
              tmpImage[count] = data.file.fileId;
              self.setData({
                image_array:tmpImage
              });
              count+=1;
              if (count == (tempFilePaths.length )) {
                self.setData({ turn_true: false });
              }
              console.log(data);
              //do something
            }

          })  
        }
        
        
      },
      fail:function(res){
        self.setData({ turn_true: false });
      }
    })
  },
  preview_photosHandle:function(e){
    var num = e.target.dataset.num;
    if(num != undefined){
      wx.previewImage({
        current: this.data.photos_list[num], // 当前显示图片的http链接
        urls: this.data.photos_list // 需要预览的图片http链接列表
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({goods_detail: app.globalData.global_goods_detail});
    console.log(app.globalData.global_goods_detail)
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