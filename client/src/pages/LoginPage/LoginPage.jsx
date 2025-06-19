import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAsync } from '../../actions';
import { selectAuthentication } from '../../selectors';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { Button, InputField } from '../../components';
import { getSchema } from './utils/formUtils.js';

export const LoginPage = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const isAuthenticated = useSelector(selectAuthentication);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(getSchema()),
	});

	const sendFormData = (loginUserAsync) => (data) => {
		dispatch(loginUserAsync(data));
	};

	useEffect(() => {
		if (isAuthenticated) navigate('/');
	}, [isAuthenticated, navigate]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Вход</h2>
				<form onSubmit={handleSubmit(sendFormData(loginUserAsync))}>
					<InputField
						id="email"
						label="Email"
						icon={FaEnvelope}
						register={register('email')}
						error={errors.email}
						type="email"
						autoFocus
					/>
					<InputField
						id="password"
						label="Пароль"
						icon={FaLock}
						register={register('password')}
						error={errors.password}
						type="password"
					/>
					<Button type="submit" className="block w-48 mx-auto mt-10">
						Войти
					</Button>
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
