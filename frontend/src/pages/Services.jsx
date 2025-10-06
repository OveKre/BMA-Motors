import { useTranslation } from 'react-i18next';

function Services() {
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
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title text-center">{t('services.title')}</h1>

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
