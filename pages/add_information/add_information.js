// add_information.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ID_card:null,
    user_name:null,
    telephone_num:null,
    turn_true:false,
    choose_name:"",
    choose_telephone:""
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
  choose_name_Handle:function(e){
  },
  choose_telephone_Handle:function(e){
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
    if (self.data.user_name.replace(/\s/g, '') == "" || self.data.telephone_num.replace(/\s/g, '') == ""  ||
       self.data.user_name == undefined || self.data.telephone_num == undefined) {
      wx.showToast({
        title: '*内容不能为空',
        image: '/assets/index/warning.jpg',
        duration: 1000,
      })
      return false;
    } else {
          //判断电话号码的长度
      if (self.data.telephone_num.length != 11){
        wx.showToast({
          title: '电话号码11位',
          image: '/assets/index/warning.jpg',
          duration: 1000,
        })
        return false;  
      }else{
        console.log(self.data.user_name, self.data.telephone_num, self.data.ID_card);
        self.setData({ turn_true: true });
        wx.request({
          url: app.globalData.global_Url + '/iTour/contact/add',
          data: {
            userId: app.globalData.userId,
            name: self.data.user_name,
            telephone: self.data.telephone_num,
            identify: self.data.ID_card
          },
          method: 'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded'
          },
          success: function (res) {
            if (res.statusCode == 200) {

              app.globalData.global_traveler_flash = "yes";
              wx.navigateBack({
                delta: 1
              })
              self.setData({ turn_true: false });
            }
            else {
              self.setData({ turn_true: false });
              //访问出错了
            }

          }
        });
      }

    }
  }


})