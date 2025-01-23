import React, { useState } from 'react';
import AdminProfile from '../components/AdminProfile';

function AdminArtists() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Gestion des artistes</h1>

      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        onClick={() => setShowProfile(!showProfile)}
      >
        {showProfile ? 'Masquer le profil' : 'Modifier le profil'}
      </button>

      {showProfile && <AdminProfile />}
    </div>
  );
}

export default AdminArtists;
