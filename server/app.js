import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import routes from './routes/index.js';

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

// app.use(express.static('../client/dist'));

app.use(cookieParser());
app.use(express.json());

app.use('/api', routes);

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
