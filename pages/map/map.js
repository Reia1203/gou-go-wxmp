Page({
  onLoad(e) {
    console.log(e)
    // console.log(options.id)
    // this.getSpace(options.id);
  },
  data: {
    
    //店铺经纬度
    latitude: 31.216996,
    longitude: 121.447994,
    //标记点
    markers: [{
      id: 0,
      name: "Charlies",
      address: "上海常熟路89",
      latitude: 31.216996,
      longitude: 121.447994,
      width: 50,
      height: 50
    }]

  },
  //导航
  getSpace(id) {
    const page = this;
    let header = wx.getStorageSync('header')
    wx.request({
      url: `${app.globalData.baseUrl}/spaces/${id}`,
      method: 'GET',
      header,
      success(res) {
        page.setData({ space: res.data.space })
      }
    })
  },
  navRoad(event) {
    console.log(event)
    // wx.getLocation({ //获取当前经纬度
    //   type: 'wgs84', //返回可以用于wx.openLocation的经纬度，
    //   success: function (res) {
    //     wx.openLocation({ //​使用微信内置地图查看位置。
    //       latitude: event.currentTarget.dataset.marker.latitude, //要去的纬度-地址
    //       longitude: event.currentTarget.dataset.marker.longitude, //要去的经度-地址
    //       name: event.currentTarget.dataset.marker.name,
    //       address: event.currentTarget.dataset.marker.address
    //     })
    //   }
    // })
  }
})
