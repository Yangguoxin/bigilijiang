// pages/news/news.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */

  data: {
    img_Url:null,
    news_list:[],
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
        types: 'big_image',
        image_url: '/images/routeBrief/route1.jpg',
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'text+image',
        image_url: '/images/routeBrief/route1.jpg',
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'text+image',
        image_url: '/images/routeBrief/route1.jpg',
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'big_image',
        image_url: '/images/routeBrief/route1.jpg',
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'text+image',
        image_url: '/images/routeBrief/route1.jpg',
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'image',
        image_url: [
          '/images/routeBrief/route4.jpg',
          '/images/routeBrief/route3.jpg',
          '/images/routeBrief/route5.jpg',
        ],
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'image',
        image_url: [
          '/images/routeBrief/route4.jpg',
          '/images/routeBrief/route3.jpg',
          '/images/routeBrief/route5.jpg',
        ],
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'image',
        image_url: [
          '/images/routeBrief/route4.jpg',
          '/images/routeBrief/route3.jpg',
          '/images/routeBrief/route5.jpg',
        ],
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },
      {
        types: 'image',
        image_url: [
          '/images/routeBrief/route4.jpg',
          '/images/routeBrief/route3.jpg',
          '/images/routeBrief/route5.jpg',
        ],
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      }, 
      {
        types: 'big_image',
        image_url: [
          '/images/routeBrief/route4.jpg'
        ],
        title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
      },

    ],
    scroll_loading:true,
    page_size:5,
    page_num:1,
    page_count:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var news_list_tmp=[];
     news_list_tmp[0] = new Array();
    if(this.data.info.length>=this.data.page_size){
      for (var i = 0; i < 5; i++) {
        news_list_tmp[0][i]= this.data.info[i];
      }
    }else{
      for (var i = 0; i < this.data.info.length; i++) {
        news_list_tmp[0][i] = this.data.info[i];
      }
    }
    
    this.setData({
      img_Url: app.globalData.global_Img_Url,
      news_list: news_list_tmp
    })
  },
  scorllHandle:function(){
    if (this.data.scroll_loading == true && this.data.news_list[this.data.page_count - 1].length == this.data.page_size){
      var news_list_tmp = [];
      news_list_tmp = this.data.news_list;
      news_list_tmp[this.data.page_count] = new Array();
      if (this.data.info.length - (this.data.page_count * this.data.page_size) <= this.data.page_size ){
        for (var i = (this.data.page_count * this.data.page_size); i < this.data.info.length; i++) {
          news_list_tmp[this.data.page_count].push(this.data.info[i]);
        }
      }else{
        for (var i = (this.data.page_count * this.data.page_size); i < ((this.data.page_count+1) * this.data.page_size); i++) {
          news_list_tmp[this.data.page_count].push(this.data.info[i]);
        }
      }
      this.setData({
        news_list : news_list_tmp,
        page_count: this.data.page_count+1
      })
      console.log(news_list_tmp)
    }
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