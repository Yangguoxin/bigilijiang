// hardware_buy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brief_list:[
      {
        id:1,
        name:"斐讯体脂秤",
        price:"59900"
      },
      {
        id: 2,
        name: "斐讯体脂秤",
        price: "59900"
      },
      {
        id: 3,
        name: "斐讯体脂秤",
        price: "59900"
      },
      {
        id: 4,
        name: "斐讯体脂秤",
        price: "59900"
      },
      {
        id: 5,
        name: "斐讯体脂秤",
        price: "59900"
      },
      {
        id: 6,
        name: "斐讯体脂秤",
        price: "59900"
      }
    ]
  },
  hardwareHandle:function(e){
    wx.redirectTo({
      url: '../merchant_detail/merchant_detail'
    })
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