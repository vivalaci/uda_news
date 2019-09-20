// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newsId:0,
    detailTitle:"",
    detailSource:'',
    detailTime:'',
    detailRead:'',
    newsContent:[]

  },

  /**
   * 生命周期函数--监听页面加载
   */
 
  openDetail(){
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data:{
        id:this.data.newsId
      },
      success:res=>{
        console.log(res)
        let result = res.data.result;
        let title = result.title;
        let time = result.date.substring(11, 16);
        let readCount = result.readCount;
        let source = result.source;
        let content = result.content;
        this.setData({
          detailTitle:title,
          detailSource:source,
          detailTime:time,
          detailRead: readCount,
          newsContent:content
        })
      }
    })
  },
  onLoad: function (options) {
    this.setData({
      newsId: options.id
    })
    this.openDetail();
   
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