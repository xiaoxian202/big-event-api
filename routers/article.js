/**
    文章路由模块
 */
const express = require('express')
const router = express.Router()
const path = require('path')
const db = require(path.join(__dirname,'../common/db.js'))
//导入multer包 上传文件
const multer = require('multer')
const upload = multer({dest: path.join(__dirname, '../uploads')})

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
    // condition = condition.substring(0,condition.lastIndexOf('and'))

    //操作数据库
    // limit 后的第一个数表示从第几条开始查询
    // limit 后的第二个数表示查询多少条数据
    // let sql = 'select * from article limit ?,?'
    //联表查询
    let sql = 'select a.id,a.title,a.pub_date,a.state,c.name as cate_name from article as a join category as c on a.cate_id = c.id where a.is_delete = 0 limit ?,?'
    //查询列表总数
    let totalSql = 'select count(*) as total from article'
    //判断
    if(condition) {
        // condition  += 'and a.is_delete = 0'
        //不把上面的and去掉就不用添加and
        condition  += 'a.is_delete = 0'
        // sql = 'select * from article where '+ condition +' limit ?,?'
        sql = 'select a.id,a.title,a.pub_date,a.state,c.name as cate_name from article as a join category as c on a.cate_id = c.id where '+ condition +' limit ?,?'
        //携带条件时查询总数
        totalSql = 'select count(*) as total from article as a where ' + condition
    }
    // console.log(sql);
    let ret = await db.operateData(sql,[param.pagesize * (param.pagenum - 1),param.pagesize])
    let cret = await db.operateData(totalSql)
    if (ret && ret.length > 0) {
        res.json({
            status:0,
            message:'获取文章列表成功！',
            data:ret,
            total:cret[0].total
        })
    } else {
        res.json({
            status:0,
            message:'获取文章列表成功！'
        })
    }
})

// 根据 Id 删除文章数据
router.get('/delete/:id',async (req,res) => {
    //获取前端传递过来的参数
    let param = req.params
    //操作数据库
    let sql = 'update article set is_delete = 1 where id = ?'
    let ret = await db.operateData(sql,param.id)
    if (ret && ret.affectedRows > 0) {
        res.json({
            status:0,
            message:'删除成功！'
        })
    } else {
        res.json({
            status:1,
            message:'删除失败！'
        })
    }

})

// 根据 Id 获取文章详情
router.get('/:id',async (req,res) => {
    //获取前端传递过来的id
    let id = req.params.id
    // 操作数据库
    let sql = 'select * from article where is_delete = 0 and id = ?'
    let ret = await db.operateData(sql,id)
    if (ret && ret.length > 0) {
        res.json({
            status:0,
            message:'获取文章成功！',
            data:ret[0]
        })
    } else {
        res.json({
            status:1,
            message:'获取文章失败！'
        })
    }
})

// 根据 Id 更新文章信息
router.post('/edit',upload.single('cover_img'),async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body
    //上传文件封面的路径
    let filePath = '/uploads' + req.file.fieldname
    //操作数据库
    let sql = 'update article set ? where id = ?'
    let ret = await db.operateData(sql,[{
        title:param.title,
        cate_id:param.cate_id,
        content:param.content,
        cover_img:filePath,
        state:param.state},param.Id])
    console.log(sql);
    if (ret && ret.affectedRows > 0) {
        res.json({
            status:0,
            message:'修改文章成功！'
        })
    } else {
        res.json({
            status:1,
            message:'修改文章失败！'
        })
    }
})

// 发布新文章
router.post('/add',upload.single('cover_img'),async (req,res) => {
    //获取前端传递过来的参数
    let param = req.body
    //获取用户ID
    let id = req.user.id
    //获取文件上传的路径
    let filePath = '/uploads/' + req.file.filename
    //操作数据库
    let sql = 'insert into article set ?'
    let ret = await db.operateData(sql,{
        title:param.title,
        cate_id:param.cate_id,
        content:param.content,
        cover_img:filePath,
        state:param.state,
        is_delete:0,
        author_id:id,
        pub_date:new Date()
    })
    if (ret && ret.affectedRows > 0) {
        res.json({
            status:0,
            message:'发布文章成功！'
        })
    } else {
        res.json({
            status:0,
            message:'发布文章失败！'
        })
    }
})




module.exports = router