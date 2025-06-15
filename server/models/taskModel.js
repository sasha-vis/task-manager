import mongoose from 'mongoose';

const TaskSchema = mongoose.Schema(
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
		projectId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Project',
			required: true,
		},
	},
	{ timestamps: true },
);

const Task = mongoose.model('Task', TaskSchema);

export default Task;
