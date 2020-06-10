import call from '../../request/index'
const app =  getApp();

// pages/goods_list/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs:[
      {
        id:0,
        value:"综合",
        isActive:true
      },
      {
        id:1,
        value:"销量",
        isActive:false
      },
      {
        id:2,
        value:"价格",
        isActive:false
      },
    ],
    goodsList:[]
  },
  // 接口要的参数
  getCide:'',
  pagenum:1,
  pagesize:10,
  // 总页数
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1. 获取被点击的标题索引
    this.getCide = options.cid;
    this.getGoodsList();
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 2000)    
  },
  // 获取商品列表数据
  getGoodsList(){
    call.getData(`${app.data.basteUrl}/goods/search?cide=${this.getCide}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`, res => {
      // 总条数
      const total = res.total;
      console.log(res)
      // 计算总页数
      this.totalPages = Math.ceil(total/this.pagesize)
      console.log(this.totalPages,"getTotal")
      this.setData({
        goodsList:[...this.data.goodsList,...res.goods]
      })
      wx.stopPullDownRefresh();
    })
  },

  // 标题点击事件 从子组件传递过来的
  handleTabsItemChange(e){
    const index1 = e.detail
    // 修改原数组
    let tabs = this.data.tabs;
    tabs.forEach((item,index) => {
      item.id === index1 ? item.isActive = true: item.isActive = false 
    })
    this.setData({
      tabs
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  // 下拉刷新
  onPullDownRefresh: function () {
    console.log("我被下拉了")
    // 重置数组
    this.setData({
      goodsList:[]
    })
    this.pagenum = 1;
    this.getGoodsList()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  // 上拉加载
  onReachBottom: function () {
    console.log(this.pagenum,"pagenum")
    console.log(this.totalPages,"totalPages")
    if(this.pagenum >= this.totalPages){
      // 没有下一页
      // console.log("没有下一页")
      wx.showToast({title: '没有下一页数据了'});
    }else {
      this.pagenum ++;
      this.getGoodsList()
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})