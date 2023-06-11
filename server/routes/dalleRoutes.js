//creating for sending and receiving data from DALL-E

import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

//for getting env vars
dotenv.config();

//establishing the router service from express
const router = express.Router();

//configuring the openai api using api key created
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//simple get route to check the connection with DALL-E
router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello from DALL-E!' });
});

//route for posting the request of the image to the DALL-E
router.route('/').post(async (req, res) => {
  try {
    //getting the prompt which is sent in req body by the website
    const { prompt } = req.body;

    //telling what response we want from the openai
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: '1024x1024',
      response_format: 'b64_json',
    });

    //storing the image which we got as a responses from openai
    const image = aiResponse.data.data[0].b64_json;

    //updating the res status and sending the json to the website
    res.status(200).json({ photo: image });
  } 
  //catching any errors during the whole process and sending it to the website through json
  catch (error) {
    console.error(error);
    res.status(500).send(error?.response.data.error.message || 'Something went wrong');
  }
});

export default router;