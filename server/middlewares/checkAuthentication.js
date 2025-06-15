import User from '../models/userModel.js';
import { verify } from '../helpers/token.js';

export async function checkAuthentication(req, res, next) {
	const token = req.cookies.token;
	if (!token) {
		return res.json({ data: null, error: 'Токен авторизации не предоставлен' });
	}

	try {
		const tokenData = verify(token);
		if (!tokenData || !tokenData.id) {
			return res
				.clearCookie('token')
				.json({ data: null, error: 'Неверный токен авторизации' });
		}

		const user = await User.findOne({ _id: tokenData.id }).select('-password');
		if (!user) {
			return res
				.clearCookie('token')
				.json({ data: null, error: 'Пользователь не найден' });
		}

		req.user = user;
		next();
	} catch (error) {
		return res
			.clearCookie('token')
			.json({ data: null, error: 'Неверный токен авторизации' });
	}
}
