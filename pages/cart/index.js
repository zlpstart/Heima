
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalPrice: 0,
    totalNum: 0
  },
  // 点击 收货地址
  handleChooseAddress() {
    // 1 获取 权限状态
    wx.getSetting({
      success: (result) => {
        // 2 获取权限状态 只要发现一些属性名很怪异的时候 都要使用 []形式来获取属性值
        const scopeAddress = result.authSetting['scope.address']
        // console.log(scopeAddress == true)
        // console.log(scopeAddress == true)
        if (scopeAddress == true || scopeAddress == undefined) {
          wx.chooseAddress({
            success: (result1) => {
              console.log(result1)
            }
          });
        } else {
          // 3 用户 以前拒绝过授予权限 先诱导用户打开授权权限
          wx.openSetting({
            success: (result) => {
              // 4 调用获取收货地址的 api
              wx.chooseAddress({
                success: (result3) => {
                  // 5 存入到缓存
                  wx.setStorageSync("address", result3);
                  const add = wx.getStorageSync("address")
                }
              })
            }
          });
        }
      }
    });
  },
  // 商品的选中
  handeItemChange(e) {
    // 1 获取被修改的商品的Id
    const goods_id = e.currentTarget.dataset.id;
    // 2 获取购物车数组
    let cart = this.data.cart;
    // 3 找到被修改的商品对象
    let index = cart.findIndex(item => item.goods_id === goods_id);
    // 4 选中状态取反
    cart[index].checked = !cart[index].checked;
    this.setCart(cart)
  },
  // 设置购物车状态同时 重新计算 底部工具栏的数据 全选 总价格 购买的数量
  setCart(cart){
    let allChecked = true
    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(item => {
      if (item.checked) {
        totalPrice += item.num * item.goods_price;
        totalNum += item.num;
      }else {
        allChecked = false
      }
    })
    allChecked = cart.length != 0 ? allChecked : false
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
    wx.setStorageSync("cart", cart)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 1 获取缓存中的收货地址信息
    const address = wx.getStorageSync("address");
    // 1 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart") || [];
    this.setData({address})
    this.setCart(cart)
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