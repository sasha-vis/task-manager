import validator from 'validator';
import Task from '../models/taskModel.js';
import Project from '../models/projectModel.js';
import { mapTask } from '../helpers/mappers.js';

export const createTask = async (req, res) => {
	try {
		const { projectId } = req.params;
		const { name, description } = req.body;

		if (!validator.isMongoId(projectId)) {
			return res.json({ data: null, error: 'Неверный ID проекта' });
		}

		const project = await Project.findOne({ _id: projectId, ownerId: req.user._id });
		if (!project) {
			return res.json({
				data: null,
				error: 'Проект не найден или доступ запрещен',
			});
		}

		if (!name || !validator.isLength(name.trim(), { min: 3, max: 100 })) {
			return res.json({
				data: null,
				error: 'Название задачи должно быть от 3 до 100 символов',
			});
		}

		if (description && !validator.isLength(description.trim(), { max: 500 })) {
			return res.json({
				data: null,
				error: 'Описание не должно превышать 500 символов',
			});
		}

		const task = await Task.create({
			name: name.trim(),
			description: description ? description.trim() : '',
			projectId,
		});

		res.json({ data: mapTask(task), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const getTasks = async (req, res) => {
	try {
		const { projectId } = req.params;
		if (!validator.isMongoId(projectId)) {
			return res.json({ data: null, error: 'Неверный ID проекта' });
		}

		const project = await Project.findOne({ _id: projectId, ownerId: req.user._id });
		if (!project) {
			return res.json({
				data: null,
				error: 'Проект не найден или доступ запрещен',
			});
		}

		const tasks = await Task.find({ projectId });
		res.json({ data: tasks.map(mapTask), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const getTask = async (req, res) => {
	try {
		const { projectId, taskId } = req.params;
		if (!validator.isMongoId(projectId) || !validator.isMongoId(taskId)) {
			return res.json({ data: null, error: 'Неверный ID проекта или задачи' });
		}

		const project = await Project.findOne({ _id: projectId, ownerId: req.user._id });
		if (!project) {
			return res.json({
				data: null,
				error: 'Проект не найден или доступ запрещен',
			});
		}

		const task = await Task.findOne({ _id: taskId, projectId });
		if (!task) {
			return res.json({ data: null, error: 'Задача не найдена' });
		}

		res.json({ data: mapTask(task), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const updateTask = async (req, res) => {
	try {
		const { projectId, taskId } = req.params;
		const { name, description } = req.body;

		if (!validator.isMongoId(projectId) || !validator.isMongoId(taskId)) {
			return res.json({ data: null, error: 'Неверный ID проекта или задачи' });
		}

		const project = await Project.findOne({ _id: projectId, ownerId: req.user._id });
		if (!project) {
			return res.json({
				data: null,
				error: 'Проект не найден или доступ запрещен',
			});
		}

		if (name && !validator.isLength(name.trim(), { min: 3, max: 100 })) {
			return res.json({
				data: null,
				error: 'Название задачи должно быть от 3 до 100 символов',
			});
		}

		if (description && !validator.isLength(description.trim(), { max: 500 })) {
			return res.json({
				data: null,
				error: 'Описание не должно превышать 500 символов',
			});
		}

		const task = await Task.findOneAndUpdate(
			{ _id: taskId, projectId },
			{
				...(name && { name: name.trim() }),
				...(description !== undefined && {
					description: description ? description.trim() : '',
				}),
			},
			{ new: true },
		);

		if (!task) {
			return res.json({ data: null, error: 'Задача не найдена' });
		}

		res.json({ data: mapTask(task), error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};

export const deleteTask = async (req, res) => {
	try {
		const { projectId, taskId } = req.params;
		if (!validator.isMongoId(projectId) || !validator.isMongoId(taskId)) {
			return res.json({ data: null, error: 'Неверный ID проекта или задачи' });
		}

		const project = await Project.findOne({ _id: projectId, ownerId: req.user._id });
		if (!project) {
			return res.json({
				data: null,
				error: 'Проект не найден или доступ запрещен',
			});
		}

		const task = await Task.findOneAndDelete({ _id: taskId, projectId });
		if (!task) {
			return res.json({ data: null, error: 'Задача не найдена' });
		}

		res.json({ data: null, error: null });
	} catch (error) {
		res.json({ data: null, error: error.message });
	}
};
