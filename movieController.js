const getMovies = (req, res) => {
  //get our DB instance
  const db = req.app.get('db');

  //run SQL query to fetch movies
  db.get_movies()
  .then((movies) => {
      res.status(200).send(movies);
  })
  .catch((e) => console.log(e))
};

const addMovie = (req, res) => {
  //get our DB instance
  const db = req.app.get('db');
  //get user input from request
  const {
      title,
      runTime,
      inTheaters,
  } = req.body;
  //run SQL to add a movie
  db.add_movie(title, runTime, inTheaters)
  .then(() => {
      //.then -> send back 200 
      res.sendStatus(200);
  }).catch((e) => {
      res.status(500).send(e);
  })
}

const updateTheaterStatus = (req, res) => {
  //get our DB
  const db = req.app.get('db');

  //grab id of movie to update and update value for inTheaters
  const { id } = req.params;
  const { inTheaters } = req.query;
  //call our SQL function exposed by massive
  db.update.update_theater_status(id, inTheaters)
  //send back 200 status
  .then((movie) => res.status(200).send(movie))
  //handle errors
  .catch((e) => console.log(e))
}


  const deleteMovie = (req, res) => {
    const db = req.app.get('db');
    const { id } = req.params;

    db.delete_movie(id)
    .then(() => res.sendStatus(200))
    .catch((e) => console.log(e))
  }

module.exports = {
  getMovies,
  addMovie,
  updateTheaterStatus,
  deleteMovie,
}