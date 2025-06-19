import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getTasksAsync, setModal } from '../../actions';
import { selectTasks } from '../../selectors';
import { Button } from '../../components';
import { getFilteredTasks } from './utils/taskUtils';
import { useParams } from 'react-router-dom';
import { TaskForm } from './components/TaskForm';
import { TaskCard } from './components/TaskCard';

export const TasksPage = () => {
	const dispatch = useDispatch();
	const tasks = useSelector(selectTasks);
	const { projectId } = useParams();
	const [editingTaskId, setEditingTaskId] = useState(null);

	const [searchQuery, setSearchQuery] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
	const [isReverse, setIsReverse] = useState(false);

	const filteredTasks = getFilteredTasks(tasks, searchQuery, filterStatus, isReverse);

	const handleCreateTask = () => {
		dispatch(
			setModal({
				title: 'Создание новой задачи',
				content: <TaskForm projectId={projectId} />,
			}),
		);
	};

	useEffect(() => {
		dispatch(getTasksAsync(projectId));
	}, [dispatch, projectId]);

	return (
		<div className="flex-1 p-6">
			<div>
				<div className="mb-6 flex space-x-4 items-center">
					<input
						type="text"
						placeholder="Поиск задач..."
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className="border rounded-md p-2 flex-1"
					/>
					<select
						value={filterStatus}
						onChange={(e) => setFilterStatus(e.target.value)}
						className="border rounded-md p-2"
					>
						<option value="all">Все</option>
						<option value="recent">Недавние</option>
					</select>
					<label className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={isReverse}
							onChange={(e) => setIsReverse(e.target.checked)}
							className="w-6 h-6"
						/>
						<span className="ml-1">По дате</span>
					</label>
					<Button onClick={handleCreateTask}>Создать задачу</Button>
				</div>

				{filteredTasks.length === 0 && <p>Задач пока нет</p>}

				<div className="grid gap-4">
					{filteredTasks.map((task) => (
						<TaskCard
							key={task.id}
							projectId={projectId}
							task={task}
							editingTaskId={editingTaskId}
							setEditingTaskId={setEditingTaskId}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
