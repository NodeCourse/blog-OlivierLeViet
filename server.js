const express = require('express');
const Sequelize = require('sequelize');
const app = express();

// connexion à la base de données, new Sequelize( nom de la db, id/pseudo, password)
const db = new Sequelize('blog', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});

// créer une table user dans la db connecté plus haut
const User = db.define('user', {
    fullname: { type: Sequelize.STRING },
    email: { type: Sequelize.STRING }
});


// créer des user
User
    .sync()
    .then(() => {
        User.create({
            fullname: 'Jane Doe',
            email: 'jane.doe@gmail.com'
        });
    })
    .then(() => {
        User.create({
            fullname: 'John Doe',
            email: 'john.doe@gmail.com'
        });
    })
    .then(() => {
        return User.findAll();
    })
    .then((users) => {
        console.log(users);
    });


app.set('view engine', 'pug');
app.use(express.static("public"));
app.get('/', (request, response) => {
    response.render("index");
});

console.log("Server listening: 3000");
app.listen(3000);