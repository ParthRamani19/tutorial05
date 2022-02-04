var express = require('express');
var router = express.Router();
var Meet = require('./Models/Meet')
var User = require('./Models/User')
var bcrypt = require('bcryptjs')
var jwt = require('jsonwebtoken')

//to fetch 
router.get('/Meet',async(req,res)=>{
    const iMeet = await Meet.find()
    res.send(iMeet)
})

//to add the 
router.post("/Meet",async(req,res)=>{
    const iMeet = new Meet({
        name:req.body.name,
        rating:req.body.rating
    })

    await iMeet.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})


// api for updating movie

router.patch('/Meet/:id',async (req,res)=>{
    const iMeet = await Movie.findOne({_id:req.params.id})
    iMeet.name = req.body.name
    iMeet.rating = req.body.rating
    await iMeet.save((err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }
    })

})

//delete api

router.delete("/Meet/:name",async(req,res)=>{
    await Meet.deleteOne({name:req.params.name},(err,msg)=>{
        if(err){
            res.status(500).json({
                error:err
            })
        }
        else{
            res.status(200).json({
                msg:msg
            })
        }

    })
})


router.post('/users',async(req,res)=>{
    
    //generate salt key
    salt = await bcrypt.genSalt(10)
    console.log(salt)

    hashedpswd = await bcrypt.hash(req.body.password,salt)
    console.log(hashedpswd)

    const iuser = new User({
        uname:req.body.uname,
        password:hashedpswd
    })  
    await iuser.save((err,msg)=>{
        if(err){
            res.status(500).json({
                "error":err
            })
        }
        else{
            res.status(200).json({
                "My-message":msg
            })
        }
    })

})

module.exports = router 
