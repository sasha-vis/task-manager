import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectsAsync, setModal } from '../../actions';
import { selectProjects } from '../../selectors';
import { Breadcrumbs, Button } from '../../components';
import { getFilteredProjects } from './utils/projectUtils';
import { ProjectForm } from './components';

export const ProjectsPage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const projects = useSelector(selectProjects);

	const [searchQuery, setSearchQuery] = useState('');
	const [filterStatus, setFilterStatus] = useState('all');
	const [isReverse, setIsReverse] = useState(false);

	const filteredProjects = getFilteredProjects(
		projects,
		searchQuery,
		filterStatus,
		isReverse,
	);

	const handleCreateProject = () => {
		dispatch(
			setModal({
				title: 'Создание нового проекта',
				content: <ProjectForm />,
			}),
		);
	};

	useEffect(() => {
		dispatch(getProjectsAsync());
	}, [dispatch]);

	return (
		<div className="flex-1 p-6">
			<h1 className="text-2xl font-bold mb-4">Мои проекты</h1>

			<Breadcrumbs items={[{ name: 'Проекты', to: '/projects' }]} />

			<div>
				<div className="mb-6 flex space-x-4 items-center">
					<input
						type="text"
						placeholder="Поиск проектов..."
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
					<Button onClick={handleCreateProject}>Создать проект</Button>
				</div>

				{filteredProjects.length === 0 && <p>Проектов пока нет</p>}

				<div className="grid gap-4">
					{filteredProjects.map((project) => (
						<div
							key={project.id}
							className="border p-4 rounded shadow hover:bg-gray-50 cursor-pointer"
							onClick={() => navigate(`/projects/${project.id}/tasks`)}
						>
							<h3 className="text-lg font-semibold">{project.name}</h3>
							<p className="text-gray-600">
								{project.description || 'Без описания'}
							</p>
							<p className="text-sm text-gray-500">
								Обновлено:{' '}
								{new Date(project.updatedAt).toLocaleDateString()}
							</p>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
