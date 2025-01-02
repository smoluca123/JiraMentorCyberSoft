import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import Home from '@/modules/home/pages/Home';
import Login from '@/modules/auth/components/Login';
import AuthPage from '@/modules/auth/pages/AuthPage';
import Register from '@/modules/auth/components/Register';
import AuthenticationRoute from '@/routes/AuthenticationRoute';

export default function AppRoutes() {
  return (
    <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthenticationRoute>
                <MainLayout />
              </AuthenticationRoute>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route path="/auth" element={<AuthPage />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}
