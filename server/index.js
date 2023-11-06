import express from "express";
import cors from 'cors';

import fs from "fs";
import path from "path";


const app=express();




const corsOptions = {
  origin: 'http://localhost:5173', // Whitelist specific origins
  methods: 'GET,POST,DELETE,PUT,SEARCH', // Allow specific HTTP methods
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
app.post("/add",(req,res)=>{
    console.log(req.body,"body")
    fs.promises
    .writeFile(path.resolve("data.json"),JSON.stringify(req.body.newData,undefined,2))
    .then((data)=>{
        
        res.send("data recieved")
    
        }) 
})

app.delete("/data/:id",(req,res)=>{
    console.log(req.params.id,"id")
    

     
    fs.promises.readFile(path.resolve("data.json"),{ encoding: 'utf8' }).then((data)=>{
        
         const newData=JSON.parse(data).filter((emp)=>emp.id!==req.params.id)
            fs.promises.writeFile(path.resolve("data.json"),JSON.stringify(newData,undefined,2))
            .then((data)=>{
                res.send("data deleted")
            })
        }) 
 })
app.listen(3001,()=>{
    console.log("SERVER RUN")
})