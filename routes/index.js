//Routes Setup
const router = require('express').Router();

router.use('/', require('./swagger'));

router.get('/', (req, res) => { 
    //#swagger.tag=['Hello World']
    res.send('Hello World');
});

router.use('/movies', require('./movies'));

module.exports = router;