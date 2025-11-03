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
      title: t('services.categoryRepair'),
      subcategories: {
        pidurisusteem: {
          title: t('services.brakeTitle'),
          description: t('services.brakeDesc'),
          services: [
            t('services.brakeService1'),
            t('services.brakeService2'),
            t('services.brakeService3'),
            t('services.brakeService4'),
            t('services.brakeService5'),
            t('services.brakeService6'),
            t('services.brakeService7'),
            t('services.brakeService8'),
            t('services.brakeService9')
          ]
        },
        veermik: {
          title: t('services.suspensionTitle'),
          description: t('services.suspensionDesc'),
          services: [
            t('services.suspensionService1'),
            t('services.suspensionService2'),
            t('services.suspensionService3'),
            t('services.suspensionService4'),
            t('services.suspensionService5'),
            t('services.suspensionService6'),
            t('services.suspensionService7'),
            t('services.suspensionService8'),
            t('services.suspensionService9'),
            t('services.suspensionService10'),
            t('services.suspensionService11'),
            t('services.suspensionService12'),
            t('services.suspensionService13'),
            t('services.suspensionService14')
          ]
        },
        kaigukast: {
          title: t('services.gearboxTitle'),
          description: t('services.gearboxDesc'),
          services: [
            t('services.gearboxService1'),
            t('services.gearboxService2'),
            t('services.gearboxService3'),
            t('services.gearboxService4'),
            t('services.gearboxService5'),
            t('services.gearboxService6'),
            t('services.gearboxService7'),
            t('services.gearboxService8'),
            t('services.gearboxService9'),
            t('services.gearboxService10'),
            t('services.gearboxService11'),
            t('services.gearboxService12'),
            t('services.gearboxService13'),
            t('services.gearboxService14'),
            t('services.gearboxService15'),
            t('services.gearboxService16'),
            t('services.gearboxService17')
          ]
        },
        mootor: {
          title: t('services.engineTitle'),
          description: t('services.engineDesc'),
          services: [
            t('services.engineService1'),
            t('services.engineService2'),
            t('services.engineService3'),
            t('services.engineService4'),
            t('services.engineService5'),
            t('services.engineService6'),
            t('services.engineService7'),
            t('services.engineService8'),
            t('services.engineService9'),
            t('services.engineService10'),
            t('services.engineService11'),
            t('services.engineService12'),
            t('services.engineService13'),
            t('services.engineService14'),
            t('services.engineService15'),
            t('services.engineService16'),
            t('services.engineService17')
          ]
        },
        commonRail: {
          title: t('services.commonRailTitle'),
          description: t('services.commonRailDesc'),
          services: [
            t('services.commonRailService1'),
            t('services.commonRailService2'),
            t('services.commonRailService3'),
            t('services.commonRailService4'),
            t('services.commonRailService5'),
            t('services.commonRailService6'),
            t('services.commonRailService7'),
            t('services.commonRailService8'),
            t('services.commonRailService9'),
            t('services.commonRailService10'),
            t('services.commonRailService11'),
            t('services.commonRailService12')
          ]
        }
      }
    },
    diagnostika: {
      title: t('services.categoryDiagnostics'),
      subcategories: {
        elektroonika: {
          title: t('services.electronicsTitle'),
          description: t('services.electronicsDesc'),
          services: [
            t('services.electronicsService1'),
            t('services.electronicsService2'),
            t('services.electronicsService3'),
            t('services.electronicsService4'),
            t('services.electronicsService5')
          ]
        }
      }
    },
    elektritood: {
      title: t('services.categoryElectrical'),
      subcategories: {
        lisaseadmed: {
          title: t('services.additionalTitle'),
          description: t('services.additionalDesc'),
          services: [
            t('services.additionalService1'),
            t('services.additionalService2'),
            t('services.additionalService3'),
            t('services.additionalService4'),
            t('services.additionalService5')
          ]
        }
      }
    },
    muud: {
      title: t('services.categoryOther'),
      subcategories: {
        ostuKontroll: {
          title: t('services.inspectionTitle'),
          description: t('services.inspectionDesc'),
          services: [
            t('services.inspectionService1')
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
