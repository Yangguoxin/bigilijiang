// order_list.js
var app=getApp();
var requestdao = require('../../dao/requestdao.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_container: ['all_orders_fix', 'all_orders', 'all_orders'],
    order_list: [],
    page_num:1,
    page_size:6,
    //分页加载的开关
    scroll_loading:true,
    page_count:1,
    choose_type:0,
    wait_pay_list:[],
    has_pay_list:[]
  },
  changeHandle:function(e){
    var num = e.target.dataset.num;
    var order_container_tmp = this.data.order_container;
    if (order_container_tmp[num] =='all_orders'){
      for(var i=0;i<order_container_tmp.length;i++){
        order_container_tmp[i] = 'all_orders';
      }
      if(num == '1'){
        var self = this;
        wx.request({
          url: app.globalData.global_lijiang_Url,
          data: requestdao.setParamsData("order.l", {
            "userId": app.globalData.userId,
            "page": 1,
            "size": 20,
            "orderState":0,
            "isPost": true
          }, true),
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
          success: function (res) {
            if (res.statusCode == 200) {
              var back = res.data;
              order_container_tmp[num] = 'all_orders_fix';
              self.setData({
                wait_pay_list: back.orders,
                order_container: order_container_tmp,
                choose_type: num
              });
              console.log(self.data.order_list)
            }
            else {
              //请求出错了

            }

          }
        })
      }
      //待收货
      if(num == '2' ){
        var self = this;
        wx.request({
          url: app.globalData.global_lijiang_Url,
          data: requestdao.setParamsData("order.l", {
            "userId": app.globalData.userId,
            "page": 1,
            "size": 20,
            "orderState": 2,
            "isPost": true
          }, true),
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
          success: function (res) {
            if (res.statusCode == 200) {
              var back = res.data;
              order_container_tmp[num] = 'all_orders_fix';
              self.setData({
                has_pay_list: back.orders,
                order_container: order_container_tmp,
                choose_type: num
              });
              console.log(self.data.order_list)
            }
            else {
              //请求出错了

            }

          }
        })
      }
      if(num == '0'){
        order_container_tmp[num] = 'all_orders_fix';
        this.setData({
          order_container: order_container_tmp,
          choose_type: num
        });
        //订单列表请求
        var self = this;
        wx.showLoading({
          title: '加载中',
          mask: true
        })
        wx.request({
          url: app.globalData.global_lijiang_Url,
          data: requestdao.setParamsData("order.l", {
            "userId": app.globalData.userId,
            "page": 1,
            "size": 6,
            "isPost": true
          }, true),
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
          success: function (res) {
            if (res.statusCode == 200) {
              var back = res.data;
              var order_list_tmp = [];
              // order_list_tmp[0] = new Array();
              order_list_tmp[0] = back.orders;
              wx.hideLoading();
              self.setData({ 
                order_list: order_list_tmp,
                page_count: 1
                 });
              console.log(self.data.order_list[0].length)
            }
            else {
              //请求出错了

            }

          }
        })
      } 
      
      
    }
  },
  goto_comment: function (e) {
    var num = e.target.dataset.num;
    var index = e.target.dataset.index;

    if (num != undefined && index != undefined) {
      app.globalData.global_productId_id = this.data.order_list[num][index].products[0].id;
      app.globalData.global_sellerId = this.data.order_list[num][index].sellerId;
      app.globalData.global_productId = this.data.order_list[num][index].products[0].productId;
      app.globalData.global_goods_detail = this.data.order_list[num][index].products[0];
      console.log(app.globalData.global_productId);
      wx.navigateTo({
        url: '../write_goods_comments/wirte_goods_comments'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.global_order = null;
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    //订单列表请求
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("order.l", {
        "userId": app.globalData.userId,
        "page": 1,
        "size": 6,
        "isPost": true
      }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          var order_list_tmp = [];
          // order_list_tmp[0] = new Array();
          order_list_tmp[0] = back.orders;
          wx.hideLoading();
          self.setData({ order_list: order_list_tmp });
          console.log(self.data.order_list[0].length)
        }
        else {
          //请求出错了

        }

      }
    })
  },
  goto_payHandle:function(){
    wx.navigateTo({
      url: '../order_detail/order_detail'
    })
  },
  goto_order_detailHandle:function(e){
    var num = e.target.dataset.num;
    var index = e.target.dataset.index;
    if (num != undefined && index != undefined){
      app.globalData.global_order_id = this.data.order_list[num][index].id;
      console.log(app.globalData.global_order_id);
        wx.navigateTo({
          url: '../order_detail/order_detail'
        })
    }
    
  },
  goto_has_order_detailHandle:function(e){
    var num = e.target.dataset.num;
    if (num != undefined ) {
      app.globalData.global_order_id = this.data.has_pay_list[num].id;
      console.log(app.globalData.global_order_id);
      wx.navigateTo({
        url: '../order_detail/order_detail'
      })
    }
  },
  goto_wait_order_detailHandle: function (e) {
    var num = e.target.dataset.num;
    if (num != undefined) {
      app.globalData.global_order_id = this.data.wait_pay_list[num].id;
      console.log(app.globalData.global_order_id);
      wx.navigateTo({
        url: '../order_detail/order_detail'
      })
    }
  },
  //分页加载
  scroll_page:function(){
    var self = this;
    if (this.data.scroll_loading == true && (this.data.order_list[this.data.page_count-1].length == this.data.page_size)){
      self.setData({
        scroll_loading: false
      });
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("order.l", {
          "userId": app.globalData.userId,
          "page": (this.data.page_count + 1),
          "size": 6,
          "isPost": true
        }, true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            var order_list_tmp = [];
            // order_list_tmp[0] = new Array();
            order_list_tmp = self.data.order_list;
            order_list_tmp[self.data.page_count] = back.orders;
            self.setData({ 
              order_list: order_list_tmp,
              scroll_loading:true,
              page_count: (self.data.page_count+1)
               });
            console.log(self.data.order_list)
          }
          else {
            //请求出错了

          }

        }
      })
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
    if(app.globalData.global_order_list_flash == "yes"){
      app.globalData.global_order_list_flash = "no";
      this.data.order_container = ['all_orders_fix', 'all_orders', 'all_orders'];
      this.data.order_list = [];
      var self = this;
      wx.showLoading({
        title: '加载中',
        mask: true
      })
      //订单列表请求
      wx.request({
        url: app.globalData.global_lijiang_Url,
        data: requestdao.setParamsData("order.l", {
          "userId": app.globalData.userId,
          "page": 1,
          "size": 6,
          "isPost": true
        }, true),
        method: "POST",
        header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            var order_list_tmp = [];
            // order_list_tmp[0] = new Array();
            order_list_tmp[0] = back.orders;
            wx.hideLoading();
            self.setData({ 
              order_container: self.data.order_container,
              choose_type: "0",
              order_list: order_list_tmp,
              page_count:1
               });
            console.log(self.data.order_list)
          }
          else {
            //请求出错了

          }

        }
      })

    }
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