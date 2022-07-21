Component({
  data: {
    selected: 0,
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "../landing/landing",
      iconPath: "/image/home.png",
      selectedIconPath: "/image/home.png",
      text: "HOME"
    }, {
      pagePath: "../search/search",
      iconPath: "/image/search.png",
      selectedIconPath: "/image/search.png",
      text: "SEARCH"
    }, {
      pagePath: "../spaceform/spaceform",
      iconPath: "/image/plus.png",
      selectedIconPath: "/image/plus.png",
      text: "ADD"
    }, {
      pagePath: "../user/user",
      iconPath: "/image/user.png",
      selectedIconPath: "/image/user.png",
      text: "ME"
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