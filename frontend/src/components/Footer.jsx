import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">BMA MOTORS</h3>
            <p className="text-gray-400">
              Professionaalne autoremondi töökoda
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('nav.contact')}</h4>
            <p className="text-gray-400">E-mail: info@bmamotors.ee</p>
            <p className="text-gray-400">Tel: +372 XXXX XXXX</p>
            <p className="text-gray-400">Aadress: Tallinn, Estonia</p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Tööaeg</h4>
            <p className="text-gray-400">E-R: 09:00 - 18:00</p>
            <p className="text-gray-400">L-P: Suletud</p>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} BMA Motors. {t('footer.rights')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
