import mongoose from 'mongoose';
import { ROLES } from '../constants/roles.js';

const UserSchema = mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		surname: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: Number,
			default: ROLES.USER,
		},
	},
	{ timestamps: true },
);

const User = mongoose.model('User', UserSchema);

export default User;
