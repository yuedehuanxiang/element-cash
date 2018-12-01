const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const app = express();

//mac

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

// DB config
const db = require('./config/keys').mongoURI;

// 使用body-parser中间件

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));


// parse application/json
app.use(bodyParser.json());

// Connect to mongodb
mongoose.connect(db, {
        useNewUrlParser: true
    })
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.log(err);
    });

// passport 初始化
app.use(passport.initialize());

require('./config/passport')(passport);


// app.get('/', (req, res) => {
//     res.send('Hello World');
// });

// 使用routes
app.use('/api/users', users);
app.use('/api/profiles', profiles);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});