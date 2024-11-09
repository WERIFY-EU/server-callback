const express = require('express');
const fs = require('fs'); // Import the fs module
const crypto = require('crypto');
const jwt = require('jsonwebtoken'); 
const app = express();

// Configure built-in body-parser with a larger limit
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const port = 5050;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.get('/token', (req, res) => {
  try {
    const token = req.query.token;
    if (!token) {
      return res.status(400).send('Token not found');
    }

    // decode Token
    const decoded = jwt.decode(token, { complete: true });
    const storedValuesJson = JSON.parse(decoded.payload.stored_values);

    if (!decoded) {
      return res.status(400).send('Invalid Token');
    }


    if (storedValuesJson && Array.isArray(storedValuesJson)) {
      console.log('Recorriendo stored_values:');
      storedValuesJson.forEach(item => {
        console.log(`Pointer: ${item.pointer}`);
        console.log(`Value: ${JSON.stringify(item.value)}`);
      });
    }

    res.status(201).send({
      message: 'Decoded token',
      decodedToken: decoded
    });

  } catch (err) {
    console.error('Error in /token:', err);
    res.status(500).send('Error processing token');
  }
});



app.get('/tokenxx', (req, res) => {
  console.log(req.body);

  // Convert req.body to a JSON string
  const data = JSON.stringify(req.body, null, 2);

  // Generate a random file name
  const randomFileName = `requestData_${crypto.randomUUID()}.json`;

  // Write the JSON to a file with a random name
  fs.writeFile(randomFileName, data, { flag: 'a+' }, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred on the server.'); // Send a 500 error if writing fails
    }

    // Send success response if everything went well
    res.status(201).send('User created and data logged');
  });
});



app.get('/tokenxx', (req, res) => {
  console.log(req.body);

  // Convert req.body to a JSON string
  const data = JSON.stringify(req.body, null, 2);

  // Generate a random file name
  const randomFileName = `requestData_${crypto.randomUUID()}.json`;

  // Write the JSON to a file with a random name
  fs.writeFile(randomFileName, data, { flag: 'a+' }, err => {
    if (err) {
      console.error(err);
      return res.status(500).send('An error occurred on the server.'); // Send a 500 error if writing fails
    }

    // Send success response if everything went well
    res.status(201).send('User created and data logged');
  });
});