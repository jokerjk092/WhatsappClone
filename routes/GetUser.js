const express=require('express');
const mongoose=require('mongoose')
const User_info=require('../models/users')
const getrouter=express.Router()


getrouter.get('/getUser/:Req_username/:Req_password', function (req, res) { 
    const {Req_username,Req_password}=req.params; 
    
    User_info.find({username:Req_username,password:Req_password}, function (err, allDetails) {
        if (err) {
            console.log(err);
        } else if(allDetails.length==0) {
            // console.log("getuser false")
            res.send( {success:false} )
        }
        else{
            // console.log("getuser true")
            res.send({success:true})
        }
    })
    })



module.exports=getrouter;