import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch } from 'react-redux';
import { Button, DeleteConfirmation } from '../../../components';
import { getSchema } from '../utils/taskUtils';
import { updateTaskAsync, deleteTaskAsync, setModal } from '../../../actions';

export const TaskCard = ({ task, editingTaskId, setEditingTaskId, projectId }) => {
	const dispatch = useDispatch();
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(getSchema()),
		values: task
			? {
					name: task.name,
					description: task.description,
			  }
			: {},
	});

	const handleEditTask = () => {
		setEditingTaskId(task.id);
	};

	const sendFormData = (updateTaskAsync) => (data) => {
		if (data.name !== task.name || data.description !== task.description) {
			dispatch(updateTaskAsync(projectId, task.id, data));
		}
		setEditingTaskId(null);
	};

	const handleCancelEdit = () => {
		setEditingTaskId(null);
		reset();
	};

	const openModalForDelete = () => {
		dispatch(
			setModal({
				title: 'Подтверждение удаления',
				content: (
					<DeleteConfirmation
						to={`/projects/${projectId}/tasks`}
						deleteEntity={() => deleteTaskAsync(projectId, task.id)}
					/>
				),
			}),
		);
	};

	return (
		<div className="border p-4 rounded shadow hover:bg-gray-50 flex justify-between items-start">
			<div className="flex-1">
				{editingTaskId === task.id ? (
					<form onSubmit={handleSubmit(sendFormData(updateTaskAsync))}>
						<div className="flex justify-between">
							<div className="w-2xl">
								<div className="mb-5">
									<input
										{...register('name')}
										className={`w-3xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
											errors.name
												? 'border-red-500'
												: 'border-gray-300'
										}`}
									/>
									{errors.name && (
										<p className="text-red-500 text-sm">
											{errors.name.message}
										</p>
									)}
								</div>
								<div>
									<textarea
										{...register('description')}
										className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
											errors.description
												? 'border-red-500'
												: 'border-gray-300'
										}`}
										rows="3"
									/>
								</div>
							</div>
							<div className="space-x-2">
								<Button variant="primary" type="submit">
									Сохранить
								</Button>
								<Button
									variant="secondary"
									type="button"
									onClick={handleCancelEdit}
								>
									Отмена
								</Button>
							</div>
						</div>
					</form>
				) : (
					<div className="flex justify-between">
						<div>
							<h3 className="text-lg font-semibold mb-5">{task.name}</h3>
							<p className="text-gray-600">
								{task.description || 'Без описания'}
							</p>
						</div>
						<div className="space-x-2 ml-4">
							<Button variant="primary" onClick={handleEditTask}>
								Редактировать
							</Button>
							<Button variant="danger" onClick={openModalForDelete}>
								Удалить
							</Button>
						</div>
					</div>
				)}
				<p className="text-sm text-gray-500 mt-10">
					Обновлено: {new Date(task.updatedAt).toLocaleDateString()}
				</p>
			</div>
		</div>
	);
};
