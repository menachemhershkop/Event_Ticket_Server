import express from 'express'
import {promises as fs} from 'fs'
export const eventRout= express()
eventRout.use(express.json())
const eventFile='data/events.json'


eventRout.post('/', async (req, res)=> {
    const body = req.body
    const data = JSON.parse(await fs.readFile(eventFile, "utf8"))
    try{
        if ('eventName' in body && 'ticketsForSale' in body){
            data.push({eventName:body.eventName, ticketsForSale:body.ticketsForSale, createsBy:body.username})
            console.log(data);
            fs.writeFile(eventFile, JSON.stringify(data));
            res.status(201).send({
  "message": "Event created successfully"
}
)
        }
    else{
        res.status(400).send("Incorrect field")
    }
        
    }
     catch(error){
        res.status(400).send("Bed Request")
        
     }   
})