// pages/tour_order/tour_order.js
var requestdao = require('../../dao/requestdao.js');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    turn_true:true,
    hiden_order_display:'none',
    person_list_display:'none',
    person_contact_list:[],
    man_choose_index:[],
    man_count:0,
    travel_begin_date: null,
    product_detail:null,
    child_count:null,
    person_count:null,
    tour_time:null,
    button_loading:false,
    defualt_riding:null,
    hiden_riding_display:'none',
    riding_list:[],
    riding_choosed_id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      travel_begin_date: app.globalData.global_travel_begin,
      product_detail:app.globalData.global_product_detail,
      child_count:app.globalData.global_child_count,
      person_count:app.globalData.global_person_count,
      tour_time: app.globalData.global_tour_time,
      man_count: app.globalData.global_person_count
    })
    console.log(this.data.product_detail)
  },
  check_orderHandle:function(){
    this.setData({
      hiden_order_display:'inline_flex',
      turn_true:false
    });
  },
  close_orderHandle:function(){
    this.setData({
      hiden_order_display: 'none',
      turn_true: true
    });
  },
  choose_personHandle:function(){
    this.setData({
      person_list_display: 'inline_flex',
      turn_true: false
    });
  },
  //关闭选择联系人界面，并且将选择人员的数组清空
  cloose_choose_personHandle:function(){
    var person_contact_tmp = this.data.person_contact_list;
    for (var i = 0; i < person_contact_tmp.length; i++) {
      person_contact_tmp[i].ischoosed = 'no';
    }
    this.setData({
      person_contact_list: person_contact_tmp,
      person_list_display: 'none',
      turn_true: true,
      man_choose_index:[]
    });
  },
  //确认按钮，确认选择的人员
  confirmHandle:function(){
    this.setData({
      person_list_display: 'none',
      turn_true: true,
    });
  },
  // 跳转添加新联系人
  add_new_personHandle:function(){
    wx.navigateTo({
      url: '../add_information/add_information'
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
    //获取联系人列表
    var self = this;
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("contact.l", {
        "userId": app.globalData.userId,
        "page": 1,
        "size": 10,
      }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          console.log(back);
          if (back.reCode=='00'){
            var person_contact_tmp = [];
            var count = 0;
            for (var i = 0; i < back.contacts.length;i++){
              if (back.contacts[i].identity!=""){
                person_contact_tmp[count] = back.contacts[i];
                person_contact_tmp[count].ischoosed = 'no';
                count++;
              }
              
            }
            self.setData({
              person_contact_list: person_contact_tmp
            });
            console.log(self.data.person_contact_list);
          }else{
            wx.showToast({
              title: back.reMsg,//这里打印出登录成功
              image: '/assets/index/warning.jpg',
              duration: 1000
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          }
        }
        else {
          //请求出错了

        }

      }
    })
    
  },
  pick_manHandle:function(e){
    var num = e.target.dataset.num;
    var person_contact_tmp = this.data.person_contact_list;
    
    if(num!=undefined){
      var man_choose_index_tmp = this.data.man_choose_index;
      var flag = 0;
      // 判断有没有重复的下标，有的话直接删除
      for (var j = 0; j < man_choose_index_tmp.length; j++) {
        if (man_choose_index_tmp[j] == num) {
          man_choose_index_tmp.splice(j, 1);
          flag = 1;
        }
      }
      if(flag != 1){
        if (man_choose_index_tmp.length < this.data.man_count) {
          man_choose_index_tmp.push(num);
        } else {
          man_choose_index_tmp.shift();
          man_choose_index_tmp.push(num);
        }
      }
      console.log(man_choose_index_tmp);
      for (var i = 0; i < person_contact_tmp.length; i++) {
          person_contact_tmp[i].ischoosed = 'no';
      }

      for (var i = 0; i < person_contact_tmp.length; i++){
          for (var n = 0; n < man_choose_index_tmp.length; n++){
            person_contact_tmp[man_choose_index_tmp[n]].ischoosed = 'yes';
          }
        }
        
      this.setData({ 
        person_contact_list: person_contact_tmp,
        man_choose_index: man_choose_index_tmp
      })
    }
  },
  modify_manHandle:function(e){
    var num = e.target.dataset.num;
    var person_contact_tmp = this.data.person_contact_list;
    if(num!=undefined){
      app.globalData.global_contact_detail = person_contact_tmp[num];
      wx.navigateTo({
        url: '../modify_information/modify_information'
      })
    }
    
  },
  delete_manHandle: function (e) {
    var num = e.target.dataset.num;
    var person_contact_tmp = this.data.person_contact_list;
    if (num != undefined) {
      var self = this;
      wx.showModal({
        title: '提示',
        content: '确认取消',
        success: function (res) {
          if (res.confirm) {
            wx.request({
              url: app.globalData.global_lijiang_Url,
              data: requestdao.setParamsData("contact.d", {
                "userId": app.globalData.userId,
                "id": person_contact_tmp[num].id
              }, true),
              method: "POST",
              header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
              success: function (res) {
                if (res.statusCode == 200) {
                  var back = res.data;
                  if (res.data.reCode == "00") {
                    console.log(back)
                    wx.showToast({
                      title: '删除成功',
                      image: '/assets/index/success.jpg',
                      duration: 1000,
                    })
                    setTimeout(function () {
                      wx.hideToast()
                      self.onShow();
                    }, 1000)
                  }else{
                    wx.showToast({
                      title: '删除失败',
                      image: '/assets/index/warning.jpg',
                      duration: 1000,
                    })
                  }

                }
                else {
                  //请求出错了
                  wx.showToast({
                    title: '删除失败',
                    image: '/assets/index/warning.jpg',
                    duration: 1000,
                  })
                }

              }
            })
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }

  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },
  submit: function (e){
    var self = this;
    var person_name = e.detail.value.person_name;
    var person_phone = e.detail.value.person_phone;
    var person_tips = e.detail.value.person_tips;
    if (person_name.replace(/\s/g, '') == "" || person_phone.replace(/\s/g, '') == ""  ||
      person_name == undefined || person_phone == undefined ) {
      wx.showToast({
        title: '必填不能为空',
        image: '/assets/index/warning.jpg',
        duration: 1000,
      })
      return false;
    } else {
      //判断电话号码的长度
      if (!(/^[1][3,4,5,7,8][0-9]{9}$/).test(person_phone)) {
        wx.showToast({
          title: "手机号不正确",//这里打印出登录成功
          image: '/assets/index/warning.jpg',
          duration: 1000
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      } else {
        var contact_person_list = [];
        for (var i = 0; i < this.data.man_choose_index.length; i++) {
          contact_person_list[i] = this.data.person_contact_list[this.data.man_choose_index[i]].id;
        }
        if (contact_person_list.length == 0 && this.data.product_detail.needTraveller == true){
          wx.showToast({
            title: "选择出行人",//这里打印出登录成功
            image: '/assets/index/warning.jpg',
            duration: 1000
          }) 
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        } else if (this.data.riding_choosed_id == null && this.data.product_detail.needRiding == true){
          wx.showToast({
            title: "选择乘车地点",//这里打印出登录成功
            image: '/assets/index/warning.jpg',
            duration: 1000
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        } else if (this.data.product_detail.needTraveller == true && this.data.man_choose_index.length < this.data.person_count){
            wx.showToast({
              title: "缺少出行" + (this.data.person_count - this.data.man_choose_index.length)+"人",//这里打印出登录成功
              image: '/assets/index/warning.jpg',
              duration: 1000
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
        }
        else{
          
            console.log(contact_person_list);
            self.setData({ button_loading: true });
            // 提交订单
            wx.request({
              url: app.globalData.global_lijiang_Url,
              data: requestdao.setParamsData("submit.order", {
                "isPost": false,
                "openId": app.globalData.openId,
                "userId": app.globalData.userId,
                "products": [
                  {
                    "productId": this.data.product_detail.id,
                    "num": (this.data.person_count + this.data.child_count),
                    "linkmanId": "0",
                    "contactName": person_name,
                    "contactPhone": person_phone,
                    "contactIds": contact_person_list,
                    "childNum": this.data.child_count,
                    "remark": person_tips,
                    "time": this.data.travel_begin_date,
                    "tourTime": this.data.tour_time,
                    "ridingAddressId": this.data.riding_choosed_id
                  }
                ]
              }, true),
              method: "POST",
              header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
              success: function (res) {
                if (res.statusCode == 200) {
                  wx.requestPayment({
                    timeStamp: res.data.timeStamp,
                    nonceStr: res.data.nonceStr,   //字符串随机数
                    package: res.data.package,
                    signType: res.data.signType,
                    paySign: res.data.paySign,
                    'success': function (res) {
                      console.log(res);    //requestPayment:ok==>调用支付成功
                      wx.showToast({
                        title: '支付成功',//这里打印出报名成功
                        image: '/assets/index/success.jpg',
                        duration: 1500
                      })
                      setTimeout(function () {
                        wx.hideToast()
                        wx.redirectTo({
                          url: '../tour_orders_list/tour_orders_list'
                        })
                        self.setData({ button_loading: false });
                      }, 1500)

                    },
                    'fail': function (res) {
                      self.setData({ button_loading: false });
                      console.log(res.errMsg);
                    },
                    'complete': function (res) {
                      if (res.errMsg == "requestPayment:fail cancel") {
                        wx.showToast({
                          title: "支付已经取消",
                          image: '/assets/index/warning.jpg',
                          duration: 1500
                        })
                        setTimeout(function () {
                          wx.hideToast()
                          wx.redirectTo({
                            url: '../tour_orders_list/tour_orders_list'
                          })
                          self.setData({ button_loading: false });
                        }, 1500)
                      }
                      console.log(res.errMsg);
                    }
                  })
                }
                else {
                  //请求出错了

                }

              }
            })

        }
        
      }
    }
  },
  choose_ridingHandle:function(e){
    //获取联系人列表
    var self = this;
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    wx.request({
      url: app.globalData.global_lijiang_Url,
      data: requestdao.setParamsData("product.rl", {
        "productId": this.data.product_detail.id
      }, true),
      method: "POST",
      header: { 'content-type': 'application/x-www-form-urlencoded;charset=utf-8' },
      success: function (res) {
        if (res.statusCode == 200) {
          var back = res.data;
          console.log(back);
          if (back.reCode == '00') {
            wx.hideToast()
            self.setData({
              riding_list: back.ridingAddressList
            });
          } else {
            wx.showToast({
              title: back.reMsg,//这里打印出登录成功
              image: '/assets/index/warning.jpg',
              duration: 1000
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          }
        }
        else {
          //请求出错了
          wx.hideToast()
        }

      }
    })
    this.setData({
      hiden_riding_display: 'inline_flex',
      turn_true: false
    });

  },
  close_ridingHandle:function(e){
    this.setData({
      hiden_riding_display: 'none',
      turn_true: true,
      defualt_riding: null,
      riding_choosed_id: null
    });
  },
  pick_ridingHandle:function(e){
    var num = e.target.dataset.num;
    console.log(num);
    if(num!=undefined){
      this.setData({
        hiden_riding_display: 'none',
        turn_true: true,
        defualt_riding:this.data.riding_list[num].des,
        riding_choosed_id:this.data.riding_list[num].id
      })
    }
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