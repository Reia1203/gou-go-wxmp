Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "pages/landing/landing",
      iconPath: "/image/home.png",
      selectedIconPath: "/image/home.png",
    }, {
      pagePath: "pages/search/search",
      iconPath: "/image/search.png",
      selectedIconPath: "/image/search.png",
    }, {
      pagePath: "pages/add/add",
      iconPath: "/image/plus.png",
      selectedIconPath: "/image/plus.png",
    }, {
      pagePath: "pages/user/user",
      iconPath: "/image/user.png",
      selectedIconPath: "/image/user.png",
    }]
  },
  attached() {
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      this.setData({
        selected: data.index
      })
    }
  }
})