import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'

import { BrowserRouter, Route, Routes } from 'react-router'

import SmoothScroll from './components/providers/SmoothScroll'

import Layout from './components/layout/Layout.jsx'
import LayoutDashboard from './components/layout/LayoutDashboard.jsx'

import LandingPage from './pages/LandingPage'
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage"
import ForgotPassword from "./pages/ForgotPassword";
import Home from './components/dashboard-pages/Home.jsx'
import CameraPage from './components/dashboard-pages/Camera.jsx'
import InsightPage from './components/dashboard-pages/Insight.jsx'
import Blog from './components/dashboard-pages/Blog.jsx'
import ChatbotPage from './components/dashboard-pages/Chatbot.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <SmoothScroll>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<LandingPage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgotpass" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<LayoutDashboard />}>
            <Route index element={<Home />} />
            <Route path="camera" element={<CameraPage />} />
            <Route path="insights" element={<InsightPage />} />
            <Route path="blog" element={<Blog />} />
            <Route path="chatbot" element={<ChatbotPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </SmoothScroll>
  </StrictMode>,
)