const router = require('express').Router();

const axios = require('axios');





router.post('/getExchangeRate', async (req, res) => {
    const currencyFrom=req.body.currencyFrom;
    const currencyToConvertTo=req.body.currencyToConvertTo;
 
  const apiRes = await axios.get('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+currencyFrom+'&to_currency='+currencyToConvertTo+'&apikey='+process.env.API_KEY)
    .then(res => { return res });

  return res.json(apiRes.data);

});

router.post('/getCryptoRating', async (req, res) => {
    const currencyName=req.body.currencyName;

 
  const apiRes = await axios.get('https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol='+currencyName+'&apikey='+process.env.API_KEY)
    .then(res => { return res });

  return res.json(apiRes.data);

});

router.post('/getHistory', async (req, res) => {
    const choice=req.body.choice;

    const currencyFrom=req.body.currencyFrom;
    const currencyTo=req.body.currencyTo;


    const apiRes= await axios.get('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_'+choice+'&symbol='+currencyFrom+'&market='+currencyTo+'&apikey='+process.env.API_KEY)
    .then(res => { return res });


  return res.json(apiRes.data);

});





module.exports = router;