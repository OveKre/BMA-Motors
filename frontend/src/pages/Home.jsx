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
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=2070&auto=format&fit=crop)',
            backgroundSize: '99%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'brightness(2)'
          }}
        >
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative h-full flex items-center">
          <div className="w-full px-4 sm:px-6 lg:px-40">
            {/* Semi-transparent box on the left edge */}
            <div className="max-w-xl backdrop-blur-sm bg-black/40 p-8 rounded-lg border border-white/10 ml-0">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                {t('home.heroTitle')}
              </h1>
              <p className="text-lg text-gray-200 mb-6">
                {t('home.heroDescription')}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link 
                  to="/broneerimine" 
                  className="inline-block text-center bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('home.bookAppointment')}
                </Link>
                <Link 
                  to="/teenused" 
                  className="inline-block text-center bg-white/90 hover:bg-white text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  {t('home.viewServices')}
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

      {/* About Us Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* BMW M Colors Background */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <div className="flex transform -skew-x-12" style={{ width: '120%', height: '100%' }}>
            <div className="flex-1" style={{ backgroundColor: '#0066B1' }}></div>
            <div className="flex-1" style={{ backgroundColor: '#6C1D82' }}></div>
            <div className="flex-1" style={{ backgroundColor: '#E4032E' }}></div>
          </div>
        </div>
        
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">{t('home.aboutTitle')}</h2>
          
          <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
            <p>
              {t('home.aboutP1')}
            </p>
            
            <p>
              {t('home.aboutP2')}
            </p>
            
            <p>
              {t('home.aboutP3')}
            </p>
            
            <p className="text-xl font-semibold text-primary-600 text-center pt-4">
              {t('home.aboutP4')}
            </p>
          </div>
        </div>
      </section>

      {/* Location Map Section - Full Width with Left Contact Card */}
      <section className="py-16 bg-gray-50">
        <h2 className="section-title text-center mb-12">{t('home.locationTitle')}</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* LEFT SIDE - Contact Info (Vasak äär) */}
          <div className="lg:col-span-3 flex flex-col justify-center px-4 lg:pl-8 lg:pr-4 mb-8 lg:mb-0">
            <div className="bg-white p-6 rounded-lg shadow-lg h-full">
              <h3 className="text-2xl font-bold mb-6 text-primary-600">BMA MOTORS</h3>
              <div className="space-y-5">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <div>
                    <p className="font-bold text-base text-gray-900">{t('home.address')}:</p>
                    <p className="text-gray-700 text-base">Jussikalda 6, Tallinn</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <div>
                    <p className="font-bold text-base text-gray-900">{t('home.phone')}:</p>
                    <a href="tel:+3725551234" className="text-primary-600 hover:underline text-base">+372 555 1234</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <div>
                    <p className="font-bold text-base text-gray-900">{t('home.email')}:</p>
                    <a href="mailto:info@bmamotors.ee" className="text-primary-600 hover:underline text-base">info@bmamotors.ee</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-primary-600 mr-3 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-bold text-base text-gray-900">{t('home.openingHours')}:</p>
                    <p className="text-gray-700 text-base">{t('home.monFri')}</p>
                    <p className="text-gray-700 text-base">{t('home.saturday')}</p>
                    <p className="text-gray-700 text-base">{t('home.sunday')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE - Google Maps (Lai, kuni parema ääreni) */}
          <div className="lg:col-span-9 h-[500px] lg:h-[600px] px-4 lg:pr-8 lg:pl-4">
            <div className="h-full rounded-lg overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2028.4719837842896!2d24.734820076881948!3d59.43718897464156!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4692eb3b3b3b3b3b%3A0x3b3b3b3b3b3b3b3b!2sJussikalda%209%2C%2011415%20Tallinn!5e0!3m2!1sen!2see!4v1696000000000!5m2!1sen!2see"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="BMA MOTORS Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">{t('home.sparePartsTitle')}</h2>
          <p className="text-xl text-gray-600 mb-8">{t('home.sparePartsDescription')}</p>
          <Link to="/varuosad" className="btn-primary">
            {t('nav.spareparts')}
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
