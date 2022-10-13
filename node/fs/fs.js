/* 
  1、fs.access 判断目录、文件是否存在(读写权限)
  2、fs.stat(path[, options], callback) 检测是目录还是文件(目录，文件是否存在)
  3.1、fs.mkdir(path[, options], callback)  创建目录
  3.2、fs.readdir(path[, options], callback) 读取目录下第一级内容，把目录下面的文件和文件夹都获取到
  3.3、fs.rmdir  删除目录(只能删除空的目录，不能包含文件)
  4.1、fs.writeFile(file, data[, options], callback) 写入文件，会覆盖之前的内容（文件不存在就创建）（但是不能创建目录）
  4.2、fs.appendFile(path, data[, options], callback) 追加文件
  4.3、fs.readFile(path[, options], callback) 读取文件 
  4.4、fs.unlink(path, callback) 删除文件
  5、fs.rename(oldPath, newPath, callback)  重命名
  6、fs.createReadStream  从文件流中读取数据
  7、fs.createWriteStream  写入文件流 
  8、pipe 管道流  
*/
const fs = require('fs')


//1、 fs.access 判断目录、文件是否存在(读写权限)
fs.access('test/test1/test3.txt',(err)=>{
  console.log(err ?  '目录/文件不存在': '文件存在,可以进行读写')
})

// 2、fs.stat(path[, options], callback) 检测是目录还是文件(目录，文件是否存在)  =>fs.statSync()
fs.stat('./src/puppeteer', (error, stats) => {
  if (error) {
    console.log(error)
    return false
  }
  console.log(`文件：${stats.isFile()}`)
  console.log(`目录：${stats.isDirectory()}`)
  return true
})

// 3.1、fs.mkdir(path[, options], callback)  创建目录
fs.mkdir('newFolder', error => {
  if (error) {
    console.log(error)
    return false
  }
  console.log('创建目录成功')
  return true
})
// 3.2、fs.readdir(path[, options], callback) 读取目录下第一级内容，把目录下面的文件和文件夹都获取到
fs.readdir('test', (error, files) => {
  if (error) {
    console.log(error)
    return false
  }
  console.log(files) //data是数组类型，包含文件夹以及文件的名字(只有第一级目录内容)。拿到一个文件夹下面的所有目录  
})
//3.3、fs.rmdir  删除目录(只能删除空的目录，不能包含文件)
fs.rmdir('demo', error => {
  if (error) {
    console.log(error)
    return false
  }
  console.log('删除目录成功')
  return true
})

// 4.1、fs.writeFile(file, data[, options], callback) 写入文件，会覆盖之前的内容（文件不存在就创建）（但是不能创建目录）
fs.writeFile('test.text', '我是你爸爸', error => {
  if (error) {
    console.log(error)
    return false
  }
  console.log('写入文件成功')
  return true
})
// 4.2、fs.appendFile(path, data[, options], callback) 追加文件
fs.appendFile('test.text', '你是不是飘了', error => {
  if (error) {
    console.log(error)
    return false
  }
  console.log('追加文件成功')
  return true
})
// 4.3、fs.readFile(path[, options], callback) 读取文件 
fs.readFile('test.text', (error, data) => {
  if (error) {
    console.log(error)
    return false
  }
  // console.log(data) // data是读取的十六进制的数据。  也可以在参数中加入编码格式"utf8"来解决十六进制的问题
  console.log(data.toString())
  return true
})
//4.4、fs.unlink(path, callback) 删除文件
fs.unlink('test/test1/test1.txt', err => {
  if (err) {
    console.log(err)
    return false
  }
  console.log('删除文件成功')
  return true
})



// 5、fs.rename(oldPath, newPath, callback)  重命名  1.改名  2.剪切文件(移动) 目录，文件都可以
fs.rename('test/test3.txt', 'test/test1/test3.txt', err => {
  if (err) {
    console.log(err)
    return false
  }
  console.log('文件重命名成功')
  return true
})



//6、 fs.createReadStream(path[, options])  从文件流中读取数据，读取的文件比较大时建议用流的方式读取，文件比较大会多次读取。  
const fileReadStream = fs.createReadStream( 'demo1.js')
const str = ''
fileReadStream.on('data', data => {
    console.log("接收到" + data.length)   //文件比较大时，会多次读取，多次执行该回调函数  
    str += data
})
fileReadStream.on('end', () => {
    console.log(" --- 读取结束 ---")
    console.log( str )
})
fileReadStream.on('error', error => {
    console.log(error)
})

//7、 fs.createWriteStream(path[, options])  写入文件流  
const data  = "我是从数据库获取的数据，我要保存起来"
const writerStream = fs.createWriteStream('output.txt')
writerStream.write( data , 'UTF8' )
writerStream.end();  //标记文件末尾  结束写入流，释放资源  
writerStream.on( 'finish',  () => {
    console.log("写入完成")
})
writerStream.on( 'error',  function(error){
    console.log(error.stack)
})
console.log("程序执行完毕")

//8、 pipe 管道流  
const rs = fs.createReadStream( 'input.txt')
const ws = fs.createWriteStream( 'output.txt')
rs.pipe( ws )
