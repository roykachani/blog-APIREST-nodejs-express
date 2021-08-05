const User = require('../models/user');
const Blog = require('../models/blog');

const getUserPosts = async (req, res) => {
	try {
		const { userId } = req.params;
		const result = await Blog.find({ users: userId });

		res.status(200).send(result);
	} catch (e) {
		console.log(e);
		res
			.status(500)
			.send({ message: 'Ocurrio un error al consultar los datos a la db' });
	}
};

const findProfile = async (req, res) => {
	try {
		const { userId } = req.params;
		const result = await User.findById(userId, {
			password: 0,
			email: 0,
			updatedAt: 0,
		});
		const blogsData = await Blog.find({ users: userId });

		res.status(302).send({ result, blogsData });
	} catch (e) {
		console.log(e);
		res
			.status(500)
			.send({ message: 'Ocurrio un error al consultar los datos a la db' });
	}
};

const updateProfile = async (req, res) => {
	try {
		const id = req.params.userId;
		const update = req.body;
		const result = await User.findByIdAndUpdate(id, update);
		res.status(200).send({ message: 'usuario actualizado con exito', result });
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

module.exports = { getUserPosts, findProfile, updateProfile };
