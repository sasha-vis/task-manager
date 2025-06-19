export const InputForEdit = ({
	id,
	label,
	register,
	error,
	type = 'text',
	isEditing = false,
	inputValue,
	...props
}) => {
	return (
		<div className="mb-4">
			<label className="block text-gray-700 font-medium mb-1">{label}</label>
			{isEditing ? (
				<>
					<input
						id={id}
						type={type}
						className={`w-3xs px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
							error ? 'border-red-500' : 'border-gray-300'
						}`}
						{...register}
						{...props}
					/>
					{error && (
						<p className="text-red-500 text-sm mt-1">{error.message}</p>
					)}
				</>
			) : (
				<p className="text-gray-600 py-2 border-1 border-transparent">
					{inputValue}
				</p>
			)}
		</div>
	);
};
