// pages/group_travel/group_travel.js
var app = getApp();
var requestdao = require('../../dao/requestdao.js');
var WxParse = require('../../dao/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

    merchant_detail: null,
    packages:null,
    image_Url: null,
    price:null,
    route_name:null,
    goods_information: ['goods_information_fix', 'goods_information','goods_information']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("product.d",
        {
          "userId": app.globalData.userId,
          "productId": app.globalData.global_tour_productId,
          "noNeedPlate": true
        }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          if (back.reCode == "00") {
            wx.hideToast();
            self.setData({
              packages: back.packages,
              merchant_detail: back.product
            })
            var article = self.data.merchant_detail.content;
            WxParse.wxParse('article', 'html', article, self, 0);
            var special = self.data.merchant_detail.special;
            WxParse.wxParse('special', 'html', special, self, 0);
            var buyInfo = self.data.merchant_detail.buyInfo;
            WxParse.wxParse('buyInfo', 'html', buyInfo, self, 0);
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
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("comment.l", { "productId": app.globalData.global_tour_productId, "hasImg": true, "page": 1, "size": 2 }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          if (res.data.reCode == "00") {
            var back = res.data;
            var comments_tmp = [];
            comments_tmp = back.comments;
            console.log();
            for (var i = 0; i < back.comments.length; i++) {
              switch (back.comments[i].star * 2) {
                case 1:
                  comments_tmp[i].star_list = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case 2:
                  comments_tmp[i].star_list = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case 3:
                  comments_tmp[i].star_list = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case 4:
                  comments_tmp[i].star_list = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case 5:
                  comments_tmp[i].star_list = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                  break;
                case 6:
                  comments_tmp[i].star_list = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                  break;
                case 7:
                  comments_tmp[i].star_list = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                  break;
                case 8:
                  comments_tmp[i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                  break;
                case 9:
                  comments_tmp[i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                  break;
                case 10:
                  comments_tmp[i].star_list = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                  break;
              }
            }
            self.setData({ comments: comments_tmp });
            console.log(self.data.comments);
          } else {

          }

        }
        else {
          //请求出错了

        }

      }
    })
  },
  change_informationHandle:function(e){
    var num = e.target.dataset.num;
    var goods_information_tmp=this.data.goods_information;
    if(num!=undefined){
      for (var i = 0; i < goods_information_tmp.length;i++){
        if(num == i ){
          goods_information_tmp[i] ="goods_information_fix";
        }else{
          goods_information_tmp[i] = "goods_information";
        }
      }
      this.setData({ goods_information: goods_information_tmp})
    }
  },
  place_order:function(e){
    var num = e.target.dataset.num;
    console.log(this.data.packages);
    if (num!=undefined){
      app.globalData.global_tour_productId = this.data.packages[num].productId;
    }else{
      app.globalData.global_tour_productId = this.data.merchant_detail.id;
    }
    wx.navigateTo({
      url: '../canlender/canlender'
    })
  },
  previwe_imageHandle: function (e) {

    var num = e.target.dataset.num;
    var index = e.target.dataset.index;
    var image_array = [];
    console.log(this.data.comments);
    if (num != undefined && index != undefined) {
      for (var i = 0; i < this.data.comments[num].imgList.length; i++) {
        image_array[i] = this.data.comments[num].imgList[i].path
      }
      console.log(image_array);
      wx.previewImage({
        current: this.data.comments[num].imgList[index].path, // 当前显示图片的http链接
        urls: image_array // 需要预览的图片http链接列表
      })
    }
  },
  preview_goodsHandle:function(e){
    var num = e.target.dataset.num;
    var image_array = [];
    console.log(this.data.merchant_detail)
    if (num != undefined ) {
      for (var i = 0; i < this.data.merchant_detail.imgList.length; i++) {
        image_array[i] = this.data.merchant_detail.imgList[i].path
      }
      console.log(image_array);
      wx.previewImage({
        current: this.data.merchant_detail.imgList[num].path, // 当前显示图片的http链接
        urls: image_array // 需要预览的图片http链接列表
      })
    }
  },
  goto_allcommentsHandle: function () {
    app.globalData.global_comment_id = app.globalData.global_tour_productId;
    wx.navigateTo({
      url: '../all_goods_comments/all_goods_comments'
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