const userFile= 'data/users.json'
import {promises as fs} from 'fs'

export default async function verification(req, res, next){
    const body = req.body
    const data = JSON.parse(await fs.readFile(userFile, "utf8"))
    let flag =false
    data.forEach(user => {
        if (user.username== body.username && user.password == body.password){
            console.log('Login approved');
            res.status(200)
            flag = true
            
            next()
        }
    });
    if (!flag){
    throw new Error("Eccess denied");
    }
}