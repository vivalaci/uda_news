//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    activeIndex:0,
    newsBar:[
      {
        "title": "国内",
        "type":"gn",
      },
      {
        "title": "国际",
        "type": "gj",
      },
      {
        "title": "财经",
        "type": "cj",
      },
      {
        "title": "娱乐",
        "type": "yl",
      },
      {
        "title": "军事",
        "type": "js",
      },
      {
        "title": "体育",
        "type": "ty",
      },
      {
        "title": "其他",
        "type": "other",
      },
    ],
    newsList: [],
    backgroundImg:"",
    randomTitle:"",
    randomSource:"快读资讯",
    randomTime:"",
    randomId:'',
    currentType:'gn'
  },
  onShow(){
    
  },
  onLoad: function (e) {
    //默认参数gn
    this.requestData('gn')
  },
  requestData(newsType){
    //传入参数
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: newsType
      },
      success: res => {
        let result = res.data.result;
        let newsRes = [];
        let j = Math.floor(Math.random() * result.length);
        //console.log(result[j]);
        let randomImg = result[j].firstImage;
        let randomTitle = result[j].title;
        let randomSource = result[j].source;
        let randomTime = result[j].date.substring(11, 16);
        let randomId = result[j].id;
        for (let i = 0; i < result.length; i++) {
          newsRes.push({
            id: result[i].id,
            title: result[i].title,
            time: result[i].date.substring(11, 16),
            source: result[i].source,
            img: result[i].firstImage
          })
        };
        this.setData({
          newsList: newsRes,
          backgroundImg: randomImg,
          randomTitle,
          randomSource,
          randomTime,
          randomId
        })
      }
    })
  },
  newsClick(e){
    //console.log(e)
    //点击动态设置CSSS下划线
    let index = e.currentTarget.dataset.index;
    this.setData({
      activeIndex: index
    })  
  //请求数据
    let dataType = e.currentTarget.dataset.type;
    this.requestData(dataType)
    this.setData({
      currentType: dataType
    })
  },

  openNews(e){
    //console.log(e)
    let newsId = e.currentTarget.dataset.index || this.data.randomId
    console.log(newsId)
    wx.navigateTo({
      url: "/pages/detail/detail?id=" + newsId
    })
  },
  //下拉刷新
  onPullDownRefresh: function () {
    //下拉再次请求数据
    this.requestData(this.data.currentType);
    wx.stopPullDownRefresh()
    
  }

})
