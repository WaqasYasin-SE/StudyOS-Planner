import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({ children }) {

    const { isAuthenticated, loading } = useAuth();

    // Wait until authentication is checked
    if (loading) {
        return <h2>Loading...</h2>;
    }

    // User is not logged in
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    // User is authenticated
    return children;

}

export default ProtectedRoute;