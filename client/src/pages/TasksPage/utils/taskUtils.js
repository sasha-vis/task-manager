import * as yup from 'yup';

export const getSchema = () =>
	yup.object().shape({
		name: yup
			.string()
			.trim()
			.min(3, 'Название должно содержать минимум 3 символа')
			.max(50, 'Название не должно превышать 50 символов')
			.required('Название задачи обязательно'),
		description: yup
			.string()
			.trim()
			.max(500, 'Описание не должно превышать 500 символов'),
	});

export const getFilteredTasks = (tasks, searchQuery, filterStatus, isReverse = false) => {
	const normalizedQuery = searchQuery.trim().toLowerCase();

	let result = tasks
		.filter((task) => task.name.toLowerCase().includes(normalizedQuery))
		.filter((task) => {
			if (filterStatus === 'recent') {
				const sevenDaysAgo = new Date();
				sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
				return new Date(task.createdAt) >= sevenDaysAgo;
			}
			return true;
		});

	if (!isReverse) {
		result = [...result].reverse();
	}

	return result;
};
