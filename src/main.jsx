import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Hero from './Hero.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Layout from './Layout.jsx'
import LandingPage from './LandingPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout/>}>
          <Route element={<LandingPage/>} index/>
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
