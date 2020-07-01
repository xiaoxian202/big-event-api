/**
    用户信息相关接口
 */
const express = require('express')
const router = express.Router()
const path = require('path')
const db = require(path.join(__dirname,'../common/db.js'))

//路由配置

// 获取用户信息
router.get('/userinfo',async (req,res) => {
    //根据什么获取用户信息？用户的id 从token中得到
    //req.user表示从token中获取的信息，该信息是登陆成功后放进去的
    //req.user:属性名称是固定的，有jwt规定
    // { username: 'tom', id: 8, iat: 1593587638, exp: 1593591238 }
    // console.log(req.user);
    // 根据用户的ID查询用户的详细信息
    let sql = 'select id,username,nickname,email,user_pic from user where id = ?'
    let into = await db.operateData(sql,req.user.id)
    if (into && into.length >0) {
        res.json({
            status: 0,
            message: "获取用户基本信息成功！",
            data: into[0]
        })
    } else {
        res.json({
            status: 1,
            message: "获取用户基本信息失败！",
        })
    }
})

// 更新用户信息
router.post('/userinfo',(req,res) => {
    res.send('userinfo')
})

//更改密码
router.post('/updatepwd',(req,res) => {
    res.send('updatepwd')
})

//更换头像
router.post('/update/avatar',(req,res) => {
    res.send('update/avatar')
})
module.exports = router