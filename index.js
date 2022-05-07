const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



// const uri = "mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jozew.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



const uri = "mongodb+srv://dbuser1:U4FmJs0HFZYnml0e@cluster0.5tvog.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        console.log("done")
        await client.connect();
        const productCollection = client.db('laptopWarehouse').collection('laptop');

    

        app.get('/product', async (req, res) => {
            const query = {};
            const cursor = productCollection.find(query);
            const products = await cursor.toArray();
            res.send(products);
        });

        

    }
    finally {

    }
}

run().catch(console.dir);




app.get('/',(req,res)=>{
    res.send("connected")
})
app.listen(port,()=>{
    console.log(port)
})