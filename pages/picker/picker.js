Page({
  data: {
    array: ['美国', '中国', '巴西', '日本'],
    objectArray: [
      {
        id: 0,
        name: '美国'
      },
      {
        id: 1,
        name: '中国'
      },
      {
        id: 2,
        name: '巴西'
      },
      {
        id: 3,
        name: '日本'
      }
    ],
    index: 0,
    multiArray: [['Food', 'Bars','Cafes','Parks','Vets','Other'], ['American', 'Buffet','Chinese', 'Fast Food','French','Italian','Indian','Japanese','Korean','Mexcican','Thai']],
    objectMultiArray: [
      [
        {
          id: 0,
          name: 'Food'
        },
        {
          id: 1,
          name: 'Bars'
        },
        {
          id: 2,
          name: 'Cafes'
        },
        {
          id: 3,
          name: 'Parks'
        },
        {
          id: 4,
          name: 'Vets'
        },
        {
          id: 5,
          name: 'Other'
        },

      ], [
        {
          id: 0,
          name: 'American'
        },
        {
          id: 1,
          name: 'Buffet'
        },
        {
          id: 2,
          name: 'Chinese'
        },
        {
          id: 3,
          name: 'Fast Food'
        },
        {
          id: 4,
          name: 'French'
        },
        {
          id: 5,
          name: 'Italian'
        },
        {
          id: 6,
          name: 'Indian'
        },
        {
          id: 7,
          name: 'Japanese'
        },
        {
          id: 8,
          name: 'Korean'
        },{
          id: 9,
          name: 'Mexcican'
        },
        {
          id: 10,
          name: 'Thai'
        },
      ]
    ],
    multiIndex: [0, 0],
    date: '2016-09-01',
    time: '12:01',
    region: ['广东省', '广州市', '海珠区'],
    customItem: '全部'
  },
  // bindPickerChange: function(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     index: e.detail.value
  //   })
  // },
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
  bindDateChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  bindTimeChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      time: e.detail.value
    })
  },
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  }
})