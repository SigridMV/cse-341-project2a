//Users Controller
const mongodb = require("../data/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {
  //#swagger.tag=['Movies']
  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .find();
  result.toArray().then((movies) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movies);
  });
};

const getSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    return res.status(400).json("Must use a valid movie id to find a movie.");
  }

  const movieId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .find({ _id: movieId });
  result.toArray().then((movies) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(movies);
  });
};

const createMovie = async (req, res) => {
  //#swagger.tag=['Movies']
  const movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
    duration_minutes: req.body.duration_minutes,
    imdb_rating: req.body.imdb_rating,
    main_cast: req.body.main_cast,
  };
  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .insertOne(movie);
  if (response.acknowledge) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error ocurred while updating the movie.");
  }
};

const updateMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid movie id to update a movie.");
  }
  //#swagger.tag=['Movie']
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    director: req.body.director,
    year: req.body.year,
    genre: req.body.genre,
    duration_minutes: req.body.duration_minutes,
    imdb_rating: req.body.imdb_rating,
    main_cast: req.body.main_cast,
  };
  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .replaceOne({ _id: movieId }, movie);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while updating the movie.");
  }
};

const deleteMovie = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json("Must use a valid movie id to delete a movie.");
  }
  //#swagger.tag=['Movie']
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDatabase()
    .db("project2")
    .collection("movies")
    .deleteOne({ _id: movieId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(response.error || "Some error occurred while deleting the movie.");
  }
};

module.exports = {
  getAll,
  getSingle,
  createMovie,
  updateMovie,
  deleteMovie,
};
