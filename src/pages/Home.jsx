import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import axios from 'axios';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArtistCard from '../components/ArtistCard';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement, CategoryScale } from 'chart.js';

import banner1 from '../assets/banner1.jpg';
import banner2 from '../assets/banner2.jpg';
import banner3 from '../assets/banner3.jpg';

ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale);

function Home() {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/artists/');
        setArtists(response.data);
      } catch (error) {
        setError('Une erreur est survenue lors du chargement des artistes.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    const fetchArtistStats = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/artists/count-by-category');
        
        if (response.data && response.data.data) {
          const categories = response.data.data.map(item => item.category);
          const totals = response.data.data.map(item => item.total);

          setChartData({
            labels: categories,
            datasets: [
              {
                label: 'Nombre d\'artistes',
                data: totals,
                backgroundColor: ['#ff6347', '#36a2eb', '#ffce56', '#4bc0c0', '#8e44ad'],
                borderColor: ['#fff', '#fff', '#fff', '#fff', '#fff'],
                borderWidth: 2,
              },
            ],
          });
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques : ", error);
      }
    };

    fetchArtists();
    fetchArtistStats();
  }, []);

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    animation: {
      duration: 0,
    },
    interaction: {
      mode: 'nearest',
      intersect: false,
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="container mx-auto px-4 m-0">
      <div className="mb-12 relative">
        <Slider {...sliderSettings}>
          <div>
            <img 
              src={banner1} 
              alt="Banner 1" 
              className="Banner 1"className="w-screen h-[50vh] sm:h-[450px] object-fill"
            />
          </div>
          <div>
            <img 
              src={banner2} 
              alt="Banner 2" 
              className="w-screen h-[50vh] sm:h-[450px] object-fill"
            />
          </div>
          <div>
            <img 
              src={banner3} 
              alt="Banner 3" 
              className="w-screen h-[450px] object-fill"
            />
          </div>
        </Slider>
      </div>

      <div className="text-center mb-12">
        <p className="text-gray-600 max-w-3xl mx-auto">
          "Pour découvrir davantage d'artistes ou de catégories, cliquez sur Voir plus."
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          {loading ? (
            <p className="text-center">Chargement...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.slice(0, 6).map((artist) => (
                <div key={artist.id} className="aspect-square">
                  <ArtistCard artist={artist} />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-8">
            <Link 
              to="/voter"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Voir plus
            </Link>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="p-6 h-[400px]">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Répartition des Artistes par Catégorie
            </h2>
            <div className="h-[300px] relative">
              {chartData ? (
                <Doughnut 
                  data={chartData} 
                  options={chartOptions} 
                />
              ) : (
                <p className="text-center">Chargement des données...</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
