// pages/review/review.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_url:["../../image/placeholder.png"],
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

  },

  uploadImage(){
    let that = this
    wx.chooseMedia({
      count: 9,
      mediaType:['image','video'],
      sourceType:['album','camera'],
      maxDuration:30,
      camera: 'back',
      success:(res)=>{
        console.log(res.tempFiles[0].tempFilePath);
        that.setData({
          // image_url: that.data.image_url.concat(res.tempFiles[0].tempFilePath)
          image_url: [res.tempFiles[0].tempFilePath]
        })
      }
    })
  }

})