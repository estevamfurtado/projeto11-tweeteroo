import express from 'express';
import cors from 'cors';
import chalk from 'chalk';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());
app.use(cors());

const user = {};
const tweets = [];

app.post("/sign-up", (req, res) => {
    const { username, avatar } = req.body;
    user.username = username;
    user.avatar = avatar;
    res.sendStatus(200);
})

app.post("/tweets", (req, res) => {

    const { tweet } = req.body;
    tweets.push({
        username: user.username,
        avatar: user.avatar,
        tweet: tweet
    });
    res.sendStatus(200);
})

app.get("/tweets", (req, res) => {
    res.send(tweets);
})

app.listen(5000, () => console.log(`Started server at http://localhost:5000!`));