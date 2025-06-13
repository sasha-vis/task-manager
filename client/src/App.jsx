import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { LoginPage, RegisterPage, HomePage } from './pages';
import { selectIsAuthenticated } from './selectors';
import { Toaster } from 'react-hot-toast';

const ProtectedRoute = ({ children }) => {
	const isAuthenticated = useSelector(selectIsAuthenticated);
	return isAuthenticated ? children : <Navigate to="/login" />;
};

export const App = () => {
	return (
		<div className="min-h-screen bg-gray-100">
			<Toaster position="top-right" toastOptions={{ duration: 5000 }} />
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route
					path="/"
					element={
						<ProtectedRoute>
							<HomePage />
						</ProtectedRoute>
					}
				/>
				<Route path="*" element={<Navigate to="/login" />} />
			</Routes>
		</div>
	);
};
