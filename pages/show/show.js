// pages/show/show.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    console.log(options)
    console.log(options.id)
    this.getSpace(options.id);
    // this.getFeatureReview(options.id);

    console.log(options)
    let page = this;
    let header = wx.getStorageSync('header')
    // wx.request({
    //   url: `${app.globalData.baseUrl}/spaces`,
    //   // url: "https://rent-a-pet-chelsea-holman.herokuapp.com/api/v1/pets",
    //   method: 'GET',
    //   header: header,
      
    //   success(res) {
    //     console.log(res)
    //     const {space} = res.data;
        
    //     // const spaces = res.data.spaces
    //     // Update local data
    //     page.setData({
    //       space
    //     });

    //     wx.hideToast();
    //   }
    // });
  },

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

  getFeatureReview(id) {
    const page = this;
    let header = wx.getStorageSync('header')
    wx.request({
      url: `${app.globalData.baseUrl}/spaces/${id}/featured_review`,
      method: 'GET',
      header,
      success(res) {
        console.log("##################")
        console.log(res)
        page.setData({ featuredReview: res.data.featured_review })
      }
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady() {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow() {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide() {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload() {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh() {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom() {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage() {

  }, 

  favorite_toggle(e) {
    const id = this.data.space.id
    const page = this;
    let header = wx.getStorageSync('header')
    wx.request({
      url: `${app.globalData.baseUrl}/spaces/${id}/toggle_favorite`,
      method: 'POST',
      header,
      success(res) {
        page.setData(res.data)
      }
    })
  }, 

  goToSpace(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../show/show?id=${id}`,
    })
  },
  goToMap(e) {
    // const id = e.currentTarget.dataset.id;
    const { space } = this.data
    // wx.getLocation({ //获取当前经纬度
    //   type: 'wgs84', //返回可以用于wx.openLocation的经纬度，
    //   success: function (res) {
        wx.openLocation({ //​使用微信内置地图查看位置。
          latitude: space.latitude, //要去的纬度-地址
          longitude: space.longitude, //要去的经度-地址
          name: space.name,
          address: space.address
        })
    //   }
    // })
    // wx.navigateTo({
    //   url: `../map/map?id=${id}`,
    // })
  }, 

  seeAllReviews(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../allReviews/allReviews?id=${id}`,
    })
  },
  addReview(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../review/review?id=${id}`,
    })
  }

})