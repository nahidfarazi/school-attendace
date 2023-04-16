const express = require('express');
const app = express()

app.get('/health', (req,res) => {
    res.status(200).json({
        message:'health is good'
    })
})

module.exports = app;