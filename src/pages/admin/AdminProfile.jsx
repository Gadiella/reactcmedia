import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

function AdminProfile() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: '',
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Mise à jour du formulaire lorsqu'on obtient l'utilisateur
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        password: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Création d'un objet avec les données à envoyer
    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password || undefined,  // On envoie 'undefined' si le mot de passe n'est pas fourni
    };

    try {
      // Envoi de la requête PUT à l'API pour mettre à jour les informations de l'utilisateur
      const response = await api.put(`/admin/user/${user.id}/`, data, {
        headers: {
          'Content-Type': 'application/json',  // On spécifie que c'est du JSON
        },
      });

      if (response.status === 200) {
        setSuccess('Profil mis à jour avec succès');
        setTimeout(() => {
          navigate('/admin/artists');
        }, 2000);
      }
    } catch (error) {
      setError(error.response?.data?.message || 'Erreur lors de la mise à jour du profil');
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      try {
        setIsDeleting(true);
        // Suppression du compte de l'utilisateur
        await api.delete(`/admin/user/${user.id}/`);
        logout();
        navigate('/');
      } catch (error) {
        setError(error.response?.data?.message || 'Erreur lors de la suppression du compte');
        setIsDeleting(false);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900">
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6 dark:text-white">Modifier le profil</h1>
        
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        )}
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nom
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nouveau mot de passe
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Laissez vide si inchangé"
            />
          </div>

          <div className="flex justify-between items-center pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Mettre à jour
            </button>

            <button
              type="button"
              onClick={handleDeleteAccount}
              disabled={isDeleting}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              {isDeleting ? 'Suppression...' : 'Supprimer le compte'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminProfile;
