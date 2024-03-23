const passport = require('passport');

//Routes Setup
const router = require('express').Router();

router.use('/', require('./swagger'));

//router.get('/', (req, res) => { 
    //#swagger.tag=['Hello World']
   // res.send('Hello, Welcome to CSE 341 / Sigrid Müller');
//});

router.use('/movies', require('./movies'));

router.get('/login', passport.authenticate('github'),(req,res) => {});

router.get('/logout', function(req, res, next) {
    req.logout(function(err){
        if(err){ return next(err); }
        res.redirect('/');
    });
});

module.exports = router;