// add_information.js
var requestdao = require('../../dao/requestdao.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ID_card: null,
    user_name: null,
    telephone_num: null,
    turn_true: false,
    choose_name: "",
    choose_telephone: "",
    choose_idcard:null
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
    console.log(app.globalData.global_contact_detail);
    this.setData({
      choose_name: app.globalData.global_contact_detail.name,
      choose_telephone: app.globalData.global_contact_detail.phone,
      choose_idcard: app.globalData.global_contact_detail.identity
    });
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
  choose_name_Handle: function (e) {
  },
  choose_telephone_Handle: function (e) {
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  submit: function (e) {
    var timestamp = (new Date()).valueOf();
    var self = this;
    self.data.ID_card = e.detail.value.ID_num;
    self.data.user_name = e.detail.value.user_name;
    self.data.telephone_num = e.detail.value.telephone_num;
    if (self.data.user_name.replace(/\s/g, '') == "" || self.data.telephone_num.replace(/\s/g, '') == "" || self.data.ID_card.replace(/\s/g, '') == "" ||
      self.data.user_name == undefined || self.data.telephone_num == undefined || self.data.ID_card == undefined) {
      wx.showToast({
        title: '*内容不能为空',
        image: '/assets/index/warning.jpg',
        duration: 1000,
      })
      return false;
    } else {
      //判断电话号码的长度
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/).test(self.data.telephone_num)) {
        wx.showToast({
          title: "手机号不正确",//这里打印出登录成功
          image: '/assets/index/warning.jpg',
          duration: 1000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      } else if ((!self.data.ID_card || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(self.data.ID_card))) {
        wx.showToast({
          title: "身份证错误",//这里打印出登录成功
          image: '/assets/index/warning.jpg',
          duration: 1000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
      else {
        console.log(self.data.user_name, self.data.telephone_num, self.data.ID_card);
        self.setData({ turn_true: true });
        wx.request({
          url: app.globalData.global_lijiang_Url,
          data: requestdao.setParamsData("contact.m", {
            "id": app.globalData.global_contact_detail.id,
            "userId": app.globalData.userId,
            "name": self.data.user_name,
            "phone": self.data.telephone_num,
            "identity": self.data.ID_card
          }, true),
          method: "POST",
          header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
          success: function (res) {
            if (res.statusCode == 200) {
              var back = res.data;
              console.log(back);
              if (back.reCode == '00') {
                wx.showToast({
                  title: "修改成功",
                  image: '/assets/index/success.jpg',
                  duration: 1000
                })
                setTimeout(function () {
                  wx.hideToast()
                  wx.navigateBack({
                    delta: 1
                  })
                  self.setData({ turn_true: false });
                }, 1200)
              }
              else if (back.reCode == '06') {
                wx.showToast({
                  title: "联系人已经存在",
                  image: '/assets/index/warning.jpg',
                  duration: 1000
                })

                setTimeout(function () {
                  wx.hideToast()
                  wx.navigateBack({
                    delta: 1
                  })
                  self.setData({ turn_true: false });
                }, 1200)
              } else {
                wx.showToast({
                  title: "添加失败",
                  image: '/assets/index/warning.jpg',
                  duration: 1000
                })
                setTimeout(function () {
                  wx.hideToast()
                  self.setData({ turn_true: false });
                }, 1200)
              }

            }
            else {
              //请求出错了

            }

          }
        })

      }

    }
  }


})