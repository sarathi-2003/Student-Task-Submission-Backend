const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const studentRoute = require('./Routes/student');
const mentorRoute = require('./Routes/mentor');
const adminRoute = require('./Routes/admin');
const authRoute = require('./Routes/auth');
const cors = require("cors");
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('Database connection successful'))
.catch((error)=>console.log(error));

app.use(express.json());

app.use(
    cors({
        origin: "*",
    })
);

app.get('/',(request,response)=>{
    response.send("server is running")
});

app.use('/api/auth',authRoute);
app.use('/api/student/',studentRoute);
app.use('api/mentor', mentorRoute);
app.use('api/admin',adminRoute);

app.listen(process.env.PORT || 3000, ()=>{
    console.log('server running in !');
})