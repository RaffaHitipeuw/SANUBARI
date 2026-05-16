import React, { useState, useEffect  } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { Outlet, Link, useLocation, NavLink } from 'react-router';
import { Home, Camera, ChartColumnBig, Newspaper, BotMessageSquare, LogOut, Info, Bolt, CircleQuestionMark} from 'lucide-react';
import { Logo } from '../sections/Assets';

export default function LayoutDashboard() {
  const [userName, setUserName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const location = useLocation();
  const [open, setOpen] = useState(false)
  const [infoOpen, setInfoOpen] = useState(false)

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
    <div className='flex gap-4 h-screen overflow-hidden bg-sariwhite'>
      <div className="pr-0 p-4 h-full">
      <header className={`${open ? 'w-[20vw]' : 'w-[72px]'} flex flex-col gap-4 justify-between h-full transition-[width] duration-[1000ms] ease-[cubic-bezier(0.3,1,0.2,1)]`}onMouseEnter={() => setOpen(true)} onMouseLeave={() => {setOpen(false); setInfoOpen(false)}}>
          <nav className="bg-white overflow-clip border border-sariblack/14 h-full rounded-2xl flex flex-col items-stretch justify-between">
          <NavLink to={'/profile'} className='flex items-center p-3 h-[80px]'>
            <div className='min-w-[48px] h-12 p-2 border border-sariblack/14 rounded-full bg-white flex items-center justify-center'>
              <Logo className={'text-sarired'}/>
            </div>
            <h2 className={`font-mr font-semibold text-lg transition-all duration-700 overflow-hidden whitespace-nowrap ${open ? 'opacity-100 max-w-xs ml-4 delay-300' : 'opacity-0 max-w-0 ml-0'}`}>
              {userName}
            </h2>
          </NavLink>

            <ul className='flex flex-col h-full gap-2'>
              {navItems.map((item, index) => (
                <li key={index}>
                <NavLink to={item.path} className={'border border-transparent hover:border-sarired hover:bg-sarired/14 rounded-2xl hover:text-sarired transition-all duration-300 flex items-center h-14 px-[27px] gap-0'}>
                  <div className="min-w-[18px] flex justify-center items-center">
                    <item.icon size={18} />
                  </div>
                  <span className={`transition-all duration-700 ease-in-out overflow-hidden whitespace-nowrap ${open ? 'opacity-100 max-w-xs ml-3 delay-300' : 'opacity-0 max-w-0 ml-0'}`}>
                    {item.name}
                  </span>
                </NavLink>
              </li>
              ))}
            </ul>
            <ul className='flex flex-col border-t border-sariblack/14'>
            <li>
              <NavLink className={'flex items-center h-14 px-[27px] gap-0 text-base hover:bg-sariblack/8 transition duration-75'}>
                <div className="min-w-[18px] flex justify-center items-center">
                  <CircleQuestionMark size={18} />
                </div>
                <span className={`transition-all duration-700 overflow-hidden whitespace-nowrap ${open ? 'opacity-100 max-w-xs ml-3 delay-300' : 'opacity-0 max-w-0 ml-0'}`}>
                  Support
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink className={'bg-sarired/14 text-sarired flex items-center h-14 px-[27px] gap-0 text-base'}>
                <div className="min-w-[18px] flex justify-center items-center">
                  <LogOut size={18} />
                </div>
                <span className={`transition-all duration-700 overflow-hidden whitespace-nowrap ${open ? 'opacity-100 max-w-xs ml-3 delay-300' : 'opacity-0 max-w-0 ml-0'}`}>
                  Log Out
                </span>
              </NavLink>
            </li>
            </ul>
          </nav>
          <button onClick={() => {open ? setInfoOpen(!infoOpen) : false}} className={`${infoOpen ? 'w-full h-max' : 'w-12'} aspect-square flex flex-col items-center justify-center rounded-2xl border border-sariblack/14 text-sariblack/40 cursor-pointer`}>
            {infoOpen == false && <Info size={20}/>}
            {open && infoOpen && (
              <>
                <p>SANUBARI</p>
                <p>© 2026 SANUBARI. Medical Disclaimer: For informational purposes only. Selalu konsultasikan kondisi kesehatan Anda dengan tenaga medis profesional.</p>
              </>
            )}
          </button>
        </header>
      </div>
      <main className={`w-full pl-0 p-4 overflow-auto`}>
        <Outlet/>
      </main>
    </div>
  );
}