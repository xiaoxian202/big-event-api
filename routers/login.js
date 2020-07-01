/**
    统一管理路由信息
 */
const express = require('express')
const path = require('path')
//导入第三方包 加密 先下载依赖包
const utils = require('utility')
//token生成的规范 安装依赖包
const jwt = require('jsonwebtoken')
const db = require(path.join(__dirname,'../common/db.js'))
const router = express.Router()

//登录
router.post('/login',async (req,res) => {
    // 获取客户端提交的参数
    let param = req.body
    //注意:密码必须先进行加密
    param.password = utils.md5(req.body.password)
    //根据用户名查询数据库
    let sql = 'select id from user where username = ? and password =?'
    let ret = await db.operateData(sql,[param.username,param.password])
    // 如果是查询，那么ret是数组，如果是增删改，那么ret是对象
    if(ret && ret.length > 0){
        //如果登录验证通过
        let token = jwt.sign(
            {username:req.body.username,id:ret[0].id},
            'bigevent',
            {expiresIn:'1h'}
        )
        res.json({
            status:0,
            message:'登录成功',
            token:'Bearer ' + token
        })
    }else {
        res.json({
            status:1,
            message:'登录失败'
        })
    }
})

// 注册用户接口
router.post('/reguser',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body
    // 对客户端传递过来的密码加密后再进行数据库的插入操作
    //md5加密方式是单向的，无法从密文返解为明文
    param.password = utils.md5(param.password)
    // 调用数据库相关方法进行数据添加操作
    let sql = 'insert into user set ?'
    let ret =  await db.operateData(sql,param)
    if (ret && ret.affectedRows) {
        res.json({
            status:0,
            message:'注册成功'
        })
    } else {
        res.json({
            status:1,
            message:'注册失败'
        })
    }
})

//测试
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