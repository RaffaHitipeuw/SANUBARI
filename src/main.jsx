import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Hero from './components/sections/Hero.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './components/layout/Layout.jsx'
import LandingPage from './pages/LandingPage.jsx'
import LoginPage from "./pages/LoginPage";
import LayoutDashboard from './components/layout/LayoutDashboard.jsx'
import Home from './components/dashboard-pages/Home.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route element={<LandingPage/>} index/>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<LayoutDashboard/>} path='/dashboard'>
          <Route index element={<Home/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
