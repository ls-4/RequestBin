import express from 'express';
import cors from 'cors';
import { createBin } from './services/bins.js'
import { createRequest } from './services/requests.js'

const app = express();

app.use(cors());
app.use(express.json());

app.get(('/'), (req, res) => {
  res.redirect('/bins');
});

// get list of bins
app.get('/bins', (req, res) => {
  res.send('Test');
});

// create bin
app.post('/bins', (req, res) => {
  // create unique bin route
  // create auth token
  // store new bin in database (db.bins.create)
  // return 201 {bin route and token} to frontend
});

// collect webhook request into bin
app.post('/in/:binRoute', (req, res) => {
  // create new request (db.requests.create)
  // return 201 request object
});

// view bin + list requests
app.get('/bins/:binRoute', (req, res) => {
  // get bin by route (db.bins.getByRoute)
  // if !bin
    // return bin not found
  // if param[token] == bin.token
    // get requests by binRoute (db.requests.getByBinRoute)
    // return json {binRoute, requests}
  // else
    // return invalid token
});

export default app;