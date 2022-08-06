// pages/category/category.js
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
    console.log(options.category)
    this.showCategory(options.category);
  },

  showCategory(category) {
    const page = this;
    let header = wx.getStorageSync('header')
    wx.request({
      url: `${app.globalData.baseUrl}/spaces?category=${category}`,
      method: 'GET',
      header,
      success(res) {
        console.log(res)
        let  {spaces} = res.data;
        spaces = spaces.map(page.calculateDistanceToUser)
        spaces = spaces.sort((a,b) => a.rawDistance - b.rawDistance)
        // const spaces = res.data.spaces
        // Update local data
        page.setData({
          spaces
        });

        wx.hideToast();
      }
  })
  },
  calculateDistance: function (lat1, lng1, lat2, lng2) {
    console.log(lat1, lng1, lat2, lng2)
    var radLat1 = lat1 * Math.PI / 180.0;
    var radLat2 = lat2 * Math.PI / 180.0;
    var a = radLat1 - radLat2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;
    var s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s
  },
  calculateDistanceToUser: function (space){
    const userLocation = wx.getStorageSync('userLocation')
    // console.log(userLocation)
    space.rawDistance = this.calculateDistance(userLocation.latitude, userLocation.longitude, space.latitude, space.longitude)
    space.distance = space.rawDistance.toFixed(2)
    return space
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
  goToSpace(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../show/show?id=${id}`,
    })
  }
})