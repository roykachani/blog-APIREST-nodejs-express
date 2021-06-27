const { decodeToken } = require('../services/auth');
const moment = require('moment');

//middleware para decodificar token en cabeceras

const securedUser = (req, res, next) => {
	try {
		if (!req.headers.authorization)
			return res.status(403).send({ message: 'No tinees autorización' });
		const authorization = req.headers.authorization.split(' ')[1];
		const { _id, email, ext } = decodeToken(authorization);
		req.id = _id;
		if (ext <= moment().unix())
			return res.status(401).json({ message: 'El Token ha expirado' });
		next();
	} catch (e) {
		console.error(e);
		res.status(401).send('no autorizado');
	}
};

module.exports = { securedUser };
