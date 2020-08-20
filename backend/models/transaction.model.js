const mongoose=require('mongoose');

const Schema=mongoose.Schema;

const transactionSchema=new Schema({
userId:{
    type:String,
    required:true,
    trim:true

},
transactionTitle:{
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
transactionDate:{
    type:Date,
    required:true,
}
});

const Transaction=mongoose.model('Transaction',transactionSchema);
module.exports=Transaction;