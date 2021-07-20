const { Router } = require('express');
const router = Router();

const test = require ('./test');
const parkings = require ('./parkings');

router.use('/test', test);
router.use('/parkings', parkings);

module.exports = router;