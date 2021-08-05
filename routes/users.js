const { Router } = require('express');
const router = Router();

const {
	getUserPosts,
	findProfile,
	updateProfile,
} = require('../controllers/users');

const { securedUser } = require('../middlewares/auth');

router.get('/users/:userId', getUserPosts);
router.get('/users/userProfile/:userId', securedUser, findProfile);
router.post('/users/userProfile/:userId', securedUser, updateProfile);

module.exports = router;
