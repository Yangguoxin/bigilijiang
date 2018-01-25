// pages/canlender/canlender.js
var app = getApp();
var requestdao = require('../../dao/requestdao.js');
var datedao = require('../../dao/datedao.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currYear:null,
    currMonth:null,
    currDay:null,
    currMonthCount:null,
    mounthFirstday:null,
    canlender_title: ["日", "一", "二", "三", "四", "五", "六"],
    canlenderdays:null,
    canlenderdays_left:null,
    emptyDay:null,
    month_css: ["month_title_choosed", "month_title","month_title"],
    month_count:[],
    Month_title:null,
    merchant_detail:null,
    person_count:1,
    child_count:0,
    product_count:0,
    product_list:null,
    currDate:null,
    tour_list:null,
    choosed_tour_time:null

  },

  /**
   * 生命周期函数--监听页面加
   */
  onLoad: function (options) {
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    var new_date = new Date();
    this.setData({
      Month_title: new_date.getMonth() + 1,
      currDay: new_date.getDate(),
      product_count:0
    });
    //计算开始时间
    var new_date = new Date();
    var mounth_count_tmp = [];
    for(var i=0; i<3; i++){
      if(i==0){
        mounth_count_tmp[i] = new Date(new_date.getFullYear(), (new_date.getMonth() + 1 + i), 0);
        mounth_count_tmp[i] = mounth_count_tmp[i].getDate();
        mounth_count_tmp[i] = mounth_count_tmp[i] - new_date.getDate() + 1;
      }else{
        mounth_count_tmp[i] = new Date(new_date.getFullYear(), (new_date.getMonth() + 1 + i), 0);
        mounth_count_tmp[i] = mounth_count_tmp[i].getDate();
      }
    }
    console.log(mounth_count_tmp);
    var startDate = new_date.getFullYear() + '-' + (new_date.getMonth() + 1 ) + '-' + new_date.getDate();
    //计算结束时间
    var currMonthCount = new Date(new_date.getFullYear(), (new_date.getMonth() + 1 + 2), 0);
    var endDate = new_date.getFullYear() + '-' + (new_date.getMonth() + 1 + 2) + '-' + currMonthCount.getDate();
    //请求日期列表
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("product.dpl",
        {
          "startDate": datedao.formatTime(new Date(), 0),
          "endDate": datedao.formatTime(new Date(), 2),
          "productId": app.globalData.global_tour_productId
        }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          if (back.reCode == "00") {
            wx.hideToast()
            console.log(back);
            self.setData({
              product_list: back.priceList,
              month_count: mounth_count_tmp
            })
            self.get_canlender(new Date());
          } else {

          }
        }
        else {
          //请求出错了
          wx.hideToast();
        }

      }
    })
    
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  chooseHandle:function(e){
    var num = e.target.dataset.num;
    var canlenderdays_left_tmp = this.data.canlenderdays_left;
    if (num != undefined){
      console.log(this.data.currYear)
      console.log(this.data.currMonth)
      console.log(this.data.canlenderdays_left[num].day);
      for (var i = 0; i < canlenderdays_left_tmp.length; i++) {
        if (i == num) {
          canlenderdays_left_tmp[num].choose = true;
        } else {
          canlenderdays_left_tmp[i].choose = false;
        }
      }

      this.setData({ 
        canlenderdays_left: canlenderdays_left_tmp,
        currDay: canlenderdays_left_tmp[num].day,
        currDate: canlenderdays_left_tmp[num]
        });
    }
    
  },
  changeMonthHandle:function(e){
    var num = e.target.dataset.num;
    var month_css_tmp = this.data.month_css;
    console.log(num);
    if (num != undefined) {
      for (var i = 0; i < month_css_tmp.length; i++) {
        if (i == num) {
          month_css_tmp[i] = "month_title_choosed";
        }
        else {
          month_css_tmp[i] = "month_title";
        }
      }
      //计算月份
      var new_date = new Date();
      //处理转换年份
      if ((new_date.getMonth() + 1 + parseInt(num))>12){
        var date_str = (new_date.getFullYear() + 1) + '/' + (new_date.getMonth() + 1 + parseInt(num))%12 + '/' + '1';
      }else{
        var date_str = new_date.getFullYear() + '/' + (new_date.getMonth() + 1 + parseInt(num)) + '/' + '1';
      }
      console.log(date_str);
      if (num == 0) {
        this.setData({
          month_css: month_css_tmp,
          product_count: 0
        });
        this.get_canlender(new Date());
      } else {
        var currMonthCount = new Date(date_str);
        var product_count_tmp = 0;
        for (var i = 0; i < num; i++) {
          product_count_tmp += this.data.month_count[i];
        }
        console.log(product_count_tmp);
        this.setData({
          month_css: month_css_tmp,
          product_count: product_count_tmp,

        });
        this.get_canlender(date_str);
      }

    }
    
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this;
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("product.d",
        {
          "userId": app.globalData.userId,
          "productId": app.globalData.global_tour_productId,
          "noNeedPlate": true
        }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          if (back.reCode == "00") {
            if (back.product.needTourTime==true){
              wx.request({
                url: app.globalData.global_lijiang_Url,
                data: requestdao.setParamsData("product.rtl", {
                  "userId": app.globalData.userId,
                  "productId": app.globalData.global_tour_productId
                }, true),
                method: "POST",
                header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                success: function (res) {
                  if (res.statusCode == 200) {
                    var back = res.data;
                    var tour_time_tmp = [];
                    console.log(back);
                    for (var i = 0; i < back.tripTimeList.length;i++){
                      tour_time_tmp.push({
                        time: back.tripTimeList[i],
                        isChoosed: false
                      });
                    }
                    if (back.reCode == '00') {
                      console.log(tour_time_tmp);
                      self.setData({
                        tour_list: tour_time_tmp,
                        choosed_tour_time:null
                      })
                    } else {
                      wx.showToast({
                        title: back.reMsg,//这里打印出登录成功
                        image: '/assets/index/warning.jpg',
                        duration: 1000
                      })
                    }
                  }
                  else {
                    //请求出错了

                  }

                }
              })
            }


            if (back.product.defaultChildPrice == 0){
              self.setData({
                child_count:0,
                merchant_detail: back.product
              })
            }else{
              self.setData({
                merchant_detail: back.product
              })
            }
            console.log(back);
          } else {
            wx.showToast({
              title: "请求列表出错",
              image: '/assets/index/warning.jpg',
              duration: 300
            })
            setTimeout(function () {
            }, 500)
          }
        }
        else {
          //请求出错了
        }
      }
    })


    
  },
  get_canlender(date_str){
    var day = new Date(date_str);
    var currMonth = day.getMonth() + 1;
    var currYear = day.getFullYear();
    var currMonthCount = new Date(currYear, day.getMonth() + 1, 0);
    var currday_index = day.getDate();
    console.log(day.getMonth());
    day.setDate(1);
    var week = day.getDay();
    var empty_tmp = [];
    var canlenderdays_tmp = [];
    var canlenderdays_left_tmp = [];
    console.log(week);
    for (var i = 0; i < week; i++) {
      empty_tmp[i] = "empty";
    }
    console.log(currMonthCount.getDate());
    for (var z = 1; z < currday_index; z++) {
      canlenderdays_tmp.push({
        day: z
      })
    }
     
    for (var j = currday_index; j <= (currMonthCount.getDate()); j++) {
      if (j == currday_index) {
        this.data.product_list[this.data.product_count].day = j;
        this.data.product_list[this.data.product_count].choose = true;
        canlenderdays_left_tmp.push(this.data.product_list[this.data.product_count])
        // canlenderdays_left_tmp.push({
        //   day: j,
        //   choose: true,
        //   goods_left: 10,
        // })
        this.data.product_count+=1;
      } else {
        this.data.product_list[this.data.product_count].day = j;
        this.data.product_list[this.data.product_count].choose = false;
        canlenderdays_left_tmp.push(this.data.product_list[this.data.product_count])
        // canlenderdays_left_tmp.push({
        //   day: j,
        //   choose: false,
        //   goods_left: 10,
        // })
        this.data.product_count += 1;
      }

    }
    this.setData({
      canlenderdays: canlenderdays_tmp,
      emptyDay: empty_tmp,
      currMonthCount: currMonthCount.getDate(),
      canlenderdays_left: canlenderdays_left_tmp,
      currYear: currYear,
      currMonth: currMonth,
      product_count:this.data.product_count,
      currDate: canlenderdays_left_tmp[0]
    });
    console.log(this.data.canlenderdays_left);
  },
  person_reduce:function(){
    var person_count_tmp = this.data.person_count;
    if (person_count_tmp <= 1) {
      return false;
    } else {
      person_count_tmp -= 1;
      this.setData({ person_count: person_count_tmp });
    }
  },
  person_add:function(){
    var person_count_tmp = this.data.person_count;
    person_count_tmp += 1;
    this.setData({ person_count: person_count_tmp });
  },
  child_reduce: function () {
    var child_count_tmp = this.data.child_count;
    if (child_count_tmp <= 0) {
      return false;
    } else {
      child_count_tmp -= 1;
      this.setData({ child_count: child_count_tmp });
    }
  },
  child_add: function () {
    var child_count_tmp = this.data.child_count;
    child_count_tmp += 1;
    this.setData({ child_count: child_count_tmp });
  },
  goto_buy:function(){
    console.log(this.data.currDate);
    console.log(this.data.currYear);
    console.log(this.data.currMonth);
    console.log(this.data.currDay);
    console.log(this.data.person_count);
    console.log(this.data.child_count);
    console.log(app.globalData.global_tour_productId);
    if (this.data.currDate.isLimit == true && this.data.currDate.buyQuantity == 0){
      wx.showToast({
        title: "该日产品售罄",//这里打印出登录成功
        image: '/assets/index/warning.jpg',
        duration: 1500
      })
      setTimeout(function () {
        return false;
      }, 1500)
    } else if (this.data.person_count == 0 ) {
      wx.showToast({
        title: "请选择数量",//这里打印出登录成功
        image: '/assets/index/warning.jpg',
        duration: 1500
      })
      setTimeout(function () {
        return false;
      }, 1500)
    }else if (this.data.merchant_detail.needTourTime == true && this.data.choosed_tour_time == null){
      wx.showToast({
        title: "选择出发时间",//这里打印出登录成功
        image: '/assets/index/warning.jpg',
        duration: 1500
      })
      setTimeout(function () {
        return false;
      }, 1500)
    }
    else{
      //传输全局变量
      app.globalData.global_product_detail = null;
      app.globalData.global_product_detail = this.data.merchant_detail;
      app.globalData.global_child_count = this.data.child_count;
      app.globalData.global_person_count = this.data.person_count;
      app.globalData.global_travel_begin = this.data.currDate.date;
      app.globalData.global_tour_time = null;
      app.globalData.global_tour_time = this.data.choosed_tour_time;
      wx.navigateTo({
        url: '../tour_order/tour_order'
      })
    }
    
  },
  choose_tour_timeHandle:function(e){
    var num = e.target.dataset.num;
    var tour_list_tmp = this.data.tour_list;
    
    if(num!=undefined){
      for (var i = 0; i <tour_list_tmp.length;i++){
        if(i == num){
          tour_list_tmp[i].isChoosed = true;
          console.log(tour_list_tmp[num].isChoosed);
        }else{
          tour_list_tmp[i].isChoosed = false;
        }
      }
      console.log(tour_list_tmp);
      this.setData({ 
        tour_list: tour_list_tmp,
        choosed_tour_time: tour_list_tmp[num].time
        });
      console.log(this.data.tour_list);
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