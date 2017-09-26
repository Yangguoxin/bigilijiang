// pages/address/address.js
var app =getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      person_address_list:[
      {
        id:1,
        personName:"杨国鑫",
        telephone:"18685961601",
        addressProvince:"上海市",
        addressCity:"上海市",
        addressCountry:"松江区",
        detailAddress:"三新北1800弄16号楼4025",
        ifDefualt:1,
        ifChoose:1
      },
      {
        id: 2,
        personName: "小明",
        telephone: "18685961601",
        addressProvince: "上海市",
        addressCity: "上海市",
        addressCountry: "松江区",
        detailAddress: "三新北1800弄16号楼4025",
        ifDefualt: 0,
        ifChoose: 0
      },
      {
        id: 3,
        personName: "小王",
        telephone: "18685961601",
        addressProvince: "上海市",
        addressCity: "上海市",
        addressCountry: "松江区",
        detailAddress: "三新北1800弄16号楼4025",
        ifDefualt: 0,
        ifChoose: 0
      }
      ]
  },
  add_address:function(){
    wx.navigateTo({
      url: '../add_address/add_address'
    })
  },
  change_defualt:function(e){
    var num = e.target.dataset.num;
    var address_tmp = this.data.person_address_list;
    if(num != undefined){
      if(address_tmp[num].ifChoose==0){
        for(var i=0;i<address_tmp.length;i++){
          address_tmp[i].ifChoose = 0;
        }
        address_tmp[num].ifChoose = 1;
        this.setData({ person_address_list: address_tmp })
      }
      
    }
  },
  choose_addressHandle:function(e){
    var num = e.target.dataset.num;
    if(num != undefined){
      app.globalData.global_choose_address = this.data.person_address_list[num];
      app.globalData.global_choose_address_switch = "ok";
      wx.navigateBack({
        delta: 1
      });
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