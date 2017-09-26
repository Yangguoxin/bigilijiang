var app = getApp();
var choose_inn = null;
Page({
  data: {
    list:[],
    page: 0,
    scrollTop: 0,
    theView:'',
    listData: [
      { "src": "../../img/1.jpg", "name": "溪玹雨巷客栈", "service": "不含早餐免费网络", "price": "地址：古城区七一街八一上段37号 " },
      { "src": "../../img/2.jpg", "name": "纳福居客栈", "service": "不含早餐免费网络", "price": "地址：新华街双石段45号 " },
      { "src": "../../img/3.jpg", "name": "缥缈峰客栈 ", "service": "不含早餐免费网络", "price": "地址：五一社区里面五一街文治巷1号 " },
      { "src": "../../img/4.jpg", "name": "花楼之恋客栈客栈", "service": "不含早餐免费网络", "price": "地址：束河古镇松云村 " }, 
      { "src": "../../img/5.jpg", "name": "丽王大酒店", "service": "不含早餐免费网络", "price": "地址：古城南门牌坊步行1分钟 " },
      { "src": "../../img/6.jpg", "name": "野草堂云溪度假庭院 ", "service": "不含早餐免费网络", "price": "地址：古城区祥和路石屏上村" },
      { "src": "../../img/7.jpg", "name": "奢华精品客栈", "service": "不含早餐免费网络", "price": "地址：市一中东边150米" },
      { "src": "../../img/8.jpg", "name": "花开彼岸客栈", "service": "不含早餐免费网络", "price": "地址：五一街王家庄巷" },
      { "src": "../../img/9.jpg", "name": "单行道客栈", "service": "不含早餐免费网络", "price": "地址：新华街黄山下段6-1号 " },
      { "src": "../../img/10.jpg", "name": "钟鱼等到你 ", "service": "不含早餐免费网络", "price": "地址：昭庆巷19-2号" },
      { "src": "../../img/11.jpg", "name": "梦回丽江客栈 ", "service": "不含早餐免费网络", "price": "地址：五一街王家庄巷43号" },
      { "src": "../../img/12.jpg", "name": "天籁轩客栈", "service": "不含早餐免费网络", "price": "地址：新华街翠文段28号" },
      { "src": "../../img/13.jpg", "name": "云阁居", "service": "丽江古城 不含早餐免费网络", "price": "地址：新华街翠文段33号" },
      { "src": "../../img/14.jpg", "name": "桃花园", "service": "不含早餐免费网络", "price": "地址：七一街八一上段84号" },
      { "src": "../../img/15.jpg", "name": "广宝苑", "service": "不含早餐免费网络", "price": "地址：五一街文生巷58号" },
      { "src": "../../img/16.jpg", "name": "偷点时间", "service": "不含早餐免费网络", "price": "地址：五一街中段17-1" },
      { "src": "../../img/17.jpg", "name": "东巴客栈", "service": "不含早餐免费网络", "price": "地址：五一街文治巷109号" },
      { "src": "../../img/18.jpg", "name": "颐和文苑", "service": "不含早餐免费网络", "price": "地址：古城区义尚街文明巷48号" },
      { "src": "../../img/19.jpg", "name": "溪谷禧苑", "service": "不含早餐免费网络", "price": "地址：七一街八一下段90号" },
      { "src": "../../img/20.jpg", "name": "念你", "service": "不含早餐免费网络", "price": "地址：五一街文生巷97号" },
      { "src": "../../img/21.jpg", "name": "云来云往", "service": "不含早餐免费网络", "price": "地址：新华街翠文段31-2" },

    ],
    showModalStatus: false
  },
  //初始化数据
  initData: function () {
    var _lis = [];
    for (var i = 0; i < 5; i++) {
      _lis.push(this.data.listData[i]);
    }
    this.setData({
      list: _lis,
      page: 1
    })
  },
  onLoad: function () {
    console.log('onLoad')
    try {
      this.initData();
    } catch (e) { console.log(e.message) }
    
    
  },
  loadMore: function () {
    console.log('scroll to bottom for load more item')
    let _length = this.data.listData.length;
    let maxPage = ((_length / 5) > (_length / 5).toFixed(0)) ? ((_length / 5).toFixed(0) + 1) : (_length / 5).toFixed(0);
    let _page = this.data.page;
    let _lis = this.data.list;
    let _number = (((_page + 1) * 5) <= _length ) ? ((_page+1) * 5) : _length ;
   

    if(_page<maxPage){
      
      for (var i = _page * 5; i < _number; i++) {
        _lis.push(this.data.listData[i]);
      }
      _page++;
    }
  
     
    this.setData({
      list: _lis,
      page: _page,
     
      
    })
   
    console.log(this.data.list); 
  },
  //滚动到顶部
  goTop:function(){
    this.setData({
      scrollTop:0 //这里有个坑，第一次会失效，第二次就不行了，如果值是0，则无效。这个bug可以通过重设这2个值来解决
    })
    console.log(133)
  },
  formSubmit: function (e) {
    var that=this;
    // if (e.detail.value.mobile.length == 0 || e.detail.value.name.length == 0)
    if (e.detail.value.mobile.length == 0) {

      wx.showToast({
        title: ' 手机号码为空!',
        icon: 'loading',
        duration: 1500
      })

    } else if (e.detail.value.mobile.length != 11) {
      wx.showToast({
        title: '请输入11位手机号码!',
        icon: 'loading',
        duration: 1500
      })

    } else {
      if (choose_inn == null){
        wx.showToast({
          title: '客栈错误',
          icon: 'loading',
          duration: 1500
        })
        setTimeout(function () {

          wx.hideToast()

        }, 2000)

          }
          else{

        wx.request({
          url: app.globalData.global_Url + '/iTour/prize/commitPhone',
          header: {
            "Content-Type": "application/json"
          },

          method: "POST",
          data: {
            weixinId: app.globalData.openId,
            telphone: e.detail.value.mobile,
            innName: that.data.listData[choose_inn].name,
            innAddress: (that.data.listData[choose_inn].price).substring(3) 
            /*name: e.detail.value.name,
            nums: e.detail.value.number,
            time: e.detail.value.time*/
          },

          success: function (res) {
            choose_inn = null;
            console.log(res.data)
            console.log(app.globalData.openId)
            if (res.data.status == 0) {
              wx.showToast({
                title: res.data.info,
                icon: 'loading',
                duration: 1500
              })
              setTimeout(function () {

                wx.hideToast()

              }, 2000)

            } else if (res.data.result == "valid") {
              choose_inn = null;
              wx.showToast({
                title: "提交成功",//这里打印出登录成功
                icon: 'success',
                duration: 1000
              })
              setTimeout(function () {

                wx.hideToast()
                that.setData(
                  {
                    showModalStatus: false
                  }
                )

              }, 2000)
              app.globalData.global_coupon_switch = "ok";
              wx.navigateBack({
                delta: 1
              })

            }
          }
        })

          }  
    }
  },
  powerDrawer: function (e) {
    var currentStatu = e.currentTarget.dataset.statu;
    console.log(e.target.dataset.num);
    choose_inn = null;
    if(e.target.dataset.num != undefined){
      choose_inn = e.target.dataset.num;
    }
    this.util(currentStatu)
    
  },
  util: function (currentStatu) {
    /* 动画部分 */
    // 第1步：创建动画实例 
    var animation = wx.createAnimation({
      duration: 200, //动画时长 
      timingFunction: "linear", //线性 
      delay: 0 //0则不延迟 
    });

    // 第2步：这个动画实例赋给当前的动画实例 
    this.animation = animation;

    // 第3步：执行第一组动画 
    animation.opacity(0).rotateX(100).step();

    // 第4步：导出动画对象赋给数据对象储存 
    this.setData({
      animationData: animation.export()
    })

    // 第5步：设置定时器到指定时候后，执行第二组动画 
    setTimeout(function () {
      // 执行第二组动画 
      animation.opacity(1).rotateX(0).step();
      // 给数据对象储存的第一组动画，更替为执行完第二组动画的动画对象 
      this.setData({
        animationData: animation
      })

      //关闭 
      if (currentStatu == "close") {
        this.setData(
          {
            showModalStatus: false
          }
        );
      }
    }.bind(this), 200)

    // 显示 
    if (currentStatu == "open") {
      this.setData(
        {
          showModalStatus: true
        }
      );
    }
  } 
})