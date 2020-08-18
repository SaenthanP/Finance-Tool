let Income = require('../models/income.model');

const router = require('express').Router();

const axios = require('axios');





router.get('/getHistory', async (req, res) => {
    const transactions = await Income.find({ userId: req.user._id });

 
  return res.json(transactions);

});

router.post('/addTransaction', async (req, res) => {
    let { transactionName, transactionType,transactionAmount,date } = req.body;
  
  
   
    const newTransaction = new Income({
        userId: req.user._id,
        transactionName,
        transactionType,
        transactionAmount,
        date,
    });
    newTransaction.save()
      .then(transaction => res.json(transaction))
      .catch(err => res.status(400).json({ Error: err }));
});

router.delete('/deleteTransaction/:id', async (req, res) => {
    const transactionToDelete = await Income.findOne({ _id: req.params.id });
    if (!transactionToDelete) {
        return res.status(400).json({ Error: "Transaction not found" });
      }
  
   
      const deletedTransaction = await Income.findByIdAndDelete(transactionToDelete._id);
      const transactions = await Review.find({userId: req.user._id });
      return res.json(transactions);
});

router.put('/editTransaction', async (req, res) => {
    let { transactionName, transactionType,transactionAmount,date,_id } = req.body;
  
  
   
    const updatedTransaction = new Income({
        userId: req.user._id,
        transactionName,
        transactionType,
        transactionAmount,
        date,
    });

    updatedTransaction.update({_id:_id})
      .then(transaction => res.json(transaction))
      .catch(err => res.status(400).json({ Error: err }));
});




module.exports = router;