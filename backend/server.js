const express=require('express');
const cors=require('cors');
const mongoose=reqiure('mongoose');
const bodyparser=require('body-parser');
const passport=require('passport');

require('dotenv').config();

const app=express();
const port=process.env.PORT||5000;

app.use(cors());
app.use(bodyparser.json());
app.use(passport.initialize());

require('./config/passport')(passport);


const uri=process.env.ATLAS_URI;
mongoose.connect(uri,{useNewUrlParser:true, useUnifiedTopology:true });
const connection=mongoose.connection;
connection.openUri('open',()=>{
    console.log("Mongo database connection established successfully");
});
//https://stackoverflow.com/questions/36623007/node-js-passport-checking-if-the-user-had-already-logged-in


/*
Only put ,passport.authenticate('jwt',{session:false}) for routes that have to be secured
*/
const usersRouter=require('./routes/users');
app.use('/api/users',usersRouter);


app.listen(port,()=>{
    console.log('Server is running on port: '+port);
});
