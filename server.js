const express = require("express")
const app = express()
const bcryptjs = require('bcryptjs') 

app.use(express.json())

var users = []

app.get("/users", (req, res) => {
    res.json(users).send()
})

app.post ("/users", async (req, res) => {

    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcryptjs.hash(req.body.password, salt)
        console.log(salt)
        console.log(hashedPassword)
        const user = { name: req.body.name, password: hashedPassword  }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send
    }

})
  
app.listen(3000)