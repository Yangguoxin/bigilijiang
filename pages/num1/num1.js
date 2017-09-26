var app = getApp()
Page({
  data: {
    list: [],
    image_Url: null
  },
  onLoad: function (options) {
    this.setData({ image_Url: app.globalData.global_Img_Url });
    var self = this;
    var tmp = app.globalData.global_Raiders_type;
    console.log(this.data.list);
    wx.request({
      url: app.globalData.global_Url + '/iTour/strategy/module', //仅为示例，并非真实的接口地址
      data: {
        module: tmp
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          self.data.list = back;
          self.setData({ list: self.data.list });
          console.log(back);
          wx.hideLoading();
        }
        else {
          //请求出错了
        }

      }
    })
  },
  eventHandler: function (e) {
    var num = e.target.dataset.num;
    var list = this.data.list;
    //测试
    
    for (var i = 0; i < list.length; i++) {
      var item = list[i];
      if (item.id == num) {
        if (item.selected == "arrow_up") {
          item.selected = "arrow_down";
        } else {
          item.selected = "arrow_up";
        }
        break;
      }
    }
    this.setData({ list: list });
  }
})