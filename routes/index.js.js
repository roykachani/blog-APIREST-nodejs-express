const { Router } = require('express');
const router = Router();

const {
	getPosts,
	createPost,
	findPost,
	updatePost,
	deletePost,
} = require('../controllers/blog');

router.get('/blog', getPosts);

router.get('/blog/:blogId', findPost);

router.post('/blog', createPost);

router.put('/blog/:blogId', updatePost);

router.delete('/blog/:blogId', deletePost);

module.exports = router;
