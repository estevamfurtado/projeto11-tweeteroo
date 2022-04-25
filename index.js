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

    if (validateUsername(username) && validateAvatarUri(avatar)) {
        user.username = username;
        user.avatar = avatar;
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
})

app.post("/tweets", (req, res) => {
    const { tweet } = req.body;
    if (validateTweet(tweet)) {
        tweets.push({
            username: user.username,
            avatar: user.avatar,
            tweet: tweet
        });
        res.sendStatus(201);
    } else {
        res.sendStatus(400);
    }
})

app.get("/tweets", (req, res) => {
    res.send(tweets);
})

// Validations

function validateUsername(username) {
    return (typeof username === 'string' && username !== "");
}

function validateAvatarUri(avatarUri) {
    return (avatarUri.match(/\.(jpeg|jpg|gif|png)$/) != null);
}

function validateTweet(tweet) {
    return (typeof tweet === 'string' && tweet !== "");
}


app.listen(5000, () => console.log(`Started server at http://localhost:5000!`));