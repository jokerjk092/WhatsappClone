const express=require('express');
const mongoose=require('mongoose')
const User_info=require('../models/users')
const getrouter=express.Router()

getrouter.get('/unique_username/:value', function (req, res) {
   
    const {value}=req.params; 
    User_info.find({username:value}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else if(allDetails.length==0) {
            // console.log("called true");
            res.send( {success:true} )
        }
        else{
            // console.log("called false");
            res.send({success:false})
        }
        
    })
    })



module.exports=getrouter;