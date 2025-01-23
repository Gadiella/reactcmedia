import React, { useState, useEffect } from 'react';
import ArtistCard from '../components/ArtistCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaSearch } from 'react-icons/fa';
import banner1 from '../assets/bannervote1.jpg';
import banner2 from '../assets/bannervote2.jpg';

function Vote() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');
  const [artists, setArtists] = useState([]);
  const [countries, setCountries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/artists');
        const data = await response.json();

        if (Array.isArray(data)) {
          setArtists(data);
        } else {
          console.error("La réponse des artistes n'est pas un tableau:", data);
          setArtists([]);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des artistes:", error);
        setArtists([]);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchCountries = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8000/api/countries');
        const data = await response.json();

        if (Array.isArray(data)) {
          setCountries(data);
        } else {
          console.error("La réponse des pays n'est pas une liste :", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des pays:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/categories');
        const data = await response.json();

        if (Array.isArray(data.categories)) {
          setCategories(data.categories);
        } else {
          console.error("La réponse des catégories n'est pas dans le format attendu :", data);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    };

    fetchCategories();
  }, []);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  // Fonction pour filtrer les artistes
  const filteredArtists = artists.filter((artist) => {
    // Log des artistes et des filtres pour le débogage
    console.log('Filtrage de l\'artiste:', artist.name, 'Catégorie:', artist.category, 'Pays:', artist.country);

    // Vérification de la catégorie et pays sélectionnés
    const matchesSearchTerm = artist.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Comparaison des catégories avec gestion des espaces et casse
    const matchesCategory = selectedCategory
      ? artist.category?.trim().toLowerCase() === selectedCategory.trim().toLowerCase()
      : true;

    // Comparaison des pays avec gestion des espaces et casse
    const matchesCountry = selectedCountry
      ? artist.country?.trim().toLowerCase() === selectedCountry.trim().toLowerCase()
      : true;

    console.log('Filtres appliqués:', {
      searchTerm: searchTerm,
      selectedCategory: selectedCategory,
      selectedCountry: selectedCountry,
      matchesSearchTerm: matchesSearchTerm,
      matchesCategory: matchesCategory,
      matchesCountry: matchesCountry
    });

    return matchesSearchTerm && matchesCategory && matchesCountry;
  });

  // Log des artistes filtrés
  console.log('Artistes filtrés:', filteredArtists);

  return (
    <div className="container mx-auto px-4 m-0">
      <div className="mb-8">
        <Slider {...sliderSettings}>
          <div>
            <img src={banner1} alt="Banner 1" className="w-screen h-[50vh] sm:h-[450px] object-fill" />
          </div>
          <div>
            <img src={banner2} alt="Banner 2" className="w-screen h-[0vh] sm:h-[450px] object-fill" />
          </div>
        </Slider>
      </div>

      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Voter pour vos artistes préférés</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Soutenez vos artistes préférés en leur donnant votre voix !
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <select
          className="border rounded-md px-4 py-3 w-full sm:w-64"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Toutes les Catégories</option>
          {loading ? (
            <option value="">Chargement des catégories...</option>
          ) : (
            categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))
          )}
        </select>

        <select
          className="border rounded-md px-4 py-3 w-full sm:w-64"
          value={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          <option value="">Tous les Pays</option>
          {loading ? (
            <option value="">Chargement des pays...</option>
          ) : (
            countries.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))
          )}
        </select>

        <div className="flex items-center  w-full sm:w-auto">
          <input
            type="text"
            placeholder="Rechercher..."
            className="border rounded-l-md px-4 py-3  w-full sm:w-64 mr-2"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="flex items-center bg-red-500 text-white px-4 py-3 rounded-md hover:bg-red-600  w-full sm:w-auto">
            <FaSearch className="mr-2" />
            Rechercher
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredArtists.length > 0 ? (
          filteredArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))
        ) : (
          <div className="col-span-4 text-center">Aucun artiste trouvé avec ces filtres.</div>
        )}
      </div>
    </div>
  );
}

export default Vote;
