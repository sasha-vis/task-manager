import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { loginUserAsync } from '../actions';
import { selectLoading } from '../selectors';

const schema = yup.object().shape({
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

export const LoginPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const loading = useSelector(selectLoading);
	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = (data) => {
		dispatch(loginUserAsync(data)).then((result) => {
			if (result.success) {
				navigate('/');
			}
		});
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
				<form onSubmit={handleSubmit(onSubmit)}>
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
							{...register('email')}
							className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
							autoFocus
							disabled={loading || isSubmitting}
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1">
								{errors.email.message}
							</p>
						)}
					</div>
					<div className="mb-6">
						<label
							htmlFor="password"
							className="text-sm font-medium text-gray-700 flex items-center"
						>
							<FaLock className="mr-2" /> Пароль
						</label>
						<input
							id="password"
							type="password"
							{...register('password')}
							className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
							disabled={loading || isSubmitting}
						/>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1">
								{errors.password.message}
							</p>
						)}
					</div>
					<button
						type="submit"
						className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400"
						disabled={loading || isSubmitting}
					>
						{loading || isSubmitting ? 'Вход...' : 'Войти'}
					</button>
				</form>
				<p className="mt-4 text-center text-sm">
					Нет аккаунта?{' '}
					<Link to="/register" className="text-blue-600 hover:underline">
						Зарегистрироваться
					</Link>
				</p>
			</div>
		</div>
	);
};
