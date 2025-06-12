import bcrypt from 'bcrypt';
import User from '../models/userModel.js';
import { generate } from '../helpers/token.js';
import { mapUser } from '../helpers/mappers.js';

export const getMe = async (req, res) => {
	try {
		const user = req.user;
		if (!user) {
			throw new Error('Пользователь не найден');
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
			throw new Error('Все необходимые поля должны быть заполнены');
		}

		const emailNormalized = email.trim().toLowerCase();

		const existingUser = await User.findOne({ email: emailNormalized });
		if (existingUser) {
			throw new Error('Пользователь с таким email уже существует');
		}

		const passwordHash = await bcrypt.hash(password, 10);

		const user = await User.create({
			name,
			surname,
			email: emailNormalized,
			password: passwordHash,
		});

		const token = generate({ id: user.id });

		res.cookie('token', token, { httpOnly: true }).json({
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
			throw new Error('Все необходимые поля должны быть заполнены');
		}

		const emailNormalized = email.trim().toLowerCase();

		const user = await User.findOne({ email: emailNormalized });
		if (!user) {
			throw new Error('Пользователь с таким email не найден');
		}

		const isPasswordMatch = await bcrypt.compare(password, user.password);
		if (!isPasswordMatch) {
			throw new Error('Неверный пароль');
		}

		const token = generate({ id: user.id });

		res.cookie('token', token, { httpOnly: true }).json({
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
