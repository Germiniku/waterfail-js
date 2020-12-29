const path = require('path')
const fs = require('fs')
const { dir } = require('console')
const sizeOf = require('image-size')

const currentPath = path.dirname(__dirname)
const imagesPath = path.join(currentPath, 'web', 'images')

const getAllFile = function (dir) {
  let res = []
  function traverse(dir) {
    fs.readdirSync(dir).forEach((file) => {
      const pathname = path.join(dir, file)
      if (fs.statSync(pathname).isDirectory()) {
        traverse(pathname)
      } else {
        res.push(pathname)
      }
    })
  }
  traverse(dir)
  return res
}
let res = []
let res2 = []
let res3 = []
// 获取所有图片的路径
const allImagesPath = getAllFile(imagesPath)
try {
  let index = 0
  allImagesPath.forEach((imgPath) => {
    index++
    const size = sizeOf(imgPath)

    if (index < 10) {
      // console.log(size)
      res.push({
        img: 'images/' + path.basename(imgPath),
        width: size.width,
        height: size.height,
      })
    }
    if (index < 20) {
      res2.push({
        img: 'images/' + path.basename(imgPath),
        width: size.width,
        height: size.height,
      })
    }
    if (index < 20) {
      res3.push({
        img: 'images/' + path.basename(imgPath),
        width: size.width,
        height: size.height,
      })
    }
  })
} catch (error) {
  console.log(error)
}

console.log(JSON.stringify(res2))

console.log(JSON.stringify(res3))
