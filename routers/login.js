/**
    统一管理路由信息
 */
const express = require('express')
const path = require('path')
const db = require(path.join(__dirname,'../common/db.js'))
const router = express.Router()

router.post('/login',(req,res) => {
    res.end('login')
})

router.post('/reguser',(req,res) => {
    res.end('reguser')
})

router.get('/test',async (req,res) => {
    let sql = 'select * from user'
    let ret = await db.operateData(sql,null)
    res.json({
        status:0,
        data:ret
    })
})

//导出
module.exports = router