const express = require("express");

const db = require("../data/dbConfig.js");

const server = express();
server.use(express.json());
// general error

server.use((req,res,next,err)=>{
    console.log(err)
    res.status(500).json({message:'Something wrong'})
    next()
  })


server.get('/:id', async (req,res,next)=>{
    let id = req.params.id
  

    try{
        const account = await db.select("*").from("accounts").where("id",id)
         res.status(200).json(account[0])
     
    }
    catch(err){next(err)}
})

server.post('/',(req,res,next)=>{

    try{

    }
    catch(err){next(err)}
})

server.put('/:id',(req,res,next)=>{

    try{

    }
    catch(err){next(err)}
})

server.delete('/:id',(req,res,next)=>{

    try{

    }
    catch(err){next(err)}
})

module.exports = server;
