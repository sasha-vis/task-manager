import { Outlet } from 'react-router-dom';
import { Sidebar } from './components';

export const MainPage = () => {
	return (
		<div className="flex">
			<Sidebar />
			<div className="flex-1 p-6">
				<Outlet />
			</div>
		</div>
	);
};
