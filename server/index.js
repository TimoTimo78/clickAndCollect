// express listen function to connect the receiver
const PORT = 8080
// import module export
const express = require('express');
const cors = require('cors')
// import module function
const app = express()
const mongoDBClient = require('./mongoClient')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schemas/index.js')
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello ExpressWorld, the front is on port 3000! 🎉')
})

// API Rest 
const Product = require('./models/product');
app.get('/products', async (req, res) => {
    const products = await Product.find({})
    try {
        res.send(products)
    } catch(e) {
        res.status(500).send(err)
    }
})

app.get('/products/:category', async (req, res) => {
    const category = req.params.category
    const products = await Product.find({ category : category})
    try {
        res.send(products)
    } catch(e) {
        res.status(500).send(err)
    }
})

// GraphQL UI
app.use(
    '/graphql',
    graphqlHTTP({
      schema: schema, 
      graphiql: true,
    }),
  );
  

app.listen(PORT, () => {
    console.log(`Server up and running on port http://localhost:${PORT} 🎉`)
    mongoDBClient.initialize()
})