import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { DashboardLayout } from './layouts/DashboardLayout';

// Pages
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { StudentDashboard } from './pages/StudentDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { SubjectsPage } from './pages/SubjectsPage';
import { SubjectDetailPage } from './pages/SubjectDetailPage';
import { QuizzesPage } from './pages/QuizzesPage';
import { QuizArena } from './pages/QuizArena';
import { ProgressPage } from './pages/ProgressPage';
import { GamificationPage } from './pages/GamificationPage';
import { RecommendationsPage } from './pages/RecommendationsPage';

// Admin Subpages
import { AdminSubjects } from './pages/admin/AdminSubjects';
import { AdminChapters } from './pages/admin/AdminChapters';
import { AdminMaterials } from './pages/admin/AdminMaterials';
import { AdminQuizzes } from './pages/admin/AdminQuizzes';

const RootRedirect = () => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  if (loading) return null;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  return <Navigate to={isAdmin ? '/admin' : '/dashboard'} replace />;
};

export function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Auth Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Root Redirect */}
          <Route path="/" element={<RootRedirect />} />

          {/* Protected Student Routes */}
          <Route
            element={
              <ProtectedRoute requiredRole="STUDENT">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/subjects" element={<SubjectsPage />} />
            <Route path="/subjects/:id" element={<SubjectDetailPage />} />
            <Route path="/quizzes" element={<QuizzesPage />} />
            <Route path="/quizzes/:id" element={<QuizArena />} />
            <Route path="/progress" element={<ProgressPage />} />
            <Route path="/gamification" element={<GamificationPage />} />
            <Route path="/recommendations" element={<RecommendationsPage />} />
          </Route>

          {/* Protected Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute requiredRole="ADMIN">
                <DashboardLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="subjects" element={<AdminSubjects />} />
            <Route path="chapters" element={<AdminChapters />} />
            <Route path="materials" element={<AdminMaterials />} />
            <Route path="quizzes" element={<AdminQuizzes />} />
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
