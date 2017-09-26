// pages/goods_order/goods_order.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defualt_information:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var address_information = {
      id: 1,
      personName: "杨国鑫",
      telephone: "18685961601",
      addressProvince: "上海市",
      addressCity: "上海市",
      addressCountry: "松江区",
      detailAddress: "三新北1800弄16号楼4025",
      ifDefualt: 1,
      ifChoose: 1
    };
    this.setData({ defualt_information: address_information})
    
  },
  choose_addressHandle:function(){
    wx.navigateTo({
      url: '../address/address'
    })
  },
  add_addressHandle:function(){
    app.globalData.global_order_to_address = "yes";
    wx.navigateTo({
      url: '../add_address/add_address'
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
    if (app.globalData.global_choose_address_switch == "ok"){
      this.setData({ defualt_information: app.globalData.global_choose_address })
      console.log(app.globalData.global_choose_address);
      app.globalData.global_choose_address_switch = "no";
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