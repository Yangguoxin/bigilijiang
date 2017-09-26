// pages/news/news.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    img_Url:null,

    info:[
      {
        types:'text+image',
        image_url:'/images/routeBrief/route1.jpg',
        title:'小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'image',
        image_url: [
          '/images/routeBrief/route1.jpg',
          '/images/routeBrief/route2.jpg',
          '/images/routeBrief/route3.jpg',
        ],
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        
        types: 'text+image',
        image_url: '/images/routeBrief/route1.jpg',
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山',
      },
      {
        types: 'image',
        image_url:[
          '/images/routeBrief/route4.jpg',
          '/images/routeBrief/route3.jpg',
          '/images/routeBrief/route5.jpg',
        ],
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山' 
      },
      {
        types: 'text+image',
        image_url: '/images/routeBrief/route1.jpg',
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },

    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      img_Url: app.globalData.global_Img_Url
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