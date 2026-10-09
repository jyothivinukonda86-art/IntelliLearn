import React from 'react';
import { BookOpen } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-slate-200/80 mt-auto py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-2 font-semibold text-slate-800">
          <BookOpen className="w-4 h-4 text-indigo-600" />
          <span>IntelliLearn Platform</span>
        </div>
        <p className="text-slate-400">
          &copy; {currentYear} IntelliLearn Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
