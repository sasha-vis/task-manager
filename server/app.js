import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

if (process.env.NODE_ENV === 'production') {
	const publicPath = path.join(__dirname, 'public');
	const indexFile = path.join(publicPath, 'index.html');

	app.use(express.static(publicPath));

	app.get('*', (req, res) => {
		res.sendFile(indexFile);
	});
}

mongoose
	.connect(process.env.MONGO_URL)
	.then(() => {
		console.log('Подключение к базе данных успешно');
		app.listen(port, () => {
			console.log(`Сервер запущен на порту ${port}`);
		});
	})
	.catch((err) => {
		console.error('Ошибка сервера:', err);
		process.exit(1);
	});
