function operateData(sql,param) {
    return new Promise((resolve,reject) => {
        //1.导入mysql包
        const mysql = require('mysql')

        //2.准备连接数据库相关参数
        const connection = mysql.createConnection({
            // 数据库所在的电脑的IP地址或者域名
            host:'localhost',
            // 数据库端口
            port:3306,
            //和数据库名称一致
            database:'bigeventapi',
            // 数据库账号
            user:'root',
            // 数据库密码
            password:'111111'
        })

        //3.执行连接操作
        connection.connect()

        //4.此时就可以对数据进行操作
        // result: 查询结果
        // let sql = 'select * from user'
        connection.query(sql,param,(err,result) => {
            if(err) {
                reject(err)
            }else {
                resolve(result)
            }
        })

        //5.关闭数据库连接
        connection.end()
    })
}

module.exports = {
    operateData
}