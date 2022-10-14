// 1、引入内置模块http
const http = require('http')

// 2、创建web服务器
const server = http.createServer()

// 3.1、基本的http请求
const req = http.request(
  {
    hostname: 'jsonplaceholder.typicode.com',
    path: '/posts',
    method: 'GET',
  },
  res => {
    console.log(res.statusCode)
    res.on('data', d => {
      // 把接收到的数据转为字符串在控制台输出
      console.log(d.toString())
    })
  }
)
req.on('error', err => {
  console.log(err)
})
req.end()

// 3.2、监听请求事件
server.on('request', (request, respone) => {
  // http://127.0.0.1:300/
  console.log(`收到请求了${request.url}`)

  if (request.url === '/products') {
    const products = [
      {
        name: '小米1',
        price: 1157,
      },
      {
        name: '小米2',
        price: 1157,
      },
    ]
    respone.end(JSON.stringify(products))
  }

  if (request.url === '/') {
    respone.end('index page')
  } else if (request.url === '/login') {
    respone.end('login page')
  } else {
    respone.end('404 Not Found')
  }
})

// 3.3、绑定端口号 ，启动服务器
server.listen(3000, () => {
  console.log('服务启动成功了，可以通过 http://127.0.0.1:300/来进行访问')
})

/* --------------ip地址和端口号-------------- */
// ip地址用来定位计算机
// 端口号用来定位具体的应用程序
// 一切需要联网通信的软件都会占用一个端口号
// 端口号的范围从0-65536之间
// 在计算机中有一些默认端口号，最好不要去使用 例如 http 服务的80
// 开发过程中使用一些简单好记的就可以了 例如 ：3000 5000 等没什么含义的
