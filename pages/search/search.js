var util = require('../../dao/util.js')
var QQMapWX = require('../lib/qqmap-wx-jssdk.min.js')
var app = getApp();
var qqmapsdk;
Page({
  data: {
    clearshow: "none",
    text: "",
    results: []
  },
  onLoad: function (options) {
    //实例化地图核心类
    qqmapsdk = new QQMapWX({
      key: 'EIVBZ-NP6CP-H3GDW-L66UI-BJLRZ-V4F3V'
    });
  },
  closeHandler: function (e) {
    wx.navigateBack();
  },
  clearHandler: function (e) {
    this.setData({ text: "", clearshow: "none" });
  },
  inputHandler: function (e) {
    var text = e.detail.value;
    if (text != "") {
      //获取查询结果数据
      var source = app.globalData.markers;
      var datas = util.getMapDataByName(source, text);
      var self = this;
      qqmapsdk.getSuggestion({
        keyword: text,
        region: "丽江市",
        region_fix:1,
        success: function (res) {
          var ps = res.data;
          ps.forEach(function (p) {
            var place = {
              id: p.id,
              iconPath: "../../assets/inn.png",
              title: p.title,
              address: p.address,
              typename: "普通",
              callout: { content: "导航去：" + p.title, color: "#000000", fontSize: 14, borderRadius: 4, bgColor: "#FFFFFF", padding: 4, display: "BYCLICK" },
              longitude: p.location.lng,
              latitude: p.location.lat,
              width: 32,
              height: 32
            }
            util.addMapData(source, place);
            datas.push(place);
          });
          self.setData({ results: datas, text: text, clearshow: "block" });
        }
      });
    } else {
      this.setData({ text: text, clearshow: "none" });
    }
  },
  resultHandler: function (e) {
    var num = e.target.dataset.num;
    if (num) {
      //根据mapid获取地图标志
      var source = app.globalData.markers;
      var flag = util.getMapDataById(source, num);
      wx.openLocation({
        latitude: flag.latitude,
        longitude: flag.longitude,
        name: flag.title,
        address: flag.address
      });
    }
  },
  typeHandler: function (e) {
    var name = e.target.dataset.name;
    if (name) {
      var source = app.globalData.markers;
      var datas = util.getMapDataByType(source, name);
      this.setData({ results: datas, text: name, clearshow: "block" });
    }
  }
})