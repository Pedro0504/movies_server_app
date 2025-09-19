require('dotenv').config();
const authJwt = require('./middleware/authJwt.js')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose')


//Port
const app = express();
const PORT = process.env.PORT ?? 3000;
const JWT_SECRET = process.env.JWT_SECRET;
const cookieSession = require('cookie-session');
//routes
require ("./routes/auth.routes")(app);
require ("./routes/user.routes")(app);

var corsOption = {
    origin:"http://localhost:5173"
}

const upload = multer({dest:'uploads/'});

const userSchema = mongoose.Schema({
    username:String,
    imgUrl: String,
    createdAt: {type:Date, default:Date.now}
})
mongoose.exports = mongoose.model('UserImage', userSchema)

app.use(cors(corsOption));
app.use(express.urlencoded({extended:true}));

app.use(
    cookieSession({
        name:"movies-session",
        keys:["COOKIE_SECRET"],
        httpOnly:true
    })
);



app.listen(PORT, (req,res)=>{
    console.log(`This app is listening in port: ${PORT}`);
})

app.get("/", (req, res)=>{
    res.json({message:"Welcome to the best movie ranking app"});
})



const db = require('./models');
const Role = db.role;

db.mongoose.connect(process.env.MONGO_URI,{
})
.then(()=>{
    console.log('Succesfully connect to MongoDB');
    initial();
})
.catch(err=>{
    console.error("Connection error: ", err);
    process.exit();
});

async function initial(){
    try{
        const count = Role.estimatedDocumentCount();
        if(count===0){
            await new Role({name:"user"}).save();
            console.log("Added 'user' to role collection");

            await new Role({name:"moderator"}).save();
            console.log("Added 'moderator' to role collection");

            await new Role({name: "admin"}).save();
            console.log("Added 'admin' to role collection");
        }
    }
    catch(err){
        console.error("Error initializing roles:", err);
    }
    
}