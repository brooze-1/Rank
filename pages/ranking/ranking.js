// pages/ranking/ranking.js

Page({
  onLoad: function() {
    // 加载当前排名分类页面的数据内容
    this.loadRanking()
  },
  data: {
      // 存储每条排名信息
      rankItems: [],
      // 控制模态框的显示
      modalHidden: true,
      // 顶部分类排名滑块名称
      rankTypes: ['学习率排名', '学院积分排名', '个人积分排名'],
      // 页面初始化加载的分类排名页面
      currentRankType: '学习率排名'
  },

  // 改变分类排名页面
  changeRankType: function(e) {
      wx.showToast({
        title: '加载中',
        icon: 'loading'
      })  
      // 获取当前点击的排名分类滑块名称 
      var rankType = e.currentTarget.dataset.rankType
      console.log(rankType); //'学习率排名'或'学院积分排名',或'个人积分排名']
      this.setData({
        // 修改分类排名页面
        currentRankType: rankType
      })
      // 加载当前排名分类页面的数据内容
      this.loadRanking()
  },

  // 加载当前排名分类页面的数据内容
  loadRanking: function() {
      var self = this
      // var url = util.rankTypeMap(this.data.currentRankType)
      // console.log(self.data.rankTypes);
      // console.log(self.data.rankTypes.slice(1,2)[0]);
      // 当当前点击的排名分类页面名称为"学习率排名"时执行下面这个分支
      if (self.data.currentRankType === self.data.rankTypes.slice(0,1)[0]){
        wx:wx.request({
          url: 'http://139.196.82.182:8081/school/sortByRates',
          method: "GET",
          success: (result) => {
            console.log(result.data);
            this.setData({
              rankItems:result.data.data
            })
          },
          fail: (res) => {},
          complete: (res) => {},
        })
      }
      // console.log(self.data.currentRankType);
      // 当当前点击的排名分类页面名称为"学院积分排名"时执行下面这个分支
      if (self.data.currentRankType === self.data.rankTypes.slice(1,2)[0]){
        wx:wx.request({
          url: 'http://139.196.82.182:8081/school/sortByPoints',
          method: "GET",
          success: (result) => {
            console.log(result.data);
            this.setData({
              rankItems:result.data.data
            })
          },
          fail: (res) => {},
          complete: (res) => {},
        })
      }
      // console.log(self.data.rankTypes.slice(2,3)[0]);
      // 当当前点击的排名分类页面名称为"个人积分排名"时执行下面这个分支
      if (self.data.currentRankType === self.data.rankTypes.slice(2,3)[0])
      {
        wx:wx.request({
          url: 'http://139.196.82.182:8081/user/queryUserPointsSort',
          method: "GET",
          success: (result) => {
            console.log(result.data);
            this.setData({
              rankItems:result.data.data
            })
          },
          fail: (res) => {},
          complete: (res) => {},
        })
      }
  },
  // 在加载数据完后处理模态框的显示
  afterLoading: function(success) {
      wx.hideToast()
      if (!success) this.modalShow()
  },
  // 模态框隐藏函数
  modalHide: function(e) {
      this.setData({
          modalHidden: true
      })
  },
  // 模态框显示函数
  modalShow: function(e) {
      this.setData({
          modalHidden: false
      })
  }
})
