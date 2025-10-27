import { useState } from 'react';
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
              {t('services.subtitle')}
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
  const [selectedCategory, setSelectedCategory] = useState('remonttood');

  const serviceData = {
    remonttood: {
      title: 'Remonttööd',
      subcategories: {
        pidurisusteem: {
          title: 'Pidurisüsteemi hooldus ja remont',
          description: 'Pidurite kontroll, klotside ja ketaste vahetus, pidurivedeliku vahetus',
          services: [
            'Piduriklotside vahetamine',
            'Piduriketaste kontroll ja vahetus',
            'Pidurikaliprite remont ja hooldus',
            'Pidurivedeliku vahetus',
            'Pidurisüsteemi õhutamine',
            'Pidurivoolikute ja torustike kontroll',
            'Käsipiduri reguleerimine ja remont',
            'Pidurirummude hooldus',
            'Piduritugevuse mõõtmine'
          ]
        },
        veermik: {
          title: 'Veermiku kontroll ja remont',
          description: 'Veermiku alaosade kontroll ja vahetus',
          services: [
            'Veermiku täielik kontroll ja diagnostika',
            'Amortisaatorite vahetus',
            'Vedrudega tugilaagrite vahetus',
            'Vedrude vahetus',
            'Esiveermiku alumiste hoovastute vahetus',
            'Esiveermiku ülemiste hoovastute vahetus',
            'Tagaveermiku hoovastute vahetus',
            'Stabilisaatorite ja stabilisaatori varrastete vahetus',
            'Rattallaagrite vahetus',
            'Juhtliigeste (õliõlgade otsade) vahetus',
            'Roolivarraste ja roolivarraste otste vahetus',
            'Õhkvedru süsteemi remont',
            'Veermiku õõtshoovade vahetus',
            'Veermiku summutite vahetus'
          ]
        },
        kaigukast: {
          title: 'Käigukastide ja vahekastide hooldus',
          description: 'Käigukasti õli vahetus, remont ja diagnostika',
          services: [
            'Käigukasti õli vahetus (manuaalkäigukast)',
            'Automaatkäigukasti õli ja filtri vahetus',
            'DSG/CVT käigukastide spetsiaalne hooldus ja remont',
            'Käigukasti õlitaseme kontroll ja täiendamine',
            'Käigukasti diagnostika ja veakoodide lugemine',
            'Siduri vahetus ja reguleerimine',
            'Siduri hooratta vahetus',
            'Sidurivedeliku vahetus',
            'Käiguvahetuse mehhanismi remont',
            'Käigukasti tihendite ja õlitihendite vahetus',
            'Pooltelgede ja homokineetiliste liigeste vahetus',
            'Vahekasti õli vahetus',
            'Vahekasti ülekande remont',
            'Käigukasti laagrite vahetus',
            'Sünkronisaatorite vahetus',
            'Käigukasti täielik remont (üldremont)',
            'Käigukasti lekete tuvastamine ja kõrvaldamine'
          ]
        },
        mootor: {
          title: 'Mootorite remont ja vahetus',
          description: 'Mootori täisremont, vahetus ja komponentide remont',
          services: [
            'Mootori täisremont (üldremont)',
            'Mootori vahetus uue või taastatud mootori vastu',
            'Mootori kapitalremont',
            'Kolbide ja silindrite vahetus',
            'Väntvõlli ja mootorilaagrite vahetus',
            'Mootori pea vahetus ja remont',
            'Mootori pea planeerimine',
            'Klepikomplekti vahetus',
            'Tihvtide ja õlitihendite vahetus',
            'Mootori ketimehhanismi vahetus',
            'Hammasrihma komplekti vahetus',
            'Õlipumba vahetus',
            'Veepumba vahetus',
            'Generaatori vahetus',
            'Starteri vahetus',
            'Turbokompressori remont ja vahetus',
            'Mootori kompresjoonitesti teostamine'
          ]
        },
        commonRail: {
          title: 'Common rail ja kütusesüsteemide remont',
          description: 'Diiselmootorite kütusesüsteemide diagnostika ja remont',
          services: [
            'Common rail süsteemi täielik diagnostika',
            'Kütusesüsteemi rõhu mõõtmine',
            'Kütusepihustitide vahetus ja kontroll',
            'Kõrgsurvepumba remont ja vahetus',
            'Kütuserõhu regulaatori vahetus',
            'Common rail torustiku remont',
            'DPF-filtri regenereerimine ja puhastamine',
            'AdBlue süsteemi diagnostika ja remont',
            'Kütusefiltriti vahetus',
            'Kütusesüsteemi õhutamine',
            'Süüteküünalde ja eelsoojendusküünalde vahetus',
            'EGR-klapiü puhastamine ja vahetus'
          ]
        }
      }
    },
    diagnostika: {
      title: 'Diagnostika',
      subcategories: {
        elektroonika: {
          title: 'Elektrooniliste süsteemide diagnostika',
          description: 'Täielik auto diagnostika ja programmeerimine',
          services: [
            'Mootori diagnostika - täielik veakoodide lugemine ja süsteemide kontroll',
            'ABS-süsteemi diagnostika ja remont - ohutu pidurdamise tagamine',
            'Airbag süsteemi diagnostika - turvapadzanike süsteemi kontroll ja remont',
            'ACC kalibreerimine (ADAS) - aktiivse püsikiirussüsteemi seadistamine',
            'Programmeerimine ja kodeerimine - auto tarkvarade uuendused ja seadistused'
          ]
        }
      }
    },
    elektritood: {
      title: 'Elektritööd',
      subcategories: {
        lisaseadmed: {
          title: 'Lisaseadmete paigaldus ja remont',
          description: 'Auto elektroonika paigaldus',
          services: [
            'Alarmide paigaldus - häiresüsteemide paigaldus',
            'Immobilaiserite paigaldus - auto turvalisuse suurendamine',
            'Kärukonksude paigaldus - haagiseseadmete paigaldus',
            'Parkimisandurite paigaldus - parkimisabi süsteemide paigaldus',
            'Webasto paigaldus ja remont - eelsoojendussüsteemide paigaldus'
          ]
        }
      }
    },
    muud: {
      title: 'Muud teenused',
      subcategories: {
        ostuKontroll: {
          title: 'Ostueelne kontroll',
          description: 'Täielik auto ülevaatus enne ostmist',
          services: [
            'Ostueelne üldkontroll - täielik auto kontroll ja hindamine'
          ]
        }
      }
    }
  };

  // Get current category services
  const getCurrentServices = () => {
    const category = serviceData[selectedCategory];
    if (!category) return [];
    
    const allServices = [];
    Object.entries(category.subcategories).forEach(([subKey, subcategory]) => {
      allServices.push({
        title: subcategory.title,
        description: subcategory.description,
        services: subcategory.services
      });
    });
    return allServices;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-9xl mx-auto px-6 sm:px-6 lg:px-8 py-12">
        
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* LEFT SIDE - Category Menu (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow-sm sticky top-4">
              <h3 className="text-lg font-bold text-gray-900 mb-4 px-4">{t('services.categories')}</h3>
              <nav className="space-y-2">
                {Object.entries(serviceData).map(([categoryKey, category]) => (
                  <button
                    key={categoryKey}
                    onClick={() => setSelectedCategory(categoryKey)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 text-base font-medium ${
                      selectedCategory === categoryKey
                        ? 'bg-blue-600 text-white shadow-md'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{category.title}</span>
                      <svg 
                        className={`w-4 h-4 transition-transform ${
                          selectedCategory === categoryKey ? 'text-white' : 'text-gray-400'
                        }`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* RIGHT SIDE - Services List (3/4 width) */}
          <div className="lg:col-span-3">
            <h2 className="text-4xl font-bold text-gray-900 mb-8">
              {t('services.mainTitle')}
            </h2>
            
            {/* Services Display - Grid Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getCurrentServices().map((subcategory, idx) => (
                <div 
                  key={idx} 
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 p-6 border border-gray-200"
                >
                  {/* Card Header */}
                  <div className="mb-4 pb-4 border-b border-gray-200">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {subcategory.title}
                    </h3>
                    <p className="text-sm text-gray-600 italic">
                      {subcategory.description}
                    </p>
                  </div>
                  
                  {/* Services List */}
                  <ul className="space-y-3">
                    {subcategory.services.map((service, serviceIdx) => (
                      <li 
                        key={serviceIdx}
                        className="flex items-start text-sm text-gray-700"
                      >
                        <svg 
                          className="w-5 h-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{service}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
