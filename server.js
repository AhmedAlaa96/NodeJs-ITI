const express = require('express');
const userRouter = require('./routes/users');
const postRouter = require('./routes/posts');
const reviewRouter = require('./routes/reviews');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const PORT = 3000;
const MONGODB_PATH = "mongodb://localhost:27017/lab2";
mongoose.connect(MONGODB_PATH,(err)=>{
    if(err) console.log(err);
    
});

const app = express();
app.use(express.json());
app.use(cookieParser(process.env.secretkey || "ahmedalaa"));

app.use(express.urlencoded());
app.use("/users",userRouter);
app.use("/posts",postRouter);
app.use("/reviews",reviewRouter);
app.listen(PORT,()=>{
console.log(`I'm listen to port: ${PORT}`);

});