const express = require("express")
const app = express()
const bcryptjs = require('bcryptjs')
const myModule = require('./myModule');

app.get("/", (req, res) => {
  res.sendFile(__dirname + "\\index.html")

})

app.use(express.json())
app.use(express.urlencoded())
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');




app.get('/kontakt', (req, res) => {
  res.sendFile(__dirname + "\\kontakt.html")
})
app.get('/style', (req, res) => {
  res.sendFile(__dirname + "\\style.css")
})
app.get('/tradar', (req, res) => {
  res.sendFile(__dirname + "\\tradar.html")
})
app.get('/topic', async (req, res) => {
  var data = await myModule.getThreads()
  res.render('topic.ejs', { data });
})
app.get('/test', async (req, res) => {
  var data = await myModule.getThreads()
  res.render('test.ejs', { data });
})
app.get('/index', (req, res) => {
  res.sendFile(__dirname + "\\index.html")
})

app.post("/register", async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  const hashedPassword = await bcryptjs.hash(req.body.password, 10)  
  let password = hashedPassword;
  let birth = req.body.birth;
  console.log("email: " + email + " name: " + name + " password: " + password);
  myModule.accReg(email, name, password, birth);
  res.redirect('/kontakt');
});

app.post("/tradar", (req, res) => {
  let name = req.body.name;
  let topic = req.body.topic;
  let text = req.body.message;
  console.log("name: " + name + " topic: " + topic + " text: " + text);
  myModule.postThread(name, topic, text);
  res.redirect('/topic');
});



app.post("/login", async (req, res) => {
    const user = await myModule.getAcc(req.body.name)
    console.log(user.password)
    console.log(req.body.password)
    if (user == null) {
        return res.status(400).send("cannot find user")
    }
    try {
        if (await bcryptjs.compare(user.password, req.body.password)) {
          console.log("success")
            res.redirect("/")
        } else {
            res.send("Not allowed")
        }
    } catch {
      console.log("u fail")
        res.status(500).send()
    }
})

app.listen(3000)