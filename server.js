const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const productsRouter = require('./controller/products')
const app = express()

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/api/v1', productsRouter)

app.listen(3000, () => {
    console.log('listen to port 3000')
})