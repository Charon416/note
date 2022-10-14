const path = require('path')
// path.dirname(path)

// 1、path.resolve([...paths]) 将一系列路径或路径段解析为绝对路径
const resolvePath = path.resolve(__dirname, `./screenshot/000.png`) // __dirname是获取当前文件绝对路径的全局对象
console.log(resolvePath)

// 2、path.join([...paths]) 拼接路径
const joinPath = path.join(__dirname, 'demo.js')
console.log(joinPath)

// 3、path.extname() 获取文件的后缀名
const extname = path.extname('../demo.txt')
console.log(extname)

// 4、path.basename(path[,suffix]) 截取路径中最后一个"/"后的内容 (可以截取出文件名)
const basename1 = path.basename('../demo.txt')
console.log(basename1) // demo.txt
const basename2 = path.basename('../demo.txt')
console.log(basename2) // demo
