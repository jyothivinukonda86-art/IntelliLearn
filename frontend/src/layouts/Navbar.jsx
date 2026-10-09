import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  BookOpen,
  HelpCircle,
  Trophy,
  Compass,
  LogOut,
  ShieldCheck,
  User,
  Layers,
  FileText,
  LayoutDashboard,
  LineChart,
  Menu,
  X
} from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAdmin, isStudent } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => {
    if (path === '/dashboard' && location.pathname === '/dashboard') return true;
    if (path === '/admin' && location.pathname === '/admin') return true;
    return path !== '/dashboard' && path !== '/admin' && location.pathname.startsWith(path);
  };

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <Link
            to={isAdmin ? '/admin' : '/dashboard'}
            className="flex items-center gap-3 group focus:outline-hidden"
          >
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-xs group-hover:bg-indigo-700 transition-colors">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 tracking-tight">
                IntelliLearn
              </span>
              <span className="hidden sm:inline-block text-[11px] text-slate-500 block -mt-1 font-medium">
                Gamified Platform
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {isStudent && (
              <>
                <Link
                  to="/dashboard"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/dashboard')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                <Link
                  to="/subjects"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/subjects')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Subjects</span>
                </Link>

                <Link
                  to="/quizzes"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/quizzes')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Quizzes</span>
                </Link>

                <Link
                  to="/progress"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/progress')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <LineChart className="w-4 h-4 text-emerald-600" />
                  <span>Progress</span>
                </Link>

                <Link
                  to="/recommendations"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/recommendations')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Compass className="w-4 h-4 text-sky-600" />
                  <span>Recommendations</span>
                </Link>

                <Link
                  to="/gamification"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/gamification')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>Gamification</span>
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview</span>
                </Link>

                <Link
                  to="/admin/subjects"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/subjects')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Subjects</span>
                </Link>

                <Link
                  to="/admin/chapters"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/chapters')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Chapters</span>
                </Link>

                <Link
                  to="/admin/materials"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/materials')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <FileText className="w-4 h-4" />
                  <span>Materials</span>
                </Link>

                <Link
                  to="/admin/quizzes"
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 ${
                    isActive('/admin/quizzes')
                      ? 'bg-indigo-50 text-indigo-700 font-semibold border border-indigo-100'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <HelpCircle className="w-4 h-4" />
                  <span>Quizzes</span>
                </Link>
              </>
            )}
          </div>

          {/* User Profile & Logout & Hamburger */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex items-center gap-2 px-2.5 py-1 bg-slate-100 rounded-lg border border-slate-200">
              {isAdmin ? (
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
              ) : (
                <User className="w-3.5 h-3.5 text-emerald-600" />
              )}
              <div className="text-xs text-left">
                <span className="font-semibold text-slate-800 block truncate max-w-[100px] sm:max-w-[140px]">
                  {user?.email?.split('@')[0]}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {user?.role}
                </span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
              title="Logout"
              aria-label="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 space-y-1">
            {isStudent && (
              <>
                <Link
                  to="/dashboard"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/dashboard') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/subjects"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/subjects') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Subjects
                </Link>
                <Link
                  to="/quizzes"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/quizzes') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Quizzes
                </Link>
                <Link
                  to="/progress"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/progress') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Learning Progress
                </Link>
                <Link
                  to="/recommendations"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/recommendations') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Recommendations
                </Link>
                <Link
                  to="/gamification"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/gamification') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Gamification & Badges
                </Link>
              </>
            )}

            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/admin') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Overview
                </Link>
                <Link
                  to="/admin/subjects"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/admin/subjects') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Subjects
                </Link>
                <Link
                  to="/admin/chapters"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/admin/chapters') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Chapters
                </Link>
                <Link
                  to="/admin/materials"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/admin/materials') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Materials
                </Link>
                <Link
                  to="/admin/quizzes"
                  onClick={closeMenu}
                  className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                    isActive('/admin/quizzes') ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  Quizzes
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
