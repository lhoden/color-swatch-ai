const express = require('express');
const app = express();
const axios = require('axios');
const aws4Axios = require('aws4-axios');
require('dotenv').config();
const port = 5000;

// Create an interceptor instance with your AWS configuration
const interceptor = aws4Axios.aws4Interceptor({
    options: {
        region: 'us-east-1',
        service: 'bedrock',
    },
    credentials: {
        accessKeyId: process.env.API_ACCESS_KEY,
        secretAccessKey: process.env.API_SECRET,
    }
});

// axios and interceptor
const client = axios.create();
client.interceptors.request.use(interceptor);

// signing requests
async function askMistral(prompt) {
    const requestBody = {
        prompt: `<s>[INST] ${prompt} [/INST]`,
        max_tokens: "400",
        temperature: "0.5",
        top_p: "0.9",
        top_k: "50"
    };
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
    try {
        const response = await client.post('https://bedrock-runtime.us-east-1.amazonaws.com/model/mistral.mistral-7b-instruct-v0:2/invoke', JSON.stringify(requestBody), {headers: headers});
        return response.data;
    } catch (error) {
        console.error(error);
    }
    return '';
}

app.use(express.json()); // for parsing application/json

app.get('/info', (req, res) => {
  // Handle GET request logic here
  const data = { message: 'This is a nice little server that will let you prompt the Mistral AI model using a prompt.' };
  res.json(data);
});


app.post('/prompt', async (req, res) => {
    const receivedData = req.body;

    const mistralResponse = await askMistral(receivedData.prompt);

    res.status(200).json(mistralResponse);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});