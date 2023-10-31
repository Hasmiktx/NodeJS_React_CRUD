import express from "express";
const app=express();
app.listen(3001,()=>{
    console.log("SERVER RUN")
})
app.get("/",(req,res)=>{
    res.send("Welcome")
})