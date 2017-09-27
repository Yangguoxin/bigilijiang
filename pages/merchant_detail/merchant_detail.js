// merchant_detail.js
var requestdao = require('../../dao/requestdao.js');
var WxParse = require('../../dao/wxParse/wxParse.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    comments:null,
    merchant_detail : [{
      id:1,
      imageUrl: "/assets/index/hardware_big.png"
    },
    {
      id:2,
      imageUrl: "/assets/index/hardware_big.png"
    },
    {
      id:3,
      imageUrl: "/assets/index/hardware_big.png"
    },
    {
      id:4,
      imageUrl: "/assets/index/hardware_big.png"
    }
    ],
    brief_list:null,
    second_page: false,
    scroll_switch:true,
    information_array: ["goods_information_fix", "goods_information","goods_information"],
    current_choose:0,
    goods_type_switch:'/assets/index/down.png',
    goods_num:0
  },
  scroll_bottom:function(){
    if(this.data.scroll_switch == true){
      this.setData({ 
                  trun_true: false,
                  scroll_switch: false,
                  second_page: true
                  });
      console.log("test");
    }
    
  },
  change_informationHandle:function(e){
    var num = e.target.dataset.num;
    var information_tmp = [];
    information_tmp = this.data.information_array;
    if(num != undefined){
      for (var i = 0; i < information_tmp.length;i++){
        if(i==num)
          information_tmp[i] = "goods_information_fix";
        else
          information_tmp[i] = "goods_information";
      }
      this.setData({ information_array: information_tmp,current_choose:num});
    }
  },
  choose_goodsHandle:function(e){
    var switch_tmp = this.data.goods_type_switch;
    if (switch_tmp == '/assets/index/down.png'){
      switch_tmp = '/assets/index/up.png';
    }else{
      switch_tmp = '/assets/index/down.png';
    }
    this.setData({ goods_type_switch: switch_tmp});
  },
  plusHandle:function(){
    var goods_tmp = this.data.goods_num;
    goods_tmp +=1;
    this.setData({ goods_num: goods_tmp});
  },
  reduceHandle: function () {
    var goods_tmp = this.data.goods_num;
    if (goods_tmp <= 0){
        return false;
    }else{
      goods_tmp -= 1;
      this.setData({ goods_num: goods_tmp });
    }
    
  },
  payHandle:function(){
    wx.navigateTo({
      url: '../goods_order/goods_order'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接口测试
    var self = this;
    wx.request({
      url: 'http://119.62.125.201:8888/YYAPI/phone/api.do',
      data: requestdao.setParamsData("product.d", { "productId": 503 }, true),  
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          self.setData({ brief_list: back });
          var article = self.data.brief_list.product.buyInfo;
          WxParse.wxParse('article', 'html', article, self, 5);
          console.log(self.data.brief_list);
        }
        else {
          //请求出错了
          
        }

      }
    })
    wx.request({
      url: 'http://119.62.125.201:8888/YYAPI/phone/api.do',
      data: requestdao.setParamsData("comment.l", { "productId": 200, hasImg: true, page: 1, size: 2 }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          self.setData({ comments: back });
          console.log(self.data.comments);
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