const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const postRouter = require("./routers/postRouter")
const userRouter = require("./routers/userRouter")
const cors = require("cors");
mongoose.set('strictQuery', true);

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname + "/public"))


mongoose.connect(`mongodb+srv://jas1kk:a7vqpR5QO8heRYpG@cluster0.ygicohi.mongodb.net/social_network?retryWrites=true&w=majority`, (error) =>{
    if(error){
    console.log("ERORR", error)
    }else{
        console.log("server started");
        app.use("/posts", postRouter)
        app.use("/users", userRouter)
        app.listen(8080)
    }
});