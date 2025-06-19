import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserAsync } from '../../actions';
import { selectAuthentication } from '../../selectors';
import { FaUser, FaEnvelope, FaLock } from 'react-icons/fa';
import { Button, InputField } from '../../components';
import { getSchema, capitalize } from './utils/formUtils.js';

export const RegisterPage = () => {
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

	const sendFormData = (registerUserAsync) => (data) => {
		const submitData = {
			...data,
			name: capitalize(data.name),
			surname: capitalize(data.surname),
		};
		delete submitData.confirmPassword;

		dispatch(registerUserAsync(submitData));
	};

	useEffect(() => {
		if (isAuthenticated) navigate('/');
	}, [isAuthenticated, navigate]);

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
				<h2 className="text-2xl font-bold text-center mb-6">Регистрация</h2>
				<form onSubmit={handleSubmit(sendFormData(registerUserAsync))}>
					<div className="flex gap-4 mb-4">
						<InputField
							id="name"
							label="Имя"
							icon={FaUser}
							register={register('name')}
							error={errors.name}
							autoFocus
						/>
						<InputField
							id="surname"
							label="Фамилия"
							icon={FaUser}
							register={register('surname')}
							error={errors.surname}
						/>
					</div>
					<InputField
						id="email"
						label="Email"
						icon={FaEnvelope}
						register={register('email')}
						error={errors.email}
						type="email"
					/>
					<InputField
						id="password"
						label="Пароль"
						icon={FaLock}
						register={register('password')}
						error={errors.password}
						type="password"
					/>
					<InputField
						id="confirmPassword"
						label="Подтвердите пароль"
						icon={FaLock}
						register={register('confirmPassword')}
						error={errors.confirmPassword}
						type="password"
					/>
					<Button type="submit" className="block w-48 mx-auto mt-10">
						Зарегистрироваться
					</Button>
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
