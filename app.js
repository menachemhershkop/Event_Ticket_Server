import express from 'express'
import {promises as fs} from 'fs'
import { userRout } from './rout/userRout.js'
const app = express()
const port = 3000
app.use(express.json())

app.listen(port, () => {
console.log(`server listening on port ${port}`)
})

app.use('/user', userRout);