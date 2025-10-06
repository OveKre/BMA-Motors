import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-4">{t('home.welcome')}</h1>
          <p className="text-xl mb-8">{t('home.subtitle')}</p>
          <Link to="/broneerimine" className="btn-primary bg-white text-primary-600 hover:bg-gray-100">
            {t('home.cta')}
          </Link>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="section-title text-center">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {['repair', 'engine', 'diagnostics', 'electrical', 'inspection'].map((service) => (
              <div key={service} className="card hover:shadow-xl transition">
                <h3 className="text-xl font-semibold mb-2">{t(`services.${service}`)}</h3>
                <p className="text-gray-600">Professional {service} services</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Vaja varuosi?</h2>
          <p className="text-xl text-gray-600 mb-8">Saada meile päring ja saame pakkuda parima hinna!</p>
          <Link to="/varuosad" className="btn-primary">
            {t('nav.spareparts')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
