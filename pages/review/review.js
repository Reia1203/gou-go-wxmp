// pages/review/review.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    image_url:["../../image/placeholder.png"],
    fullBoneUrl:'/image/full-paw.svg',
    halfBoneUrl:'/image/half-paw.svg',
    nullBoneUrl:'/image/empty-paw.svg',
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
    console.log(e.currentTarget)
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

    let data = {
      comment: e.detail.value.comment,
      rating: this.data.score
    }
  
    let header = wx.getStorageSync('header')
    const url = app.globalData.baseUrl
    const page = this

    wx.request({
      
      url: `${app.globalData.baseUrl}/spaces/${id}/reviews`,
      method:'POST',
      header,
      data: data,
      space_id: id,
      success(res){
        console.log(res)        
        wx.uploadFile({
          url: `${url}/spaces/${id}/reviews/${res.data.id}/upload`,
          filePath: page.data.image_url[0],
          name: 'file',
          header: header,
          success(res) {
            console.log('this is for upload file', res)
            wx.navigateTo({
                    url: `../show/show?id=${id}`,
                  })
            // wx.showModal({
            //   showCancel: false,
            //   title: 'Thank you',
            //   content: 'Your submission is under review.',
            //   success(res) {
            //     wx.navigateTo({
            //       url: `../show/show?id=${id}`,
            //     })
            //   }
            // })
          },
          fail(err) {
            console.log(err)
            wx.navigateTo({
              url: `../show/show?id=${id}`,
            })
          }
        })
      }
    })
  }

})