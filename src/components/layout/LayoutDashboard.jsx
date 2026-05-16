import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { Outlet, NavLink, useLocation } from 'react-router';
import { Home, Camera, ChartColumnBig, Newspaper, BotMessageSquare, LogOut, Info, CircleQuestionMark, Paperclip } from 'lucide-react';
import { Logo } from '../sections/Assets';

export default function LayoutDashboard() {
  const [userName, setUserName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const location = useLocation();

  const [open, setOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [menuHover, setMenuHover] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const navItems = [
    { name: 'Home', icon: Home, path: '/dashboard' },
    { name: 'Camera', icon: Camera, path: '/dashboard/camera' },
    { name: 'Insights', icon: ChartColumnBig, path: '/dashboard/insights' },
    { name: 'Blog', icon: Newspaper, path: '/dashboard/blog' },
    { name: 'Chatbot', icon: BotMessageSquare, path: '/dashboard/chatbot' },
  ];

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserName(user.displayName);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className='flex max-sm:flex-col gap-4 h-screen overflow-hidden bg-sariwhite'>
      <div className="pr-0 max-sm:pr-4 p-4 h-full max-sm:h-max max-sm:w-full max-sm:absolute max-sm:bottom-0 max-sm:z-999">
        <header className={`${open ? 'w-[20vw] max-sm:w-full' : 'w-max max-sm:w-full'} flex flex-col max-sm:flex-row gap-4 justify-between h-full transition-[width] duration-1000 ease-[cubic-bezier(0.3,1,0.2,1)]`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => { setOpen(false); setInfoOpen(false); }}>
          <nav className="bg-white overflow-clip border border-sariblack/14 h-full max-sm:h-max max-sm:w-full rounded-2xl flex flex-col max-sm:flex-row items-stretch justify-between">
            <NavLink to={'/profile'} className='flex items-center p-4 max-sm:hidden'>
              <span className='block w-12 h-12 p-2 border border-sariblack/14 rounded-full bg-white'><Logo className={'text-sarired'} /></span>
              <h2 className={`${open ? 'ml-4 w-5' : 'w-0 opacity-0'} whitespace-nowrap font-mr font-semibold text-lg transition-all duration-500`}>{userName}</h2>
            </NavLink>

            <ul className='flex flex-col max-sm:flex-row h-full gap-2 max-sm:gap-1 p-4 max-sm:p-2 relative max-sm:justify-between max-sm:w-full max-sm:overflow-auto' style={{ scrollbarWidth: 'none' }}>
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.path} className='border border-transparent hover:border-sarired hover:bg-sarired/14 rounded-2xl max-sm:rounded-xl hover:text-sarired transition duration-75 flex items-center max-sm:justify-center px-4 max-sm:p-0 h-14 text-base max-sm:aspect-square max-sm:size-14'>
                    <item.icon size={18} />
                    <span className={`${open ? 'ml-2 max-sm:ml-0 w-5 max-sm:w-max' : 'w-0 max-sm:w-max opacity-0 max-sm:opacity-100'} whitespace-nowrap transition-all duration-500 max-sm:absolute max-sm:top-0 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:block max-sm:py-1 max-sm:border max-sm:border-sariblack/14 max-sm:bg-white max-sm:hover:text-sariblack max-sm:rounded-full max-sm:px-4`}>{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>

            <ul className='flex flex-col border-t border-sariblack/14'>
              <li>
                <button onClick={() => setSupportOpen(true)} className='flex items-center h-14 px-8 text-base hover:bg-sariblack/8 transition duration-75 w-full cursor-pointer'>
                  <CircleQuestionMark size={18} />
                  <span className={`${open ? 'ml-2 w-5' : 'w-0 opacity-0'} whitespace-nowrap transition-all duration-500`}>Support</span>
                </button>
              </li>
              <li>
                <NavLink className='bg-sarired/14 text-sarired flex items-center h-14 px-8 text-base'>
                  <LogOut size={18} />
                  <span className={`${open ? 'ml-2 w-5' : 'w-0 opacity-0'} whitespace-nowrap transition-all duration-500`}>Log Out</span>
                </NavLink>
              </li>
            </ul>
          </nav>

          <button onClick={() => { open ? setInfoOpen(!infoOpen) : false }} className={`${infoOpen ? 'w-full h-max' : 'w-12'} aspect-square flex flex-col items-center justify-center rounded-2xl border border-sariblack/14 text-sariblack/40 cursor-pointer max-sm:hidden`}>
            {infoOpen == false && <Info size={20} />}
            {open && infoOpen && (
              <>
                <p>SANUBARI</p>
                <p>© 2026 SANUBARI. Medical Disclaimer: For informational purposes only. Selalu konsultasikan kondisi kesehatan Anda dengan tenaga medis profesional.</p>
              </>
            )}
          </button>
        </header>
      </div>

      <main className='w-full pl-0 p-4 overflow-auto'>
        <Outlet />
      </main>

      {supportOpen && (
        <div onClick={() => setSupportOpen(false)} className='fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-6'>
          <div onClick={(e) => e.stopPropagation()} className='w-[40vw] max-sm:w-full h-[70vh] max-sm:h-[85vh] bg-white rounded-[2rem] px-7 py-6 max-sm:px-5 max-sm:py-5 shadow-2xl flex flex-col overflow-hidden'>
            <div className='flex flex-col leading-none shrink-0'>
              <h1 className='text-[2.3rem] max-sm:text-[1.8rem] font-semibold font-mr text-sariblack'>Butuh Bantuan?</h1>
              <h2 className='text-[2.3rem] max-sm:text-[1.8rem] font-semibold font-mr text-[#A8D5CF] mt-1'>Hubungi Kami!</h2>
            </div>

            <div className='mt-6 flex flex-col flex-1 min-h-0'>
              <textarea placeholder='Pesan/Keluhan/Kritik...' className='w-full flex-1 min-h-0 resize-none rounded-[1.4rem] border border-sariblack/10 bg-sariwhite px-5 py-4 outline-none text-sm placeholder:text-sariblack/25' />
              
              <div className='mt-4 flex items-center gap-3 shrink-0'>
                <button className='flex items-center h-11 rounded-2xl border border-[#A8D5CF] overflow-hidden hover:shadow-sm transition cursor-pointer group max-sm:w-full'>
                  <div className='bg-[#A8D5CF] h-full w-12 flex items-center justify-center text-white shrink-0'><Paperclip size={18} /></div>
                  <div className='px-6 bg-white h-full flex items-center justify-center text-[#A8D5CF] text-sm font-semibold font-int whitespace-nowrap w-full'>Lampirkan Screenshot</div>
                </button>
              </div>

              <p className='text-xs text-sariblack/30 mt-3 leading-relaxed shrink-0'>Pesanmu akan terkirim lewat email yang terdaftar dalam SANUBARI.</p>
              
              <div className='flex items-center max-sm:flex-col gap-3 mt-5 shrink-0'>
                <button className='h-10 px-7 max-sm:w-full rounded-2xl bg-[#A8D5CF] text-white hover:opacity-90 transition cursor-pointer text-sm font-medium'>Kirim</button>
                <button onClick={() => setSupportOpen(false)} className='h-10 px-7 max-sm:w-full rounded-2xl border border-sarired text-sarired hover:bg-sarired/10 transition cursor-pointer text-sm font-medium'>Batal</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}