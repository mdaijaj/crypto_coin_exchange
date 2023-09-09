
const Crypto_exchange = require('../model/crypto_exechange.schema');
const Crypto_logo = require('../model/crypto_logo.schema');
const axios = require('axios');


const createCryptoExechange = async (req, res) => {

    const removeData = await Crypto_exchange.deleteMany();
    const removeData2 = await Crypto_logo.deleteMany();
    const apiUrl1 = 'https://rest.coinapi.io/v1/exchanges';
    const apiUrl2 = 'https://rest.coinapi.io/v1/exchanges/icons/32';
    const apiKey = 'FDAB8705-CEAA-4A23-8A5B-6CC30B8D44D9'; // Replace with your API token
    try {
        const headers = {
            'X-CoinAPI-Key': apiKey,
        };
        const response = await axios.get(apiUrl1, { headers });
        const response2 = await axios.get(apiUrl2, { headers });

        if (response.status === 200 && response2.status === 200) {
            const bulkData = response.data;
            const crypto_logoData = response2.data;

            const result = await Crypto_exchange.insertMany(bulkData);
            const result2 = await Crypto_logo.insertMany(crypto_logoData);
            return res.status(201).send({
                message: "bulk crypto exechange data add successfully",
                statusCode: 201,
                data: result, result2
            });
        } else {
            console.error('Failed to fetch data from the API');
        }
    } catch (err) {
        console.log(err.message)
        res.status(200).send({ message: "there is someting error..", error: err.message });
    }
}


// const getExechangeCryptolist = async (req, res) => {
//     const page = parseInt(req.query.page) || 1;
//     const pageSize = parseInt(req.query.pageSize) || 100;
//     try {
//         // const totalItems = await Crypto_exchange.countDocuments();
//         // const totalPages = Math.ceil(totalItems / pageSize);
//         const crypto_data = await Crypto_exchange.find({ isActive: true })
            // .skip((page - 1) * pageSize)
            // .limit(pageSize);
//         if (crypto_data) {
//             return res.send({
//                 page,
//                 pageSize,
                // totalItems,
                // totalPages,
//                 message: "get all data sucessfully!",
//                 data: crypto_data,
//             })
//         } else {
//             return res.send({ message: "data not found" })
//         }
//     }
//     catch (err) {
//         console.log(err.message)
//     }
// }


const getExechangeCryptolist = async (req, res) => {
    try {
        const pipeline = [
            {
                $lookup: {
                    from: 'Crypto_logo', 
                    localField: 'exchange_id', 
                    foreignField: 'exchange_id',
                    as: 'cryptoInfo',
                },
            },
        ];
        const result = await Crypto_exchange.aggregate(pipeline).exec()
        if (result) {
            return res.send({
                message: "get all data sucessfully!",
                data: result,
            })
        } else {
            return res.send({ message: "data not found" })
        }
    }
    catch (err) {
        console.log(err.message)
    }
}

module.exports = {
    createCryptoExechange,
    getExechangeCryptolist
}
