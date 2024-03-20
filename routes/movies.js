//API endpoints
const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");
const {
  createMovieValidation,
  updateMovieValidation,
} = require("../middleware/validate");

const { validationResult } = require('express-validator');

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  };

router.get("/", moviesController.getAll);

router.get("/:id", moviesController.getSingle);

router.post("/", createMovieValidation, validate, moviesController.createMovie);

router.put(
  "/:id",
  updateMovieValidation,
  validate,
  moviesController.updateMovie
);

router.delete("/:id", moviesController.deleteMovie);

module.exports = router;
