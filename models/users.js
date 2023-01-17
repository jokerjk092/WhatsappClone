const mongoose=require('mongoose')
const User_info=new mongoose.Schema({
  username:{
    type:String,
    unique: true,
  },
  password:String,
  logo:String

});
module.exports= mongoose.model("whatsapp_user",User_info);
