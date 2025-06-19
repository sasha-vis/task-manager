import { useSelector } from 'react-redux';
import { selectUser } from '../../selectors';

export const WelcomePage = () => {
	const user = useSelector(selectUser);
	return (
		<div>
			<h1 className="text-3xl font-bold mb-4">
				Добро пожаловать, {user.name} {user.surname}!
			</h1>
			<p>Здесь будет статистика и аналитика по вашим проектам и задачам.</p>
		</div>
	);
};
