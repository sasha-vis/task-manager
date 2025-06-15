import validator from 'validator';
import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import Project from '../models/projectModel.js';
import Task from '../models/taskModel.js';
import { mapUser } from '../helpers/mappers.js';

export const updateUser = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, surname, email, password } = req.body;

		if (!validator.isMongoId(id)) {
			return res.json({ data: null, error: 'Неверный ID пользователя' });
		}

		const currentUser = await User.findById(id);
		if (!currentUser) {
			return res.json({ data: null, error: 'Пользователь не найден' });
		}

		const updates = {};

		if (name !== undefined) {
			if (
				!validator.isLength(name.trim(), { min: 2, max: 30 }) ||
				!validator.matches(name, /^[A-Za-z]+$/)
			) {
				return res.json({
					data: null,
					error: 'Имя должно быть от 2 до 30 латинских букв',
				});
			}
			updates.name = name.trim();
		}

		if (surname !== undefined) {
			if (
				!validator.isLength(surname.trim(), { min: 2, max: 30 }) ||
				!validator.matches(surname, /^[A-Za-z]+$/)
			) {
				return res.json({
					data: null,
					error: 'Фамилия должна быть от 2 до 30 латинских букв',
				});
			}
			updates.surname = surname.trim();
		}

		if (email !== undefined) {
			if (!validator.isEmail(email.trim())) {
				return res.json({ data: null, error: 'Некорректный формат email' });
			}

			const emailNormalized = email.trim().toLowerCase();
			if (emailNormalized !== currentUser.email) {
				const existingUser = await User.findOne({ email: emailNormalized });
				if (existingUser) {
					return res.json({
						data: null,
						error: 'Пользователь с таким email уже существует',
					});
				}
			}
			updates.email = emailNormalized;
		}

		if (password !== undefined) {
			if (!validator.isLength(password, { min: 6, max: 64 })) {
				return res.json({
					data: null,
					error: 'Пароль должен быть от 6 до 64 символов',
				});
			}
			if (!validator.matches(password, /^[A-Za-z0-9]+$/)) {
				return res.json({
					data: null,
					error: 'Пароль должен содержать только латинские буквы и цифры',
				});
			}
			if (!validator.matches(password, /[A-Z]/)) {
				return res.json({
					data: null,
					error: 'Пароль должен содержать хотя бы одну заглавную букву',
				});
			}
			if (!validator.matches(password, /\d/)) {
				return res.json({
					data: null,
					error: 'Пароль должен содержать хотя бы одну цифру',
				});
			}

			updates.password = await bcrypt.hash(password, 10);
		}

		const updatedUser = await User.findOneAndUpdate(
			{ _id: id, _id: req.user._id },
			updates,
			{
				new: true,
			},
		);
		if (!updatedUser) {
			return res.json({
				data: null,
				error: 'Пользователь не найден или доступ запрещен',
			});
		}

		res.json({
			data: mapUser(updatedUser),
			error: null,
		});
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const deleteUser = async (req, res) => {
	try {
		const { id } = req.params;

		if (!validator.isMongoId(id)) {
			return res.json({ data: null, error: 'Неверный ID пользователя' });
		}

		const currentUser = await User.findById(id);
		if (!currentUser) {
			return res.json({ data: null, error: 'Пользователь не найден' });
		}

		const userToDelete = await User.findOneAndDelete({
			_id: id,
			_id: req.user._id,
		});
		if (!userToDelete) {
			return res.json({
				data: null,
				error: 'Пользователь не найден или доступ запрещен',
			});
		}

		const projects = await Project.find({ ownerId: id }, { _id: 1 });
		const projectIds = projects.map((p) => p._id);

		await Task.deleteMany({ projectId: { $in: projectIds } });

		await Project.deleteMany({ ownerId: id });

		res.clearCookie('token').json({ data: null, error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};
