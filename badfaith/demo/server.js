'use strict';

const express = require('express');
const app = express();
const PORT = 8080;

app.get('/', (req, res) => {
    res.status(200).send('Requests here shouldn\'t be sending you anything');
})

// To create a dummy response to any API request we may need the front-end to make, 
// use the following code as an example 

//.get can also be .post, .put, etc, depending on the way you've set up the azure functions
app.get('/INSERT_ROUTE_TO_YOUR_AZURE_FUNCTION_HERE', (req, res) => {
    // Most azure function calls will have some information sent to them, here that information will be in *req.body*
    // You can extract the information and do some processing on it like so:
    const result = req.body['name'] + ' has been updated';

    //You can have some default values to send back too, irrespective of what the req.body has in it

    res.status(201).send(result)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit');
})

module.exports = app;