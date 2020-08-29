let Transaction = require('../models/transaction.model');

const router = require('express').Router();


router.get('/getHistory', async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  return res.json(transactions);
});

router.post('/addTransaction', async (req, res) => {
  try {
    let { transactionTitle, transactionAmount, transactionDate, transactionType } = req.body;
    if (!transactionTitle || !transactionType || !transactionAmount || !transactionDate) {
      return res.status(400).json({ Error: "Not all fields have been entered" });

    }

    const newTransaction = new Transaction({
      userId: req.user._id,
      transactionTitle,
      transactionType,
      transactionAmount,
      transactionDate,
    });

    newTransaction.save()
      .then(transaction => res.json(transaction))
      .catch(err => res.status(400).json({ Error: err }));
  } catch (err) {
    return res.status(500).json({ Error: err });

  }

});

router.delete('/deleteTransaction/:id', async (req, res) => {
  const transactionToDelete = await Transaction.findOne({ _id: req.params.id });
  if (!transactionToDelete) {
    return res.status(400).json({ Error: "Transaction not found" });
  }


  const deletedTransaction = await Transaction.findByIdAndDelete(transactionToDelete._id);
  const transactions = await Transaction.find({ userId: req.user._id });
  return res.json(transactions);
});



router.put('/editTransaction/:id', async (req, res) => {
  let { transactionTitle, transactionType, transactionAmount, transactionDate } = req.body;
  if (!transactionTitle || !transactionType || !transactionAmount || !transactionDate) {
    return res.status(400).json({ Error: "Not all fields have been entered" });
  }
  // console.log(_id+" "+transactionTitle+" "+transactionAmount+" "+transactionDate+" "+transactionType);

  await Transaction.findByIdAndUpdate({_id: req.params.id}, req.body
    
  )
    .then(transaction => res.json(transaction))
    .catch(err => res.status(400).json({ Error: err }));

});

module.exports = router;