import { Link } from 'react-router-dom';

export const Breadcrumbs = ({ items }) => {
	return (
		<nav className="mb-4">
			<ol className="flex items-center text-sm text-gray-600">
				{items.map((item, index) => (
					<li key={item.to || item.name} className="flex items-center">
						{index < items.length - 1 ? (
							<Link to={item.to} className="hover:underline">
								{item.name}
							</Link>
						) : (
							<span>{item.name}</span>
						)}
						{index < items.length - 1 && <span className="mx-2">{'>'}</span>}
					</li>
				))}
			</ol>
		</nav>
	);
};
