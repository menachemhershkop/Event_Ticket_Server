import express from 'express'
import {promises as fs} from 'fs'
import { userRout } from './rout/userRout.js'
import { eventRout } from './rout/eventRout.js'
import { ticketsRout } from './rout/ticketsRout.js'
const app = express()
const port = 3000
app.use(express.json())

app.listen(port, () => {
console.log(`server listening on port ${port}`)
})

app.use('/user', userRout);
app.use('/creator/event', eventRout)
app.use('/users', ticketsRout)