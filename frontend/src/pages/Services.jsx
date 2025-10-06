import { useTranslation } from 'react-i18next';

function Services() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop)',
            filter: 'brightness(0.6)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              {t('services.title')}
            </h1>
            <p className="text-xl text-gray-200 mt-4">
              Professionaalsed autoremondi teenused
            </p>
          </div>
        </div>
      </section>

      {/* Services Content */}
      <ServicesContent />
    </div>
  );
}

function ServicesContent() {
  const { t } = useTranslation();

  const serviceCategories = {
    repair: [
      'Pidurisüsteemi hooldus ja remont',
      'Mootorite remont ja vahetus',
      'Käigukastide ja vahekastide hooldus',
      'Veermiku kontroll ja remonttööd'
    ],
    engine: [
      'Eelsüütesüsteemide remonttööd',
      'Mootori vahetus',
      'Common rail toitesüsteemide remont',
      'Turbolaadurite remont',
      'Mootorikettide vahetus'
    ],
    diagnostics: [
      'Programmeerimine ja kodeerimine',
      'Tarkvara uuendused',
      'Mootori ja käigukastide diagnostika',
      'ACC kalibreerimine (ADAS)'
    ],
    electrical: [
      'Immobilaiserite paigaldus',
      'Alarmide paigaldus',
      'Webasto paigaldus ja remonttööd',
      'Parkimisandurite paigaldus'
    ]
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {Object.entries(serviceCategories).map(([category, services]) => (
          <div key={category} className="mb-12 mt-12">
            <h2 className="text-2xl font-bold text-primary-600 mb-6">{t(`services.${category}`)}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {services.map((service, index) => (
                <div key={index} className="card">
                  <div className="flex items-start">
                    <span className="text-primary-600 mr-3">✓</span>
                    <p className="text-gray-800">{service}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
