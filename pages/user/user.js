// pages/user/user.js
const app = getApp();
Page({

  /**
   * Page initial data
   */
  data: {
    tabbarPage: true,
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,

    
  },
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }

 
  
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
    const tabbar = this.getTabBar()
    console.log('tabbar data', tabbar.data)
    tabbar.setData({selected: 3})
    let page = this;
    let header = wx.getStorageSync('header')
    let user_id = wx.getStorageSync('user').id
    let picture_url = wx.getStorageSync('user').picture_url
    let dog_name = wx.getStorageSync('user').dog_name
    
    wx.request({
      url: `${app.globalData.baseUrl}/users/${user_id}/profile`,
      method: 'GET',
      header: header,
      
      success(res) {
        console.log(res)
        const {spaces} = res.data;
        // const spaces = res.data.spaces
        // Update local data
        page.setData({
          spaces: spaces,
          dog_name: dog_name,
          picture_url: picture_url
        });

        wx.hideToast();
      }
    });
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
  },

  goToDogProfile(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../dogprofile/dogprofile`,
    })
  }, 
  radioChange(e){
    console.log("radio changed", e)
    // 圈中图片
    const pictures = this.data.pictures
    for (let i = 0, len = pictures.length; i < len; ++i) {
      pictures[i].checked = pictures[i].url === e.detail.value
    }

    this.setData({ pictures })
  },


  submit(e){
    let page = this;

    console.log(e);
    let data = e.detail.value
    let header = wx.getStorageSync('header')
    let user_id = wx.getStorageSync('user').id
    wx.request({
      header: header,
      url: `${app.globalData.baseUrl}/users/${user_id}`,
      method: 'PUT',
      data: {user: data},
      success(res) {

        wx.reLaunch({
          url: '/pages/user/user',
        })
        wx.setStorageSync('user', res.data)
      }
    })
  },
})