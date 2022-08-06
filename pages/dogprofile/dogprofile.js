// pages/dogprofile/dogprofile.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dog_name:'',
    pictures: [
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog1.png", checked: true},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog2.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog3.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog4.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog5.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog6.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog7.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog8.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog9.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog10.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog11.png"},
      {url: "https://dog-avatar.oss-cn-shanghai.aliyuncs.com/dog12.png"}
    ]
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

        wx.switchTab({
          url: '/pages/user/user',
        })
        wx.setStorageSync('user', res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})