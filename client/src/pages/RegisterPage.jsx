import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { registerUserAsync } from '../actions';
import { selectLoading } from '../selectors';

const schema = yup.object().shape({
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
		.max(30, 'Фамилия не должна превышать 30 символов')
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

const capitalize = (value) => {
	if (typeof value !== 'string') return value;
	const trimmed = value.trim();
	return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
};

export const RegisterPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector(selectLoading);
	const {
		register: formRegister,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		const submitData = {
			...data,
			name: capitalize(data.name),
			surname: capitalize(data.surname),
		};
		delete submitData.confirmPassword;

		dispatch(registerUserAsync(submitData)).then((result) => {
			if (result.success) {
				navigate('/');
			}
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className="flex gap-4 mb-4">
						<div className="flex-1">
							<label
								htmlFor="name"
								className="text-sm font-medium text-gray-700 flex items-center"
							>
								<FaUser className="mr-2" /> Имя
							</label>
							<input
								id="name"
								type="text"
								{...formRegister('name')}
								className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
								autoFocus
								disabled={loading || isSubmitting}
							/>
							{errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name.message}
								</p>
							)}
						</div>
						<div className="flex-1">
							<label
								htmlFor="surname"
								className="text-sm font-medium text-gray-700 flex items-center"
							>
								<FaUser className="mr-2" /> Фамилия
							</label>
							<input
								id="surname"
								type="text"
								{...formRegister('surname')}
								className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
								disabled={loading || isSubmitting}
							/>
							{errors.surname && (
								<p className="text-red-500 text-sm mt-1">
									{errors.surname.message}
								</p>
							)}
						</div>
					</div>
					<div className="mb-4">
						<label
							htmlFor="email"
							className="text-sm font-medium text-gray-700 flex items-center"
						>
							<FaEnvelope className="mr-2" /> Email
						</label>
						<input
							id="email"
							type="email"
							{...formRegister('email')}
							className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
							disabled={loading || isSubmitting}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>
					<div className="mb-4">
						<label
							htmlFor="password"
							className="text-sm font-medium text-gray-700 flex items-center"
						>
							<FaLock className="mr-2" /> Пароль
						</label>
						<input
							id="password"
							type="password"
							{...formRegister('password')}
							className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
							disabled={loading || isSubmitting}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>
					<div className="mb-6">
						<label
							htmlFor="confirmPassword"
							className="text-sm font-medium text-gray-700 flex items-center"
						>
							<FaLock className="mr-2" /> Подтвердите пароль
						</label>
						<input
							id="confirmPassword"
							type="password"
							{...formRegister('confirmPassword')}
							className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
							disabled={loading || isSubmitting}
						/>
						{errors.confirmPassword && (
							<p className="text-red-500 text-sm mt-1">
								{errors.confirmPassword.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
						disabled={loading || isSubmitting}
					>
						{loading || isSubmitting
							? 'Регистрация...'
							: 'Зарегистрироваться'}
					</button>
				</form>
				<p className="mt-4 text-center text-sm">
					У вас уже есть аккаунт?{' '}
					<Link to="/login" className="text-blue-600 hover:underline">
						Войти
					</Link>
				</p>
			</div>
		</div>
	);
};
