// shop.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    discount_route_list:null,
    image_Url:null,
    hot_scenery_list:null,
    hot_route_list:null
  },
  group_tourHandle:function(e){
    var num = e.target.dataset.num;
    console.log(num);
    if(num != undefined){
      if(num == 1){
        app.globalData.global_tour_type = num;
      }
      if (num == 2) {
        app.globalData.global_tour_type = num;
      }
      wx.navigateTo({
        url: '../group_tour/group_tour'
      })
    }
    
  },
  bargainHandle:function(e){
    var num = e.target.dataset.num;
    //全局变量还原后再赋值
    app.globalData.choosed_route = null;
    app.globalData.choosed_route = this.data.discount_route_list[num].id;
    //表示从数据库中读取的推荐线路
    app.globalData.route_price = this.data.discount_route_list[num].discountPrice;
    app.globalData.global_route_name = this.data.discount_route_list[num].name;
    app.globalData.global_day_introduction = this.data.discount_route_list[num].introduction;
    app.globalData.global_route_discription = this.data.discount_route_list[num].description;
    app.globalData.user_choosed_flag = 1;
    console.log(app.globalData.route_price);
    wx.navigateTo({
      url: '../group_travel/group_travel'
    })
    console.log(app.globalData.global_day_introduction);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.hot_route_list = [
      {
        "city": "丽江",
        "description": "古城内木楼青瓦，古街石巷，小桥流水，站在古城东大街上，举头即可遥望玉龙雪山",
        "discountPrice": 100000,
        "displayOrder": 0,
        "id": 1,
        "imgUrl": "/images/routeBrief/route1.jpg",
        "introduction": "第一天***，第二天***, ...",
        "name": "热门路线—丽江深度三日游",
        "orderBrief": "",
        "price": 199900,
        "type": 1
      },
      {
        "city": "丽江",
        "description": "丽江古城又名大研古城，漫步在古城小巷，尽情享受古城慵懒的氛围",
        "discountPrice": 100000,
        "displayOrder": 0,
        "id": 4,
        "imgUrl": "/images/routeBrief/route4.jpg",
        "introduction": "第一天***，第二天***, ...",
        "name": "经典一日游，我在丽江等你",
        "orderBrief": "",
        "price": 199900,
        "type": 1
      },
      {
        "city": "丽江",
        "description": "这条线路是游玩丽江的经典线路，一路向北，风景交替变换，适合初次到丽江的游客，即使重新到访也会有新的发现",
        "discountPrice": 100000,
        "displayOrder": 0,
        "id": 5,
        "imgUrl": "/images/routeBrief/route5.jpg",
        "introduction": "第一天***，第二天***, ...",
        "name": "丽江-泸沽湖5日游",
        "orderBrief": "",
        "price": 199900,
        "type": 1
      },
      {
        "city": "丽江",
        "description": "环湖开始，到尼塞村寻找著名的情人树和早恋树；到摩梭族最古老村寨之一的小落水感受原生态的摩梭族风情；到泸源崖居高临下欣赏泸沽湖的源头；到情人滩感受十里沙岸、杨柳依依；到末代土司王妃府感受当年“摩梭女王”的一生荣华与艰难坎坷；到草海看水中芦苇一片片，在走婚桥上背起心爱的姑娘从头走到尾；到女神湾遥望女神山，等待泸沽湖最美的日落",
        "discountPrice": 100000,
        "displayOrder": 0,
        "id": 6,
        "imgUrl": "/images/routeBrief/route6.jpg",
        "introduction": "第一天***，第二天***, ...",
        "name": "泸沽湖3日游",
        "orderBrief": "",
        "price": 199900,
        "type": 1
      }
    ];
    this.data.hot_scenery_list = [
      {
        "address": "丽江市古城区玉龙纳西族自治县东大街1号丽江古城内",
        "category": 1,
        "city": "丽江",
        "commentNumber": 0,
        "id": 1,
        "imgUrl": "/images/scenery/1-1.jpg",
        "playItem": "",
        "sceneryName": "古城大水车",
        "score": 0,
        "suggestTime": ""
      },
      {
        "address": "云南省丽江市玉龙纳西族自治县丽江古城以北15公里处（玉龙雪山风景区）",
        "category": 1,
        "city": "丽江",
        "commentNumber": 0,
        "id": 15,
        "imgUrl": "/images/scenery/15-1.jpg",
        "playItem": "",
        "sceneryName": "玉龙雪山",
        "score": 0,
        "suggestTime": ""
      },
      {
        "address": "云南丽江束河古镇茶马驿站C21-1（飞花触水旁）",
        "category": 1,
        "city": "丽江",
        "commentNumber": 0,
        "id": 24,
        "imgUrl": "/images/scenery/24-1.jpg",
        "playItem": "",
        "sceneryName": "束河古镇",
        "score": 0,
        "suggestTime": ""
      },
      {
        "address": "云南省宁蒗县泸沽湖镇",
        "category": 1,
        "city": "丽江",
        "commentNumber": 0,
        "id": 23,
        "imgUrl": "/images/scenery/23-1.jpg",
        "playItem": "",
        "sceneryName": "泸沽湖",
        "score": 0,
        "suggestTime": ""
      },
      {
        "address": "丽江市古城区拉市海景区安尚村",
        "category": 1,
        "city": "丽江",
        "commentNumber": 0,
        "id": 25,
        "imgUrl": "/images/scenery/25-1.jpg",
        "playItem": "",
        "sceneryName":"拉市海",
        "score": 0,
        "suggestTime": ""
      },
      {
        "address": "云南省迪庆州香格里拉县虎跳峡镇",
        "category": 1,
        "city": "丽江",
        "commentNumber": 0,
        "id": 16,
        "imgUrl": "/images/scenery/16-1.jpg",
        "playItem": "",
        "sceneryName": "虎跳峡",
        "score": 0,
        "suggestTime": ""
      },
      {
        "address": "云南省丽江市玉龙纳西族自治县黎明乡黎明村",
        "category": 1,
        "city": "丽江",
        "commentNumber": 0,
        "id": 22,
        "imgUrl": "/images/scenery/22-1.jpg",
        "playItem": "",
        "sceneryName": "老君山",
        "score": 0,
        "suggestTime": ""
      }

    ];

    this.setData({ 
          image_Url: app.globalData.global_Img_Url, 
          hot_scenery_list: this.data.hot_scenery_list, 
          hot_route_list: this.data.hot_route_list});
    var self = this;
    wx.request({
      url: app.globalData.global_Url + '/iTour/route/brief/list', //仅为示例，并非真实的接口地址
      data: {
        routeType: 3
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          self.setData({ discount_route_list: back });
          console.log(self.data.discount_route_list);
        }
        else {
          //请求出错了
          console.log("group_tour.js--/iTour/route/brief/list--请求出错");
        }

      }
    })
  },
  //跳转景点详细界面
  commentHandle: function (e) {
    var num = e.target.dataset.num;
    var tmp = this.data.hot_scenery_list[num].id;
    var tmp_category = this.data.hot_scenery_list[num].category;
    app.globalData.category = tmp_category;
    app.globalData.currmerchantId = tmp;
    wx.navigateTo({
      url: '../comments/comments'
    })
  },
  //跳转到线路介绍
  hot_routeHandle: function (e) {
    var num = e.target.dataset.num;
    //全局变量还原后再赋值
    app.globalData.choosed_route = null;
    app.globalData.choosed_route = this.data.hot_route_list[num].id;
    //表示从数据库中读取的推荐线路
    app.globalData.route_price = this.data.hot_route_list[num].discountPrice;
    app.globalData.global_route_name = this.data.hot_route_list[num].name;
    app.globalData.global_day_introduction = this.data.hot_route_list[num].introduction;
    app.globalData.global_route_discription = this.data.hot_route_list[num].description;
    app.globalData.user_choosed_flag = 1;
    console.log(app.globalData.route_price);
    wx.navigateTo({
      url: '../group_travel/group_travel'
    })
    console.log(app.globalData.global_day_introduction);
  },
  hardwareHandle:function(){
    wx.navigateTo({
      url: '../hardware_buy/hardware_buy'
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