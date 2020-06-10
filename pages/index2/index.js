// 引入方法
import call from '../../request/index'
const app =  getApp();

// pages/index2/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 轮播图
    swiperList: [],
    // 导航 数组
    catesList: [],
    // 楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperList();
    this.getCateList();
    this.getFloorList();
  },
  // 获取轮播数据
  getSwiperList() {
    call.getData(`${app.data.basteUrl}/home/swiperdata`, res => {
      this.setData({
        swiperList: res
      })
    })
  },
  // 获取分类导航数据
  getCateList() {
    call.getData(`${app.data.basteUrl}/home/catitems`, res => {
      this.setData({
        catesList: res
      })
    })
  },
  // 获取楼层数据
  getFloorList() {
    call.getData(`${app.data.basteUrl}/home/floordata`, res => {
      console.log(res)
      console.log(111)
      this.setData({
        floorList: res
      })
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
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})