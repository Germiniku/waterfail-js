;(function (doc) {
  var oItems = doc.getElementsByClassName('wf-item'),
    oItemsLen = oItems.length,
    _arr = []
  var init = function () {
    setImgPos()
  }
  function setImgPos() {
    var item
    for (var i = 0; i < oItemsLen; i++) {
      /*
                1200 
                5
                10间隔 40
                (1200 - 40) / 5  = 232
            */
      item = oItems[i]
      item.style.width = '232px'
      // 遍历第一行的元素，将元素的高度插入到列表里面
      if (i < 5) {
        _arr.push(item.offsetHeight)
        item.style.top = '0'
        if ((i + 1) % 5 == 1) {
          item.style.left = '0'
        } else {
          item.style.left = i * (232 + 10) + 'px'
        }
      } else {
        // 获取当前列表最小的下标值
        const minIdx = getMinIdx(_arr)
        // 将下一个元素添加到当前列表最小的元素的下面
        item.style.left = oItems[minIdx].offsetLeft + 'px'
        item.style.top = _arr[minIdx] + 10 + 'px'
        _arr[minIdx] += item.offsetHeight + 10
      }
    }
  }
  function getMinIdx(arr) {
    return [].indexOf.call(arr, Math.min.apply(null, arr))
  }
  window.onload = function () {
    init()
  }
})(document)
