import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Vote from './pages/Vote';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import VerifyEmail from './pages/auth/VerifyEmail';
import ArtistList from './pages/admin/ArtistList';
import ArtistForm from './pages/admin/ArtistForm';
import AdminProfile from './pages/admin/AdminProfile';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen flex flex-col dark:bg-gray-900">
            <Navbar />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/voter" element={<Vote />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/verify-email" element={<VerifyEmail />} />
                
                {/* Routes admin protégées */}
                <Route path="/admin/profile" element={
                  <ProtectedRoute>
                    <AdminProfile />
                  </ProtectedRoute>
                } />
                <Route path="/admin/artists" element={
                  <ProtectedRoute>
                    <ArtistList />
                  </ProtectedRoute>
                } />
                <Route path="/admin/artists/create" element={
                  <ProtectedRoute>
                    <ArtistForm />
                  </ProtectedRoute>
                } />
                <Route path="/admin/artists/edit/:id" element={
                  <ProtectedRoute>
                    <ArtistForm />
                  </ProtectedRoute>
                } />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;
