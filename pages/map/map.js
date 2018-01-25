var util = require('../../dao/util.js')
var mapdao = require('../../dao/mapdao.js')
var app = getApp();
Page({
  data: {
    latitude: 26.870516,
    longitude: 100.235524,
    markers: [{
      id: 1,
      iconPath: "../../assets/map/wifi.png",
      title: "丽江市政府",
      address: "云南省丽江市古城区玉雪大道262",
      typename: "景点",
      callout: { content: "导航去：丽江市政府", color: "#000000", fontSize: 14, borderRadius: 4, bgColor: "#FFFFFF", padding: 4, display: "BYCLICK" },
      longitude: 100.226420,
      latitude: 26.854820,
      width: 32,
      height: 32
    }]
  },
  onLoad: function (options) {
    var self = this;

    var markers_container = [];
    var back = mapdao.get_mapdata();

    for (var i = 0; i < back.length; i++) {
      var callout_tmp = {
        content: null,
        color: "#000000",
        fontSize: 14,
        borderRadius: 4,
        bgColor: "#FFFFFF",
        padding: 4,
        display: "BYCLICK"
      };
      var markers_tmp = {
        id: null,
        iconPath: "../../assets/map/wifi.png",
        title: null,
        address: null,
        typename: "客栈",
        longitude: 100.226420,
        latitude: 26.854820,
        width: 32,
        height: 32
      };
      callout_tmp.content = "导航去：" + back[i].name;
      markers_tmp.title = back[i].name;
      markers_tmp.address = back[i].address;
      markers_tmp.id = back[i].id;
      markers_tmp.latitude = back[i].latitude;
      markers_tmp.longitude = back[i].longtitude;
      markers_tmp.callout = callout_tmp;
      markers_container[i] = markers_tmp;
    }

    self.setData({ type_list: back, markers: markers_container });
    app.globalData.markers = self.data.markers;
    console.log(self.data.type_list);
    console.log(self.data.markers);


    //请求一下客栈的数据，为了给客栈标点
    // wx.request({
    //   url: app.globalData.global_Url + '/iTour/merchant/search/category', 
    //   data: {
    //     category: 3
    //   },
    //   header: {
    //     'content-type': 'application/json'
    //   },
    //   success: function (res) {
    //     if (res.statusCode == 200) {
    //       var back = res.data;
    //       console.log(back);
    //     for (var i=0 ; i<back.length ; i++){
    //       var callout_tmp = {
    //         content: null,
    //         color: "#000000",
    //         fontSize: 14,
    //         borderRadius: 4,
    //         bgColor: "#FFFFFF",
    //         padding: 4,
    //         display: "BYCLICK"
    //       };
    //       var markers_tmp = {
    //         id: null,
    //         iconPath: "../../assets/map/wifi.png",
    //         title: null,
    //         address: null,
    //         typename: "客栈",
    //         longitude: 100.226420,
    //         latitude: 26.854820,
    //         width: 32,
    //         height: 32
    //       };
    //       callout_tmp.content = "导航去：" + back[i].name;
    //       markers_tmp.title = back[i]. name;
    //       markers_tmp.address = back[i].address;
    //       markers_tmp.id = back[i].id;
    //       markers_tmp.latitude = back[i].latitude;
    //       markers_tmp.longitude = back[i].longtitude;
    //       markers_tmp.callout = callout_tmp;
    //       markers_container[i] = markers_tmp;
    //     }

    //     self.setData({ type_list: back, markers: markers_container});
    //     app.globalData.markers = self.data.markers;
    //       console.log(self.data.type_list);
    //       console.log(self.data.markers);
    //     }
    //     else {
    //     }

    //   }
    // })
    //记录地图标志
    
    //初始化当前位置
    // var self = this;
    // setTimeout(function () {
      // self.mapCtx = wx.createMapContext('myMap');
      // self.mapCtx.moveToLocation();
    // }, 1000);
  },
  //查询事件监听
  queryHandler: function (e) {
    wx.navigateTo({
      url: '../search/search',
    });
  },
  //点击标记事件
  markerHandler: function (e) {
    var source = this.data.markers;
    var num = e.markerId;
    var flag = util.getMapDataById(source, num);
    wx.openLocation({
      latitude: flag.latitude,
      longitude: flag.longitude,
      name: flag.title,
      address: flag.address
    });
  }
})