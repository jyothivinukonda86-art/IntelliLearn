import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const base = 'inline-flex items-center gap-1 font-semibold rounded-md transition-colors';

  const sizes = {
    xs: 'px-1.5 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1.5 text-xs',
  };

  const variants = {
    default: 'bg-slate-100 text-slate-700 border border-slate-200',
    easy: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    medium: 'bg-amber-50 text-amber-700 border border-amber-200',
    hard: 'bg-indigo-50 text-indigo-700 border border-indigo-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    info: 'bg-sky-50 text-sky-700 border border-sky-200',
    purple: 'bg-purple-50 text-purple-700 border border-purple-200',
  };

  return (
    <span className={`${base} ${sizes[size] || sizes.sm} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
