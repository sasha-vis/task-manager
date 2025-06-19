import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateProjectAsync, setModal, deleteProjectAsync } from '../../../actions';
import { Button, DeleteConfirmation } from '../../../components';
import { getSchema } from '../../ProjectsPage/utils';
import { selectProject } from '../../../selectors';

export const ProjectOverview = () => {
	const dispatch = useDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const { projectId } = useParams();
	const project = useSelector(selectProject);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(getSchema()),
		values: project
			? {
					name: project.name,
					description: project.description,
			  }
			: {},
	});

	const sendFormData = (updateProjectAsync) => (data) => {
		if (data.name !== project.name || data.description !== project.description) {
			dispatch(updateProjectAsync(projectId, data));
		}
		setIsEditing(false);
	};

	const openModalForDelete = () => {
		dispatch(
			setModal({
				title: 'Подтверждение удаления',
				content: (
					<DeleteConfirmation
						to={`/projects`}
						deleteEntity={() => deleteProjectAsync(projectId)}
					/>
				),
			}),
		);
	};

	if (!project) return <p>Проект не найден</p>;

	return (
		<div>
			{isEditing ? (
				<form
					onSubmit={handleSubmit(sendFormData(updateProjectAsync))}
					className="space-y-4"
				>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Название
						</label>
						<input
							{...register('name')}
							className={`mt-1 block w-full border rounded-md p-2 ${
								errors.name ? 'border-red-500' : 'border-gray-300'
							}`}
						/>
						{errors.name && (
							<p className="text-red-500 text-sm">{errors.name.message}</p>
						)}
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700">
							Описание
						</label>
						<textarea
							{...register('description')}
							className={`mt-1 block w-full border rounded-md p-2 ${
								errors.description ? 'border-red-500' : 'border-gray-300'
							}`}
							rows={4}
						/>
						{errors.description && (
							<p className="text-red-500 text-sm">
								{errors.description.message}
							</p>
						)}
					</div>
					<div className="flex justify-end space-x-2">
						<Button
							variant="secondary"
							onClick={() => {
								setIsEditing(false);
							}}
						>
							Отмена
						</Button>
						<Button type="submit">Сохранить</Button>
					</div>
				</form>
			) : (
				<div className="flex flex-col gap-5">
					<p>
						<strong>Название:</strong> {project.name}
					</p>
					<p>
						<strong>Описание:</strong> {project.description || 'Без описания'}
					</p>
					<p>
						<strong>Создан:</strong>{' '}
						{new Date(project.createdAt).toLocaleDateString()}
					</p>
					<div className="mt-10 flex space-x-2">
						<Button onClick={() => setIsEditing(true)}>Редактировать</Button>
						<Button variant="danger" onClick={openModalForDelete}>
							Удалить
						</Button>
					</div>
				</div>
			)}
		</div>
	);
};
