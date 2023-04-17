require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db/db');
const app = require('./app/app');
const PORT = process.env.PORT || 8080

connectDB('mongodb://127.0.0.1:27017/school-attendace')
.then(() =>{
    app.listen(PORT, () => {
        console.log(`server is runnig at http://localhost:${PORT}`);
    });
    console.log('database connected');
})
.catch((e) => console.log(e));