import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserAsync } from '../../actions';
import { selectUser } from '../../selectors';
import { Button, InputForEdit } from '../../components';
import { getSchema, capitalize, getInitials } from './utils/formUtils.js';

export const ProfilePage = () => {
	const user = useSelector(selectUser);
	const [isEditing, setIsEditing] = useState(false);
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		defaultValues: {
			name: user.name,
			surname: user.surname,
			email: user.email,
		},
		resolver: yupResolver(getSchema()),
	});

	const toggleEdit = () => {
		setIsEditing(!isEditing);
		reset({
			name: user.name,
			surname: user.surname,
			email: user.email,
		});
	};

	const sendFormData = (updateUserAsync) => (data) => {
		const submitData = {
			...data,
			name: capitalize(data.name),
			surname: capitalize(data.surname),
		};

		if (
			submitData.name !== user.name ||
			submitData.surname !== user.surname ||
			submitData.email !== user.email
		) {
			dispatch(updateUserAsync(user.id, submitData));
		}

		setIsEditing(false);
	};

	return (
		<div className="flex-1 p-6 bg-gray-100">
			<h1 className="text-2xl font-bold mb-4 text-gray-800">Профиль</h1>
			<div className="mx-auto bg-white p-6 rounded-lg shadow-md">
				<div className="mb-6">
					<div
						className="h-18 w-18 rounded-full flex items-center justify-center text-white text-2xl font-bold"
						style={{ backgroundColor: '#2b7fff' }}
					>
						{getInitials(user.name, user.surname)}
					</div>
				</div>
				<form onSubmit={handleSubmit(sendFormData(updateUserAsync))}>
					<InputForEdit
						id="name"
						label="Имя"
						register={register('name')}
						error={errors.name}
						isEditing={isEditing}
						inputValue={user.name}
					/>
					<InputForEdit
						id="surname"
						label="Фамилия"
						register={register('surname')}
						error={errors.surname}
						isEditing={isEditing}
						inputValue={user.surname}
					/>
					<InputForEdit
						id="email"
						label="Email"
						register={register('email')}
						error={errors.email}
						type="email"
						isEditing={isEditing}
						inputValue={user.email}
					/>
					<InputForEdit
						label="Дата регистрации"
						inputValue={new Date(user.registeredAt).toLocaleDateString()}
					/>
					<div className="flex justify-end space-x-2">
						{isEditing ? (
							<>
								<Button
									variant="secondary"
									type="button"
									onClick={toggleEdit}
								>
									Отмена
								</Button>
								<Button variant="primary" type="submit">
									Сохранить
								</Button>
							</>
						) : (
							<Button variant="primary" type="button" onClick={toggleEdit}>
								Редактировать
							</Button>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};
