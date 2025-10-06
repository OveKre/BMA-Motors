import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

function Navbar() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary-600">BMA MOTORS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.home')}
            </Link>
            <Link to="/teenused" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.services')}
            </Link>
            <Link to="/broneerimine" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.booking')}
            </Link>
            <Link to="/galerii" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.gallery')}
            </Link>
            <Link to="/varuosad" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.spareparts')}
            </Link>
            <Link to="/kontakt" className="text-gray-700 hover:text-primary-600 transition">
              {t('nav.contact')}
            </Link>
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex items-center space-x-2">
            <button
              onClick={() => changeLanguage('est')}
              className={`px-3 py-1 rounded ${i18n.language === 'est' ? 'bg-primary-600 text-white' : 'text-gray-700'}`}
            >
              EST
            </button>
            <button
              onClick={() => changeLanguage('eng')}
              className={`px-3 py-1 rounded ${i18n.language === 'eng' ? 'bg-primary-600 text-white' : 'text-gray-700'}`}
            >
              ENG
            </button>
            <button
              onClick={() => changeLanguage('rus')}
              className={`px-3 py-1 rounded ${i18n.language === 'rus' ? 'bg-primary-600 text-white' : 'text-gray-700'}`}
            >
              РУС
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-primary-600 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <nav className="md:hidden" data-testid="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {t('nav.home')}
            </Link>
            <Link to="/teenused" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {t('nav.services')}
            </Link>
            <Link to="/broneerimine" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {t('nav.booking')}
            </Link>
            <Link to="/galerii" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {t('nav.gallery')}
            </Link>
            <Link to="/varuosad" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {t('nav.spareparts')}
            </Link>
            <Link to="/kontakt" className="block px-3 py-2 text-gray-700 hover:bg-gray-100 rounded">
              {t('nav.contact')}
            </Link>
            <div className="flex space-x-2 px-3 py-2">
              <button onClick={() => changeLanguage('est')} className="px-3 py-1 rounded bg-gray-200">EST</button>
              <button onClick={() => changeLanguage('eng')} className="px-3 py-1 rounded bg-gray-200">ENG</button>
              <button onClick={() => changeLanguage('rus')} className="px-3 py-1 rounded bg-gray-200">РУС</button>
            </div>
          </div>
        </nav>
      )}
    </nav>
  );
}

export default Navbar;
