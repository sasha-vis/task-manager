import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { selectAuthentication } from './selectors';
import {
	LoginPage,
	RegisterPage,
	MainPage,
	WelcomePage,
	ProjectsPage,
	ProjectPage,
	TasksPage,
	NotFoundPage,
	ProfilePage,
} from './pages';
import { LoadingSpinner, Modal } from './components';

const ProtectedRoute = () => {
	const isAuthenticated = useSelector(selectAuthentication);

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export const App = () => {
	return (
		<div className="min-h-screen bg-gray-100">
			<Toaster position="top-right" toastOptions={{ duration: 5000 }} />
			<LoadingSpinner />
			<Modal />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />

				<Route element={<ProtectedRoute />}>
					<Route element={<MainPage />}>
						<Route path="/" element={<WelcomePage />} />
						<Route path="profile" element={<ProfilePage />} />

						<Route path="projects">
							<Route index element={<ProjectsPage />} />
							<Route path=":projectId" element={<ProjectPage />}>
								<Route path="tasks" element={<TasksPage />} />
							</Route>
						</Route>
					</Route>
				</Route>

				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</div>
	);
};
