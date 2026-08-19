import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Circle, ChevronDown, Feather, UserCheck, Users, ChevronRight, Award, BadgeCheck, Clock3, ShieldCheck } from 'lucide-react';
import writersData from '../data/topWriters.json';

export default function TopWritersGrid() {
  const [onlineFilter, setOnlineFilter] = useState(false);
  const [disciplineFilter, setDisciplineFilter] = useState('All Disciplines');
  const [ordersFilter, setOrdersFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Orders');
  const [limit, setLimit] = useState(8);

  const sortedWriters = [...writersData].sort((a, b) => {
    if (sortBy === 'Rating') {
      if (b.rating !== a.rating) return b.rating - a.rating;
      return b.orders - a.orders;
    }
    if (sortBy === 'Orders') {
      if (b.orders !== a.orders) return b.orders - a.orders;
      return b.rating - a.rating;
    }
    return 0;
  });

  const filteredWriters = sortedWriters
    .filter(writer => {
      const matchesOnline = !onlineFilter || writer.status === 'online';
      const matchesDiscipline = disciplineFilter === 'All Disciplines' || writer.discipline === disciplineFilter;
      const matchesOrders = ordersFilter === 'All' || 
                           (ordersFilter === '1000+' && writer.orders >= 1000) ||
                           (ordersFilter === '5000+' && writer.orders >= 5000);
      return matchesOnline && matchesDiscipline && matchesOrders;
    });

  const displayedWriters = filteredWriters.slice(0, limit);

  const getAwardIcon = (award: string) => {
    if (award.includes('Punctuality')) return Clock3;
    if (award.includes('Reliability')) return ShieldCheck;
    if (award.includes('Nine')) return BadgeCheck;
    return Award;
  };

  const disciplines = [
    'All Disciplines',
    'Programming',
    'Nursing',
    'Business Management',
    'Mathematics',
    'Psychology',
    'History',
    'Economics',
    'Computer Science'
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        
        {/* Centered Stats Header */}
        <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-24 mb-10">
          <div className="flex items-center gap-2">
            <Feather size={20} className="text-blue-500 fill-blue-500/10" />
            <span className="text-2xl font-bold text-slate-800">{writersData.length}</span>
            <span className="text-sm text-slate-400 font-medium whitespace-nowrap">Writers active</span>
          </div>
          
          <div className="flex items-center gap-2">
            <UserCheck size={20} className="text-blue-500" />
            <span className="text-2xl font-bold text-slate-800">
              {writersData.filter(w => w.status === 'online').length}
            </span>
            <span className="text-sm text-slate-400 font-medium whitespace-nowrap">Online now</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Star size={20} className="text-amber-500 fill-current" />
            <span className="text-2xl font-bold text-slate-800">9.7</span>
            <span className="text-sm text-slate-400 font-medium whitespace-nowrap">Average quality score</span>
          </div>
        </div>
        
        {/* Filters Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-center gap-6 mb-4 border border-[#dde6ef] rounded-xl p-4 bg-white shadow-sm">
          
          {/* Finished Orders Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] text-[#5e5e5e] font-medium mb-1">Finished orders</label>
            <div className="relative group">
              <select 
                value={ordersFilter}
                onChange={(e) => {
                  setOrdersFilter(e.target.value);
                  setLimit(8); // Reset limit on filter change
                }}
                className="appearance-none w-full bg-white border border-[#c6d5e5] rounded-[3px] px-3 py-2 text-[18px] leading-[22px] text-[#424242] focus:outline-none focus:border-[#0080d1] focus:ring-2 focus:ring-[#e5f2fa] transition-all cursor-pointer"
              >
                <option value="All">All</option>
                <option value="1000+">1000+</option>
                <option value="5000+">5000+</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16L0 8l1.4-1.425 5.6 5.6V0h2v12.175l5.6-5.6L16 8l-8 8z" fill="#636FE3"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Discipline Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] text-[#5e5e5e] font-medium mb-1">Discipline</label>
            <div className="relative group">
              <select 
                value={disciplineFilter}
                onChange={(e) => {
                  setDisciplineFilter(e.target.value);
                  setLimit(8); // Reset limit on filter change
                }}
                className="appearance-none w-full bg-white border border-[#c6d5e5] rounded-[3px] px-3 py-2 text-[18px] leading-[22px] text-[#424242] focus:outline-none focus:border-[#0080d1] focus:ring-2 focus:ring-[#e5f2fa] transition-all cursor-pointer"
              >
                {disciplines.map(discipline => (
                  <option key={discipline} value={discipline}>{discipline}</option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16L0 8l1.4-1.425 5.6 5.6V0h2v12.175l5.6-5.6L16 8l-8 8z" fill="#636FE3"></path>
                </svg>
              </div>
            </div>
          </div>
          
          {/* Sorted By Filter */}
          <div className="flex flex-col gap-1">
            <label className="text-[14px] text-[#5e5e5e] font-medium mb-1">Sorted by</label>
            <div className="relative group">
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none w-full bg-white border border-[#c6d5e5] rounded-[3px] px-3 py-2 text-[18px] leading-[22px] text-[#424242] focus:outline-none focus:border-[#0080d1] focus:ring-2 focus:ring-[#e5f2fa] transition-all cursor-pointer"
              >
                <option value="Rating">Rating</option>
                <option value="Orders">Orders</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16L0 8l1.4-1.425 5.6 5.6V0h2v12.175l5.6-5.6L16 8l-8 8z" fill="#636FE3"></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Online Checkbox */}
          <div className="flex items-center lg:mt-6">
            <label className="flex items-center gap-3 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={onlineFilter}
                  onChange={(e) => {
                    setOnlineFilter(e.target.checked);
                    setLimit(8); // Reset limit on filter change
                  }}
                />
                <div className="w-5 h-5 border border-[#8cabca] rounded-[3px] bg-white transition-all peer-checked:bg-[#0080d1] peer-checked:border-[#0080d1] group-hover:border-[#0080d1]"></div>
                <div className="absolute inset-0 flex items-center justify-center text-white scale-0 peer-checked:scale-100 transition-transform pointer-events-none">
                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.75 8.15L1.6 5 .55 6.05l4.2 4.2 9-9L12.7.2 4.75 8.15z" fill="#fff"></path>
                  </svg>
                </div>
              </div>
              <span className="text-[18px] font-medium text-[#424242]">Online</span>
            </label>
          </div>
        </div>

        <div className="text-slate-400 text-sm mb-6 ml-2">
          Showing {displayedWriters.length} out of {filteredWriters.length} writers
        </div>

        {/* Writers List (Horizontal Cards) */}
        <div className="flex flex-col gap-4">
          {displayedWriters.map((writer) => (
            <div key={writer.id} className="bg-white border border-[#dae6f2] rounded-xl p-4 sm:p-5 flex flex-col md:flex-row items-center gap-4 lg:gap-8 hover:shadow-lg transition-all duration-300">
              
              {/* Rank */}
              <div className="hidden sm:flex shrink-0 w-10 h-10 rounded-full bg-[#f1f5f9] text-[#7b7b7b] items-center justify-center font-medium">
                {filteredWriters.indexOf(writer) + 1}
              </div>

              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border border-slate-100">
                  <img src={writer.avatar.replace('https://boffinglobal.com', '')} alt={writer.name} className="w-full h-full object-cover" />
                </div>
                <div className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white ${
                  writer.status === 'online' ? 'bg-[#43a047]' : 
                  writer.status === 'away' ? 'bg-[#ffac00]' : 'bg-[#e94b51]'
                }`}></div>
              </div>

              {/* Name & Rating */}
              <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-4 lg:gap-12 w-full">
                <div className="min-w-[140px]">
                  <a href={writer.href} className="text-xl font-bold text-[#0080d1] hover:underline transition-all">
                    {writer.name}
                  </a>
                </div>

                <div className="flex items-center gap-2 bg-[#fff6e0] px-3 py-1 rounded-full border border-[#ffe199] w-fit">
                  <Star size={16} className="text-[#ffb300] fill-current" />
                  <span className="text-sm font-bold text-slate-800">{writer.rating}</span>
                  <span className="text-[12px] text-slate-400 font-medium">/10</span>
                </div>

                <div className="text-[#424242] font-medium text-sm whitespace-nowrap">
                  <span className="font-bold">{writer.orders.toLocaleString()}</span> Finished orders
                </div>

                <div className="flex -space-x-2 items-center justify-center sm:justify-start">
                  {writer.awards.map((award, index) => {
                    const AwardIcon = getAwardIcon(award.alt);
                    return <span
                      key={index}
                      title={award.alt}
                      aria-label={award.alt}
                      className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-white text-[#0080d1] shadow-sm transition-transform hover:scale-110"
                    >
                      <AwardIcon size={16} strokeWidth={2.5} />
                    </span>;
                  })}
                </div>
              </div>

              {/* Action */}
              <div className="shrink-0 w-full md:w-auto">
                <Link 
                  to="/registration" 
                  className="inline-block text-center w-full md:w-[180px] bg-[#f2f7fa] hover:bg-[#e1f0f9] text-[#0080d1] font-extrabold py-3 px-6 rounded-full transition-colors border border-transparent active:scale-95"
                >
                  Request writer
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Footer Actions */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-[#dae6f2] pt-8">
          <div className="w-full md:w-auto">
            {limit < filteredWriters.length && (
              <button 
                onClick={() => setLimit(filteredWriters.length)}
                className="w-full md:w-auto bg-[#0080d1] hover:bg-[#004695] text-white font-bold py-3 px-12 rounded-full transition-all shadow-md active:scale-95"
              >
                Show all
              </button>
            )}
          </div>

          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <a href="/rating-and-awards.html" className="text-[#0080d1] font-bold hover:underline flex items-center gap-2 group text-[18px]">
              Learn about Ratings & Rewards 
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
