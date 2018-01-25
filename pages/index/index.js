var app = getApp()
var systemdao = require('../../dao/systemdao.js');
var dao_data = systemdao.getSystemInfo();
Page({
  data: {
    fixed: "",
    scrollTop: 0,
    currindex: 0,
    navindex:0,
    tabs: ["tab-active", "",""],
    brief_list:[],
    type_list:[],
    start_status: [],
    image_Url:null,
    //发现数据
    info:null
  },
  onLoad: function (options){
    if (options.jump_to_index){
      app.globalData.jump_to_index = "ok";
    }
  },
  onShow: function () {
    //防止加载出问题
    this.setData({ image_Url: app.globalData.global_Img_Url });
    var self = this;
    console.log(dao_data);
    console.log(dao_data.scale * 186 * 2);
    // var news_tmp = [
    //   {
    //     types: 'text+image',
    //     image_url: '/images/routeBrief/route1.jpg',
    //     title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
    //   },
    //   {
    //     types: 'image',
    //     image_url: [
    //       '/images/routeBrief/route1.jpg',
    //       '/images/routeBrief/route2.jpg',
    //       '/images/routeBrief/route3.jpg',
    //     ],
    //     title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
    //   },
    //   {

    //     types: 'text+image',
    //     image_url: '/images/routeBrief/route1.jpg',
    //     title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山',
    //   },
    //   {
    //     types: 'image',
    //     image_url: [
    //       '/images/routeBrief/route4.jpg',
    //       '/images/routeBrief/route3.jpg',
    //       '/images/routeBrief/route5.jpg',
    //     ],
    //     title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
    //   },
    //   {
    //     types: 'text+image',
    //     image_url: '/images/routeBrief/route1.jpg',
    //     title: '小桥流水，站在古城东大街上，举头即可遥望玉龙雪山'
    //   },

    // ];
    // this.setData({ info: news_tmp });
    //推荐路线请求代码
    wx.request({
      url: app.globalData.global_Url + '/iTour/route/brief/list', //仅为示例，并非真实的接口地址
      data: {
        routeType:1
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          self.setData({ brief_list: back });
          if (app.globalData.jump_to_index == "ok") {
            self.setData({ fixed: "tabs", tabs: ["tab-active", ""], currindex: 0 });
            self.setData({ scrollTop: (dao_data.scale * 186 * 2) });
            app.globalData.jump_to_index = "no";
          }
          console.log(self.data.brief_list);
        }
        else {
          
        }

      }
    }) 
  },
  scroll: function (e) {
    var st = e.detail.scrollTop;

    if (st >= (dao_data.scale*186*2)) {
      if (this.data.fixed != "tabs") {
        this.setData({ fixed: "tabs" });
      }
    } else {
      if (this.data.fixed != "") {
        this.setData({ fixed: "" });
      }
    }
  },
  tabhandler: function (e) {
    var num = e.target.dataset.num;
    var self =this;
    //设置导航条
    if (num) {
      var index = num - 1;
      var tabs = this.data.tabs;
      for (var i = 0; i < tabs.length; i++) {
        if (i == index) {
          tabs[i] = "tab-active";
        } else {
          tabs[i] = "";
        }
      }
      if (this.data.fixed == "tabs") {
        this.setData({ tabs: tabs, currindex: index, scrollTop: (dao_data.scale * 186 * 2) });
      } else {
        this.setData({ tabs: tabs, currindex: index });
      }
    }
  },
  //推荐路线代码段
  recommHandler: function (e) {
    var num = e.target.dataset.num;
    app.globalData.choosed_route = null;
    app.globalData.choosed_route = this.data.brief_list[num].id;
    app.globalData.route_price = this.data.brief_list[num].price;
    app.globalData.global_route_name = this.data.brief_list[num].name;
    app.globalData.global_day_introduction = this.data.brief_list[num].introduction;
    app.globalData.user_choosed_flag = 1;
    console.log(app.globalData.route_price);
    wx.navigateTo({
      url: '../recommend/recommend'
    })

  },
  OverviewHandle:function(e){
    var num = e.target.dataset.num;
    switch(num){
      case "0":
        app.globalData.global_Raiders_type = encodeURIComponent("丽江速览");
        break;
      case "1":
        app.globalData.global_Raiders_type = encodeURIComponent("路线推荐");
        break;
      case "2":
        app.globalData.global_Raiders_type = encodeURIComponent("如何到达");
        break;
      case "3":
        app.globalData.global_Raiders_type = encodeURIComponent("市内交通");
        break;
      case "4":
        app.globalData.global_Raiders_type = encodeURIComponent("景点概况");
        break;
      case "5":
        app.globalData.global_Raiders_type = encodeURIComponent("必游TOP5");
        break;
      case "6":
        app.globalData.global_Raiders_type = encodeURIComponent("景点防坑指南");
        break;
      case "7":
        app.globalData.global_Raiders_type = encodeURIComponent("印象丽江");
        break;
      case "8":
        app.globalData.global_Raiders_type = encodeURIComponent("千古情");
        break;
      case "9":
        app.globalData.global_Raiders_type = encodeURIComponent("纳西古乐");
        break;
      case "10":
        app.globalData.global_Raiders_type = encodeURIComponent("特色美食榜");
        break;
      case "11":
        app.globalData.global_Raiders_type = encodeURIComponent("捡菌子攻略");
        break;
      case "12":
        app.globalData.global_Raiders_type = encodeURIComponent("剁手指南");
        break;
      case "13":
        app.globalData.global_Raiders_type = encodeURIComponent("人气伴手礼");
        break;
      case "14":
        app.globalData.global_Raiders_type = encodeURIComponent("防坑小贴士");
        break;
      default:
        app.globalData.global_Raiders_type = null;
        return false;

    }
      wx.navigateTo({
        url: '../num1/num1'
      })
  }




})
