import * as yup from 'yup';

export const getSchema = () =>
	yup.object().shape({
		name: yup
			.string()
			.trim()
			.matches(/^[A-Za-z]+$/, 'Имя может содержать только латинские буквы')
			.min(2, 'Имя должно быть не короче 2 символов')
			.max(30, 'Имя не должно превышать 30 символов')
			.required('Имя обязательно'),
		surname: yup
			.string()
			.trim()
			.matches(/^[A-Za-z]+$/, 'Фамилия может содержать только латинские буквы')
			.min(2, 'Фамилия должна быть не короче 2 символов')
			.max(30, 'Фамилия не должно превышать 30 символов')
			.required('Фамилия обязательна'),
		email: yup
			.string()
			.trim()
			.email('Некорректный email')
			.max(254, 'Email слишком длинный')
			.required('Введите email'),
		password: yup
			.string()
			.trim()
			.min(6, 'Пароль должен содержать минимум 6 символов')
			.max(64, 'Пароль слишком длинный')
			.matches(
				/^[A-Za-z0-9]+$/,
				'Пароль может содержать только латинские буквы и цифры',
			)
			.matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
			.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру')
			.required('Введите пароль'),
		confirmPassword: yup
			.string()
			.trim()
			.oneOf([yup.ref('password'), null], 'Пароли не совпадают')
			.required('Подтвердите пароль'),
	});

export const capitalize = (value) => {
	if (typeof value !== 'string') return value;
	const trimmed = value.trim();
	return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};
