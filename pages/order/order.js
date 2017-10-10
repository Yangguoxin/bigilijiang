// order.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    route_detail_switch:"close",
    choose_traveler:[],
    choose_image:[],
    choose_route_detail:"/assets/index/down.png",
    date : null,
    date_end:"2017-12-31",
    data_start:null,
    display_name:null,
    turn_true:true,
    display_switch:"none",
    button_hiden: "inline-flex",
    traveler_list_before:[],
    traveler_list:null,
    button_loading:false,
    date_travel_begin:null,
    price:null,
    //下单时的人数列表
    tourists_list:null,
    //用来保存取消的选择
    choose_image_cancel:null,
    scenery_detail_list:[]

    
  },
  bindDateChange: function(e){
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var date_tmp = e.detail.value;
    date_tmp=date_tmp.replace(/-/g,'/');
    var date_num = (new Date(date_tmp)).valueOf();
    this.setData({
      date: e.detail.value,
      date_travel_begin: date_num,
    })
    console.log(this.data.date_travel_begin);
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //挑选出景点信息
    console.log(app.globalData.global_route_name);
    var back_tmp = app.globalData.global_route_information;
    var scenery_detail_list_tmp = [];
    var count = 0;
    for (var i = 0; i < back_tmp.length; i++) {
      for (var j = 0; j < back_tmp[i].scenery.length; j++) {
        scenery_detail_list_tmp[count] = back_tmp[i].scenery[j];
        count++;
      }
    }
    console.log(scenery_detail_list_tmp);
    //设置时间选择器，设置为明天的时间
    var date_start = new Date();
    date_start.setTime(date_start.getTime() + 24 * 60 * 60 * 1000);
    var date_tmp = date_start.toLocaleDateString();
    var date_tmp_time = new Date(date_start.toLocaleDateString()).valueOf();
    console.log("时间戳：" + date_tmp_time);
    date_tmp = date_tmp.replace(/\//g,'-');
    this.setData({
      date: date_tmp,
      data_start: date_tmp,
      price:app.globalData.route_price,
      date_travel_begin: date_tmp_time, 
      scenery_detail_list: scenery_detail_list_tmp
    })
    console.log(this.data.date_travel_begin);
    var self = this;
    //请求添加人列表
    wx.request({
      url: app.globalData.global_Url + '/iTour/contact/list', //仅为示例，并非真实的接口地址
      data: {
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          var choose_image_tmp = [];
          for(var i=0;i<back.length;i++){
            choose_image_tmp[i] ="/assets/index/no_pick.png";
          }
          self.setData({ 
            traveler_list_before: back,
            choose_image: choose_image_tmp,
            choose_image_cancel: choose_image_tmp
           });
          console.log(self.data.traveler_list_before);
        }
        else {
          //访问出错了
        }
      }
    })
  },
  // 折叠和展开路线详情
  change_route_detail(){
    console.log("test");
    var route_detail_tmp = this.data.route_detail_switch;
    if (route_detail_tmp == "open"){
      this.data.choose_route_detail = "/assets/index/up.png";
      route_detail_tmp = "close";
    }
      
    else{
      route_detail_tmp = "open";
      this.data.choose_route_detail = "/assets/index/down.png";
    }
      
    this.setData({
      route_detail_switch: route_detail_tmp,
      choose_route_detail: this.data.choose_route_detail,
      turn_true:true
    })
    console.log(this.data.choose_route_detail);
  },
  // 选择联系人
  choose_person:function(){
    this.setData({ turn_true: false, display_switch: "inline-flex", button_hiden: "none"})
    console.log(this.data.date_travel_begin);
  },
  // 跳转到填写联系人信息
  add_contact:function(){
    if (this.data.traveler_list_before.length >= 10){
      wx.showToast({
        title: '最多添加10个联系人哦',//这里打印出报名成功
        image: '/assets/index/warning.jpg',
        duration: 1000
      })
    }else{
      wx.navigateTo({
        url: '../add_information/add_information'
      })
    }
    
  },
  // 是否确定选择联系人
  add_cancel:function(){
    this.setData({ 
      turn_true: true, 
      display_switch: "none", 
      button_hiden: "inline-flex",
      traveler_list: this.data.traveler_list,
      choose_image:this.data.choose_image_cancel

      })
  },
  add_ok:function(){
    var choose_tmp=this.data.choose_image;
    console.log(this.data.choose_image);
    this.data.choose_image_cancel = this.data.choose_image;
    var traveler_list_tmp = [];
    var tourists_list_tmp = [];
    this.data.traveler_list=null;
    this.data.tourists_list=null;
    var count = 0;
    for(var i=0;i<choose_tmp.length;i++){
      if (choose_tmp[i] == "/assets/index/pick_man.png"){
        traveler_list_tmp[count] = this.data.traveler_list_before[i];
        tourists_list_tmp[count] = this.data.traveler_list_before[i].id;
        count++;
      }
    }
    if (traveler_list_tmp.length==0){
      traveler_list_tmp=null;
      tourists_list_tmp = null;
    }
    this.setData({ 
      turn_true: true, 
      display_switch: "none", 
      button_hiden: "inline-flex",
      traveler_list: traveler_list_tmp,
      tourists_list: tourists_list_tmp,
      choose_image_cancel: this.data.choose_image_cancel
       })
    console.log(this.data.date_travel_begin);
  },
  // 下单支付请求
  pay_Handle:function(){
    var self = this;
    if (this.data.traveler_list == null){
        wx.showToast({
          title: '先添加游客信息哦',//这里打印出报名成功
          image: '/assets/index/warning.jpg',
          duration: 1000
        })
    }
    else{
        self.setData({ button_loading: true });
        wx.request({
          url: app.globalData.global_Url + '/iTour/travel/order/add',
          data: {
            userId: app.globalData.userId,
            openId: app.globalData.openId,
            routeBriefId: app.globalData.choosed_route,
            contactPersonId: self.data.tourists_list[0],
            tourists: self.data.tourists_list,
            totalFee: (app.globalData.route_price * self.data.tourists_list.length),
            merchantId: 20,
            price: app.globalData.route_price,
            num: self.data.tourists_list.length,
            body: app.globalData.global_route_name,
            travelTime: self.data.date_travel_begin
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.statusCode == 200) {
              console.log(res);
              wx.requestPayment({
                timeStamp: res.data.timeStamp,
                nonceStr: res.data.nonceStr,   //字符串随机数
                package: res.data.package,
                signType: res.data.signType,
                paySign: res.data.paySign,
                'success': function (res) {
                  console.log(res);    //requestPayment:ok==>调用支付成功
                  wx.showToast({
                    title: '支付成功',//这里打印出报名成功
                    image:'/assets/index/success.jpg',
                    duration: 1000
                  })
                  setTimeout(function () { wx.redirectTo({ url: '../order_list/order_list' })}, 1500);
                  self.setData({ button_loading: false });
                },
                'fail': function (res) {
                  self.setData({ button_loading: false });
                  console.log(res.errMsg);
                },
                'complete': function (res) {
                  self.setData({ button_loading: false });
                  if (res.errMsg =="requestPayment:fail cancel"){
                    wx.showToast({
                      title: "支付已经取消",
                      image: '/assets/index/warning.jpg',
                      duration: 1000
                    })
                  }
                  console.log(res.errMsg);
                }
              })
            } else if (res.data.state == 0) {
              wx.showToast({
                title: res.data.Msg,
                icon: 'fail',
                duration: 1000
              })
              self.setData({ button_loading: false });
              console.log(res);
            }
            else {
              wx.showToast({
                title: '系统繁忙，请稍后重试~',
                image: '/assets/index/warning.jpg',
                duration: 1000
              })
              self.setData({ button_loading: false });
              //访问出错了
            }

          }
        });
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
    if(app.globalData.global_traveler_flash=="yes")
    {
      app.globalData.global_traveler_flash = "no"
      var self = this;
      //请求添加人列表
      wx.request({
        url: app.globalData.global_Url + '/iTour/contact/list', //仅为示例，并非真实的接口地址
        data: {
          userId: app.globalData.userId
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            var choose_image_tmp = self.data.choose_image;
            for (var i = (choose_image_tmp.length - 1); i < back.length; i++) {
              choose_image_tmp[i] = "/assets/index/no_pick.png";
            }
            self.setData({
              traveler_list_before: back,
              choose_image: choose_image_tmp
            });
            self.setData({ traveler_list_before: back });
            console.log(self.data.traveler_list_before);
          }
          else {
            //访问出错了
          }
        }
      })
    }
  },
  choose_Handle:function(e){
    var num = e.target.dataset.num;
    console.log(num);
    var choose_image_tmp = this.data.choose_image;
    if(num !== null){
      if (choose_image_tmp[num] =="/assets/index/no_pick.png")
        choose_image_tmp[num] = "/assets/index/pick_man.png"
      else
        choose_image_tmp[num] = "/assets/index/no_pick.png"
      this.setData({ choose_image: choose_image_tmp})
    }
    console.log(this.data.choose_image);
  },
  delete_person:function(e){
    var num = e.target.dataset.num;
    var self = this;
    console.log(num);
    console.log(this.data.traveler_list_before[num].id);
    if (num !== null) {
      if (this.data.choose_image[num] =="/assets/index/pick_man.png"){
        this.data.choose_image[num] = "/assets/index/no_pick.png";
        this.setData({ choose_image: this.data.choose_image});
      }

      wx.request({
        url: app.globalData.global_Url + '/iTour/contact/delete',
        data: {
          contactId: this.data.traveler_list_before[num].id
        },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          if (res.statusCode == 200) {
            app.globalData.global_traveler_flash = "yes";
            self.onShow();
          }
          else {

            //访问出错了
          }

        }
      });
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