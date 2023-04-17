const express = require('express');
const router = require('express').Router();
const bcryptjs = require('bcryptjs');
const Users = require('./models/Users');

router.use(express.json())
router.post('/test', async(req,res) => {
    const {name , email, password} = req.body
    if(!name || !email || !password){
    return res.status().json({message:'invaild data'})
    }
    let user = await Users.find({email})
    if(user){
        return res.status(400).json({message:'user already exist'})
    }
    user = new Users({name, email, password})
    const salt =await bcryptjs.genSalt(10);
    const hash =await bcryptjs.hash(password, salt)
    user.password= hash
    await user.save();
    res.status(201).json({message:'user create successfully'})
});