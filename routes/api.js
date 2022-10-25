const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const cors = require('cors');
const posts = require('../model/posts');
const options = ['http://localhost:3000', 'http://127.0.0.1:3000/'];
const corPadrao = "bg-info";

router.use(cors(options));

router.get("/all", (req, res) => {
    res.json(JSON.stringify(posts.getAll()));
});

router.post("/new", bodyParser.json(), (req, res) => {
    let title = req.body.title;
    let description = req.body.description;
    let corCard = req.body.corrCard;

    if (title == "" || description == "") {
        console.log("Campo vazio!");
        res.send("Campo vazio. Post não Adcionado!");
    }
    else {
        if (corCard == "") {
            corCard = corPadrao;
            console.log("Cor vazio!");
            posts.newPost(title, description, corCard);
            res.send("Post adicionado");
        }
        else{
            posts.newPost(title, description, corCard);
            res.send("Post adicionado");
        }
    }
});

router.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    posts.deletePost(id);
    res.send("Post Excluido");
});

router.delete("/delete", bodyParser.json(), (req, res) => {
    const idd = req.body.id;
    posts.deletePost(idd);
    res.send("Post Excluido");
});

module.exports = router;