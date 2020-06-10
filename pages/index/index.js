//Page Object
Page({
  data: {
    swiperList:[]
  },
  //options(Object)
  onLoad: function(options){
    // wx.request({
    //   url:'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   success:(res)=> {
    //     console.log(res)
    //   }
    // })
    wx.request({
      url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
      success: (result)=>{
        console.log(result)
      },
      fail: ()=>{},
      complete: ()=>{}
    });
  },
  onReady: function(){
    
  },
  onShow: function(){
    
  },
  onHide: function(){

  },
  onUnload: function(){

  },
  onPullDownRefresh: function(){

  },
  onReachBottom: function(){

  },
  onShareAppMessage: function(){

  },
  onPageScroll: function(){

  },
  //item(index,pagePath,text)
  onTabItemTap:function(item){

  }
});