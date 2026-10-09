import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  Mail,
  Lock,
  ArrowRight,
  AlertCircle,
  ShieldCheck,
  UserCheck,
  Loader2,
  Sparkles
} from 'lucide-react';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [sessionExpiredNotice, setSessionExpiredNotice] = useState(false);

  const { login, isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (params.get('expired') === 'true') {
      setSessionExpiredNotice(true);
    }
  }, [location]);

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    }
  }, [isAuthenticated, user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    try {
      const data = await login({ email, password });
      if (data.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      setErrorMessage(err.message || 'Login failed. Please verify credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleFillAdmin = () => {
    setEmail('admin@learning.com');
    setPassword('admin123');
    setErrorMessage('');
  };

  const handleFillStudent = () => {
    setEmail('student@learning.com');
    setPassword('student123');
    setErrorMessage('');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Soft background accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 text-white shadow-md mb-3">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
          Welcome to IntelliLearn
        </h2>
        <p className="mt-1.5 text-xs sm:text-sm text-slate-600">
          Intelligent Gamified Learning Platform
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        <div className="bg-white py-8 px-6 shadow-sm rounded-2xl sm:px-10 border border-slate-200/80">
          {sessionExpiredNotice && (
            <div className="mb-5 p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center gap-2 text-amber-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-amber-600" />
              <span>Your session has expired. Please log in again to continue.</span>
            </div>
          )}

          {errorMessage && (
            <div className="mb-5 p-3 rounded-xl bg-rose-50 border border-rose-200 flex items-center gap-2 text-rose-800 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative rounded-xl">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all font-medium"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Pre-fill Box */}
          <div className="mt-6 pt-5 border-t border-slate-100 space-y-2">
            <p className="text-[11px] text-slate-500 text-center font-medium">
              Demo Credentials & Quick Fill:
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={handleFillAdmin}
                className="py-1.5 px-2 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg text-[11px] text-indigo-700 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
                <span>Fill Admin</span>
              </button>
              <button
                type="button"
                onClick={handleFillStudent}
                className="py-1.5 px-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-lg text-[11px] text-slate-700 font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
              >
                <UserCheck className="w-3.5 h-3.5 text-slate-600" />
                <span>Fill Student</span>
              </button>
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="text-xs text-slate-600">
              Don't have an account yet?{' '}
              <Link
                to="/register"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Register as a Student
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
