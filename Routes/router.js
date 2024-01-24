
const express = require('express');
const router = express.Router()
const User = require("../model/users")
const bcrypt = require("bcryptjs")

// getting all the users
router.get("/",async(req,res)=>{
   try {
    const users = await User.find()
    res.status(200).json(users)
   } catch (error) {
    res.status(500).json({message:error.message})
   }
})
// inserting users 
router.post("",async(req,res)=>{
        const hide_password = await bcrypt.genSalt(10)
        const hashedPasword = await bcrypt.hash(req.body.password,hide_password)
try {
    const newUser = await User.create({
        username :req.body.username,
        email: req.body.email,
        password:hashedPasword,
        phone:req.body.phone,
        sex:req.body.sex
       })
    
       res.status(201).json({newUser})

} catch (error) {
    res.status(401).json({message:error})
}
})

// getting single user

router.get("/:id",async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        res.status(200).json({status:"single user displayed" , user})
    } catch (error) {
        res.status(401).json({status:"could not find the user" ,message:error.message})
    }
})
 
// deleting the user 

router.delete("/:id",async(req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(200)
        .json({message:"deleted successfully"})

    } catch (error) {
        res.status(404).json({message:"user not found"})
    }
})

// updating a user  

router.put("/:id",async(req,res)=>{
    try {
        const user = await User.findByIdAndUpdate(req.params.id , {
            username : req.body.username,
            email:req.body.email,
            password:req.body.email,
            phone:req.body.password,
            sex:req.body.sex
        })
        res.status(200).json({status:"updated" , user})
    } catch (error) {
        
    }
})

module.exports = router