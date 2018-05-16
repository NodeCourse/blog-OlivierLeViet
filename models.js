
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
