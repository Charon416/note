/* 
 1. fs.stat  检测是文件还是目录(目录 文件是否存在) 
 2. fs.mkdir  创建目录 （创建之前先判断是否存在） 
 3. fs.writeFile  写入文件(文件不存在就创建,但不能创建目录) 
 4. fs.appendFile 写入追加文件 
 5.fs.readFile 读取文件 
 6.fs.readdir 读取目录 
 7.fs.rename 重命名 
 8. fs.rmdir  删除目录 
 9. fs.unlink 删除文件 
*/
const fs = require('fs')

// 1、fs.stat(path[, options], callback) 检测是文件还是目录
fs.stat('./src/puppeteer', (error, stats) => {
  if (error) {
    console.log(error)
    return false
  }
  console.log(`文件：${stats.isFile()}`)
  console.log(`目录：${stats.isDirectory()}`)
  return true
})

// 2、fs.mkdir(path[, options], callback)  创建目录
fs.mkdir('newFolder', error => {
  if (error) {
    console.log(error)
    return false
  }
  console.log('创建目录成功')
  return true
})

// 3、fs.writeFile(file, data[, options], callback) 写入文件，会覆盖之前的内容（文件不存在就创建）（但是不能加上目录test/test.text）
fs.writeFile('test.text', '我是你爸爸', error => {
  if (error) {
    console.log(error)
    return false
  }
  console.log('写入文件成功')
  return true
})

// 4、fs.appendFile(path, data[, options], callback) 追加文件
fs.appendFile('test.text', '你是不是飘了', error => {
  if (error) {
    console.log(error)
    return false
  }
  console.log('追加文件成功')
  return true
})

// 5、fs.readFile(path[, options], callback)
fs.readFile('test.text', (error, data) => {
  if (error) {
    console.log(error)
    return false
  }
  // console.log(data) // data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题
  console.log(data.toString())
  return true
})
