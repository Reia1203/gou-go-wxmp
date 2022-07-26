// pages/review/review.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    reviews:[],
  },

  submit(e) {
    console.log(e);
    const url = app.globalData.baseUrl;
    let page = this;
    const id = e.currentTarget.dataset.id;
    let data = e.detail.value
    console.log(e.detail.value.textarea)
    console.log(1111, data)
    getApp().globalData.reviews.push(data);

    let header = wx.getStorageSync('header')
    wx.request({
      
      url: `${app.globalData.baseUrl}/spaces`,
      method:'POST',
      header,
      data: data,
      success(res){
        console.log(res)
        wx.uploadFile({
          url: `${url}/spaces/${res.data.space.id}/upload`,
          filePath: page.data.image_url[0],
          name: 'file',
          header: header,
          success(res) {
            console.log('this is for upload file', res)
            wx.showModal({
              showCancel: false,
              title: 'Thank you',
              content: 'Your submission is under review.',
              success(res) {
                wx.switchTab({
                  url: `../landing/landing`,
                })
              }
            })
          },
          fail(err) {
            console
            console.log(err)
          }
        })
        
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