const express=require('express');
const mongoose=require('mongoose')
const User_info=require('../models/users')
const User_chats=require('../models/userChats')
const CreateUserrouter=express.Router()
CreateUserrouter.post('/create_message',async (req,res)=>{
    const {user,other_user,message,time}=req.body;

    
    
    User_chats.find({username:user},async function (err, allDetails) {

        if(err)
        {
            console.log(err)
        }
        else{
            
            let arr=[];
            let chats_array=[];
            let found=false;

            allDetails[0]?.chats?.map((profile)=>{
                if(profile.username===other_user){
                    found=true;
                    profile.chats.map((message)=>arr.push(message));
                    arr.push({
                        username:user,
                        other_user:other_user,
                        message:message,
                        time:time,
                        sent:true
                    })
                }
                else
                chats_array.push(profile)
            })
            if(found==false)
            {
                arr.push({
                    username:user,
                    other_user:other_user,
                    message:message,
                    time:time,
                    sent:true
                })
            }

            const new_entry={username:other_user,chats:arr}
            chats_array.push(new_entry)
            // console.log(arr)

            try {
                await  User_chats.updateOne({username:user},{chats:chats_array})
                // console.log("success")
                chats_array=[];
            } catch (error) {
                console.log(error)
            }

            
        }
       
    })


    User_chats.find({username:other_user},async function (err, allDetails) {

        if(err)
        {
            console.log(err)
        }
        else{
            
            let arr=[];
            let chats_array=[];
            let found=false;

            allDetails[0]?.chats?.map((profile)=>{
                if(profile.username===user){
                    found=true;
                    profile.chats.map((message)=>arr.push(message));
                    arr.push({
                        username:user,
                        other_user:other_user,
                        message:message,
                        time:time,
                        sent:false
                    })
                }
                else
                chats_array.push(profile)
            })
            if(found==false)
            {
                arr.push({
                    username:other_user,
                    other_user:user,
                    message:message,
                    time:time,
                    sent:false
                })
            }

            const new_entry={username:user,chats:arr}
            chats_array.push(new_entry)
            // console.log(arr)

            try {
                await  User_chats.updateOne({username:other_user},{chats:chats_array})
                // console.log("success")
                chats_array=[];
            } catch (error) {
                console.log(error)
            }

            
        }
       
    })



})


module.exports=CreateUserrouter;


