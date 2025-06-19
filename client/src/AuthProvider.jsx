import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync } from './actions';
import { selectAuthChecking } from './selectors';

export const AuthProvider = ({ children }) => {
	const dispatch = useDispatch();
	const isAuthChecking = useSelector(selectAuthChecking);

	useEffect(() => {
		dispatch(checkAuthAsync());
	}, [dispatch]);

	if (isAuthChecking) {
		return (
			<div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 bg-black/50">
				<div className="w-6 h-6 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
				<p className="ml-2 text-white">Проверка аутентификации...</p>
			</div>
		);
	}

	return children;
};
