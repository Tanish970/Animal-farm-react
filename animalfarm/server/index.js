import express from 'express';
import cors from 'cors';
import Chance from 'chance';

const app = express();
const chance = new Chance();

app.use(cors({
    origin: '*', // Allow requests from any origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allow specified HTTP methods
    preflightContinue: false, // Pass the CORS preflight response to the next handler
    optionsSuccessStatus: 200 // Set the preflight response status code to 200
  }));
app.use(express.json());

// Make some animals
const animals = [...Array(250).keys()].map(id => {
    return {
        id,
        type: chance.animal(),
        age: chance.age(),
        name: chance.name(),
    };
});

// Endpoint to get all animals
app.get('/', (req, res) => {
    let q = req.query.q ? req.query.q.toLowerCase() : ''; // Providing a default value
    console.log(q)
    let result = animals.filter(animal => animal.type.toLowerCase().includes(q));
    res.json(result);
});



const port = 8080;

app.listen(port, () => {
    console.log(`Listening at port ${port}`);
})