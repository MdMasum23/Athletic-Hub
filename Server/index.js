const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 3000;


// Middleware:
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://a11-athletic-hub-platform.web.app'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const logger = (req, res, next) => {
    console.log('Inside the logger Middleware');
    next();
};

const verifyToken = (req, res, next) => {
    const token = req?.cookies?.token;
    console.log('Cookie in the Middleware:', token);
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized Access' })
    }

    // verify token
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized Access' })
        }
        req.decoded = decoded;
        // console.log(decoded);
        next();
    })

}

// API:
app.get('/', (req, res) => {
    res.send('Athletic_Hub Is Cooking!')
});

// listener:
app.listen(port, () => {
    console.log(`Athletic_Hub code server is running on port ${port}`)
})


// Mongodb atlas:

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@phero1.w4yidho.mongodb.net/?retryWrites=true&w=majority&appName=PHERO1`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();


        // Collection Build:
        const eventsCollection = client.db('athleticHubDB').collection('events');
        const testimonialsCollection = client.db('athleticHubDB').collection('testimonials');
        const popularSportsCollection = client.db('athleticHubDB').collection('popularSports');
        const bookingCollection = client.db('athleticHubDB').collection('bookings');


        // JWT Token:
        app.post('/jwt', async (req, res) => {
            const userData = req.body;

            const token = jwt.sign(userData, process.env.JWT_ACCESS_SECRET, {
                expiresIn: '2h'
            });

            // set token in the cookies
            res.cookie('token', token, {
                httpOnly: true, // for 
                secure: true, // make sure your site is https hosted
                sameSite: 'None', // to allow cross-origin cookies
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            });

            res.send({ success: true });
        });



        // Athletic Events API:
        app.get('/events', async (req, res) => {
            const cursor = eventsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

            // Get for: Event-details, Update-event,
        app.get('/events/:id', logger, verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) }
            const result = await eventsCollection.findOne(query);
            res.send(result);
        });

            // Featured-Events:
        app.get('/featured-events', async (req, res) => {
            const cursor = eventsCollection.find().sort({ eventDate: 1 }).limit(6);
            const result = await cursor.toArray();
            res.send(result);
        });

            // Manage-Events:
        app.get('/myEvents', logger, verifyToken, async (req, res) => {
            const email = req.query.user_email;
            // console.log("Filter by email:", email);

            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'Forbidden Access' })
            };

            const query = {
                creatorEmail: email
            };
            const result = await eventsCollection.find(query).toArray();
            res.send(result);
        });

            // Book Event:
        app.get('/otherEvents', logger, verifyToken, async (req, res) => {
            const email = req.query.email; // current user email
            const query = { creatorEmail: { $ne: email } }; // $ne = not equal
            const result = await eventsCollection.find(query).toArray();
            res.send(result);
        });

            // Create event
        app.post('/events', logger, verifyToken, async (req, res) => {
            const newEvent = req.body;
            console.log(newEvent);
            const result = await eventsCollection.insertOne(newEvent);
            res.send(result);
        });

            // Manage-Events: Update event:
        app.put('/events/:id', logger, verifyToken, async (req, res) => {
            const id = req.params.id;
            const update = req.body;
            const filter = {
                _id: new ObjectId(id)
            };
            const updateDoc = {
                $set: update,
            };
            const result = await eventsCollection.updateOne(filter, updateDoc);
            res.send(result);
        })

            // Manage-Events:
        app.delete('/events/:id', logger, verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            }
            const result = await eventsCollection.deleteOne(query);
            res.send(result);
        });



        // Athletic Testimonials API:
        app.get('/testimonials', async (req, res) => {
            const cursor = testimonialsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });


        // Athletic PopularSports API
        app.get('/popularSports', async (req, res) => {
            const cursor = popularSportsCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });



        // Athletic Event Booking API:
        app.get('/bookings', logger, verifyToken, async (req, res) => {
            const email = req.query.email;

            // console.log('Inside Booking API',req.cookies);
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'Forbidden Access' })
            };

            const query = {
                user_email: email
            };
            const result = await bookingCollection.find(query).toArray();
            res.send(result);
        });

        app.post('/bookings', logger, verifyToken, async (req, res) => {
            const bookingData = req.body;
            // console.log(bookingData);
            const { user_email, eventId } = bookingData;

            // 1. founding/check for existing booking:
            const existingBooking = await bookingCollection.findOne({ user_email, eventId });

            if (existingBooking) {
                return res.status(400).send({ message: 'Already booked this event' });
            }

            const result = await bookingCollection.insertOne(bookingData);
            res.send(result);
        });

        app.delete('/bookings/:id', logger, verifyToken, async (req, res) => {
            const id = req.params.id;
            const query = {
                _id: new ObjectId(id)
            };
            const result = await bookingCollection.deleteOne(query);
            res.send(result);
        });



        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);
