// refund_reason.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content:null,
    reasons_container:[{
      reason: "预约不上",
      pick_nopick:"/assets/index/no_pick.png"
    },
    {
      reason: "去过了，不太满意",
      pick_nopick: "/assets/index/no_pick.png"
    },
    {
      reason: "朋友 / 网上评价不好",
      pick_nopick: "/assets/index/no_pick.png"
    },
    {
      reason: "买多了/买错了",
      pick_nopick: "/assets/index/no_pick.png"
    },
    {
      reason: "计划有变，没时间消费",
      pick_nopick: "/assets/index/no_pick.png"
    },
    {
      reason: "后悔了，不想要了",
      pick_nopick: "/assets/index/no_pick.png"
    },
    {
      reason: "商家说可以直接以团购价到店消费",
      pick_nopick: "/assets/index/no_pick.png"
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  submit: function (e) {
    var timestamp = (new Date()).valueOf();
    var self = this;
    var choosed_reason = [];
    var count = 0;
    var choosed_reasult="";
    for (var i = 0; i < self.data.reasons_container.length; i++) {
      if (self.data.reasons_container[i].pick_nopick == "/assets/index/pick_man.png") {
        choosed_reason[count] = self.data.reasons_container[i].reason;
        count++;
      }
    }
    self.data.content = e.detail.value.textarea;
    if ( choosed_reason.length==0) {
      wx.showToast({
        title: '至少选一条',
        image: '/assets/index/warning.jpg',
        duration: 1000,
      })
      return false;
    } else {
      for (var j = 0; j < choosed_reason.length ;j++){
        choosed_reasult += choosed_reason[j];
        choosed_reasult += ";" ;
      }
      choosed_reasult += self.data.content;
      app.globalData.global_refund_reason = choosed_reasult;
      app.globalData.global_refund_flag = "yes";
      wx.navigateBack({
        delta: 1
      })
      console.log(app.globalData.global_refund_reason);
    }
  },
  choose_Handle:function(e){
      var num = e.target.dataset.num;
      var choose_tmp = this.data.reasons_container;
      if(num!=null){
        if (choose_tmp[num].pick_nopick =="/assets/index/no_pick.png"){
          choose_tmp[num].pick_nopick = "/assets/index/pick_man.png";
        }else{
          choose_tmp[num].pick_nopick = "/assets/index/no_pick.png";
        }
      }
      this.setData({ reasons_container: choose_tmp});
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