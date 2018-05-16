const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const app = express();

// connexion à la base de données, new Sequelize( nom de la db, id/pseudo, password)
const db = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

//Création des articles
const Articles = db.define('articles', {
    title: {
        type: Sequelize.STRING
    },
    text: {
        type: Sequelize.STRING
    }
});


app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {
    Articles
        .sync()
        .then(() => {
            Articles
                .findAll()
                .then((articles) => {
                    res.render('index', {articles});
                })
        });

});

app.post('/api/post', (req, res) => {
    const title = req.body.title;
    const text = req.body.text;
    Articles
        .create({title: title, text: text})
        .then(() => res.redirect('/'));
});


console.log("Server listening: 3000");
app.listen(3000);