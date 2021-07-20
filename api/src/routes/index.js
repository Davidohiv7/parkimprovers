const { Router } = require('express');
const router = Router();

const test = require ('./test');

router.use('/test', test);

module.exports = router;