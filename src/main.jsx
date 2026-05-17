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
import CameraPage from './components/dashboard-pages/Camera.jsx'
import InsightPage from './components/dashboard-pages/Insight.jsx'
import Blog from './components/dashboard-pages/Blog.jsx'
import ChatbotPage from './components/dashboard-pages/Chatbot.jsx'

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
          <Route path='/dashboard/camera' element={<CameraPage/>}/>
          <Route path='/dashboard/insights' element={<InsightPage/>}/>
          <Route path='/dashboard/blog' element={<Blog/>}/>
          <Route path='/dashboard/chatbot' element={<ChatbotPage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
