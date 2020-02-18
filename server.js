const express = require("express")
const app = express()
const bcryptjs = require('bcryptjs')

app.use(express.json())

var users = []

app.get("/users", (req, res) => {
    res.json(users).send()
})

app.post("/users", async (req, res) => {

    try {
        const hashedPassword = await bcryptjs.hash(req.body.password, 10)
        const user = { name: req.body.name, password: hashedPassword }
        users.push(user)
        res.status(201).send()
    } catch {
        res.status(500).send()
    }

})

app.post("/users/login", async (req, res) => {
    const user = users.find(user => user.name == req.body.name)
    if (user == null) {
        return res.status(400).send("cannot find user")
    }
    try {
        if (await bcryptjs.compare(req.body.password, user.password)) {
            res.send("Success")
        } else {
            res.send("Not allowed")
        }
    } catch {
        res.status(500).send()
    }
})

app.listen(3000)