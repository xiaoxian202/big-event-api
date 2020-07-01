const express = require('express')
//设置跨域
const cors = require('cors')
const path = require('path')
//解析token 安装依赖包 版本5.3.3
const jwt = require('express-jwt')
const loginRouter = require(path.join(__dirname,'routers/login.js'))
const userRouter = require(path.join(__dirname,'routers/user.js'))
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

app.listen(8888,() => {
    console.log('running...');
})
