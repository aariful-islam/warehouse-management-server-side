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

        app.get('/product/:id',async(req,res)=>{
            const id =req.params.id;
            const query={_id:ObjectId(id)}
            const result= await productCollection.findOne(query);
            res.send(result);
        });
        

        app.delete('/product/:id',async(req,res)=>{
            const id =req.params.id;
            const query={_id:ObjectId(id)}
            const result= await productCollection.deleteOne(query);
            res.send(result);
        });
        app.post('/product', async(req, res) =>{
            const newItem = req.body;
            const result = await productCollection.insertOne(newItem);
            res.send(result);
        });

        app.get('/product', async (req, res) => {
           
            const email = req.query.email;
            console.log(email)
            
                const query = { email: email };
                const cursor = productCollection.find(query);
                const orders = await cursor.toArray();
                res.send(orders);
            
        })


        app.put('/product/:id', async(req, res) =>{
            const id = req.params.id;
            const updatedQuantity = req.body;
            const filter = {_id: ObjectId(id)};
            const options = { upsert: true };
            const updatedDoc = {
                $set: {
                    quantity: updatedQuantity.total
                   
                }
            };
            const result = await productCollection.updateOne(filter, updatedDoc, options);
            res.send(result);

        })

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