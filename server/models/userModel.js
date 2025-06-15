import mongoose from 'mongoose';
import { ROLES } from '../constants/roles.js';

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 30,
		},
		surname: {
			type: String,
			required: true,
			trim: true,
			minlength: 2,
			maxlength: 30,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
			match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Некорректный формат email'],
		},
		password: {
			type: String,
			required: true,
			minlength: 6,
		},
		role: {
			type: Number,
			enum: Object.values(ROLES),
			default: ROLES.USER,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;
