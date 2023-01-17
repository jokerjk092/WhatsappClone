const mongoose=require('mongoose')
const User_chats=new mongoose.Schema({
  username:{
    type:String
  },
  chats:Array

});
module.exports= mongoose.model("whatsapp_chats",User_chats);
