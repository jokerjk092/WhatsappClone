const express=require('express');
const bodyparser = require('body-parser')
const mongoose=require('mongoose')
const axios=require('axios')
const cors=require('cors')
const path=require('path')
const Pusher = require("pusher");
//const { Server }=require('socket.io')


const app=express();
app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
let port=process.env.PORT || 5000;

const http = require('http').Server(app);
app.use(express.static(path.join(__dirname+"/public")))



const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods:["GET","POST"]
    }
});

io.on("connection",(socket)=>{
    console.log("connection")


    socket.on("send_message",(data)=>{
        console.log("send_message")
        socket.broadcast.emit("received",data)
    })

})



const URI="mongodb+srv://admin-sumit:sumit123@cluster0.jgi5fgx.mongodb.net/Whatsapp_db?retryWrites=true&w=majority"
mongoose.set("strictQuery", false);
const mongoD=async()=>{

        await mongoose.connect(URI,{useNewUrlParser:true},async(err,result)=>{
            if(err) console.log(err)
            else
            console.log('success')
        })
}
mongoD();





app.use(express.json())
app.use("/api",require('./routes/GetUser'))
app.use("/api",require('./routes/CheckUser'))
app.use("/api",require('./routes/CreateUser'))
app.use("/api",require('./routes/GetChats'))
app.use("/api",require('./routes/CreateMessage'))
app.use("/api",require('./routes/GetMessages'))




app.get("/",(req,res)=>{
    res.send("hello");
})

// app.listen(port,()=>{
//     console.log('live')
// })
http.listen(port, () => console.log(`Listening on port ${port}`));

// const pusher = new Pusher({
//   appId: "1537090",
//   key: "af19d8ae45a731e97b2b",
//   secret: "2f2592a21090d656f2aa",
//   cluster: "ap2",
//   useTLS: true
// });


// const db=mongoose.connection
// db.once('open',()=>{
//     console.log("cnnected")

//     const msgCollection=db.collection("whatsapp_chats");
//     const changeStream=msgCollection.watch();
//     changeStream.on('change',(change)=>{
       
//        if(change.operationType==='update')
//        {
//         const messageDetails=change.updateDescription;
        
//         pusher.trigger('messages','updated',{
//             chat:messageDetails?.updatedFields?.chats
//         });
//        }
//        else{
//         console.log('err')
//        }
//     })
// })