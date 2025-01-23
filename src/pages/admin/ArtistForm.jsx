import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddArtistForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [artist, setArtist] = useState({
        name: '',
        country: '',
        category: '',
        vote_type: 'free',
        image: null,
    });

    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (id) {
            axios.get(`http://127.0.0.1:8000/api/artists/${id}`)
                .then(response => {
                    setArtist(response.data);
                })
                .catch(() => {
                    setError('Erreur lors du chargement des données');
                });
        }
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setArtist({ ...artist, [name]: value });
    };

    const handleFileChange = (e) => {
        setArtist({ ...artist, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const formData = new FormData();
        formData.append('name', artist.name);
        formData.append('country', artist.country);
        formData.append('category', artist.category);
        formData.append('vote_type', artist.vote_type);
        if (artist.image instanceof File) {
            formData.append('image', artist.image);
        }

        try {
            if (id) {
                await axios.post(`http://127.0.0.1:8000/api/artists/${id}`, formData);
                setMessage('Artiste mis à jour avec succès');
            } else {
                await axios.post('http://127.0.0.1:8000/api/artists', formData);
                setMessage('Artiste ajouté avec succès');
            }

            setTimeout(() => {
                navigate('/admin/artists');
            }, 2000);

        } catch (error) {
            setError(error.response?.data?.message || 'Une erreur est survenue.');
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 mt-10">
            <h2 className="text-2xl font-bold text-center text-gray-700 mb-4">
                {id ? 'Modifier un artiste' : 'Ajouter un artiste'}
            </h2>

            {message && <p className="text-green-600 text-center mb-4">{message}</p>}
            {error && <p className="text-red-600 text-center mb-4">{error}</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-gray-700 font-medium">Nom:</label>
                    <input 
                        type="text" 
                        name="name" 
                        value={artist.name} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Pays:</label>
                    <input 
                        type="text" 
                        name="country" 
                        value={artist.country} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Catégorie:</label>
                    <input 
                        type="text" 
                        name="category" 
                        value={artist.category} 
                        onChange={handleChange} 
                        required 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Type de vote:</label>
                    <select 
                        name="vote_type" 
                        value={artist.vote_type} 
                        onChange={handleChange} 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    >
                        <option value="free">Gratuit</option>
                        <option value="paid">Payant</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium">Image:</label>
                    <input 
                        type="file" 
                        name="image" 
                        accept="image/*" 
                        onChange={handleFileChange} 
                        className="w-full border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    />
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition duration-200"
                >
                    {id ? 'Modifier' : 'Ajouter'}
                </button>
            </form>
        </div>
    );
};

export default AddArtistForm;
