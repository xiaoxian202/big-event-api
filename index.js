const path = require('path')
const express = require('express')

const app = express()

app.listen(8888,() => {
    console.log('running...');
})

app.get('/data',(req,res) => {
    
})
