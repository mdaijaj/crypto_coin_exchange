const express = require('express')
const app = express()
const PORT = process.env.PORT || 5000;
const bodyParser= require('body-parser')

app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())


let routes=require('./routes/index')
app.use('/', routes);


app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});