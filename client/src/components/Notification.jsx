import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { selectNotification } from '../selectors';
import { setNotification } from '../actions';

export const Notification = () => {
	const dispatch = useDispatch();
	const notification = useSelector(selectNotification);

	useEffect(() => {
		if (notification) {
			if (notification.type === 'error') {
				toast.error(notification.message, {
					style: {
						background: '#fee2e2',
						color: '#b91c1c',
						border: '1px solid #b91c1c',
					},
				});
			} else if (notification.type === 'success') {
				toast.success(notification.message, {
					style: {
						background: '#dcfce7',
						color: '#15803d',
						border: '1px solid #15803d',
					},
				});
			}
			dispatch(setNotification(null));
		}
	}, [notification, dispatch]);

	return null;
};
