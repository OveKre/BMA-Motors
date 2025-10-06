import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

function Home() {
  const { t } = useTranslation();

  return (
    <div>
      {/* Hero Section with BMW Image */}
      <section className="relative h-[600px] w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop)',
            filter: 'brightness(0.7)'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="max-w-3xl">
              <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 leading-tight">
            
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                Professionaalne autoremondi töökoda
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link 
                  to="/broneerimine" 
                  className="btn-primary bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 text-lg"
                >
                  Broneeri aeg
                </Link>
                <Link 
                  to="/teenused" 
                  className="btn-primary bg-white hover:bg-gray-100 text-primary-600 px-8 py-4 text-lg"
                >
                  Vaata teenuseid
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Welcome Section with BMW */}
      <section className="relative h-[400px] w-full overflow-hidden bg-gradient-to-r from-blue-500 to-blue-600">
        {/* BMW Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat mix-blend-overlay opacity-30"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1617531653332-bd46c24f2068?q=80&w=2076&auto=format&fit=crop)'
          }}
        ></div>

        {/* Content */}
        <div className="relative h-full flex items-center justify-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Tere tulemast BMA Motors
            </h2>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8">
              Professionaalne autoremondi töökoda kõigi sõidukitüüpide jaoks. 
              Kvaliteetne teenindus, kiire vastus ja läbipaistev hinnakirjad.
            </p>
            <div className="flex justify-center gap-8 text-white">
              <div className="text-center">
                <div className="text-4xl font-bold">15+</div>
                <div className="text-lg">Aastat kogemust</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">5000+</div>
                <div className="text-lg">Rahulolu klienti</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">98%</div>
                <div className="text-lg">Positiivset tagasisidet</div>
              </div>
            </div>
          </div>
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
