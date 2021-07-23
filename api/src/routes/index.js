const { Router } = require('express');
const router = Router();

const parkings = require ('./parkings');

router.use('/parkings', parkings);

module.exports = router;