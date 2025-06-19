import { NavLink } from 'react-router-dom';

export const SidebarItem = ({ isCollapsed, icon: Icon, children, ...props }) => {
	return (
		<li>
			<NavLink
				className={({ isActive }) =>
					`flex items-center p-2 rounded hover:bg-gray-700 transition-colors
                ${isActive ? 'bg-gray-700 text-blue-300' : 'text-gray-300'}
                ${isCollapsed ? 'justify-center' : ''}`
				}
				{...props}
			>
				{Icon && <Icon className="h-5 w-5" />}
				{!isCollapsed && <span className="ml-3">{children}</span>}
			</NavLink>
		</li>
	);
};
