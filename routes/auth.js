const { Router } = require('express');
const router = Router();

const { create, auth } = require('../controllers/auth');

router.post('/auth', create);
router.post('/auth/login', auth);

module.exports = router;
