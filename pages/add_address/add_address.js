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
    setup_defualt:0,
    turn_true:false

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
    //判断地址列表是否大于10
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
        self.setData({ turn_true:true });
        wx.request({
          url: app.globalData.global_lijiang_Url,
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

              //判断用户之前有没有添加过地址
              if (app.globalData.global_order_to_address == "yes") {
                app.globalData.global_order_to_address = "no";
                //请求默认地址作为第一个地址
                wx.request({
                  url: app.globalData.global_lijiang_Url,
                  data: requestdao.setParamsData("address.gd", {
                    "userId": app.globalData.userId
                  }, true),
                  method: "POST",
                  header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
                  success: function (res) {
                    if (res.statusCode == 200) {
                      var back = res.data;
                        
                          app.globalData.global_choose_address = back.address;
                          app.globalData.global_choose_address_switch = "ok";
                          wx.showToast({
                            title: "添加成功",//这里打印出登录成功
                            image: '/assets/index/success.jpg',
                            duration: 1500
                          })
                          setTimeout(function () {
                            wx.hideToast()
                            self.setData({ turn_true: false });
                            wx.navigateBack({
                              delta: 1
                            });
                          }, 1500)
            

                    }
                    else {
                      //请求出错了
                      self.setData({ turn_true: false });
                    }

                  }
                })
                
              }
              else {
                if (back.reCode == "06") {
                  wx.showToast({
                    title: "地址已存在",//这里打印出登录成功
                    image: '/assets/index/warning.jpg',
                    duration: 1500
                  })
                  setTimeout(function () {
                    wx.hideToast()
                    self.setData({ turn_true: false });
                    wx.navigateBack({
                      delta: 1
                    });
                  }, 1500)
                } else {
                  //跳转到地址列表的刷新开关
                  wx.showToast({
                    title: "添加成功",//这里打印出登录成功
                    image: '/assets/index/success.jpg',
                    duration: 1500
                  })
                  setTimeout(function () {
                    wx.hideToast()
                    self.setData({ turn_true: false });
                    app.globalData.global_add_to_address = "yes";
                    wx.navigateBack({
                      delta: 1
                    });
                  }, 1500)
                  
                }
              }



            }
            else {
              //请求出错了
              self.setData({ turn_true: false });
            }

          }
        })

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
    console.log('userId'+app.globalData.userId);
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