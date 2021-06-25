const Blog = require('../models/blog');

const getPosts = async (req, res) => {
	try {
		const result = await Blog.find();
		res.status(200).send(result);
	} catch (e) {
		console.log(e);
		res
			.status(500)
			.send({ message: 'Ocurrio un error al consultar los datos a la db' });
	}
};

const createPost = async (req, res) => {
	try {
		const blog = new Blog();
		blog.title = req.body.title;
		blog.description = req.body.description;
		blog.photo = req.body.photo;
		blog.category = req.body.category;
		await blog.save();
		res.send(blog);
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
		res.status(302).send(result);
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
		res.status(200).send(result);
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

const deletePost = async (req, res) => {
	try {
		const id = req.params.blogId;
		const result = await Blog.findOneAndDelete(id);
		res.status(200).send(result, { message: 'el producto a sido eliminado' });
	} catch (e) {
		console.log(e);
		res.status(500);
	}
};

module.exports = { getPosts, findPost, createPost, updatePost, deletePost };
