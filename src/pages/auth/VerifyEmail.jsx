import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function VerifyEmail() {
  const [verificationCode, setVerificationCode] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { verifyEmail } = useAuth();
  const email = location.state?.email;

  // Si l'email est absent, rediriger vers la page d'enregistrement
  if (!email) {
    navigate('/register');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Appel à la fonction de vérification du contexte avec la bonne clé
      await verifyEmail({ email, verification_code: verificationCode });
      // Rediriger vers la page de connexion après la vérification réussie
      navigate('/login');
    } catch (error) {
      // Afficher l'erreur en cas de code de vérification invalide
      setError(error.response?.data?.message || 'Code de vérification invalide');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Vérification de l'email
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Un code de vérification a été envoyé à {email}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
              {error}
            </div>
          )}
          <div>
            <input
              type="text"
              required
              className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
              placeholder="Code de vérification"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
            />
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Vérifier
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
