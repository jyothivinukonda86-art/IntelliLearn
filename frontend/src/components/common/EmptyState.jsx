import React from 'react';
import { Link } from 'react-router-dom';

export const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionText,
  actionPath,
  onAction,
}) => {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 text-center max-w-md mx-auto shadow-xs">
      {Icon && (
        <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 mx-auto mb-4">
          <Icon className="w-6 h-6" />
        </div>
      )}
      <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
      <p className="text-xs text-slate-500 leading-relaxed mb-6">{description}</p>
      {actionText && (
        actionPath ? (
          <Link
            to={actionPath}
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
          >
            {actionText}
          </Link>
        ) : (
          <button
            onClick={onAction}
            className="inline-flex items-center justify-center px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            {actionText}
          </button>
        )
      )}
    </div>
  );
};
