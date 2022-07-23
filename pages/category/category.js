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
        const {spaces} = res.data;
        // const spaces = res.data.spaces
        // Update local data
        page.setData({
          spaces
        });

        wx.hideToast();
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
  goToSpace(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../show/show?id=${id}`,
    })
  }
})