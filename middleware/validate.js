const { body, param } = require('express-validator');

exports.createMovieValidation = [
  body('title').notEmpty().withMessage('Title is required'),
  body('director').notEmpty().withMessage('Director is required'),
  body('year').isNumeric().withMessage('Year must be a number'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('duration_minutes').isNumeric().withMessage('Duration must be a number'),
  body('imdb_rating').isNumeric().withMessage('IMDb rating must be a number'),
  body('main_cast').isArray().withMessage('Main cast must be an array'),
];

exports.updateMovieValidation = [
  param('id').isMongoId().withMessage('Invalid movie ID'),
  body('title').notEmpty().withMessage('Title is required'),
  body('director').notEmpty().withMessage('Director is required'),
  body('year').isNumeric().withMessage('Year must be a number'),
  body('genre').notEmpty().withMessage('Genre is required'),
  body('duration_minutes').isNumeric().withMessage('Duration must be a number'),
  body('imdb_rating').isNumeric().withMessage('IMDb rating must be a number'),
  body('main_cast').isArray().withMessage('Main cast must be an array'),
];
