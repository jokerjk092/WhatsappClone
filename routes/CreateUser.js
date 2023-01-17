const express=require('express');
const mongoose=require('mongoose')
const User_info=require('../models/users')
const User_chats=require('../models/userChats')
const CreateUserrouter=express.Router()
CreateUserrouter.post('/create_user',async (req,res)=>{
    const {new_username,new_password}=req.body;

    
    let arr=[];
    User_info.find({}, function (err, allDetails) {
        allDetails.map((user)=>{
            username=user.username;
            let user_item={username:username,chats:[]}
            arr.push(user_item)

        })
    })


    try {
       await User_info.create({
        username:new_username,
        password:new_password,
        
        })
        // console.log(req.body)
    } catch (error) {
        console.log(error)

    }
   
    await User_chats.create({
        username:new_username,
        chats:arr
    })
    arr=[]
    // console.log("succ")

})


module.exports=CreateUserrouter;


