// choose_scenery.js
var app =getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    type_list:[],
    choose_add:[],
    choose_scenery:[],
    display_scenery:[],
    //这个变量是接收全局景点变量所用
    scenery_list:[],
    scenery_name:[],
    hide_display: "none",
    merchan_index:[],
    nav_score_change: [],
    start_status: [],
    image_Url: null,
    //分页处理--景点
    scenery_type_list: [],
    scenery_start_status: [],
    scenery_nav_score_change: [],
    page_scenery_num: 1,
    page_scenery_Size: 7,
    page_scenery_count: 0,
    page_scenery_loading: true,
    scroll_width:300,
    turn_true:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
    this.setData({ image_Url: app.globalData.global_Img_Url });
    var self = this;
    
    //请求所有的景点数据
    wx.showLoading({
      title: '加载中',
      mask: true
    });
    //请求用户路线信息
    wx.request({
      url: app.globalData.global_Url + '/iTour/user/route/detail/search', //仅为示例，并非真实的接口地址
      data: {
        routeId: app.globalData.choosed_route,
        userId: app.globalData.userId
      },
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        var back = res.data;
        app.globalData.scenery_object = back;
        console.log(app.globalData.scenery_object);
      }
    })
    //请求所有景点
    //判定是否是第一页的加载
    if (self.data.page_scenery_num == 1) {
      //请求信用榜单对应种类的数据
      wx.request({
        url: app.globalData.global_Url + '/iTour/merchant/search/category', //仅为示例，并非真实的接口地址
        data: {
          category: 1,
          page: 1,
          pageSize: self.data.page_scenery_Size
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          var back = res.data;
          self.data.choose_add[self.data.page_scenery_count] = new Array();
          self.data.choose_scenery[self.data.page_scenery_count] = new Array();
          for (var i = 0; i < back.length; i++) {
            self.data.choose_add[self.data.page_scenery_count][i] = "myAdd_button.png";
            self.data.choose_scenery[self.data.page_scenery_count][i] = "Null";
          }
          self.data.scenery_nav_score_change[self.data.page_scenery_count] = new Array();
          self.data.scenery_start_status[self.data.page_scenery_count] = new Array();
          for (var n = 0; n < back.length; n++) {
            var score_tmp;
            score_tmp = parseFloat(back[n].score);
            self.data.scenery_nav_score_change[self.data.page_scenery_count][n] = score_tmp.toFixed(1);
            score_tmp = score_tmp.toFixed(0);
            switch (score_tmp) {
              case "0":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star0.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "1":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "2":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "3":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "4":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                break;
              case "5":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                break;
              case "6":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                break;
              case "7":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                break;
              case "8":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                break;
              case "9":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                break;
              case "10":
                self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                break;
            }
          }
          wx.hideLoading();
          self.data.scenery_type_list[self.data.page_scenery_count] = back;
          self.data.page_scenery_num += 1;
          self.data.page_scenery_count += 1;
          self.setData({ 
                scenery_type_list: self.data.scenery_type_list, 
                scenery_nav_score_change: self.data.scenery_nav_score_change, 
                scenery_start_status: self.data.scenery_start_status, 
                page_scenery_num: self.data.page_scenery_num, 
                page_scenery_count: self.data.page_scenery_count,
                choose_add: self.data.choose_add,
                choose_scenery: self.data.choose_scenery
                 });
          console.log(self.data.scenery_type_list);
        }
      })
    }
  },
  change_Add:function(e){
    var num = e.target.dataset.num;
    var mm = e.target.dataset.mm;
    var index = 0;
    if(num !== null  ){
      if (this.data.choose_add[mm][num] == "myAdd_button.png")
      {//设置选择加号
        this.data.choose_add[mm][num] = "Add_logo.png";
        this.data.scroll_width += 192;
      //设置选择底栏
        this.data.choose_scenery[mm][num] = this.data.scenery_type_list[mm][num].sceneryName;
      }   
      else{
        this.data.scroll_width -= 192;
        this.data.choose_add[mm][num] = "myAdd_button.png";
        this.data.choose_scenery[mm][num] = "Null";
      }
      this.setData({ choose_add: this.data.choose_add, scroll_width:this.data.scroll_width, choose_scenery: this.data.choose_scenery}); 
    }  
    console.log(num);
  },
  delete_choose:function(e){
    var num = e.target.dataset.num;
    var mm = e.target.dataset.mm;
    if (null !== undefined){
      console.log(this.data.choose_add[mm][num]);
      this.data.scroll_width -= 192;
      this.data.choose_add[mm][num] = "myAdd_button.png"
      this.data.choose_scenery[mm][num] = "Null";
    }
    this.setData({ choose_add: this.data.choose_add, scroll_width: this.data.scroll_width, choose_scenery: this.data.choose_scenery });
  },
  /*进行添加操作*/
  eject_add_scenery:function(){
    //查找选中的景点的下标
    
    var index = 0;


    for (var m = 0; m < this.data.choose_add.length;m++){
      for (var n = 0; n < this.data.choose_add[m].length; n++) {
        var tmp = {
          m: null,
          n: null
        };
        if (this.data.choose_add[m][n] == "Add_logo.png") {
          tmp.m = m;
          tmp.n = n;
          this.data.merchan_index[index] = tmp;
          index++;
        }
      }
    }

    if(this.data.merchan_index==""){
      wx.showToast({
        title: '您还没有选择对应景点',
        image: '/assets/index/warning.jpg',
        duration: 1000,
      })
      return false;
    }
    //处理隐藏界面的东西
    var name_tmp = [];
    var scenery_tmp = app.globalData.scenery_object;
    this.data.scenery_list = app.globalData.scenery_object;
    for (var i = 0; i < scenery_tmp.length;i++){
      name_tmp[i] = new Array();
       for (var j = 0; j < scenery_tmp[i].scenery.length;j++){
         name_tmp[i][j] = scenery_tmp[i].scenery[j].name;
      }
    }
    this.setData({ 
              scenery_list: scenery_tmp, 
              scenery_name: name_tmp, 
              hide_display: "inline-flex", 
              merchan_index: this.data.merchan_index,
              turn_true:false
               });  
    console.log(this.data.merchan_index);
  },
  cancel_add:function(){
    this.setData({ hide_display: "none", turn_true: true });
  },

  add_into_day:function(e){
    var num = e.target.dataset.num;
    var big_object = [];
    var position = (app.globalData.scenery_object[num].scenery.length + 1);
    var object_day = {
      dayNum:null,
      change:[]
    }
    object_day.dayNum = app.globalData.scenery_object[num].day;
    for (var i = 0; i < this.data.merchan_index.length;i++){
      object_day.change.push({ 
        merchantId: this.data.scenery_type_list[this.data.merchan_index[i].m][this.data.merchan_index[i].n].id,
        operation: 1, 
        indexNum: position  
        });
        position++;
    }
    object_day = [object_day];
    var json_object_day = JSON.stringify(object_day);

    //post请求
    wx.request({
      url: app.globalData.global_Url + '/iTour/user/route/detail/modify',
      data: {
        userId: app.globalData.userId,
        routeId: app.globalData.choosed_route,
        detail: json_object_day
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res) {
        if (res.statusCode == 200) {
          wx.showToast({
            title: '成功',
            image: '/assets/index/success.jpg',
            duration: 1000,
            success: function (res) {
              console.log(res);

            }
          })
          // wx.redirectTo({
          //   url: '../user_choose_route/user_choose_route'
          // })
          app.globalData.jump_to_index = "ok";
          wx.navigateBack();
         
        }
        else {
          wx.showToast({
            title: '失败',
            image: '/assets/index/warning.jpg',
            duration: 1000
          })
        }

      }
    });


    console.log(json_object_day);
    console.log(this.data.merchan_index);
  },
  scroll_page:function(){
    var self = this;
    if (this.data.page_scenery_loading == true && (this.data.scenery_type_list[this.data.page_scenery_count - 1].length == self.data.page_scenery_Size)) {
      self.data.page_scenery_loading = false;
      var jerex = 1;
      //请求对应种类商家数据
      wx.request({
        url: app.globalData.global_Url + '/iTour/merchant/search/category', //仅为示例，并非真实的接口地址
        data: {
          category: jerex,
          page: self.data.page_scenery_num,
          pageSize: self.data.page_scenery_Size
        },
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          if (res.statusCode == 200) {
            var back = res.data;
            self.data.choose_add[self.data.page_scenery_count] = new Array();
            self.data.choose_scenery[self.data.page_scenery_count] = new Array();
            for (var i = 0; i < back.length; i++) {
              self.data.choose_add[self.data.page_scenery_count][i] = "myAdd_button.png";
              self.data.choose_scenery[self.data.page_scenery_count][i] = "Null";
            }
            self.data.scenery_nav_score_change[self.data.page_scenery_count] = new Array();
            self.data.scenery_start_status[self.data.page_scenery_count] = new Array();
            for (var n = 0; n < back.length; n++) {
              var score_tmp;
              score_tmp = parseFloat(back[n].score);
              self.data.scenery_nav_score_change[self.data.page_scenery_count][n] = score_tmp.toFixed(1);
              score_tmp = score_tmp.toFixed(0);
              switch (score_tmp) {
                case "0":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star0.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "1":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star5.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "2":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star0.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "3":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star5.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "4":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star0.png", "star0.png", "star0.png"];
                  break;
                case "5":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star5.png", "star0.png", "star0.png"];
                  break;
                case "6":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star0.png", "star0.png"];
                  break;
                case "7":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star5.png", "star0.png"];
                  break;
                case "8":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star0.png"];
                  break;
                case "9":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star5.png"];
                  break;
                case "10":
                  self.data.scenery_start_status[self.data.page_scenery_count][n] = ["star1.png", "star1.png", "star1.png", "star1.png", "star1.png"];
                  break;
              }
            }
            self.data.page_scenery_num += 1;
            self.data.page_scenery_loading = true;
            self.data.scenery_type_list[self.data.page_scenery_count] = back;
            self.data.page_scenery_count += 1;
            self.setData({
              scenery_type_list: self.data.scenery_type_list,
              scenery_nav_score_change: self.data.scenery_nav_score_change,
              scenery_start_status: self.data.scenery_start_status,
              page_scenery_loading: self.data.page_scenery_loading,
              page_scenery_num: self.data.page_scenery_num,
              page_scenery_count: self.data.page_scenery_count,
              choose_add: self.data.choose_add,
              choose_scenery: self.data.choose_scenery
            });
            console.log(self.data.scenery_type_list);
          }
          else {
            //访问出错了
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