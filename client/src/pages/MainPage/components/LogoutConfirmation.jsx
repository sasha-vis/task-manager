import { useDispatch } from 'react-redux';
import { logoutUserAsync } from '../../../actions';
import { Button } from './../../../components';

export const LogoutConfirmation = () => {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		dispatch(logoutUserAsync());
	};

	return (
		<div>
			<p>Вы уверены, что хотите выйти?</p>
			<div className="flex justify-end space-x-2 mt-10">
				<Button variant="secondary" className="w-2xl" data-id="close-btn">
					Нет
				</Button>
				<Button variant="danger" className="w-2xl" onClick={handleLogout}>
					Да
				</Button>
			</div>
		</div>
	);
};
