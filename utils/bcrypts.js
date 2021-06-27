const bcrypt = require('bcrypt-nodejs');

const salt = bcrypt.genSaltSync(10);

const hash = (payload) => bcrypt.hashSync(payload, salt);

const unhash = (payload, hashedPayload) =>
	bcrypt.compareSync(payload, hashedPayload);

module.exports = { hash, unhash };
