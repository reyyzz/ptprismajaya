import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import SiteLayout from './components/SiteLayout'
import ContactsPage from './pages/ContactsPage'
import GalleryPage from './pages/GalleryPage'
import HomePage from './pages/HomePage'
import ProfilePage from './pages/ProfilePage'
import ServicePage from './pages/ServicePage'

function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<Navigate to="/profile/about-us" replace />} />
        <Route path="/profile/about-us" element={<ProfilePage />} />
        <Route path="/profile/service" element={<ServicePage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contacts" element={<ContactsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
