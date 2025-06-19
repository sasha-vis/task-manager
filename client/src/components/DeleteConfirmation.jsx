import { useDispatch } from 'react-redux';
import { Button } from './Button.jsx';
import { useNavigate } from 'react-router-dom';

export const DeleteConfirmation = ({ to, deleteEntity }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleDelete = async () => {
		dispatch(deleteEntity()).then((result) => {
			if (result.success) {
				navigate(to);
			}
		});
	};

	return (
		<div>
			<p>Вы уверены, что хотите удалить?</p>
			<div className="flex justify-end space-x-2 mt-10">
				<Button variant="secondary" className="w-2xl" data-id="close-btn">
					Нет
				</Button>
				<Button variant="danger" className="w-2xl" onClick={handleDelete}>
					Да
				</Button>
			</div>
		</div>
	);
};
