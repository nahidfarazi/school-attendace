const router = require('express').Router();
const express = require('express')
const bcryptjs = require('bcryptjs');
const Users = require('../models/Users');

router.use(express.json())
router.post ('/register', async(req,res,next) => {

    const {name, email, password} = req.body
    if(!name || !email || !password){
        return res.status(400).json({message:'invalid data'})
    }
    try{
        let user = await Users.findOne({email});
    if(user){
        return res.status(400).json({message:'user already exiest'})
    }
    user = new Users({name, email, password})
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt)
    user.password = hash;

    await user.save();
    res.status(201).json({message:'user create successfully'})
    }catch(e){
        next(e)
    }
});

router.post('/login', async(req,res,next) => {
    const {email, password} = req.body
    try{
        const user = await Users.findOne({email})
        if(!user){
            res.status(400).json({message:'invalid cradential'})
        }

        const isMatch = bcryptjs.compare(password, user.password)
        if(!isMatch){
            res.status(400).json({messgae:'invalid cradential'})
        }
        delete user._doc.password
        res.status(200).json({message:'Login successfully', user})
    }catch(e){
        next(e)
    }
})




router.get('/health', (req,res) => {
    res.status(200).json({
        message:'health is good'
    })
})
module.exports = router;
