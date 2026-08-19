import React, { useState } from 'react';
import { ChevronDown, MoreHorizontal, Plus } from 'lucide-react';

type SitemapRow = {
  name: string;
  type: 'Sitemap';
  submitted: string;
  lastRead: string;
  status: 'Active' | 'Error';
  discoveredPages: number;
  discoveredVideos: number;
  errorCount?: number;
};

const initialRows: SitemapRow[] = [
  {
    name: '/sitemap.xml',
    type: 'Sitemap',
    submitted: 'Aug 19, 2026',
    lastRead: 'Aug 19, 2026',
    status: 'Error',
    discoveredPages: 65,
    discoveredVideos: 0,
    errorCount: 65,
  },
];

export default function AdminSitemaps() {
  const [rows, setRows] = useState<SitemapRow[]>(initialRows);
  const [url, setUrl] = useState('https://boffinglobalgroup.com/');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmed = url.trim();
    if (!trimmed) return;

    const displayName = (() => {
      try {
        const parsed = new URL(trimmed);
        return parsed.pathname === '/' ? '/sitemap.xml' : parsed.pathname;
      } catch {
        return trimmed;
      }
    })();

    const today = new Date();
    const label = today.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });

    setRows((current) => [
      {
        name: displayName,
        type: 'Sitemap',
        submitted: label,
        lastRead: label,
        status: 'Active',
        discoveredPages: 0,
        discoveredVideos: 0,
      },
      ...current,
    ]);

    setUrl('https://boffinglobalgroup.com/');
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto px-3 py-6 md:px-8">
      <div className="mb-8">
        <h1 className="text-[2.1rem] font-semibold text-slate-800 tracking-tight">Sitemaps</h1>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-100/80 shadow-sm overflow-hidden">
        <div className="px-6 py-8">
          <h2 className="text-[2rem] font-medium text-slate-800 tracking-tight mb-6">Add a new sitemap</h2>

          <form onSubmit={handleSubmit} className="flex items-center gap-3 w-full">
            <div className="flex-1 flex items-center border-b border-sky-500 bg-transparent h-[52px]">
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-lime-200 text-[10px] text-lime-900 font-bold mx-2 shrink-0">
                ✓
              </span>
              <input
                aria-label="Sitemap URL"
                type="url"
                value={url}
                onChange={(event) => setUrl(event.target.value)}
                placeholder="Enter sitemap URL"
                className="w-full bg-transparent border-0 outline-none text-[1.15rem] text-slate-500 placeholder:text-slate-400"
              />
            </div>

            <button
              type="submit"
              className="h-[52px] min-w-[120px] px-6 rounded-lg border border-slate-300 bg-slate-200 text-sm font-semibold tracking-[0.14em] text-slate-700 hover:bg-slate-300 transition-colors"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </div>

      <div className="mt-10 rounded-xl border border-slate-200 bg-slate-100/80 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">
          <h2 className="text-[2rem] font-semibold text-slate-800 tracking-tight">Submitted sitemaps</h2>

          <button className="flex items-center justify-center text-slate-500 hover:text-slate-700" aria-label="Sort sitemaps">
            <svg viewBox="0 0 20 20" fill="none" className="w-6 h-6" aria-hidden="true">
              <path d="M5 7.5H15M7.5 12.5H12.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-slate-700">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-100/80 text-sm text-slate-500">
                <th className="px-6 py-4 font-medium">Sitemap <span className="ml-1">↑</span></th>
                <th className="px-6 py-4 font-medium text-left">Type</th>
                <th className="px-6 py-4 font-medium text-left">Submitted <span className="ml-1">↓</span></th>
                <th className="px-6 py-4 font-medium text-left">Last read</th>
                <th className="px-6 py-4 font-medium text-left">Status</th>
                <th className="px-6 py-4 font-medium text-left">Discovered pages</th>
                <th className="px-6 py-4 font-medium text-left">Discovered videos</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, index) => (
                <tr key={`${row.name}-${index}`} className="border-b border-slate-200 bg-white/40">
                  <td className="px-6 py-5 text-[1.05rem] text-slate-700">{row.name}</td>
                  <td className="px-6 py-5 text-[1.05rem]">{row.type}</td>
                  <td className="px-6 py-5 text-[1.05rem]">{row.submitted}</td>
                  <td className="px-6 py-5 text-[1.05rem]">{row.lastRead}</td>
                  <td className="px-6 py-5 text-[1.05rem]">
                    {row.status === 'Error' ? (
                      <span className="text-red-500 font-medium">{row.errorCount} errors</span>
                    ) : (
                      <span className="text-emerald-600 font-medium">Active</span>
                    )}
                  </td>
                  <td className="px-6 py-5 text-[1.05rem]">{row.discoveredPages}</td>
                  <td className="px-6 py-5 text-[1.05rem] flex items-center justify-between">
                    <span>{row.discoveredVideos}</span>
                    <button className="ml-4 text-slate-400 hover:text-slate-700" aria-label={`More actions for ${row.name}`}>
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-end gap-4 px-6 py-4 border-t border-slate-200 bg-slate-50 text-sm text-slate-500">
          <span>Rows per page:</span>
          <button className="flex items-center gap-1 border border-slate-300 rounded-md bg-white px-2 py-1">
            10 <ChevronDown size={14} />
          </button>
          <span>1-1 of 1</span>
          <div className="flex items-center gap-2">
            <button className="text-slate-400 hover:text-slate-700 disabled:opacity-40" aria-label="Previous page" disabled>
              {'<'}
            </button>
            <button className="text-slate-400 hover:text-slate-700" aria-label="Next page">
              {'>'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
