const express = require("express")
const app = express()

const users = [express.json()]

app.get("/users", (req, res) => {
    res.json(users)
})

app.post ("/users", (req, res) => {
    const user = { name: req.body.name, password: req.body.password  }
    users.push(user)
    res.status(201).send()
})
  
app.listen(3000)