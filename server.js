const express = require("express")
const app = express()
const bcryptjs = require('bcryptjs')
const myModule = require('./myModule');

app.get("/", (req, res) => {
  res.render("index.ejs")
})  

app.use(express.json())
app.use(express.urlencoded())

app.get('/', (req, res) => {
  res.sendFile(__dirname + "\\index.html")
})
app.get('/kontakt', (req, res) => {
  res.sendFile(__dirname + "\\kontakt.html")
})
app.get('/style', (req, res) => {
  res.sendFile(__dirname + "\\style.css")
})
app.get('/tradar', (req, res) => {
  res.sendFile(__dirname + "\\tradar.html")
})
app.get('/topic', (req, res) => {
  res.sendFile(__dirname + "\\topic.html")
})
app.get('/index', (req, res) => {
  res.sendFile(__dirname + "\\index.html")
})

app.post("/register", (req, res) =>
{
  let email=req.body.email;
  let name=req.body.name;
  let password=req.body.password;
  console.log("email: "+email+" name: "+name+" password: "+password);
  myModule.accReg(email,name,password);
  res.redirect('/kontakt');
});

//var users = []
// app.get("/users", (req, res) => {
//     res.json(users).send()
// })

// app.post("/users", async (req, res) => {

//     try {
//         const hashedPassword = await bcryptjs.hash(req.body.password, 10)
//         const user = { name: req.body.name, password: hashedPassword }
//         users.push(user)
//         res.status(201).send()
//     } catch {
//         res.status(500).send()
//     }

// })

// app.post("/users/login", async (req, res) => {
//     const user = users.find(user => user.name == req.body.name)
//     if (user == null) {
//         return res.status(400).send("cannot find user")
//     }
//     try {
//         if (await bcryptjs.compare(req.body.password, user.password)) {
//             res.send("Success")
//         } else {
//             res.send("Not allowed")
//         }
//     } catch {
//         res.status(500).send()
//     }
// })

app.listen(3000)