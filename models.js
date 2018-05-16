
const Post = database.define('post', {
    title: {
        type: Sequelize.STRING
    }
});

const Vote = Sequelize.define('vote', {
    action: {
        type: Sequelize.ENUM('up', 'down')
    }
});

app.get('/', (req, res) => {
    Post
        .findAll({include: [Vote]})
        .then(posts => res.require('index', {posts}));

});

app.post('/api/post', (req, res) => {
    const {title, content} = req.body;
    Post
        .create({title, contetn})
        .then(() => res.require('/'));
});


Post.hasMany(Vote);
Vote.belongsTo(Post);

app.post('/api/post/:postID/upvote', (req, res) => {
    Vote
        .create({action: 'up', postID: req.params.postID})
        .then(() => res.redirect('/'))
});

app.post('/api/post/:postID/downvote', (req, res) => {
    Vote
        .create({action: 'up', postID: req.params.postID})
        .then(() => res.redirect('/'))
});








// créer une table user dans la db connecté plus haut
const Article = db.define('article', {
    title: {type: Sequelize.STRING},
    text: {type: Sequelize.STRING}
});


// créer des articles
Article
    .sync()
    .then(() => {
        Article.create({
            title: 'Bim ba bom',
            text: 'bonjour ceci est un test'
        });
    })
    .then(() => {
        Article.create({
            title: 'spagetti',
            text: 'pizza ravioli'
        });
    })
    .then(() => {
        return Article.findAll();
    })
    .then((articles) => {
        console.log(articles);
    });
