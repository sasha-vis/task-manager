import User from '../models/userModel.js';
import { verify } from '../helpers/token.js';

export const checkAuthentication = async (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		res.json({ data: null, error: 'Токен авторизации не предоставлен' });
		return;
	}

	const tokenData = verify(token);
	if (!tokenData || !tokenData.id) {
		res.clearCookie('token').json({
			data: null,
			error: 'Неверный токен авторизации',
		});
		return;
	}

	const user = await User.findOne({ _id: tokenData.id }).select('-password');
	if (!user) {
		res.clearCookie('token').json({ data: null, error: 'Пользователь не найден' });
		return;
	}

	req.user = user;
	next();
};
