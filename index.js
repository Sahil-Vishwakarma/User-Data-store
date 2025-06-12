const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/userModel');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req, res) => {    
    res.render("index");
})

app.post('/register', async (req, res) => {
    const { name, email, image } = req.body;
    await userModel.create({name, email, image})
    res.redirect('/read');
})

app.get('/read', async (req, res) => {  
    let users = await userModel.find();
    res.render("view", { users: users });
})

app.get('/delete/:id', async (req, res) => {  
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect("/read");
})

app.get('/edit/:id', async (req, res) => {  
    let user = await userModel.findOne({_id: req.params.id});
    res.render("edit", { user: user });
})

app.post('/update/:id', async (req, res) => {  
    let {name, email, image} = req.body;
    let user = await userModel.findOneAndUpdate({_id: req.params.id}, {
        name, email, image });
    res.redirect("/read");
})


app.listen(3000);
