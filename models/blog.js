const { Schema, model } = require('mongoose');

const BlogSchema = Schema(
	{
		title: {
			type: String,
			require: true,
		},
		description: {
			type: String,
			require: true,
		},
		photo: {
			type: String,
			require: false,
		},
		users: {
			type: Schema.Types.ObjectId,
			ref: 'user',
			require: true,
		},
		category: {
			type: String,
			enum: ['ciencia', 'tecnologia', 'deportes', 'recetas'],
		},
	},
	{ timestamps: true }
);

module.exports = model('blog', BlogSchema);
