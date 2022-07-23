// components/navbar.js
Component({
  /**
   * Component properties
   */
  properties: {

  },

  /**
   * Component initial data
   */
  data: {

  },

  attached() {
    this.setData({tabbarPage: getCurrentPages().pop().data.tabbarPage})
   
  },

  /**
   * Component methods
   */
  methods: {
    navigateBack() {
      wx.navigateBack( {
        delta: 1
      })
    }
  }, 

})
