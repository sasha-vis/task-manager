export const InputField = ({
	id,
	label,
	icon: Icon,
	register,
	error,
	type = 'text',
	...props
}) => {
	return (
		<div className="mb-4">
			<label
				htmlFor={id}
				className="text-sm font-medium text-gray-700 flex items-center"
			>
				{Icon && <Icon className="mr-2" />}
				{label}
			</label>
			<input
				id={id}
				type={type}
				className="mt-1 w-full p-2 border rounded-md focus:ring focus:ring-blue-300 disabled:bg-gray-100"
				{...register}
				{...props}
			/>
			{error && <p className="text-red-500 text-sm mt-1">{error.message}</p>}
		</div>
	);
};
