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
        const account = await db.first().from("accounts").where("id",id)
        if(account){
            res.status(200).json(account)
        } else{
            res.status(404).json({message: `No account exist with id ${id}`})
        }
        
     
    }
    catch(err){next(err)}
})

server.post('/',async (req,res,next)=>{
    

    try{
        let payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        if(!payload.name || !payload.budget){
            return res.status(404).json({message: 'messing name or budget'})
        }
        const id = await db.insert(payload).into('accounts')
        let account  = await db.first().from('accounts').where("id",id)
        res.status(201).json(account)

    }
    catch(err){next(err)}
})

server.put('/:id', async (req,res,next)=>{

    try{
        let payload = {
            name: req.body.name,
            budget: req.body.budget
        }

        if(!payload.name || !payload.budget){
            return res.status(404).json({message: 'messing name or budget'})
        }
        await db('accounts').update(payload).where("id",req.params.id)
        let updatedAccount  = await db.first().from('accounts').where("id",req.params.id)
        res.json(updatedAccount)
    }
    catch(err){next(err)}
})

server.delete('/:id', async (req,res,next)=>{
    

    try{
        let id  = req.params.id
        await db('accounts').where("id",id).del()
        res.send({message:`account with id ${id} is deleted successfully`})
    }
    catch(err){next(err)}
})

module.exports = server;
