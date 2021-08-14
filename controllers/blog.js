const { v4: uuid } = require('uuid');

const Blog = require('../models/blog');
const User = require('../models/user');

const getPosts = async (req, res) => {
	try {
		const result = await Blog.find();
		res.status(200).send({ result });
	} catch (e) {
		console.log(e);
		res
			.status(500)
			.send({ message: 'Ocurrio un error al consultar los datos a la db' });
	}
};

const createPost = async (req, res) => {
	try {
		let user = await User.findById(req.id);
		const idBlog = uuid();

		const blog = new Blog();
		blog.title = req.body.title;
		blog.description = req.body.description;
		blog.photo = req.body.photo;
		blog.author = user.displayname;
		blog.idBlog = idBlog;
		blog.users = req.id;
		blog.category = req.body.category;
		const savedBlog = await blog.save();

		user.blogs = user.blogs.concat(savedBlog); //creo ref de blog en user
		await user.save();

		res.status(201).send({ message: 'el post fue creado', blog });
	} catch (e) {
		console.log(e);
		res.status(500).send({ message: 'Error al guardar el blog en la DB' });
	}
};

const findPost = async (req, res) => {
	try {
		const id = req.params.blogId;
		const result = await Blog.findById(id);
		if (!result)
			res.status(404).send({ message: 'No se encontro el post solicitado' });
		res.status(200).send(result);
	} catch (e) {
		console.log(e);
		res.status(500).send({ message: 'ocurio un error' });
	}
};

const updatePost = async (req, res) => {
	try {
		const id = req.params.blogId;
		const update = req.body;
		const result = await Blog.findByIdAndUpdate(id, update);
		res.status(200).send({ message: 'el post fue actualizado', result });
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deletePost = async (req, res) => {
	try {
		const id = req.params.blogId;
		const result = await Blog.findOneAndDelete(id);
		res.status(202).send({ message: 'el post a sido eliminado', result });
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

module.exports = {
	getPosts,
	findPost,
	createPost,
	updatePost,
	deletePost,
};
