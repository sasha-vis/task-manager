import jwt from 'jsonwebtoken';

export function generate(data) {
	return jwt.sign(data, process.env.JWT_SECRET || 'appsecret', {
		expiresIn: process.env.JWT_EXPIRATION || '1h',
	});
}

export function verify(token) {
	return jwt.verify(token, process.env.JWT_SECRET || 'appsecret');
}
