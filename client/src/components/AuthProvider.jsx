import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuthAsync } from '../actions';
import { selectLoading } from '../selectors';
import { LoadingSpinner } from './LoadingSpinner.jsx';

export const AuthProvider = ({ children }) => {
	const dispatch = useDispatch();
	const loading = useSelector(selectLoading);

	useEffect(() => {
		dispatch(checkAuthAsync());
	}, [dispatch]);

	return <>{loading ? <LoadingSpinner /> : children}</>;
};
