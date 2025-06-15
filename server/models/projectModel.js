import mongoose from 'mongoose';

const ProjectSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 3,
			maxlength: 100,
		},
		description: {
			type: String,
			trim: true,
			maxlength: 500,
		},
		ownerId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{ timestamps: true },
);

const Project = mongoose.model('Project', ProjectSchema);

export default Project;
