import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs = ({ items = [] }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 mb-6">
      <Link
        to="/dashboard"
        className="inline-flex items-center gap-1 font-medium text-slate-500 hover:text-indigo-600 transition-colors"
      >
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <React.Fragment key={index}>
            <ChevronRight className="w-3.5 h-3.5 mx-1.5 text-slate-400 shrink-0" />
            {item.path && !isLast ? (
              <Link
                to={item.path}
                className="font-medium text-slate-500 hover:text-indigo-600 transition-colors truncate max-w-[200px]"
              >
                {item.label}
              </Link>
            ) : (
              <span className="font-semibold text-slate-800 truncate max-w-[240px]">
                {item.label}
              </span>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};
