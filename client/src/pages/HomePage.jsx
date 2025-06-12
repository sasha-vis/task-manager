import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { logoutUserAsync } from '../actions';
import { selectUser } from '../selectors';

export const HomePage = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const user = useSelector(selectUser);

	const handleLogout = async () => {
		await dispatch(logoutUserAsync());
		navigate('/login');
	};

	return (
		<div className="min-h-screen flex">
			<div className="w-64 bg-gray-800 text-white p-4">
				<h2 className="text-xl font-bold mb-4">Menu</h2>
				<nav>
					<ul>
						<li className="mb-2">
							<Link to="/profile" className="hover:text-blue-300">
								Профиль
							</Link>
						</li>
						<li className="mb-2">
							<Link to="/my-projects" className="hover:text-blue-300">
								Мои проекты
							</Link>
						</li>
						<li className="mb-2">
							<Link to="/tasks" className="hover:text-blue-300">
								Задачи
							</Link>
						</li>
					</ul>
				</nav>
				<button
					onClick={handleLogout}
					className="mt-4 w-full py-2 bg-red-600 rounded-md hover:bg-red-700"
				>
					Выйти
				</button>
			</div>
			<div className="flex-1 p-8">
				<h1 className="text-3xl font-bold mb-4">
					Добро пожаловать, {user?.name} {user?.surname}!
				</h1>
				<p>Здесь будет статистика и аналитика по вашим проектам и задачам.</p>
			</div>
		</div>
	);
};
