var logindao = require('dao/logindao.js')
App({
  onLaunch: function() {
    logindao.doLogin();
    var num =2.3;
    num.toFixed(2)
    console.log(num.toFixed(0));
  },
  globalData: {
    //global_upload_url: "http://10.1.2.247:8686/YYFile/upload.do",
    global_upload_url: "https://image.dxoo.cn/upload.do",
    //global_lijiang_Url: "http://51a3b07f.ngrok.io/YYAPI/phone/api.do",
    global_Url: "https://m.natkey.com",
    // global_Img_Url:"https://www.natkey.com",
    global_Img_Url: "https://m.natkey.com",
    //斐讯商家id
    global_merchant_Id: 2706,
    //智能产品
    global_hardware_Id:null,
    //跟团游
    global_group_travel_Id:180,
    //高端游
    global_hight_travel_Id:182,
    //参赛优惠产品
    global_match_type_Id:184,
    global_lijiang_Url:"https://yunyouapi.dxoo.cn/phone/api.do",
    //global_lijiang_Url:"http://api.dxoo.cn/phone/api.do",
    //global_Url: "http://106.14.5.54",
    //global_Url: "http://172.17.68.126:8080",
    //global_Img_Url: "http://106.14.223.37",
    //global_Url: "http://106.14.223.37",
    global_lj_userId:null,
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
    global_order_to_address:"no",
    //修改地址
    global_modify_address:null,
    global_choose_address_id:null,
    global_add_to_address:"no",
    //记录地址数量
    global_address_num:null,
    //商品数量
    global_goods_num:null,
    //商品类型
    global_goods_type:null,
    //商品信息
    global_goods_detail:null,
    //保存全局的订单id
    global_order_id:null,
    global_order_list_flash:"no",
    global_order_num:null,
    global_sellerId:null,
    global_productId:null,
    global_productId_id:null,
    //旅游产品相关全局
    global_travel_begin:null,
    global_product_detail:null,
    global_child_count:null,
    global_person_count:null,
    global_tour_productId:null,
    global_tour_time:null,
    //评论产品id
    global_comment_id:null,
    global_contact_detail:null,
    //地图标识
    markers:null
  }
})
