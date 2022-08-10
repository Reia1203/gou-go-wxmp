const app = getApp();
// pages/home/home.js
Page({

  /**
   * Page initial data
   */
  data: {
    tabbarPage: true,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    animation: false, 
    imgUrls: [
      '/image/landing-dog1.jpeg',
      '/image/landing-dog2.jpg',
      '/image/landing-dog3.jpg',
      '/image/landing-dog4.jpeg',
      '/image/landing-dog5.jpeg'

    ],
    indicatorDots: false,  //Whether to display panel indicator points
    autoplay: true,      //Whether to automatically switch
    interval: 3000,       //Automatically switch time interval
    duration: 1000,       //Slide animation duration
    inputShowed: false,
    inputVal: ""
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad(options) {
    let page = this;
    let header = wx.getStorageSync('header')
    console.log(header)
      // Get api data
      // wx.request({
      //   url: `${app.globalData.baseUrl}/spaces`,
      //   // url: "https://rent-a-pet-chelsea-holman.herokuapp.com/api/v1/pets",
      //   method: 'GET',
      //   header: header,
        
      //   success(res) {
      //     console.log(res)
      //     const {spaces} = res.data;
      //     // const spaces = res.data.spaces
      //     // Update local data
      //     page.setData({
      //       spaces
      //     });
  
      //     wx.hideToast();
      //   }
      // });
      if (wx.getUserProfile) {
        this.setData({
          canIUseGetUserProfile: true
        })
      }
      setTimeout(() => {
        this.setData({animation: true})
      }, 
      10)  

      
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      },
      success(res) {
        wx.switchTab({
          url: `../landing/landing`,
        })
      }
    })
  }
  
  ,
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
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
  typed () {
  var typed = new Typed('.element', {
    strings: ["Looking for a dog-friendly restaurant?", "Looking for a dog-friendly cafe?"],
    typeSpeed: 30
  });
},

goToLanding () {
  wx.switchTab({
    url: '../landing/landing',
  })
}
})