import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../firebase-config";
import { Outlet, NavLink, useLocation } from 'react-router';
import {
  Home,
  Camera,
  ChartColumnBig,
  Newspaper,
  BotMessageSquare,
  LogOut,
  Info,
  CircleQuestionMark,
  Paperclip,
  Ellipsis,
  X
} from 'lucide-react';
import { Logo } from '../sections/Assets';

export default function LayoutDashboard() {
  const [userName, setUserName] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [extraMenu, setExtraMenu] = useState(false)

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
    <div className='flex max-sm:flex-col gap-4 h-screen overflow-hidden bg-sariwhite relative'>
      <div className="hidden max-sm:absolute max-sm:w-full z-49 p-4 max-sm:flex flex-col gap-2 items-end">
        <button className='dsh-cards border-sariblack/14 cursor-pointer bg-white' onClick={() => setExtraMenu(!extraMenu)}>
          <Ellipsis className={`size-6 ${extraMenu ? 'hidden' : 'block'}`}/>
          <X className={`size-6 ${extraMenu ? 'block' : 'hidden'}`}/>
        </button>
        <div className={`${extraMenu ? 'flex' : 'hidden'} flex-col p-2 items-end w-[60vw] bg-white border border-sariblack/14 rounded-2xl overflow-hidden`}>
          <ul className={`${extraMenu ? 'max-sm:flex' : 'max-sm:hidden'} flex-col hidden w-full`}>
            <li onClick={() => setInfoOpen(!infoOpen)} className={`${infoOpen ? 'h-max flex-col py-4 items-stretch gap-2' : 'w-full items-center'} text-left flex h-14 px-6 text-base hover:bg-sariblack/8 transition duration-75 w-full cursor-pointer`}>
              {infoOpen == false && (
                <>
                  <Info size={18} />
                  <span className={`ml-2 whitespace-nowrap transition-all duration-500`}>
                    About
                  </span>
                </>
              )}
              {infoOpen && (
                <>
                  <p className='text-xl font-mr font-semibold'>SANUBARI</p>
                  <p>
                    © 2026 SANUBARI. Medical Disclaimer:
                    For informational purposes only.
                    Selalu konsultasikan kondisi kesehatan Anda
                    dengan tenaga medis profesional.
                  </p>
                </>
              )}
            </li>
            <li>
              <button onClick={() => setSupportOpen(true)} className='flex items-center h-14 px-6 text-base hover:bg-sariblack/8 transition duration-75 w-full cursor-pointer'>
                <CircleQuestionMark size={18} />
                <span className={`ml-2 whitespace-nowrap transition-all duration-500`}>
                  Support
                </span>
              </button>
            </li>
            <li>
              <NavLink
                className='bg-sarired/14 text-sarired flex items-center h-14 px-6 text-base rounded-xl'
              >
                <LogOut size={18} />
                <span className={`ml-2 whitespace-nowrap transition-all duration-500`}>
                  Log Out
                </span>
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="pr-0 max-sm:pr-4 p-4 h-full max-sm:h-max max-sm:w-full max-sm:absolute max-sm:bottom-0 max-sm:z-999">
        <header className={`${open ? 'w-[20vw] max-sm:w-full' : 'w-max max-sm:w-full'} flex flex-col max-sm:flex-row gap-4 justify-between h-full transition-[width] duration-1000 ease-[cubic-bezier(0.3,1,0.2,1)]`} onMouseEnter={() => setOpen(true)} onMouseLeave={() => {
          setOpen(false);
          setInfoOpen(false);
        }}>
          <nav className="relative bg-white overflow-hidden border border-sariblack/14 h-full max-sm:h-max max-sm:w-full rounded-2xl flex flex-col max-sm:flex-row items-stretch">
            <NavLink to={'/profile'} className='flex items-center p-4 max-sm:hidden'>
              <span className='block w-12 h-12 p-2 border border-sariblack/14 rounded-full bg-white'>
                <Logo className={'text-sarired'} />
              </span>
              <h2 className={`${open ? 'ml-4 w-5' : 'w-0 opacity-0'} whitespace-nowrap font-mr font-semibold text-lg transition-all duration-500`}>
                {userName}
              </h2>
            </NavLink>
            <ul className={` flex flex-col max-sm:flex-row gap-2 max-sm:gap-1 p-4 max-sm:p-2 max-sm:justify-between max-sm:w-full overflow-y-auto max-sm:overflow-auto transition-all duration-500 max-sm:h-16 ${infoOpen ? 'h-[32vh]' : 'h-full'}`} style={{ scrollbarWidth: 'none' }} >
              {navItems.map((item, index) => (
                <li key={index}>
                  <NavLink to={item.path} className='border border-transparent hover:border-sarired hover:bg-sarired/14 rounded-2xl max-sm:rounded-xl hover:text-sarired transition duration-75 flex items-center max-sm:justify-center px-4 max-sm:p-0 h-14 max-sm:h-full max-sm:w-auto text-base max-sm:aspect-square max-sm:size-14'>
                    <item.icon size={18} />
                    <span className={`${open ? 'ml-2 max-sm:ml-0 w-5 max-sm:w-max' : 'w-0 max-sm:w-max opacity-0 max-sm:opacity-100'} whitespace-nowrap transition-all duration-500 max-sm:absolute max-sm:top-0 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:block max-sm:py-1 max-sm:border max-sm:border-sariblack/14 max-sm:bg-white max-sm:hover:text-sariblack max-sm:rounded-full max-sm:px-4`}>
                      {item.name}
                    </span>
                  </NavLink>
                </li>
              ))}
            </ul>
            <ul className='flex flex-col border-t border-sariblack/14 max-sm:hidden'>
              <li>
                <button
                  onClick={() => setSupportOpen(true)}
                  className='flex items-center h-14 px-8 text-base hover:bg-sariblack/8 transition duration-75 w-full cursor-pointer'
                >
                  <CircleQuestionMark size={18} />
                  <span
                    className={`${open ? 'ml-2 w-5' : 'w-0 opacity-0'} whitespace-nowrap transition-all duration-500`}
                  >
                    Support
                  </span>
                </button>
              </li>
              <li>
                <NavLink
                  className='bg-sarired/14 text-sarired flex items-center h-14 px-8 text-base'
                >
                  <LogOut size={18} />
                  <span className={`${open ? 'ml-2 w-5' : 'w-0 opacity-0'} whitespace-nowrap transition-all duration-500`}>
                    Log Out
                  </span>
                </NavLink>
              </li>
            </ul>
          </nav>
          <button
            onClick={() => {
              open ? setInfoOpen(!infoOpen) : false
            }}
            className={`${infoOpen ? 'w-full h-max' : 'w-12'} aspect-square flex flex-col items-center justify-center rounded-2xl border border-sariblack/14 text-sariblack/40 cursor-pointer max-sm:hidden`}
          >
            {infoOpen == false && <Info size={20} />}
            {open && infoOpen && (
              <>
                <p>SANUBARI</p>

                <p>
                  © 2026 SANUBARI. Medical Disclaimer:
                  For informational purposes only.
                  Selalu konsultasikan kondisi kesehatan Anda
                  dengan tenaga medis profesional.
                </p>
              </>
            )}
          </button>
        </header>
      </div>

      <main className='w-full max-sm:min-h-full pl-0 max-sm:pl-4 p-4 max-sm:pb-24 overflow-auto'>
        <Outlet />
      </main>

      {
        supportOpen && (
          <div onClick={() => setSupportOpen(false)} className='fixed inset-0 max-sm:pb-20 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-6'>
            <div onClick={(e) => e.stopPropagation()} className='w-[40vw] max-sm:w-full h-[70vh] max-sm:h-[80vh] bg-white dsh-cards px-7 py-6 max-sm:px-5 max-sm:py-5 shadow-2xl flex flex-col overflow-auto gap-6 max-sm:gap-4 max-h-max' style={{scrollbarWidth: 'none'}}>
              <div className='flex flex-col leading-none shrink-0'>
                <h1 className='text-4xl max-sm:text-2xl font-semibold font-mr text-sariblack'>
                  Butuh Bantuan? <br/>
                  <span className='text-sariblue'>Hubungi Kami!</span>
                </h1>
              </div>
              <div className='flex flex-col'>
                <textarea placeholder='Pesan/Keluhan/Kritik...' className='w-full max-sm:h-45 resize-none rounded-3xl max-sm:rounded-xl border border-sariblack/10 bg-sariwhite p-4 outline-none text-sm placeholder:text-sariblack/25'/>
                <div className='mt-4 flex items-center gap-3 shrink-0'>
                  <button className='flex items-center rounded-2xl max-sm:rounded-xl border border-sariblue overflow-hidden transition cursor-pointer group max-sm:w-full'>
                    <div className='bg-sariblue self-stretch h-12 aspect-square flex items-center justify-center text-white shrink-0'>
                      <Paperclip size={18} />
                    </div>
                    <div className='flex items-center gap-2 py-3 max-sm:py-2 px-6 max-sm:px-4 rounded-2xl max-sm:rounded-lg bg-sariwhite/60 font-semibold text-sariblue max-sm:text-sm z-2'>
                      Lampirkan Screenshot
                    </div>
                  </button>
                </div>
                <p className='text-xs text-sariblack/30 mt-3 leading-relaxed shrink-0'>
                  Pesanmu akan terkirim lewat email yang terdaftar dalam SANUBARI.
                </p>
                <div className='flex items-center max-sm:flex-col gap-3 mt-5 shrink-0'>
                  <button className='flex items-center justify-center gap-2 py-3 max-sm:py-2 px-6 max-sm:px-4 rounded-2xl max-sm:rounded-lg bg-sariblue font-semibold text-white w-full max-sm:text-sm z-2 cursor-pointer'>
                    Kirim
                  </button>
                  <button onClick={() => setSupportOpen(false)} className='flex items-center justify-center gap-2 py-3 max-sm:py-2 px-6 max-sm:px-4 rounded-2xl max-sm:rounded-lg bg-sarired/14 font-semibold text-sarired border border-sarired w-full max-sm:text-sm z-2 cursor-pointer'>
                    Batal
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}