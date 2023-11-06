import express from "express";
import cors from 'cors';
import fs from "fs";
import path from "path";


const app=express();




const corsOptions = {
      origin: 'http://localhost:5173',  // Whitelist specific origins
      methods: 'GET,POST,DELETE,PUT,SEARCH', // Allow specific HTTP methods
      allowedHeaders: 'Content-Type,Authorization', // Allow specific headers
};

 app.use(cors(corsOptions));
 app.use(express.json());
 app.use(express.urlencoded({
    extended : true
                        })
       );

       //get
app.get("/",(req,res)=>{
    res.send("Welcome")
})


       //read
app.get("/data",(req,res)=>{    
    fs.promises.readFile(path.resolve("data.json"),{ encoding: 'utf8' }).then((data)=>{
        
              res.send(data)
     })
 })


         //create
app.post("/add",(req,res)=>{
        //  console.log(req.body,"body")
    fs.promises
    .writeFile(path.resolve("data.json"),JSON.stringify(req.body.newData,undefined,2))
    .then((data)=>{
        
          res.send(`Added new ${JSON.stringify(req.body.newEmploee,undefined,2)}`)
    
     }) 
  })
             //delete
app.delete("/data/:id",(req,res)=>{
    //  console.log(req.params.id,"id")
     fs.promises.readFile(path.resolve("data.json"),{ encoding: 'utf8' }).then((data)=>{
        
         const newData=JSON.parse(data).filter((emp)=>emp.id!==req.params.id)
            fs.promises.writeFile(path.resolve("data.json"),JSON.stringify(newData,undefined,2))
            .then((data)=>{
                res.send(`Deleted emploee with id ${req.params.id}`)
         })
     }) 
 })

           

                //update

 app.put("/data/:id",(req,res)=>{
    
    fs.promises.readFile(path.resolve("data.json"),{ encoding: 'utf8' }).then((data)=>{
        
        const newData=JSON.parse(data);
        newData.forEach(emp => {
            if(emp.id===req.params.id){
                emp.name=req.body.name;
                emp.age=req.body.age;
                emp.occupation =req.body.occupation
            }
        });
            //  console.log(newData,"editedDta")
           fs.promises.writeFile(path.resolve("data.json"),JSON.stringify(newData,undefined,2))
           .then((data)=>{
               res.send(`Edited emploee ${req.body}`)
        })
    }) 

 })
app.listen(3001,()=>{
    console.log("SERVER RUN")
})