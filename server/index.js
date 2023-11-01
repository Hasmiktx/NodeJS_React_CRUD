import express from "express";
import cors from 'cors';

import fs from "fs";
import path from "path";


const app=express();




const corsOptions = {
  origin: 'http://localhost:5174', // Whitelist specific origins
  methods: 'GET,POST', // Allow specific HTTP methods
  allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
};

app.use(cors(corsOptions));



app.use(express.json());
app.use(express.urlencoded({
    extended : true
}));
app.get("/",(req,res)=>{
    res.send("Welcome")
})
app.get("/data",(req,res)=>{
    fs.promises.readFile(path.resolve("data.json"),{ encoding: 'utf8' }).then((data)=>{
        
        res.send(data)
    
        }) 
        
})
app.listen(3001,()=>{
    console.log("SERVER RUN")
})