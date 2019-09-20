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
        checkClick:true
      },
      {
        "title": "国际",
        "type": "gj",
        checkClick: false
      },
      {
        "title": "财经",
        "type": "cj",
        checkClick: false
      },
      {
        "title": "娱乐",
        "type": "yl",
        checkClick: false
      },
      {
        "title": "军事",
        "type": "js",
        checkClick: false
      },
      {
        "title": "体育",
        "type": "ty",
        checkClick: false
      },
      {
        "title": "其他",
        "type": "other",
        checkClick: false
      },
    ],
    newsList: [],
    backgroundImg:"",
    randomTitle:"",
    randomSource:"",
    randomTime:""
  },
  onShow(){
    
  },
  onLoad: function (e) {
    console.log(e);
    //加载时自动加载第一页,如何在onload中模拟点击第一个项目？？？
    //this.newsClick();
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: 'gn'
      },
      success: res => {
        let result = res.data.result;
        let newsRes = [];
        let j = Math.floor(Math.random() * result.length);
        let randomImg = result[j].firstImage;
        let randomTitle = result[j].title;
        let randomSource = result[j].source;
        let randomTime = result[j].date.substring(11, 16);
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
          randomTime
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
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: dataType
      },
      success:res=>{
        let result = res.data.result;
        //console.log(result);
        let newsRes=[];
        let j = Math.floor(Math.random() * result.length);
        let randomImg = result[j].firstImage;
        let randomTitle = result[j].title;
        let randomSource = result[j].source;
        let randomTime = result[j].date.substring(11, 16);
        //console.log(randomImg);
        for(let i=0;i<result.length;i++){
          newsRes.push({
            id:result[i].id,
            title:result[i].title,
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
        })
      }
    })
  },
  
  openNews(e){
    console.log(e)
    let newsId=e.currentTarget.dataset.index
    console.log(newsId)

    wx.navigateTo({
      url: "/pages/detail/detail?id=" + newsId
    })
  }

})
