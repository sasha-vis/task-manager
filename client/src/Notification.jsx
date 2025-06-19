import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectNotification } from './selectors';
import toast from 'react-hot-toast';

export const Notification = () => {
	const notification = useSelector(selectNotification);

	useEffect(() => {
		if (notification) {
			const { type, message } = notification;
			if (type === 'success') {
				toast.success(message, {
					style: { background: '#10B981', color: '#fff' },
				});
			} else if (type === 'error') {
				toast.error(message, {
					style: { background: '#EF4444', color: '#fff' },
				});
			}
		}
	}, [notification]);

	return null;
};
