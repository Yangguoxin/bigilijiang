// order_list.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order_container: ['all_orders_fix', 'all_orders', 'all_orders']
  },
  changeHandle:function(e){
    var num = e.target.dataset.num;
    var order_container_tmp = this.data.order_container;
    if (order_container_tmp[num] =='all_orders'){
      for(var i=0;i<order_container_tmp.length;i++){
        order_container_tmp[i] = 'all_orders';
      }
      order_container_tmp[num] = 'all_orders_fix';
      this.setData({ order_container: order_container_tmp});
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    app.globalData.global_order = null;
  },
  goto_payHandle:function(){
    wx.navigateTo({
      url: '../order_detail/order_detail'
    })
  },
  goto_comment:function(){
    wx.navigateTo({
      url: '../write_goods_comments/wirte_goods_comments'
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