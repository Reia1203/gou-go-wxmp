Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/landing/landing",
      iconPath: "/image/home.png",
      selectedIconPath: "/image/home-select.png",
      text: "HOME"
    }, {
      pagePath: "/pages/search/search",
      iconPath: "/image/search.png",
      selectedIconPath: "/image/search-select.png",
      text: "SEARCH"
    }, {
      pagePath: "/pages/spaceform/spaceform",
      iconPath: "/image/plus.png",
      selectedIconPath: "/image/plus-select.png",
      text: "ADD"
    }, {
      pagePath: "/pages/user/user",
      iconPath: "/image/user.png",
      selectedIconPath: "/image/user-select.png",
      text: "ME"
    }]
  },
  attached() {
    // console.log('tabbar attached')
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      // console.log({data})
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
      // console.log('tabbar component data', this.data)
    }
  }
})