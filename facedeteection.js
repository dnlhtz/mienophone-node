'use strict';

const axios = require('axios').default;
const maxApi = require("max-api");

// Add a valid subscription key and endpoint to your environment variables.
let subscriptionKey = '_____KEY_____'
let endpoint = 'https://mienophone.cognitiveservices.azure.com' + '/face/v1.0/detect'

// Images
let imageAngry = 'https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1400&q=80'
let imageHappiness = 'https://images.unsplash.com/photo-1482849297070-f4fae2173efe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2100&q=80'

// Optionally, replace with your own image URL (for example a .jpg or .png URL).
let imageUrl = imageHappiness	

// Send a POST request
axios({
    method: 'post',
    url: endpoint,
    params : {
        returnFaceId: true,
        returnFaceLandmarks: false,
        returnFaceAttributes: 'emotion'
    },
    data: {
        url: imageAngry,
    },
    headers: { 'Ocp-Apim-Subscription-Key': subscriptionKey }
}).then(function (response) {
    console.log('Status text: ' + response.status)
    console.log('Status text: ' + response.statusText)
    console.log()
    //console.log(response.data)
    response.data.forEach((face) => {
    	maxApi.post(JSON.stringify(face.faceAttributes.emotion.anger))
    	maxApi.outlet(
    		face.faceAttributes.emotion.anger, 
    		face.faceAttributes.emotion.contempt, 
    		face.faceAttributes.emotion.disgust, 
    		face.faceAttributes.emotion.fear, 
    		face.faceAttributes.emotion.happiness, 
    		face.faceAttributes.emotion.neutral, 
    		face.faceAttributes.emotion.sadness, 
    		face.faceAttributes.emotion.surprise
    		)
    });
}).catch(function (error) {
    console.log(error)
});

maxApi.post('test');

maxApi.addHandler('greeting', () => { 
	maxApi.post('Got greeting!');
});
