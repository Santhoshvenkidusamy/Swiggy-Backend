const express = require('express');
const cors = require('cors');
const fetch = require('cross-fetch');

const serverless = require('serverless-http');
const app = express();
const router = express.Router();
const port = process.env.PORT  || 3000;
app.use(cors());

router.get('/', (req, res) => {
  res.send('App is running..');
});

// Api to get restraunts
router.get('/restaurants', (req, res) => {
  
  const url = `https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0614369&lng=80.2408444&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`;

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('No response from swiggy API');
      }
      return response.json();
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    });
});


// API to get restrauntMenu
router.get('/restaurantMenu/:id', (req, res) => {
  const {id} = req.params
  console.log(id)
  const url = `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=13.061436790959643&lng=80.24084452539682&restaurantId=${id}&catalog_qa=undefined&submitAction=ENTER`;

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('No response from swiggy API');
      }
      return response.json();
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    });
});


// API to Search retaurants
router.get('/search/:id', (req, res) => {
  const {id} = req.params
  console.log(id)
  const url = `https://www.swiggy.com/dapi/restaurants/search/suggest?lat=13.061436790959643&lng=80.24084452539682&trackingId=undefined&str=${id}`;

  fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36'
    
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('No response from swiggy API');
      }
      return response.json();
    })
    .then(data => {
      res.json(data);
    })
    .catch(error => {
      console.error(error);
      res.status(500).send('An error occurred');
    });
});

app.use('/.netlify/functions/api', router);
module.exports.handler = serverless(app);