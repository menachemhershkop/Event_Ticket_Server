import { log } from 'console'
import express from 'express'
import {promises as fs} from 'fs'
import verification from '../auth.js'
export const ticketsRout= express()
ticketsRout.use(express.json())

const eventFile='data/events.json'
const receiptFile = 'data/receipts.json'

ticketsRout.post('/tickets/buy', verification,async (req, res)=>{
    const body = req.body
    const event = JSON.parse(await fs.readFile(eventFile, "utf8"))
    const receipts = JSON.parse(await fs.readFile(receiptFile, "utf8"))
    let flag = false
    try{
        if ('eventName' in body && 'quantity' in body){
            event.forEach((eve)=> {if (eve.eventName== body.eventName){
                if (eve.ticketsForSale> body.quantity){
                    eve.ticketsForSale -= body.quantity
                    receipts.push({username:body.username, eventName:body.eventName, ticketsBought:body.quantity})
                    fs.writeFile(eventFile, JSON.stringify(event));
                    fs.writeFile(receiptFile, JSON.stringify(receipts));
                    res.send({"message": "Tickets purchased successfully"})
                }
                else{
                    res.status(400).send("Not enough tickets");
                }

                flag =true;
            }
        })
    }
    else{
        res.status(400).send("Bad Request");
    }
    if (!flag){
        res.status(400).send("Invalid event name. Try again.");
    }
}
    catch(error){
        console.log(error);
        
    }

})

ticketsRout.get('/:username/summary', async (req, res)=>{
    const param = req.params;
    const receipts = JSON.parse(await fs.readFile(receiptFile, "utf8"))
    let total =0
    let count =0
    let event = [] 
    receipts.forEach(recipt => {
        if (recipt.username== param.username){
            event.push(recipt.eventName)
            total += recipt.ticketsBought
            count ++
        }
    })
    res.send({
  "totalTicketsBought": total,
  "events": event,
  "averageTicketsPerEvent": total/count
}
)
})