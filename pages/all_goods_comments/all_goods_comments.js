// all_comments.js
var requestdao = require('../../dao/requestdao.js');
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    all_comments: [],
    good_comments: [],
    mid_comments: [],
    bad_comments: [],
    change_css: ["text_container_fix", "text_container", "text_container", "text_container"],
    choose_mode: 0,
    image_Url: null,
    comments:null,
    all_comments_switch:true,
    all_comments_count:1,
    page_size:6
  },
  change_bar: function (e) {
    var num = e.target.dataset.num;
    var change_css = this.data.change_css;
    var tmp_good = [];
    var tmp_bad = [];
    var tmp_mid = [];
    var index = 0;
    if (num != null) {
      for (var i = 0; i < 4; i++) {
        if (num == i) {
          change_css[i] = "text_container_fix";
        }
        else {
          change_css[i] = "text_container";
        }

      }
      switch(num){
        case "0":
        case "1":
        case "2":
        case "3":
      }
      this.setData({
        change_css: change_css,
        choose_mode:num
      })
    }  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({ image_Url: app.globalData.global_Img_Url });
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("comment.l", { "productId": 541, "page": 1, "size": self.data.page_size }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.reCode == "00") {
            var back = res.data;

            var comments_tmp = [];
            comments_tmp[0] = back.comments;
            console.log();
            for (var i = 0; i < back.comments.length; i++) {
              switch (back.comments[i].star * 2) {
                case 1:
                  comments_tmp[0][i].star_list = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case 2:
                  comments_tmp[0][i].star_list = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case 3:
                  comments_tmp[0][i].star_list = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case 4:
                  comments_tmp[0][i].star_list = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case 5:
                  comments_tmp[0][i].star_list = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                  break;
                case 6:
                  comments_tmp[0][i].star_list = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                  break;
                case 7:
                  comments_tmp[0][i].star_list = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                  break;
                case 8:
                  comments_tmp[0][i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                  break;
                case 9:
                  comments_tmp[0][i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                  break;
                case 10:
                  comments_tmp[0][i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                  break;
              }
            }
            self.data.comments = [];
            var change_css_tmp = ["text_container_fix", "text_container", "text_container", "text_container"];
            self.setData({
              comments: comments_tmp,
              change_css: change_css_tmp,
              choose_mode: 0
            });
            wx.hideLoading();
            console.log(comments_tmp[0]);
          } else {

          }

        }
        else {
          //请求出错了

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
  previwe_imageHandle: function (e) {
    var num = e.target.dataset.num;
    var index = e.target.dataset.index;
    var count = e.target.dataset.count;
    var image_array = [];
    console.log(this.data.comments);
    if (num != undefined && index != undefined && count != undefined) {
      for (var i = 0; i < this.data.comments[num][count].imgList.length; i++) {
        image_array[i] = this.data.comments[num][count].imgList[i].path
      }
      console.log(image_array);
      wx.previewImage({
        current: this.data.comments[num][count].imgList[index].path, // 当前显示图片的http链接
        urls: image_array // 需要预览的图片http链接列表
      })
    }
  },
  // 全部评论的分页加载
  scroll_page_all:function(){
    var self = this;
    if (self.data.all_comments_switch == true && self.data.comments[self.data.all_comments_count - 1].length == self.data.page_size){
      self.setData({ all_comments_switch : false});
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("comment.l", { "productId": 541, "page": (self.data.all_comments_count+1), "size": self.data.page_size }, true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
            if (res.data.reCode == "00") {
              var back = res.data;
              var comments_tmp = [];
              comments_tmp = self.data.comments
              comments_tmp[self.data.all_comments_count] = back.comments;
              for (var i = 0; i < back.comments.length; i++) {
                switch (back.comments[i].star * 2) {
                  case 1:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                    break;
                  case 2:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                    break;
                  case 3:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                    break;
                  case 4:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                    break;
                  case 5:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                    break;
                  case 6:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                    break;
                  case 7:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                    break;
                  case 8:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                    break;
                  case 9:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                    break;
                  case 10:
                    comments_tmp[self.data.all_comments_count][i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                    break;
                }
              }
              var change_css_tmp = ["text_container_fix", "text_container", "text_container", "text_container"];
              self.setData({
                all_comments_count: self.data.all_comments_count + 1,
                comments: comments_tmp,
                all_comments_switch:true
              });
              console.log(self.data.comments);
            } else {

            }

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