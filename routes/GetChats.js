const express=require('express');
const mongoose=require('mongoose')
const User_info=require('../models/users')
const getrouter=express.Router()

getrouter.get('/get_chats/:username', function (req, res) {

    const {username}=req.params; 
   
    User_info.find({}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else if(allDetails.length!=0) {
            // console.log(allDetails);
            res.send(allDetails)
        }
        else{
            
            res.send({success:false})
        }
        
    })
    })



module.exports=getrouter;