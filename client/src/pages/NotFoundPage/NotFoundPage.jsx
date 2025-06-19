import { Link } from 'react-router-dom';
import { FaExclamationTriangle } from 'react-icons/fa';
import { Button } from '../../components';

export const NotFoundPage = () => {
	return (
		<div className="min-h-screen bg-gray-100 flex items-center justify-center">
			<div className="text-center p-6">
				<FaExclamationTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
				<h1 className="text-4xl font-bold text-gray-800 mb-2">
					404 - Страница не найдена
				</h1>
				<p className="text-lg text-gray-600 mb-6">
					Извините, но запрашиваемая страница не существует.
				</p>
				<Link to="/">
					<Button variant="primary" className="mx-auto">
						Вернуться на главную
					</Button>
				</Link>
			</div>
		</div>
	);
};
