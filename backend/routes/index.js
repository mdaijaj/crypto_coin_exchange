require('dotenv').config();
const express= require('express')
const router=express()
const product= require('../controller/product.controller') 

router.post('/api/create_cryptoexchange', product.createCryptoExechange)
router.get('/api/get_exechangecryptolist', product.getExechangeCryptolist)

module.exports = router;
