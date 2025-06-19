const variantStyles = {
	primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400',
	secondary: 'bg-gray-500 text-white hover:bg-gray-600 disabled:bg-gray-300',
	danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400',
	warning: 'bg-yellow-500 text-white hover:bg-yellow-600 disabled:bg-yellow-300',
};

export const Button = ({ variant = 'primary', children, className = '', ...props }) => {
	return (
		<button
			className={`px-4 py-2 rounded-md ${variantStyles[variant]} ${className}`}
			{...props}
		>
			{children}
		</button>
	);
};
