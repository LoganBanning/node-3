const express = require('express');
const massive = require('massive');
require('dotenv').config();
const { getMovies, addMovie, updateTheaterStatus, deleteMovie } = require('./movieController');

const app = express();

app.use(express.json());

massive({
    connectionString: process.env.CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false,
    }
})
.then((dbInstance) => {
    app.set('db', dbInstance);
    console.log('Database connection established successfully');
})
.catch((e) => {
    console.log('DB connection problem: ', e)
});

app.get('/api/movies', getMovies);
app.post('/api/movies', addMovie);
app.put('/api/movies/:id', updateTheaterStatus);
app.delete('/api/movies/:id', deleteMovie);

const PORT = process.env.SERVER_PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));