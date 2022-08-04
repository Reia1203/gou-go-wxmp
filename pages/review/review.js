// pages/review/review.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_url:["../../image/placeholder.png"],
    fullBoneUrl:'/image/bone-full2.svg',
    halfBoneUrl:'/image/bone-half.svg',
    nullBoneUrl:'/image/bone-empty.svg',
    score:0,
    rate:2,
    boneX:0,
  },

attached: function(){
  let {screenWidth} = wx.getSystemInfoSync();
  let rate = screenWidth / 750;
  this.setData({
    rate: rate
  })
  const query = this.createSelectorQuery();
  query.select('#scoreContent').boundingClientRect((res)=> {
    this.setData({
      bonetX: res.left
    })
  }).exec()
},






  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.getSpace(options.id);
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
  },

  setScore(e){
    // console.log(e.currentTarget.dataset.index)
    let score = e.currentTarget.dataset.index + 1;
    if (score - this.data.score == 0.5) {
      this.setData({
        score: score
      })
    } else {
      this.setData({
        score: score - 0.5
      })
    }
  },
  submit(e) {
    console.log(e);
    const id = e.detail.target.dataset.id;
    console.log(id)
    let data = e.detail.value
  let header = wx.getStorageSync('header')
    wx.request({
      
      url: `${app.globalData.baseUrl}/spaces/${id}/reviews`,
      method:'POST',
      header,
      data: data,
      space_id: id,
      success(res){
        console.log(res)
        wx.navigateTo({
          url: `../show/show?id=${id}`,
        })
      }
    })
  }

})