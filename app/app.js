const express = require('express');
const mongoose = require('mongoose');
const app = express()





app.use(require('../routes/UserRoute'))
app.use(express.json())






// app.use((_req,res,next) => {
//     res.status(404).json({
//         message:'page not found'
//     })
//     next()
    
// })

app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).json({
        message:'server was busy'
    })
})


module.exports = app;