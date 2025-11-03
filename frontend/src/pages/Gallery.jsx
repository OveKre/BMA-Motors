import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../api/axios';

function Gallery() {
  const { t, i18n } = useTranslation();
  const [galleryImages, setGalleryImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleryImages();
  }, []);

  const fetchGalleryImages = async () => {
    try {
      const response = await api.get('/gallery');
      setGalleryImages(response.data.data || []);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
    } finally {
      setLoading(false);
    }
  };

  const getImageUrl = (imagePath) => {
    // If path starts with http, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    // Otherwise prepend API URL
    return `${import.meta.env.VITE_API_URL.replace('/api', '')}${imagePath}`;
  };

  const getTitle = (image) => {
    const lang = i18n.language;
    if (lang === 'eng' && image.title_eng) return image.title_eng;
    if (lang === 'rus' && image.title_rus) return image.title_rus;
    return image.title_est || 'BMW remont';
  };

  const getDescription = (image) => {
    const lang = i18n.language;
    if (lang === 'eng' && image.description_eng) return image.description_eng;
    if (lang === 'rus' && image.description_rus) return image.description_rus;
    return image.description_est || '';
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2070&auto=format&fit=crop)',
            filter: 'brightness(0.6)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              {t('gallery.title')}
            </h1>
            <p className="text-xl text-gray-200 mt-4">
              {t('gallery.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">{t('gallery.loading')}</p>
            </div>
          ) : galleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">{t('gallery.empty')}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {galleryImages.map((image) => (
                <div key={image.id} className="card overflow-hidden p-0 hover:shadow-xl transition-shadow duration-300">
                  <div className="h-64 bg-gray-200 overflow-hidden">
                    <img 
                      src={getImageUrl(image.image_path)} 
                      alt={getTitle(image)}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{getTitle(image)}</h3>
                    <p className="text-sm text-gray-600">{getDescription(image)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Gallery;
