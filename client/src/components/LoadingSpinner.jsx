import { useSelector } from 'react-redux';
import { selectLoading } from '../selectors';

export const LoadingSpinner = () => {
	const isLoading = useSelector(selectLoading);

	return (
		isLoading && (
			<div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black/50">
				<div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
				<p className="ml-2 text-white">Загрузка...</p>
			</div>
		)
	);
};
