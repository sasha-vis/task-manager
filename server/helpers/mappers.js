export function mapUser(user) {
	return {
		id: user.id,
		name: user.name,
		surname: user.surname,
		email: user.email,
		roleId: user.role,
		registeredAt: user.createdAt,
		updatedAt: user.updatedAt,
	};
}

export function mapProject(project) {
	return {
		id: project.id,
		name: project.name,
		description: project.description,
		ownerId: project.ownerId,
		createdAt: project.createdAt,
		updatedAt: project.updatedAt,
	};
}

export function mapTask(task) {
	return {
		id: task.id,
		name: task.name,
		description: task.description,
		projectId: task.projectId,
		createdAt: task.createdAt,
		updatedAt: task.updatedAt,
	};
}
