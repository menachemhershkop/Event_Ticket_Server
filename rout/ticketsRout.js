import { log } from 'console'
import express from 'express'
import {promises as fs} from 'fs'
export const ticketsRout= express()
ticketsRout.use(express.json())

const eventFile='data/events.json'
const receiptFile = 'data/receipts.json'

ticketsRout.post('/tickets/buy', async (req, res)=>{
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
                    res.status(400).send("Not enough tickets")
                }

                flag =true    
            }
        })
    }
    // console.log(event);
    else{
        res.status(400).send("Bad Request")
    }
    if (!flag){
        res.status(400).send("Invalid event name. Try again.")
    }
}
    catch(error){
        console.log(error);
        
    }

})