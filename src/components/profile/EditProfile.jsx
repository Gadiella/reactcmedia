import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function EditProfile() {
  const { user, setUser } = useAuth(); // Assuming user is stored in context
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Populate form with current user data
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        password: '', // Optional: You may or may not want to pre-fill the password
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    
    try {
      const response = await axios.put(
        `http://127.0.0.1:8000/api/users/${user.id}`, 
        formData
      );
      setMessage('Profil mis à jour avec succès');
      // Optionally, update the user in context
      setUser(response.data);
      setTimeout(() => navigate('/admin/artists'), 2000);
    } catch (error) {
      setError('Erreur lors de la mise à jour du profil');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-10">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">Modifier mon profil</h2>

      {message && <p className="text-green-600 text-center mb-4">{message}</p>}
      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium">Nom:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium">Nouveau mot de passe:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
        >
          Modifier
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
