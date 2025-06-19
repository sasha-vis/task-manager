import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate, Outlet, useLocation } from 'react-router-dom';
import { getProjectAsync, resetTasks, setProject } from '../../actions';
import { selectProject } from '../../selectors';
import { ProjectOverview } from './components/ProjectOverview';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Button } from '../../components';

export const ProjectPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const dispatch = useDispatch();
	const { projectId } = useParams();
	const project = useSelector(selectProject);

	useEffect(() => {
		dispatch(getProjectAsync(projectId));
		return () => {
			dispatch(setProject(null));
			dispatch(resetTasks());
		};
	}, [dispatch, projectId]);

	const isOverview =
		location.pathname.endsWith(`/${projectId}`) ||
		location.pathname.endsWith(`/${projectId}/`);
	const isTasks = location.pathname.includes(`/tasks`);

	const goOverview = () => navigate(`/projects/${projectId}`);
	const goTasks = () => navigate(`/projects/${projectId}/tasks`);

	return (
		<div className="flex-1 p-6">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">{project ? project.name : 'null'}</h1>
				<Button variant="danger" onClick={() => navigate('/projects')}>
					Закрыть
				</Button>
			</div>
			<Breadcrumbs
				items={[
					{ name: 'Проекты', to: '/projects' },
					{ name: project ? `Проект (${project.id})` : 'null' },
				]}
			/>
			{!project ? (
				<p className="mt-10">Проект не найден</p>
			) : (
				<>
					<div className="flex border-b mb-4">
						<button
							className={`px-4 py-2 ${
								isOverview ? 'border-b-2 border-blue-600' : ''
							}`}
							onClick={goOverview}
						>
							Обзор
						</button>
						<button
							className={`px-4 py-2 ${
								isTasks ? 'border-b-2 border-blue-600' : ''
							}`}
							onClick={goTasks}
						>
							Задачи
						</button>
					</div>
					{isOverview && <ProjectOverview />}
					{isTasks && <Outlet />}
				</>
			)}
		</div>
	);
};
