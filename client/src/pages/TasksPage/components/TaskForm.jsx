import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { createTaskAsync } from '../../../actions';
import { Button } from '../../../components';
import { getSchema } from '../utils/taskUtils';

export const TaskForm = ({ projectId }) => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(getSchema()),
	});

	const sendFormData = (createTaskAsync) => (data) => {
		dispatch(createTaskAsync(projectId, data));
	};

	return (
		<div>
			<form onSubmit={handleSubmit(sendFormData(createTaskAsync))}>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-gray-700 font-medium mb-1"
					>
						Название
					</label>
					<input
						id="name"
						type="text"
						{...register('name')}
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							errors.name ? 'border-red-500' : 'border-gray-300'
						}`}
						autoFocus
					/>
					{errors.name && (
						<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
					)}
				</div>
				<div className="mb-4">
					<label
						htmlFor="description"
						className="block text-gray-700 font-medium mb-1"
					>
						{'Описание (необязательно)'}
					</label>
					<textarea
						id="description"
						{...register('description')}
						className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							errors.description ? 'border-red-500' : 'border-gray-300'
						}`}
						rows="4"
					/>
					{errors.description && (
						<p className="text-red-500 text-sm mt-1">
							{errors.description.message}
						</p>
					)}
				</div>
				<div className="flex justify-end space-x-2 mt-10">
					<Button
						variant="secondary"
						type="button"
						className=""
						data-id="close-btn"
					>
						Отмена
					</Button>
					<Button variant="primary" type="submit" className="">
						Создать
					</Button>
				</div>
			</form>
		</div>
	);
};
