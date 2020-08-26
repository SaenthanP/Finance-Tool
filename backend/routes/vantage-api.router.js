const router = require('express').Router();
const axios = require('axios');

router.post('/getExchangeRate', async (req, res) => {
    const currencyFrom=req.body.currencyFrom;
    const currencyTo=req.body.currencyTo;
 
  const apiRes = await axios.get('https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency='+currencyFrom+'&to_currency='+currencyTo+'&apikey='+process.env.VANTAGE_KEY)
    .then(res => { return res });

  return res.json(apiRes.data);

});

router.post('/getCryptoRating', async (req, res) => {
    const currencyName=req.body.currencyName;

 
  const apiRes = await axios.get('https://www.alphavantage.co/query?function=CRYPTO_RATING&symbol='+currencyName+'&apikey='+process.env.VANTAGE_KEY)
    .then(res => { return res });
    if(apiRes.data.Note){
      return res.status(429).json({ Error: "Too many requests, slow down (one search a minute)"});

    }
    if(apiRes.data["Error Message"]){
      return res.status(422).json({ Error: "Invalid ISO currency code"});
    }
  return res.json(apiRes.data);

});
var cachedData;
var cacheTime;
router.post('/getHistory', async (req, res) => {
    const choice=req.body.choice;

    const currencyFrom=req.body.currencyFrom;
    const currencyTo=req.body.currencyTo;

  var cacheTimeDifference = Date.now() - cacheTime;
  // if (cacheTime && cacheTimeDifference < 300000) {
  //   return res.json(cachedData);
  // }
    const apiRes= await axios.get('https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_'+choice+'&symbol='+currencyFrom+'&market='+currencyTo+'&apikey='+process.env.VANTAGE_KEY)
    .then(res => { return res });
    if(apiRes.data.Note){
      return res.status(429).json({ Error: "Too many requests, slow down (one search a minute)"});

    }
    if(apiRes.data["Error Message"]){
      return res.status(422).json({ Error: "Invalid ISO currency code"});
    }
  cachedData = apiRes.data;
  cacheTime = Date.now();

  return res.json(apiRes.data);

});

module.exports = router;