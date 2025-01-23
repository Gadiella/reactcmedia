import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logofooter.png';

function Footer() {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <img src={logo} alt="CmediaEVENTS" className="h-12 mb-4" />
            <p className="text-sm mb-2">Le seul endroit où chaque vote compte vraiment!</p>
            <p className="text-sm">Encouragez vos stars préférées et contribuez
               à leur succès à chaque choix.</p>
          </div>
          
          {/* Section Contacts centré au milieu */}
          <div className="flex flex-col justify-center items-center md:items-start">
            <h3 className="text-xl font-bold mb-4">Contacts</h3>
            <p className="mb-2">
              <a href="mailto:info@cmediaevents.net" className="hover:text-red-500">
                📧 info@cmediaevents.net
              </a>
            </p>
            <p>📞 +228 96 47 91 91 / +225 07 47 00 87 12</p>
          </div>
          
          {/* Section Menu avec alignement justifié */}
          <div className="flex flex-col justify-between items-center md:items-end">
            <h3 className="text-xl font-bold mb-4"></h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-red-500">Accueil</Link></li>
              <li><a href="https://cmediaevents.net/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500">Evénement</a></li>
              <li><Link to="/voter" className="hover:text-red-500">Vote</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="text-center mt-8 pt-4 border-t border-gray-800">
          <p>© 2022 Cmedialinks. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;