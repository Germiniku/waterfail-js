;(function (doc) {
  /*
        外层盒子 oWrapper
        列数 column
        间隙 gap
    */
  var Waterfall = function (wrapper, opt) {
    this.oWrapper = doc.getElementsByClassName(wrapper)[0]
    this.column = opt.column
    this.gap = opt.gap
    this.itemWidth =
      (this.oWrapper.offsetWidth - (this.column - 1) * this.gap) / this.column
    //      (1200                        (5   - 1) * 10)          / 5
    this.pageNum = 0
    this.pageSize = 0
    this.heightArr = []
  }
  Waterfall.prototype.init = function () {
    this.getImgData(this.pageNum)
    this.bindEvent()
  }
  Waterfall.prototype.bindEvent = function () {
    window.addEventListener('scroll', this.scrollToBottom.bind(this), false)
  }
  Waterfall.prototype.scrollToBottom = function () {
    console.log(getScrollTop())
    console.log(getWindowHeight())
    console.log(getScrollHeight())
    if (getScrollTop() + getWindowHeight() == getScrollHeight()) {
      this.pageNum++
      if (this.pageNum <= this.pageSize - 1) {
        this.getImgData(this.pageNum)
      }
    }
  }
  Waterfall.prototype.getImgData = function (pageNum) {
    var _self = this
    axios({
      url: 'http://localhost:3000',
      method: 'POST',
      data: { pageNum: pageNum },
      header: {
        'Content-Type': 'application/json',
      },
    })
      .then((resp) => {
        const { data } = resp
        if (data != 'NO DATA') {
          var pageData = JSON.parse(data.pageData)
          console.log(pageData)
          _self.pageSize = parseInt(data.pageSize)
          _self.renderList(pageData, pageNum)
        }
      })
      .catch((err) => console.log(err))
  }
  Waterfall.prototype.renderList = function (data, pageNum) {
    var oFrag = doc.createDocumentFragment()
    console.log(data.length)
    data.forEach((elem, idx) => {
      var minIdx = getMinIdx(this.heightArr)
      var oItem = document.createElement('div'),
        oImg = new Image()
      // var oTitle = document.createElement('div'),
      var itemLeft =
          (idx + 1) % this.column === 1
            ? '0'
            : idx * (this.itemWidth + this.gap),
        itemHeight = (elem.height * this.itemWidth) / elem.width
      minHeightElementLeft =
        minIdx === 0 ? 0 : minIdx * (this.itemWidth + this.gap)
      oItem.className = 'wf-item'
      oItem.style.width = this.itemWidth + 'px'
      oItem.style.height = (elem.height * this.itemWidth) / elem.width + 'px'
      oImg.src = elem.img
      // oTitle.innerHTML = '<p>测试文本</p>'
      // oTitle.className = 'title-box'

      oItem.appendChild(oImg)
      // oItem.appendChild(oTitle)
      // this.oWrapper.appendChild(oItem)
      oFrag.appendChild(oItem)
      if (idx < this.column && pageNum === 0) {
        this.heightArr.push(itemHeight)
        oItem.style.top = 0
        oItem.style.left = itemLeft + 'px'
      } else {
        oItem.style.left = minHeightElementLeft + 'px'
        oItem.style.top = this.heightArr[minIdx] + this.gap + 'px'
        this.heightArr[minIdx] += itemHeight + this.gap
      }
      oImg.style.opacity = '1'
    }, this)
    this.oWrapper.appendChild(oFrag)
  }
  function getMinIdx(arr) {
    return [].indexOf.call(arr, Math.min.apply(null, arr))
  }
  window.Waterfall = Waterfall
})(document)
