/**
    文章路由模块
 */
const express = require('express')
const router = express.Router()
const path = require('path')
const db = require(path.join(__dirname,'../common/db.js'))

// 发布新文章
router.post('/add',(req,res) => {
    res.send('/cates')
})

// 获取文章的列表数据
router.get('/list',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.query
    //转成数字类型
    param.pagenum = parseInt(param.pagenum)
    param.pagesize = parseInt(param.pagesize)

    //动态拼接查询条件
    let condition = ''
    for(let key in param) {
        if(key === 'cate_id' && param[key]) {
            condition += key + '=' + param[key] + ' and '
        }else if(key === 'state' && param[key]) {
            condition += key + '="' + param[key] + '" and '
        }
    }
    //去掉最后一个and
    condition = condition.substring(0,condition.lastIndexOf('and'))

    //操作数据库
    // limit 后的第一个数表示从第几条开始查询
    // limit 后的第二个数表示查询多少条数据
    let sql = 'select * from article limit ?,?'
    //判断
    if(condition) {
        sql = 'select * from article where '+ condition +' limit ?,?'
    }
    // console.log(sql);
    let ret = await db.operateData(sql,[param.pagesize * (param.pagenum - 1),param.pagesize])
    if (ret && ret.length > 0) {
        res.json({
            status:0,
            message:'获取文章列表成功！',
            data:ret
        })
    } else {
        res.json({
            status:0,
            message:'获取文章列表成功！'
        })
    }
})

// 根据 Id 删除文章数据
router.get('/delete/:id',(req,res) => {
    res.send('/cates')
})

// 根据 Id 获取文章详情
router.get('/:id',(req,res) => {
    res.send('/cates')
})

// 根据 Id 更新文章信息
router.post('/edit',(req,res) => {
    res.send('/cates')
})



module.exports = router