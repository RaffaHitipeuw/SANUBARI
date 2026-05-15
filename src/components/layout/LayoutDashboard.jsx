import React, { useState } from 'react';
import { Outlet, Link, useLocation, NavLink } from 'react-router';
import { 
  Home, Camera, ChartColumnBig, Newspaper, BotMessageSquare, LogOut, Info, 
  Bolt, CircleQuestionMark
} from 'lucide-react';
import { Logo } from '../sections/Assets';

export default function LayoutDashboard() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Camera', icon: Camera, path: '/dashboard/camera' },
    { name: 'Insights', icon: ChartColumnBig, path: '/dashboard/insights' },
    { name: 'Blog', icon: Newspaper, path: '/dashboard/blog' },
    { name: 'Chatbot', icon: BotMessageSquare, path: '/dashboard/chatbot' },
  ];

  const [open, setOpen] = useState(false)

  return (
    <div className='flex gap-4 h-screen overflow-hidden bg-sariwhite'>
      <div className="pr-0 p-4 h-full">
        <header className={`${open ? 'w-[20vw]' : 'w-max'} flex flex-col gap-4 justify-between h-full`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
          <nav className="bg-white overflow-clip border border-sariblack/14 h-full rounded-2xl flex flex-col items-stretch justify-between">
            <NavLink to={'/profile'} className='flex gap-4 items-center p-4'>
              <span className='block w-12 h-12 p-2 border border-sariblack/14 rounded-full bg-white'>
                <Logo className={'text-sarired'}/>
              </span>
              {open && <h2 className='font-mr font-semibold text-lg'>John Doe</h2>}
            </NavLink>
            <ul className='flex flex-col h-full gap-2 p-4'>
              {navItems.map((item, index) => (
                <li key={index}><NavLink to={item.path} className={'border border-transparent hover:border-sarired hover:bg-sarired/14 rounded-2xl hover:text-sarired transition duration-75 flex items-center px-4 h-14 gap-2 text-base'}><item.icon size={18} />{open && item.name}</NavLink></li>
              ))}
            </ul>
            <ul className='flex flex-col border-t border-sariblack/14'>
              <li><NavLink className={'flex items-center h-14 px-8 gap-2 text-base hover:bg-sariblack/8 transition duration-75'}><CircleQuestionMark size={18} />{open && 'Support'}</NavLink></li>
              <li><NavLink className={'bg-sarired/14 text-sarired flex items-center h-14 px-8 gap-2 text-base'}><LogOut size={18} />{open && 'Log Out'}</NavLink></li>
            </ul>
          </nav>
          <button className="w-12 aspect-square flex items-center justify-center rounded-2xl border border-sariblack/14 text-sariblack/40 cursor-pointer">
            <Info size={20}/>
          </button>
        </header>
      </div>
      <main className={`w-full pl-0 p-4 overflow-auto`}>
        <Outlet/>
      </main>
    </div>
  );
}