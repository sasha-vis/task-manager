import validator from 'validator';
import Project from '../models/projectModel.js';
import Task from '../models/taskModel.js';
import { mapProject } from '../helpers/mappers.js';

export const createProject = async (req, res) => {
	try {
		const { name, description } = req.body;

		if (!name || !validator.isLength(name.trim(), { min: 3, max: 100 })) {
			return res.json({
				data: null,
				error: 'Название проекта должно быть от 3 до 100 символов',
			});
		}

		if (description && !validator.isLength(description.trim(), { max: 500 })) {
			return res.json({
				data: null,
				error: 'Описание не должно превышать 500 символов',
			});
		}

		const project = await Project.create({
			name: name.trim(),
			description: description ? description.trim() : '',
			ownerId: req.user._id,
		});

		res.json({ data: mapProject(project), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const getProjects = async (req, res) => {
	try {
		const projects = await Project.find({ ownerId: req.user._id });
		res.json({ data: projects.map(mapProject), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const getProject = async (req, res) => {
	try {
		const { id } = req.params;
		if (!validator.isMongoId(id)) {
			return res.json({ data: null, error: 'Неверный ID проекта' });
		}

		const project = await Project.findOne({ _id: id, ownerId: req.user._id });
		if (!project) {
			return res.json({
				data: null,
				error: 'Проект не найден или доступ запрещен',
			});
		}

		res.json({ data: mapProject(project), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const updateProject = async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description } = req.body;

		if (!validator.isMongoId(id)) {
			return res.json({ data: null, error: 'Неверный ID проекта' });
		}

		if (name && !validator.isLength(name.trim(), { min: 3, max: 100 })) {
			return res.json({
				data: null,
				error: 'Название проекта должно быть от 3 до 100 символов',
			});
		}

		if (description && !validator.isLength(description.trim(), { max: 500 })) {
			return res.json({
				data: null,
				error: 'Описание не должно превышать 500 символов',
			});
		}

		const project = await Project.findOneAndUpdate(
			{ _id: id, ownerId: req.user._id },
			{
				...(name && { name: name.trim() }),
				...(description !== undefined && {
					description: description ? description.trim() : '',
				}),
			},
			{ new: true },
		);

		if (!project) {
			return res.json({
				data: null,
				error: 'Проект не найден или доступ запрещен',
			});
		}

		res.json({ data: mapProject(project), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const deleteProject = async (req, res) => {
	try {
		const { id } = req.params;
		if (!validator.isMongoId(id)) {
			return res.json({ data: null, error: 'Неверный ID проекта' });
		}

		const project = await Project.findOneAndDelete({
			_id: id,
			ownerId: req.user._id,
		});
		if (!project) {
			return res.json({
				data: null,
				error: 'Проект не найден или доступ запрещен',
			});
		}

		await Task.deleteMany({ projectId: id });

		res.json({ data: null, error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};
