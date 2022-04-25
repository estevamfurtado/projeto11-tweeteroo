import express from 'express';
import cors from 'cors';
import chalk from 'chalk';

const app = express();

app.use(express.json());
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
        res.status(400).send("Todos os campos são obrigatórios!");
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
        res.status(400).send("Todos os campos são obrigatórios!");
    }
})

app.get("/tweets", (req, res) => {

    let { page } = req.query;
    page = parseInt(page);
    console.log("page", page);

    if (validatePage(page)) {
        res.send(getPageTweets(page, tweets));
    } else {
        res.status(400).send("Informe uma página válida!");
    }

})

app.get("/tweets/:username", (req, res) => {
    const username = req.params.username;
    res.send(tweets.filter(t => t.username === username));
})


// Get Page Tweets

function getPageTweets(page, list) {
    const pageTweets = [];
    const len = list.length;

    for (let i = len - (page - 1) * 10 - 1; (i > -1 && i >= len - (page) * 10); i--) {
        console.log(i);
        pageTweets.push(list[i]);
    }

    return pageTweets;
}


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

function validatePage(page) {
    return page > 0;
}


app.listen(5000, () => console.log(`Started server at http://localhost:5000!`));