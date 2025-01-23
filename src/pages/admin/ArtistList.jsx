import React, { useState, useEffect } from 'react';
import { artistService } from '../../services/api';
import { Link } from 'react-router-dom';
import { FaEdit, FaTrash, FaPlus, FaUser } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';

function ArtistList() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    loadArtists();
  }, []);

  const loadArtists = async () => {
    try {
      const response = await artistService.getAll();
      const artistsWithVotes = await Promise.all(
        response.data.map(async (artist) => {
          try {
            const voteResponse = await artistService.getVoteCount(artist.id);
            return {
              ...artist,
              vote_count: voteResponse.data.vote_count || 0,  // Gestion de valeur par défaut
            };
          } catch (error) {
            console.error(`Erreur lors de la récupération des votes pour ${artist.name}:`, error.response?.data || error.message);
            return {
              ...artist,
              vote_count: 0
            };
          }
        })
      );
      setArtists(artistsWithVotes);
    } catch (error) {
      console.error('Erreur lors du chargement des artistes:', error.response?.data || error.message);
      setError('Erreur lors du chargement des artistes');
    } finally {
      setLoading(false);
    }
  };
  
  const handleDelete = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet artiste ?')) {
      try {
        await artistService.delete(id);
        setArtists(artists.filter(artist => artist.id !== id));
      } catch (error) {
        setError('Erreur lors de la suppression');
      }
    }
  };

  // Fonction pour obtenir l'URL de l'image
  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x300?text=Image+non+disponible';
    return `http://localhost:8000/storage/${imagePath.replace('public/', '')}`;
  };

  if (loading) return <div className="text-center py-8 dark:text-white">Chargement...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold dark:text-white">Gestion des Artistes</h1>
        <div className="flex gap-4">

        <Link
            to="/admin/artists/create"
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
          >
            <FaPlus /> Ajouter un artiste
          </Link>
          {user?.role === 'admin' && (
            <Link
              to="/admin/profile"
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 flex items-center gap-2"
            >
              <FaUser /> Mon Profil
            </Link>
          )}
      
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Image
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Nom
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Catégorie
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Pays
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Votes
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
            {artists.map((artist) => (
              <tr key={artist.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <img
                    src={getImageUrl(artist.image)} // Utilisation de la fonction getImageUrl
                    alt={artist.name}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                </td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{artist.name}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{artist.category}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{artist.country}</td>
                <td className="px-6 py-4 whitespace-nowrap dark:text-white">{artist.vote_count || 0}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex space-x-2">
                    <Link
                      to={`/admin/artists/edit/${artist.id}`}
                    className="text-black hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                    >
                      <FaEdit size={20} />
                    </Link>
                    <button
                      onClick={() => handleDelete(artist.id)}
                      className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <FaTrash size={20} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ArtistList;
