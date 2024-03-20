const validator = require('../helpers/validate');

const saveMovie = (req, res, next) => {
    const validationRule = {
      title: 'required|string',
      director: 'required|string',
      year: 'required|integer',
      genre: 'required|string',
      duration_minutes: 'required|integer',
      imdb_rating: 'required|numeric',
      main_cast: 'required|string'
    };
    validator(req.body, validationRule, {}, (err, status) => {
      if (!status) {
        res.status(412).send({
          success: false,
          message: 'Validation failed',
          data: err
        });
      } else {
        next();
      }
    });
  };
  
  module.exports = {
    saveMovie
  };