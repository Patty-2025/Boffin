import React from 'react';

interface PortalPageHeaderProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

export default function PortalPageHeader({ title, description, children }: PortalPageHeaderProps) {
  return (
    <div className="border border-slate-200 bg-white px-5 py-4 shadow-sm lg:px-8">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-xl font-black text-slate-900">{title}</h1>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
}
