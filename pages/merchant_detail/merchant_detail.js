// merchant_detail.js
var requestdao = require('../../dao/requestdao.js');
var WxParse = require('../../dao/wxParse/wxParse.js');
var app = getApp();
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
    goods_num:0,
    goods_type:['白色'],
    type_class: ['goods_type']
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
    console.log(this.data.goods_num);
    if (this.data.goods_num==0){
      wx.showToast({
        title: "请选择数量",//这里打印出登录成功
        image: '/assets/index/warning.jpg',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 1500)
    }else{
      var choose_type_tmp = null;
      for (var j = 0; j < this.data.type_class.length;j++){
        if (this.data.type_class[j] =='goods_type_choosed'){
          choose_type_tmp=this.data.goods_type[j];
          break;
        }
      }
      if (choose_type_tmp==null){
        wx.showToast({
          title: "请选择型号",//这里打印出登录成功
          image: '/assets/index/warning.jpg',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 1500)
      }else{
        //填充商品的信息和用户选择的信息
        //商品数量
        app.globalData.global_goods_num = this.data.goods_num;
        //商品信息
        app.globalData.global_goods_detail = this.data.brief_list;
        //商品类型
        app.globalData.global_goods_type = choose_type_tmp;
        wx.navigateTo({
            url: '../goods_order/goods_order'
        })
      }
     
    }
   
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //接口测试
    var self = this;
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("product.d",  { "productId": 521, noNeedPlate: true }, true),  
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          self.setData({ brief_list: back });
          var article = self.data.brief_list.product.content;
          WxParse.wxParse('article', 'html', article, self, 0);
          console.log(self.data.brief_list);
        }
        else {
          //请求出错了
          
        }

      }
    })
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("comment.l", { "productId": 200, "hasImg": true, "page": 1, "size": 2 }, true),
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
  choose_typeHandle:function(e){
    var num = e.target.dataset.num;
    if(num != undefined){
      if (this.data.type_class[num] =='goods_type'){
        for(var i=0 ; i<this.data.type_class.length ;i++){
          this.data.type_class[i] ='goods_type';
        }
        this.data.type_class[num] = 'goods_type_choosed';
        this.setData({ type_class: this.data.type_class});
      }
      else if(this.data.type_class[num] == 'goods_type_choosed') {
        for (var i = 0; i < this.data.type_class.length; i++) {
          this.data.type_class[i] = 'goods_type';
        }
        this.setData({ type_class: this.data.type_class });
      }
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