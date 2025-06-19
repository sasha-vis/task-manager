import { useSelector } from 'react-redux';
import { selectModal } from '../selectors';
import { setModal } from '../actions';
import { useDispatch } from 'react-redux';

export const Modal = () => {
	const dispatch = useDispatch();
	const modal = useSelector(selectModal);

	const closeModal = (e) => {
		if (e.target.dataset.id === 'modal' || e.target.dataset.id === 'close-btn') {
			dispatch(setModal(null));
		}
	};

	if (!modal) return null;

	return (
		<div
			data-id="modal"
			className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
			onClick={closeModal}
		>
			<div className="bg-white rounded-lg p-6 w-full max-w-md">
				<div className="flex justify-between items-center mb-4">
					<h2 className="text-lg font-semibold">{modal.title}</h2>
					<button
						data-id="close-btn"
						className="text-gray-500 hover:text-gray-700 text-2xl"
					>
						&times;
					</button>
				</div>
				{modal.content}
			</div>
		</div>
	);
};
