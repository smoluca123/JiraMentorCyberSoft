import { Navigate } from 'react-router-dom';

export default function InvalidRoute() {
  return <Navigate to="/" replace />;
}
