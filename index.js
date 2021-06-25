const app = require('./app');

// coneccion a db
const { dbConnection } = require('./database/config');
dbConnection();

//port
const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`api rest corriendo desde puerto: ${port}`);
});
