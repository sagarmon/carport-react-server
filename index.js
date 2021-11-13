const express = require('express');
const { MongoClient } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.bosfk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run() {
    try {
        await client.connect();
        console.log('connected to database');

        //// remove start
        const database = client.db('assignment12db');
        const servicesCollection = database.collection('cars');
        const servicesCollectionExploreCars = database.collection('exploreCars');
        const servicesCollection2 = database.collection('reviews');

        // // GET API
        // app.get('/services', async (req, res) => {
        //     const cursor = servicesCollection.find({});
        //     const services = await cursor.toArray();
        //     res.send(services);
        // });
        // GET API
        app.get('/cars', async (req, res) => {
            const cursor = servicesCollection.find({});
            const cars = await cursor.toArray();
            res.send(cars);
        });
        //// remove end

        // GET API
        app.get('/exploreCars', async (req, res) => {
            const cursor = servicesCollectionExploreCars.find({});
            const cars = await cursor.toArray();
            res.send(cars);
        });


        ////
        // POST API for Add a service
        app.post('/addaservice', async (req, res) => {
            const service = req.body;
            console.log('hit the post api', service);

            // const service = {
            //     "name": "New York Cit",
            //     "description": "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers.",
            //     "img": "https://i.ibb.co/DkMC5Hd/ny-city.png"
            // }

            const result = await servicesCollection.insertOne(service);
            console.log(result);
            res.json(result);
        });
        ////

        ////
        // POST API for place an order
        app.post('/placeorder', async (req, res) => {
            const order = req.body;
            console.log('hit the post api', order);

            // const service = {
            //     "name": "New York Cit",
            //     "description": "New York City comprises 5 boroughs sitting where the Hudson River meets the Atlantic Ocean. At its core is Manhattan, a densely populated borough that’s among the world’s major commercial, financial and cultural centers.",
            //     "img": "https://i.ibb.co/DkMC5Hd/ny-city.png"
            // }

            const result = await servicesCollection2.insertOne(order);
            console.log(result);
            res.json(result);
        });
        ////





        // GET Single Service
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            console.log('getting specific service', id);
            const query = { _id: ObjectId(id) };
            const service = await servicesCollection.findOne(query);
            res.json(service);
        })
    }
    finally {
        // await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Running Assignment 12');
});

app.listen(port, () => {
    console.log('Running Assignment 12 on port', port);
});