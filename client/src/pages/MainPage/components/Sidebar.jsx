import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setModal } from '../../../actions';
import { Button } from '../../../components';
import {
	FaBars,
	FaTimes,
	FaHome,
	FaUser,
	FaProjectDiagram,
	FaSignOutAlt,
} from 'react-icons/fa';
import { SidebarItem } from './SidebarItem.jsx';
import { LogoutConfirmation } from './LogoutConfirmation.jsx';

const STORAGE_KEY = 'task-manager:sidebar-collapsed';

export const Sidebar = () => {
	const dispatch = useDispatch();
	const [isCollapsed, setIsCollapsed] = useState(() => {
		const savedState = localStorage.getItem(STORAGE_KEY);
		return savedState ? JSON.parse(savedState) : false;
	});

	const toggleSidebar = () => {
		const newState = !isCollapsed;
		setIsCollapsed(newState);
		localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
	};

	const openModalForLogout = () => {
		dispatch(
			setModal({
				title: 'Подтверждение выхода',
				content: <LogoutConfirmation />,
			}),
		);
	};

	return (
		<div
			className={`sticky top-0 left-0 bottom-0 bg-gray-800 text-white h-screen flex flex-col ${
				isCollapsed ? 'w-16' : 'w-64'
			}`}
		>
			<div
				className={`flex items-center p-4 border-b border-gray-700 ${
					isCollapsed ? 'justify-center' : 'justify-between'
				}`}
			>
				{!isCollapsed && <h2 className="font-bold">Task Manager</h2>}

				<button
					onClick={toggleSidebar}
					className="text-gray-300 hover:text-white"
				>
					{isCollapsed ? (
						<FaBars className="h-5 w-5" />
					) : (
						<FaTimes className="h-5 w-5" />
					)}
				</button>
			</div>

			<nav className="flex-grow p-4">
				<ul className="space-y-2">
					<SidebarItem to="/" isCollapsed={isCollapsed} icon={FaHome}>
						Главная
					</SidebarItem>
					<SidebarItem to="/profile" isCollapsed={isCollapsed} icon={FaUser}>
						Профиль
					</SidebarItem>
					<SidebarItem
						to="/projects"
						isCollapsed={isCollapsed}
						icon={FaProjectDiagram}
					>
						Проекты
					</SidebarItem>
				</ul>
			</nav>

			<div className="p-2 border-t border-gray-700">
				<Button
					variant="danger"
					className={`w-full flex items-center justify-center ${
						isCollapsed ? 'p-2' : 'px-4 py-2'
					}`}
					onClick={openModalForLogout}
				>
					<FaSignOutAlt className={isCollapsed ? 'h-5 w-5' : 'h-4 w-4 mr-2'} />
					{!isCollapsed && 'Выйти'}
				</Button>
			</div>
		</div>
	);
};
