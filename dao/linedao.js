// 获取推荐线路
function getHotLine() {
  wx.request({
    url: 'http://172.17.82.123/iTour/route/detail/search?routeId=1', //仅为示例，并非真实的接口地址
    data: {
      routeId: '1',
    },
    header: {
      'content-type': 'application/json'
    },
    success: function (res) {
      console.log(res.data)
    }
  })
  //return [];
}

module.exports = {
  getHotLine: getHotLine
}