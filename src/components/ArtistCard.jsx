import React, { useState } from 'react';
import { FaShare, FaVoteYea, FaWhatsapp, FaFacebook, FaTiktok } from 'react-icons/fa';

function ArtistCard({ artist }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showVoteOptions, setShowVoteOptions] = useState(false);
  const [voteCount, setVoteCount] = useState(1);
  const [votePrice, setVotePrice] = useState(350);
  const [isLoading, setIsLoading] = useState(false);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300x300?text=Image+non+disponible';
    return `http://localhost:8000/storage/${imagePath.replace('public/', '')}`;
  };

  const calculatePrice = (votes) => {
    if (votes <= 100) return 350;
    if (votes <= 1000) return 250;
    if (votes <= 3500) return 200;
    if (votes <= 10000) return 175;
    return 125;
  };

  const handleVoteChange = (increment) => {
    const newVoteCount = Math.max(1, voteCount + increment);
    setVoteCount(newVoteCount);
    setVotePrice(calculatePrice(newVoteCount));
  };

  const submitVoteToBackend = async (voteCount) => {
    try {
      const response = await fetch(`http://localhost:8000/api/artists/${artist.id}/vote`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          vote_count: voteCount,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Vote enregistré avec succès !');
      } else {
        alert("Erreur lors de l'enregistrement des votes.");
      }
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      alert('Impossible d\'envoyer les votes.');
    }
  };

  const handleVote = async () => {
    setIsLoading(true);
    try {
      if (artist.vote_type === 'free') {
        await submitVoteToBackend(voteCount);
      } else {
        const totalAmount = voteCount * votePrice;
        const payload = {
          apikey: '8649257106124d2a715f598.10328816',
          site_id: '321525',
          transaction_id: `txn_${Date.now()}`,
          amount: totalAmount,
          currency: 'XOF',
          description: `Vote pour ${artist.name}`,
          return_url: 'https://votre-site.com/success',
          notify_url: 'https://votre-site.com/notify',
          customer_name: 'Nom Client',
          customer_email: 'email@example.com',
          customer_phone_number: '22912345678',
        };
        Voter
        const response = await fetch('https://api-checkout.cinetpay.com/v2/payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await response.json();
        if (data.code === '201') {
          window.location.href = data.data.payment_url;
        } else {
          alert(`Erreur: ${data.message}`);
        }
      }
    } catch (error) {
      console.error('Erreur lors du paiement:', error);
      alert('Une erreur est survenue lors de la tentative de vote.');
    } finally {
      setIsLoading(false);
      setShowVoteOptions(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden w-64 relative  transform transition duration-300 hover:scale-105 hover:shadow-2xl">
      <div className="relative h-48">
        <img 
          src={getImageUrl(artist.image)}
          alt={artist.name}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x300?text=Image+non+disponible';
          }}
        />
      </div>

      <div className="p-3">
        <h3 className="text-lg font-semibold text-center mb-2">{artist.name}</h3>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowShareOptions(!showShareOptions)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm flex items-center w-28 gap-1"
          >
            <FaShare /> Partager
          </button>
          <button
            onClick={() => setShowVoteOptions(true)}
            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-sm flex items-center justify-center w-full w-28 gap-1"
          >
            <FaVoteYea /> Voter
          </button>
        </div>
      </div>

      {showVoteOptions && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-full">
            <h2 className="text-lg font-bold text-center mb-4">Voter pour {artist.name}</h2>

            <p className="text-sm mb-2">Nombre de votes:</p>
            <div className="flex justify-between items-center mb-4">
              <button onClick={() => handleVoteChange(-1)} className="bg-gray-200 px-4 py-2 rounded">-</button>
              <span className="font-bold text-2xl">{voteCount}</span>
              <button onClick={() => handleVoteChange(1)} className="bg-gray-200 px-4 py-2 rounded">+</button>
            </div>

            {artist.vote_type === 'paid' && (
              <>
                <p className="text-sm mb-4">Total: <strong>{voteCount * votePrice} XOF</strong></p>
                <div className="text-xs text-gray-500 mb-6">
                  <strong><p>Tarifs:</p></strong>
                  <ul className="list-disc list-inside">
                    <li>1 - 100 votes: 350 XOF par vote</li>
                    <li>101 - 1000 votes: 250 XOF par vote</li>
                    <li>1001 - 3500 votes: 200 XOF par vote</li>
                    <li>3501 - 10000 votes: 175 XOF par vote</li>
                    <li>10001 et plus votes: 125 XOF par vote</li>
                  </ul>
                </div>
              </>
            )}

            <div className="flex justify-end gap-4">
              <button onClick={() => setShowVoteOptions(false)} className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 text-sm">
                Annuler
              </button>
              <button 
                onClick={handleVote} 
                className={`bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 text-sm ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? 'Chargement...' : 'Voter'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ArtistCard;
