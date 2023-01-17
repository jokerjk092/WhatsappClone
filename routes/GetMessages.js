const express=require('express');
const mongoose=require('mongoose')
const User_chats=require('../models/userChats')
const getrouter=express.Router()

getrouter.get('/get_messages/:username', function (req, res) {

    const {username}=req.params; 
   
    User_chats.find({username:username}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else if(allDetails.length!=0) {
            // console.log(allDetails);
            res.send(allDetails[0].chats)
        }
        else{
            
            res.send({success:false})
        }
        
    })
    })



module.exports=getrouter;