import * as yup from 'yup';

export const getSchema = () =>
	yup.object().shape({
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
	});
