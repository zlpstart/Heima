import call from '../../request/index'
import regeneratorRuntime from '../../lib/runtime/rentime';
const app = getApp();

//Page Object
Page({
  data: {
    // 左侧的菜单数据
    listMenuList: [],
    // 右侧的商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧内容的滚动条
    scopedTop: 0
  },
  // 接口的返回数据
  Cates: [],

  //options(Object)
  onLoad: function (options) {
    // this.getCates()
    // 1.获取本地存储中的数据
    const Cates = wx.getStorageSync("cates");
    console.log(Cates, "cat")
    // 2.判断
    if (!Cates) {
      // 不存在 发送请求获取数据
      this.getCates()
    } else {
      // 有旧的数据 定义过期时间 10s 改成 5分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        this.getCates()
      } else {
        // 可以使用旧的数据
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        // 构造右侧的商品数据
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  // 获取分类
  getCates() {
    call.getData(`${app.data.basteUrl}/categories`,res => {
      this.Cates = res;
      // 把接口存入本地存储中
      wx.setStorageSync('cates', {time:Date.now(),data:this.Cates});
      // 构造左侧的大菜单数据
      let leftMenuList = this.Cates.map(v => v.cat_name)
      // 构造右侧的商品数据
      let rightContent = this.Cates[0].children
      this.setData({
        leftMenuList,
        rightContent
      })
    })

  },
  // 左侧点击
  handleItemTap(e) {
    const index = e.currentTarget.dataset.index
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scopedTop: 0
    })
  }
});