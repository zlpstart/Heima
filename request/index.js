let ajaxTimes = 0

//项目URL相同部分，减轻代码量，同时方便项目迁移
//这里因为我是本地调试，所以host不规范，实际上应该是你备案的域名信息
/**
 * POST请求，
 * URL：接口
 * postData：参数，json类型
 * doSuccess：成功的回调函数
 * doFail：失败的回调函数
 */
let SESSION = wx.getStorageSync('SESSION');
function requestLogin(url, postData, doSuccess, doFail, currentHost) {
  ajaxTimes++;
  // const baseUrl = ""
  // wx.hideLoading();
  // var host = getApp() ? getApp().globalData.host : currentHost;
  // var host='https://api-hmugo-web.itheima.net/api/public/v1'
  wx.showLoading({
    title: '',
    mask: false,
  })
  const self = this;
  let headerParams = {
    "Content-Type": "application/x-www-form-urlencoded",
  }
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: url,
    header: headerParams,
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      if (url == 'login/register') {
        console.log(res.header)
        let arr = res.header['Set-Cookie'].split(";");
        SESSION = arr[0].split("=")[1];
        wx.setStorage({
          key: 'SESSION',
          data: SESSION
        });
      }
      doSuccess(res.data);
    },
    fail: function (res) {
      console.log(res)
      if (!doFail) {
        wx.showToast({
          image: "../../images/tip.png"
        })
        return;
      } else {
        doFail(res);
      }
    },
    complete: function (res) {
      ajaxTimes--;
      if (ajaxTimes === 0) {
        wx.hideLoading();
      }
    }
  })
}

function request(url, postData, doSuccess, doFail, currentHost) {
  ajaxTimes++;
  // wx.hideLoading();
  // var host = getApp() ? getApp().globalData.host : currentHost;
  //   var host=currentHost?getApp().globalData.hostSass:getApp().globalData.host;
  wx.showLoading({
    title: '',
    mask: false,
  })
  const self = this;
  let headerParams = {
    "Content-Type": "application/json;charset=UTF-8",
    // app_name:'paaw'
  }
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: url,
    header: headerParams,
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function (res) {
      console.log(res)
      if (!doFail) {
        wx.showToast({
          image: "../../images/tip.png"
        })
        return;
      } else {
        doFail(res);
      }
    },
    complete: function (res) {
      ajaxTimes--;
      if (ajaxTimes === 0) {
        wx.hideLoading();
      }
    }
  })
}

function request1(url, postData, doSuccess, doFail, currentHost) {
  ajaxTimes++;
  // wx.hideLoading();
  // var host = getApp() ? getApp().globalData.host : currentHost;
  //   var host=currentHost?getApp().globalData.hostSass:getApp().globalData.host;

  const self = this;
  let headerParams = {
    "Content-Type": "application/json;charset=UTF-8",
    // app_name:'paaw'
  }
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: url,
    header: headerParams,
    data: postData,
    method: 'POST',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      doSuccess(res.data);
    },
    fail: function (res) {
      console.log(res)
      if (!doFail) {
        wx.showToast({
          image: "../../images/tip.png"
        })
        return;
      } else {
        doFail(res);
      }
    },
    complete: function (res) {
      ajaxTimes--;
      if (ajaxTimes === 0) {
        wx.hideLoading();
      }
    }
  })
}

//GET请求，不需传参，直接URL调用，
function getData(url, doSuccess, doFail, currentHost) {
  ajaxTimes++;
  wx.showLoading({
    title: '加载中',
    mask: false,
  })
  var self = this;
  //   var host = !currentHost ? getApp().globalData.host : currentHost;
  wx.request({
    url: url,
    header: {
      "Content-type": "application/json;charset=UTF-8"
    },
    method: 'GET',
    success: function (res) {
      doSuccess(res.data.message);
    },
    fail: function (res) {
      if (doFail) {
        doFail(res)
      } else {
        wx.showToast({
          title: "系统繁忙...",
          image: "../../images/tip.png"
        })
      }
    },
    complete: function () {
      ajaxTimes--;
      if (ajaxTimes === 0) {
        wx.hideLoading();
      }
    }
  })
}

//put请求
function putData(url, postData, doSuccess, doFail, currentHost) {
  ajaxTimes++;
  wx.showLoading({
    title: '',
    mask: false,
  })
  var self = this;
  //   var host = getApp() ? getApp().globalData.host : currentHost;
  wx.request({
    url: url,
    header: {
      "Content-type": "application/json;charset=UTF-8"
    },
    data: postData,
    method: 'put',
    success: function (res) {
      doSuccess(res.data);
    },
    fail: function (res) {
      if (doFail) {
        doFail(res)
      } else {
        wx.showToast({
          title: "系统繁忙...",
          image: "../../images/tip.png"
        })
      }
    },
    complete: function () {
      ajaxTimes--;
      if (ajaxTimes === 0) {
        wx.hideLoading();
      }
    }
  })
}

function Delete(url, postData, doSuccess, doFail, currentHost) {
  ajaxTimes++;
  // wx.hideLoading();
  //   var host = getApp() ? getApp().globalData.host : currentHost;
  wx.showLoading({
    title: '',
    mask: false,
  })
  const self = this;
  let headerParams = {
    "Content-Type": "application/json;charset=UTF-8",
    // app_name:'paaw'
  }
  wx.request({
    //项目的真正接口，通过字符串拼接方式实现
    url: url,
    header: headerParams,
    data: postData,
    method: 'DELETE',
    success: function (res) {
      //参数值为res.data,直接将返回的数据传入
      if (url == 'login/register') {
        let arr = res.header['Set-Cookie'].split(";");
        SESSION = arr[0].split(":")[0];
        wx.setStorage({
          key: 'SESSION',
          data: SESSION
        });
      }
      doSuccess(res.data);
    },
    fail: function (res) {
      console.log(res)
      if (!doFail) {
        wx.showToast({
          image: "../../images/tip.png"
        })
        return;
      } else {
        doFail(res);
      }
    },
    complete: function (res) {
      ajaxTimes--;
      if (ajaxTimes === 0) {
        wx.hideLoading();
      }
    }
  })
}

/**
 * module.exports用来导出代码
 * js文件中通过var call = require("../util/request.js")  加载
 * 在引入引入文件的时候"  "里面的内容通过../../../这种类型，小程序的编译器会自动提示，因为你可能
 * 项目目录不止一级，不同的js文件对应的工具类的位置不一样
 */
module.exports.requestLogin = requestLogin;
module.exports.request = request;
module.exports.request1 = request1;
module.exports.getData = getData;
module.exports.putData = putData;
module.exports.Delete = Delete;

