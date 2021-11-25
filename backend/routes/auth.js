const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
const { body, validationResult } = require('express-validator');

const JWT_SECRET = "R$U$S$H$I#K#E#S#H";


//Create User : NO login required POST:"/api/auth/createuser"
router.post('/createuser', [
    body('name', "Enter a valid name").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
], async(req, res) => {
    let success = false;
    //If error occured return bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }
    try {       
        let user = await User.findOne({email:req.body.email});
        if(user){
            return res.status(400).json({success, error:"Sorry user with this email already exist"});
        }
        const salt = await bcrypt.genSalt(10);
        secPass = await bcrypt.hash(req.body.password,salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user : {
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        const name = user.name;
        res.json({success, authToken, name});
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
})

//Authenticate User : NO login required POST:"/api/auth/login"
router.post('/login', [
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannot be blank").exists()
], async(req, res) => {
    //If error occured return bad request
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email});
        if(!user){
            success = false;
            return res.status(400).json({success, error:"Please try to login with correct credentials"});
        }
        const passwordCompare = await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            success = false;
            return res.status(400).json({success, error:"Please try to login with correct credentials"});
        }
        const data = {
            user : {
                id:user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        const name = user.name;
        res.json({success, authToken, name});  
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
})

//Get logged in user's information : login required POST:"/api/auth/getuser"
router.post('/getuser', fetchUser , async(req, res) => {
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal server error!");
    }
})
module.exports = router;