var logindao = require('dao/logindao.js')
App({
  onLaunch: function() {
    logindao.doLogin();
    var num =2.3;
    num.toFixed(2)
    console.log(num.toFixed(0));
  },
  globalData: {
    global_Url: "https://www.natkey.com",
    global_Img_Url:"https://www.natkey.com",
    //global_Url: "http://106.14.5.54",
    //global_Url: "http://172.17.68.183",
    //global_Img_Url: "http://106.14.223.37",
    //global_Url: "http://106.14.223.37",
    currscenery:null,
    choosed_route:null,
    user_choosed_flag:null,
    userId:null,
    openId:null,
    nickName:null,
    avatarUrl:null,
    currmerchantId:null,
    category:null,
    //这里是给添加景点时候所用的全局变量
    scenery_object:null,
    jump_to_index: "no",
    global_type:null,
    modify_day_index:null,
    modify_scenery:null,
    global_day:null,
    global_traveler_flash:"no",
    global_scenery_index:null,
    global_updown:[],
    markers:[],
    jump_to_comments:"no",
    global_Raiders_type:null,
    delete_id:null,
    delete_userId:null,
    delete_routeId:null,
    //价格全局变量
    route_price:null,
    global_order:null,
    order_sequence:null,
    //保存预定景点信息
    global_route_information:null,
    global_route_brief:null,
    global_refund_reason:null,
    global_refund_flag:"no",
    global_totalFee:null,
    //线路的名称用于body
    global_route_name:null,
    global_day_introduction:null,
    global_tour_type:null,
    global_route_discription:null,
    global_coupon_switch:"on",
    //地址选择
    global_choose_address_switch:"no",
    global_choose_address:null,
    global_order_to_address:"no"
    
  }
})
