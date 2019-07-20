const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;
const db = config.get('mongoUri');


mongoose.connect(db, { useNewUrlParser: true, useCreateIndex: true }).then(() => {
    console.log('Connected to mongodb...')
}).catch(err => {
    console.log(`Could not connect to mongdb... ${err}`)
})

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/api/notes/', require('./routes/notes'));
app.use('/api/users/', require('./routes/users'));
app.use('/api/auth/', require('./routes/auth'));

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

app.listen(port, () => {
    console.log(`Server running on port ${port}...`);
})