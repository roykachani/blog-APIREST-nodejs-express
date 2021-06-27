const { Router } = require('express');
const router = Router();

const {
	getPosts,
	createPost,
	findPost,
	updatePost,
	deletePost,
} = require('../controllers/blog');

const { securedUser } = require('../middlewares/auth');

router.get('/blog', getPosts);

router.get('/blog/:blogId', findPost);

router.post('/blog', securedUser, createPost);

router.put('/blog/:blogId', securedUser, updatePost);

router.delete('/blog/:blogId', securedUser, deletePost);

module.exports = router;
