import express from 'express'
import {promises as fs} from 'fs'
export const userRout= express()
userRout.use(express.json())
const userFile= 'data/users.json'

userRout.post('/register',async (req, res) =>{
    const data = JSON.parse(await fs.readFile(userFile, "utf8"))
    const body = req.body
    let flag = true
    try{
        if('username' in body && 'password' in body && typeof body.username == 'string' && typeof body.password == 'string' ){
    data.forEach(element => {
        if (body.username == element.username){
            flag = false
            return res.status(409).send("Conflict, username already exist...")
        }
    });
    if (flag){
    data.push(body);
    fs.writeFile(userFile, JSON.stringify(data));
    res.status(201).send({
  "message": "User registered successfully" 
}
)
    }
    
}
else{
    res.status(400).send("Missing fields")
}
    }
catch{
    res.status(400).send("Bad Request")
}
})