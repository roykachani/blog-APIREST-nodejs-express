const { hash, unhash } = require('../utils/bcrypts');
const User = require('../models/user');
const moment = require('moment');
const { createToken } = require('../services/auth');

const create = async (req, res) => {
	try {
		const { email, password } = req.body;

		let user = await User.findOne({ email });
		if (user) return res.status(400).json({ message: 'el email esta en unso' });
		//bcrypt
		user = new User(req.body);
		user.password = hash(password);
		await user.save();
		res.status(201).send('usurio creado');
	} catch (e) {
		console.error(e);
		res.status(500);
	}
};

const auth = async (req, res) => {
	try {
		const { email, password } = req.body;
		let user = await User.findOne({ email }, { password: 1 });
		if (!user)
			return res.status(400).json({ message: 'Usuario no registrado' });

		//bcrypt
		const isPasswordValid = unhash(password, user.password);
		if (!isPasswordValid)
			return res.status(401).json({ message: 'Usuario o password incorrecto' });
		const JWTObject = {
			_id: user._id,
			email,
			iat: moment().unix(),
			ext: moment().add(14, 'days').unix(),
		};
		const JWT = createToken(JWTObject);
		res.status(202).json({ message: 'bienvenido', token: JWT });
	} catch (e) {
		console.error(e);
		res.status(401);
	}
};

module.exports = { create, auth };
