// pages/add_address/add_address.js
var requestdao = require('../../dao/requestdao.js');
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose_province: ['北京市', '北京市', '海淀区'],
    customItem: '全部',
    choose_switch:"no",
    check_name_switch:"no",
    check_phone_switch:"no",
    check_address_switch:"no",
    setup_defualt:0

  },
  choose_provinceHandle: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      choose_switch:"yes",
      choose_province: e.detail.value
    })
  },
  submit:function(e){
    //添加新用户地址
    var self = this;
    var name_tmp = (e.detail.value.person_name).replace(/\s/g, '');
    var phone_tmp = (e.detail.value.person_phone).replace(/\s/g, '');
    var address_detail_tmp = (e.detail.value.person_address).replace(/\s/g, '');
    if (name_tmp == '' || phone_tmp == '' || address_detail_tmp == ''){
      wx.showToast({
        title: "信息不能为空",//这里打印出登录成功
        image: '/assets/index/warning.jpg',
        duration: 1000
      })
      setTimeout(function () {
        wx.hideToast()
       }, 2000)
    }
    else{
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/).test(phone_tmp)){
        wx.showToast({
          title: "手机号不正确",//这里打印出登录成功
          image: '/assets/index/warning.jpg',
          duration: 1000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }else{
        wx.request({
          url: 'http://119.62.125.201:8888/YYAPI/phone/api.do',
          data: requestdao.setParamsData("address.i", {
             "userId": app.globalData.userId, 
             "name": name_tmp, 
             "phone": phone_tmp, 
             "address": address_detail_tmp,
             "province": self.data.choose_province[0],
             "city": self.data.choose_province[1],
             "area": self.data.choose_province[2]
          }, true),
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
          success: function (res) {
            if (res.statusCode == 200) {
              var back = res.data;
              console.log(back);
            }
            else {
              //请求出错了

            }

          }
        })
        if (app.globalData.global_order_to_address == "yes") {
          app.globalData.global_order_to_address = "no";
          var address_tmp = {
            id: 3,
            personName: e.detail.value.person_name,
            telephone: e.detail.value.person_phone,
            addressProvince: this.data.choose_province[0],
            addressCity: this.data.choose_province[1],
            addressCountry: this.data.choose_province[2],
            detailAddress: e.detail.value.person_address,
            ifDefualt: 1,
            ifChoose: 1
          }
          app.globalData.global_choose_address = address_tmp;
          app.globalData.global_choose_address_switch = "ok";
          wx.navigateBack({
            delta: 1
          });
        }
        else {
          wx.navigateBack({
            delta: 1
          });
        }
        console.log(app.globalData.global_choose_address)
      }
    }


    
  },
  check_name_inputHandle:function(e){
    if (e.detail.value == ""){
      this.setData({
        check_name_switch: "no"
      });
    }else{
      this.setData({
        check_name_switch: "yes"
      });
    }
    console.log(e.detail)
  },
  check_phone_inputHandle: function (e) {
    if (e.detail.value == "") {
      this.setData({
        check_phone_switch: "no"
      });
    } else {
      this.setData({
        check_phone_switch: "yes"
      });
    }
    console.log(e.detail)
  },
  check_address_inputHandle: function (e) {
    if (e.detail.value == "") {
      this.setData({
        check_address_switch: "no"
      });
    } else {
      this.setData({
        check_address_switch: "yes"
      });
    }
    console.log(e.detail)
  },
  emptyHandle:function(e){
    var empty_tmp=e.target.dataset.num;
    if(empty_tmp != undefined){
      if(empty_tmp == "1"){
        this.setData({
          defualt_name: "",
          check_name_switch: "no"
        });
      }else if(empty_tmp == "2"){
        this.setData({
          defualt_phone: "",
          check_phone_switch: "no"
        });
      }else if(empty_tmp == "3"){
        this.setData({
          defualt_address: "",
          check_address_switch: "no"
        });
      }
    }
  },
  set_up_defualt:function(){
    if (this.data.setup_defualt == 0){
      this.setData({ setup_defualt : 1});
    }else{
      this.setData({ setup_defualt: 0 });
    }
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