import call from '../../request/index'
const app =  getApp();


// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{}
  },
  goodsId:1,
  // 商品对象
  GoodsInfo:{},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id = options.goods_id
    this.goodsId = id
    this.getGoodsDetail()
  },
  // 获取商品详情数据
  getGoodsDetail(){
    call.getData(`${app.data.basteUrl}/goods/detail?goods_id=${this.goodsId}`,goodsObj => {
      this.GoodsInfo = goodsObj;
      console.log(goodsObj)
      this.setData({
        goodsObj:{
          goods_name:goodsObj.goods_name,
          goods_price:goodsObj.goods_price,
          goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
          pics:goodsObj.pics
        }
      })
    })
  },
  // 点击轮播图 放大预览
  handlePrevewImage(e){
    // 1 构造
    const urls = this.GoodsInfo.pics.map(item => item.pics_mid)
    // 接受传递过来的图片url
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls // 需要预览的图片http链接列表
    })
  },
  // 点击加入购物车
  handleCartAdd(){
    console.log("你想买东西？")
    // 1 获取缓存中的购物车 数组
    let cart = wx.getStorageSync("cart") || [];
    console.log("cart",cart)
    // 2 判断 商品对象是否存在于购物车数组中
    let index = cart.findIndex(item => item.goods_id === this.GoodsInfo.goods_id)
    if(index === -1){
      // 3 不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked = true;
      cart.push(this.GoodsInfo)
    }else {
      // 4 已经存在购物车数据 执行num ++
      cart[index].num ++;
    }
    // 5 把购物车重新添加回缓存中
    wx.setStorageSync("cart",cart)
    // 6 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // true 防止用户手抖 疯狂点击按钮
      mask:true
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