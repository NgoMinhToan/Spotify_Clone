const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
app.use(cors())
app.use(bodyParser.json())


app.post('/refreshToken', function(req, res) {
    const refreshToken = req.body.refreshToken;

    const spotifyApi = new spotifyWebApi({
        redirectUri: process.env.APP_CLIENT_REDIRECT,
        clientId: process.env.APP_CLIENT_ID,
        clientSecret: process.env.APP_CLIENT_SECRET_KEY,
        refreshToken,
    })

    spotifyApi.refreshAccessToken().then(data => {
        res.json({
            accessToken: data.body.access_token,
            expiresIn: data.body.expires_in,
        })
    }).catch(err => res.status(404).send(err))
})

app.post('/login', function(req, res){
    const code = req.body.code;
    const spotifyApi = new spotifyWebApi({
        redirectUri: process.env.APP_CLIENT_REDIRECT,
        clientId: process.env.APP_CLIENT_ID,
        clientSecret: process.env.APP_CLIENT_SECRET_KEY,
    })

    spotifyApi.authorizationCodeGrant(code).then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        res.status(400).send(err)
    })
})

app.listen(3001, () => {
    console.log('listening on http://localhost:3001')
})