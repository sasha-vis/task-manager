import bcrypt from 'bcrypt';
import validator from 'validator';
import User from '../models/userModel.js';
import { generate } from '../helpers/token.js';
import { mapUser } from '../helpers/mappers.js';

export const getMe = async (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			return res.json({ data: null, error: 'Пользователь не найден' });
		}
		res.json({ data: mapUser(user), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const register = async (req, res) => {
	try {
		const { name, surname, email, password } = req.body;

		if (!name || !surname || !email || !password) {
			return res.json({
				data: null,
				error: 'Все необходимые поля должны быть заполнены',
			});
		}

		if (
			!validator.isLength(name.trim(), { min: 2, max: 30 }) ||
			!validator.matches(name, /^[A-Za-z]+$/)
		) {
			return res.json({
				data: null,
				error: 'Имя должно быть от 2 до 30 латинских букв',
			});
		}
		if (
			!validator.isLength(surname.trim(), { min: 2, max: 30 }) ||
			!validator.matches(surname, /^[A-Za-z]+$/)
		) {
			return res.json({
				data: null,
				error: 'Фамилия должна быть от 2 до 30 латинских букв',
			});
		}

		if (!validator.isEmail(email.trim())) {
			return res.json({ data: null, error: 'Некорректный формат email' });
		}

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

		const emailNormalized = email.trim().toLowerCase();

		const existingUser = await User.findOne({ email: emailNormalized });
		if (existingUser) {
			return res.json({
				data: null,
				error: 'Пользователь с таким email уже существует',
			});
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const user = await User.create({
			name: name.trim(),
			surname: surname.trim(),
			email: emailNormalized,
			password: passwordHash,
		});

		const token = generate({ id: user.id });

		res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).json({
			data: mapUser(user),
			error: null,
		});
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res.json({
				data: null,
				error: 'Все необходимые поля должны быть заполнены',
			});
		}

		if (!validator.isEmail(email.trim())) {
			return res.json({ data: null, error: 'Некорректный формат email' });
		}

		const emailNormalized = email.trim().toLowerCase();

		const user = await User.findOne({ email: emailNormalized });
		if (!user) {
			return res.json({
				data: null,
				error: 'Пользователь с таким email не найден',
			});
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			return res.json({ data: null, error: 'Неверный пароль' });
		}

		const token = generate({ id: user.id });

		res.cookie('token', token, { httpOnly: true, sameSite: 'strict' }).json({
			data: mapUser(user),
			error: null,
		});
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const logout = async (req, res) => {
	try {
		res.clearCookie('token').json({ data: null, error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};
