// pages/review/review.js
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
    const url = app.globalData.baseUrl;
    let page = this;
    const id = e.currentTarget.dataset.id;
    const d = this.data
    let data = e.detail.value
    // multiindex:  [1, 0] 
    // data.categories = d.multiIndex
    // multiArray = [restaurant bars], [american chinese ...]
    data.category = d.multiArray[0][d.multiIndex[0]]
    // subCategory = [american, buffet, chines...] , [all bars], [all cafes]
    data.sub_category = d.subCategoryArray[d.multiIndex[0]][d.multiIndex[1]]
    console.log(1111, data)
    getApp().globalData.spaces.push(data);

    let header = wx.getStorageSync('header')
    wx.request({
      
      url: `${app.globalData.baseUrl}/reviews`,
      method:'POST',
      header,
      data: data,
      success(res){
        console.log(res)
        wx.uploadFile({
          url: `${url}/spaces/${res.data.review.id}/upload`,
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


})