const express = require('express');

const { createBargain, fetchBargains, fetchBargainsOfProductByUser } = require('../controller/Bargain');

const router = express.Router();

router.get('/', fetchBargains).post('/', createBargain);
router.get('/:productId/:userId', fetchBargainsOfProductByUser);

exports.router = router;
