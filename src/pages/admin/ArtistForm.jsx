import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { artistService } from '../../services/api';

function ArtistForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    country: '',
    image: null,
  });

  useEffect(() => {
    if (id) {
      loadArtist();
    }
  }, [id]);

  const loadArtist = async () => {
    try {
      const response = await artistService.getOne(id);
      setFormData(response.data);
    } catch (error) {
      setError('Erreur lors du chargement de l\'artiste');
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null) {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (id) {
        await artistService.update(id, formDataToSend);
      } else {
        await artistService.create(formDataToSend);
      }
      navigate('/admin/artists');
    } catch (error) {
      setError(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        {id ? 'Modifier l\'artiste' : 'Ajouter un artiste'}
      </h1>

      <form onSubmit={handleSubmit} className="max-w-lg">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Nom
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Catégorie
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Sélectionner une catégorie</option>
            <option value="Musique">Musique</option>
            <option value="Danse">Danse</option>
            <option value="Comédie">Comédie</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Pays
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          >
            <option value="">Sélectionner un pays</option>
            <option value="Togo">Togo</option>
            <option value="Bénin">Bénin</option>
            <option value="Côte d'Ivoire">Côte d'Ivoire</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Image
          </label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            accept="image/*"
            {...(!id && { required: true })}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={loading}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {loading ? 'Chargement...' : (id ? 'Modifier' : 'Ajouter')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/admin/artists')}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}

export default ArtistForm;