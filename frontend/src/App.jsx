import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Semesters from "./pages/Semesters";
import Subjects from "./pages/Subjects";
import Tasks from "./pages/Tasks";
import StudySessions from "./pages/StudySessions";
import Analytics from "./pages/Analytics";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoute from "./components/common/ProtectedRoute";

function App() {

    return (

        <Routes>

            {/* Public Routes */}

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected Routes */}

            <Route
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >

                <Route path="/" element={<Dashboard />} />

                <Route path="/semesters" element={<Semesters />} />

                <Route path="/subjects" element={<Subjects />} />

                <Route path="/tasks" element={<Tasks />} />

                <Route path="/study-sessions" element={<StudySessions />} />

                <Route path="/analytics" element={<Analytics />} />

            </Route>

            {/* Unknown Route */}

            <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>

    );

}

export default App;