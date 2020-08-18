const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const incomeSchema=new Schema({
userId:{
    type:String,
    required:true,
    trim:true

},
transactionName:{
    type:String,
    required:true,
    trim:true,
  
},
transactionType:{
    type:String,
    required:true,
    trim:true,
},
transactionAmount:{
    type:Number,
    required:true,
    trim:true,
},
date:{
    type:Date,
    required:true,
}
});

const Income=mongoose.model('Income',incomeSchema);
module.exports=Income;