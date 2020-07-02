/**
    文章分类接口
 */
const express = require('express')
const router = express.Router()
const path = require('path')
const db = require(path.join(__dirname,'../common/db.js'))

// 获取文章分类列表
router.get('/cates',async (req,res) => {
    // 直接操作数据库查询所有文章分类列表数据
    let sql = 'select * from category'
    let ret = await db.operateData(sql)
    if (ret && ret.length > 0) {
        res.json({
            status:0,
            message:'获取文章分类列表成功！',
            data:ret
        })
    } else {
        res.json({
            status:1,
            message:'获取文章分类列表失败！',
        })
    }
})

// 新增文章分类
router.post('/addcates',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body
    // 直接操作数据库查询所有文章分类列表数据
    let sql = 'insert into category set ?'
    let ret = await db.operateData(sql,param)
    //响应请求
    if (ret && ret.affectedRows > 0) {
        res.json({
            status:0,
            message:'新增文章分类成功！',
        })
    } else {
        res.json({
            status:1,
            message:'新增文章分类失败！',
        })
    }
})

// 根据 Id 删除文章分类
router.get('/deletecate/:id',async (req,res) => {
    // 获取要删除的分类id
    let id = req.params.id
    //操作数据库
    // let sql = 'delete from category where id = ?'
    // is_delete=1是删除 0是回滚
    let sql = 'update category set is_delete=0 where id = ?'
    let ret = await db.operateData(sql,id)
    //响应请求
    if (ret && ret.affectedRows > 0) {
        res.json({
            status:0,
            message:'删除文章分类成功！'
        })
    } else {
        res.json({
            status:1,
            message:'删除文章分类失败！'
        })
    }
})

// 根据 Id 获取文章分类数据
router.get('/cates/:id',async (req,res) => {
     // 获取要查询的分类id
     let id = req.params.id
     //操作数据库
     let sql = 'select * from category where id = ?'
     let ret = await db.operateData(sql,id)
     //响应请求
     if (ret && ret.length > 0) {
         res.json({
            status:0,
            message:'查询文章分类成功！',
            data:ret
         })
     } else {
         res.json({
            status:1,
            message:'查询文章分类失败！'
         })
     }
})

// 根据 Id 更新文章分类数据
router.post('/updatecate',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body
    //操作数据库
    let sql = 'update category set ? where Id =?'
    let ret = await db.operateData(sql,[{name:param.name,alias:param.alias},param.Id])
    if (ret && ret.affectedRows > 0) {
        res.json({
            status:0,
            message:'更新分类信息成功！'
        })
    } else {
        res.json({
            status:0,
            message:'更新分类信息失败！'
        })
    }
})


module.exports = router