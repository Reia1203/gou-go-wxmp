// pages/spaceform/spaceform.js
const app = getApp();
Page({


  onShareAppMessage() {
    return {
      title: 'features',
      path: 'page/component/pages/spaceform/spaceform'
    }
  },

  /**
   * 页面的初始数据
   */
  data: {
    address:'',
    image_url:["../../image/placeholder.png"],
    multiArray: [
      ['Food', 'Bars','Cafes','Parks','Vets','Other'], 
      ['American', 'Buffet','Chinese', 'Fast Food','French','Italian','Indian','Japanese','Korean','Mexcican','Thai']
    ],
    // objectMultiArray: [
    //   [
    //     {
    //       id: 0,
    //       name: 'Food'
    //     },
    //     {
    //       id: 1,
    //       name: 'Bars'
    //     },
    //     {
    //       id: 2,
    //       name: 'Cafes'
    //     },
    //     {
    //       id: 3,
    //       name: 'Parks'
    //     },
    //     {
    //       id: 4,
    //       name: 'Vets'
    //     },
    //     {
    //       id: 5,
    //       name: 'Other'
    //     },

    //   ], [
    //     {
    //       id: 0,
    //       name: 'American'
    //     },
    //     {
    //       id: 1,
    //       name: 'Buffet'
    //     },
    //     {
    //       id: 2,
    //       name: 'Chinese'
    //     },
    //     {
    //       id: 3,
    //       name: 'Fast Food'
    //     },
    //     {
    //       id: 4,
    //       name: 'French'
    //     },
    //     {
    //       id: 5,
    //       name: 'Italian'
    //     },
    //     {
    //       id: 6,
    //       name: 'Indian'
    //     },
    //     {
    //       id: 7,
    //       name: 'Japanese'
    //     },
    //     {
    //       id: 8,
    //       name: 'Korean'
    //     },{
    //       id: 9,
    //       name: 'Mexcican'
    //     },
    //     {
    //       id: 10,
    //       name: 'Thai'
    //     },
       
    //   ]
    // ],
    subCategoryArray: [
      ['American', 'Buffet','Chinese', 'Fast Food','French','Italian','Indian','Japanese','Korean','Mexcican','Thai'],
      ['All Bars'],
      ['All Cafes'],
      ['All Parks'],
      ['All Vets'],
      ['Other']
    ],
    multiIndex: [0, 0],
  },

  checkboxChange(e) {
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)

    const items = this.data.items
    const values = e.detail.value
    for (let i = 0, lenI = items.length; i < lenI; ++i) {
      items[i].checked = false

      for (let j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (items[i].value === values[j]) {
          items[i].checked = true
          break
        }
      }
    }

    this.setData({
      items
    })
  },
 toPosition: function(e){
  let page = this;
   wx.chooseLocation({
     success(res){
       console.log(res)
       if(res.address!=''){
         page.setData({
           address:res.address
          })
       }
     }
   })
 },

  bindMultiPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      multiIndex: e.detail.value
    })
  },
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0:
        switch (data.multiIndex[0]) {
          case 0:
            data.multiArray[1] = ['American', 'Buffet','Chinese', 'Fast Food','French','Italian','Indian','Japanese','Korean','Mexcican','Thai']; 
            break;
          case 1:
            data.multiArray[1] = ['All Bars'];
            break;
          case 2:
              data.multiArray[1] = ['All Cafes'];
            break;
          case 3:
              data.multiArray[1] = ['All Parks'];
            break;
          case 4:
              data.multiArray[1] = ['All Vets'];
            break;
          case 5:
              data.multiArray[1] = ['Other'];
            break;
        }
        data.multiIndex[1] = 0;
        break;
    }
    console.log(data.multiIndex);
    this.setData(data);
  },

  submit(e) {
    console.log(e);
    const id = e.currentTarget.dataset.id;
    const d = this.data
    let data = e.detail.value
    // multiindex:  [1, 0] 
    // data.categories = d.multiIndex
    // multiArray = [restaurant bars], [american chinese ...]
    data.category = d.multiArray[0][d.multiIndex[0]]
    // subCategory = [american, buffet, chines...], [all bars], [all cafes]
    data.sub_category = d.subCategoryArray[d.multiIndex[0]][d.multiIndex[1]]
    console.log(1111, data)
    getApp().globalData.spaces.push(data);
    let header = wx.getStorageSync('header')
    wx.request({
      url:'http://localhost:3000/api/v1/spaces',
      method:'POST',
      header,
      data: data,
      success(res){
        console.log(res)
        wx.navigateTo({
          url: `../show/show?id=${res.data.space.id}`,
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