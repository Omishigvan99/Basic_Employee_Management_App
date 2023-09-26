const express = require("express")
const homeroute = require("./routes/homeroute")
const mongoose = require("mongoose")
const session=require("express-session")
const sessionStore=require("connect-mongo")
const {registeruser}=require("./controllers/login_and_signup")
const {passport}=require("./controllers/passport")
//import dotenv module for using env file variables
require("dotenv").config()

// Connecting to database

const uri = "mongodb+srv://Omkar99:test1234@cluster0.wzol3.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then((result) => {
    console.log("Connected to database")
    //listening on port 9999
    app.listen(9999, () => {
        console.log("Server Started at port 9999")
    })

}).catch((err) => {
    console.log(err)
})

//creating app
const app = express()

//Setting up view engine
app.set("view engine", "ejs")


app.use(express.urlencoded({extended:true})) //important statement which returns a middleware that allows us to use post method data

//setting public folder
app.use("/", express.static("css"))
app.use("/Home", express.static("css"))
app.use("/About", express.static("css"))
app.use("/Support", express.static("css"))
app.use("/Home/Read", express.static("css"))

app.use("/", express.static("images"))
app.use("/Home", express.static("images"))
// app.use("/About",express.static("images"))
// app.use("/Support",express.static("images"))
// app.use("/Home/Read",express.static("images"))

// app.use("/Home",express.static("public/css"))

//creating Session Store

const sessionStorage=new sessionStore({
    mongoUrl:process.env.DB_STRING,
    collectionName:"Emp_Session"
})

app.use(session({
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    store:sessionStorage,
    cookie:{
        maxAge:1000 * 60 * 60 * 12
    }
}))

//initializing passport for the app
app.use(passport.initialize())
app.use(passport.session())

app.get("/", (req, res) => {
    res.render("login")
})

app.get("/login",(req,res)=>{
    res.redirect("/")
})

app.get("/register",(req,res)=>{
    res.render("register")
})

app.post("/saveuser",registeruser)

app.post("/authenticate",passport.authenticate('local',{successRedirect:'/Home',failureRedirect:"/register",successFlash:true,failureFlash:true}))

// //debugger for passport session and user
// app.use((req,res,next)=>{
//     console.log(req.session)
//     console.log(req.user)
//     next()
// })

app.use('/Home', homeroute)

app.get("/About", (req, res) => {
    res.render("about")
})

app.get("/Support", (req, res) => {
    res.render("support")
})

app.get("/logout",(req,res)=>{
    req.logOut()
    res.redirect("/login")
})


app.use((req, res) => {
    res.status(404).render("404")
})