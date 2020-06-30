const express = require('express')
//设置跨域
const cors = require('cors')
const path = require('path')
const loginRouter = require(path.join(__dirname,'routers/login.js'))
const app = express()

//处理客户端请求post参数
// for parsing application/json
app.use(express.json()) 
// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }))

//设置跨域
app.use(cors())

//设置接口
app.use('/api',loginRouter)

app.listen(8888,() => {
    console.log('running...');
})
