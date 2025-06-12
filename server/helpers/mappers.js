export function mapUser(user) {
	return {
		id: user.id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		roleId: user.role,
		registeredAt: user.createdAt,
	};
}
