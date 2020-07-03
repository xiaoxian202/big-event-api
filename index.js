const express = require('express')
//设置跨域
const cors = require('cors')
const path = require('path')
//解析token 安装依赖包 版本5.3.3
const jwt = require('express-jwt')
const loginRouter = require(path.join(__dirname,'routers/login.js'))
const userRouter = require(path.join(__dirname,'routers/user.js'))
const cateRouter = require(path.join(__dirname,'routers/cate.js'))
const articleRouter = require(path.join(__dirname,'routers/article.js'))
const app = express()

//处理客户端请求post参数
// for parsing application/json
app.use(express.json()) 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//设置跨域
app.use(cors())

// 通过中间件统一处理token
// secret需要跟加密唯一标识的值一致
// unless的作用：排除一些路径不需要进行token解析
// app.use(jwt({secret:'bigevent'}).unless({path:['/api/login','/api/requser']}))
// path支持正则，/^\/api/改正则表示以api开始
app.use(jwt({secret:'bigevent'}).unless({path:/^\/api/}))

//设置路径
app.use('/api',loginRouter)
app.use('/my',userRouter)
app.use('/my/article',cateRouter)
app.use('/my/article',articleRouter)

//统一处理不存在的路由
// app.all表示处理所有形式的请求（get/post/put/delete...）  
app.all('*',(req,res) => {
    res.status(404).json({
        status:404,
        message:'请求的资源不存在'
    })
})

//统一处理异常信息 中间件要放到最后
app.use((err,req,res,next) => {
    if (err.status === 401) {
        //token验证失败
        //status参数401表示http协议的响应状态码，给http协议用的
        res.status(401).json({
            statsu:401,//给应用程序用的
            message:err.message
        })
    } else {
        res.json({
            statsu:500,
            message:'服务器错误' + err.message
        })
    }
})

app.listen(8888,() => {
    console.log('running...');
})
