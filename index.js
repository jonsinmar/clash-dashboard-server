const express = require('express');
const app = express();
const request = require('request');
const cors = require('cors');
require('dotenv').config();


app.use(cors());
app.use(express.static('build'))

app.get('/summonerByName', (req, res) => {
    const summonerName = req.query.summonerName;
    const options = {
        url: `https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`,
        headers: { "X-Riot-Token": process.env.RITO_API_KEY }
    }

    request(options).pipe(res);

})

app.get('/matchList', (req, res) => {
    const accountId = req.headers.accountid;
    const options = {
        url: `https://euw1.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?queue=700`,
        headers: { "X-Riot-Token": process.env.RITO_API_KEY }
    }
    request(options).pipe(res);
})

app.get('/matchDetail',(req,res)=>{
    const matchId = parseInt(req.headers.matchid);
    const options = {
        url: `https://euw1.api.riotgames.com/lol/match/v4/matches/${matchId}`,
        headers: { "X-Riot-Token": process.env.RITO_API_KEY }
    }
    request(options).pipe(res)
    
})

app.get('/matchTimeline', (req, res) => {
    
    const matchId = parseInt(req.headers.matchid);
    const options = {
        url: `https://euw1.api.riotgames.com/lol/match/v4/timelines/by-match/${matchId}`,
        headers: { "X-Riot-Token": process.env.RITO_API_KEY }
    }
    request(options).pipe(res)
})

const PORT = process.env.PORT || 3001
app.listen(PORT);