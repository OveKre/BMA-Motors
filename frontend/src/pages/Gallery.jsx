// Faili alguses
import pilt1 from '../images/pilt1.jpg';
import pilt2 from '../images/pilt2.jpg';
import pilt3 from '../images/pilt3.jpg';
import pilt4 from '../images/pilt4.jpg';
import pilt5 from '../images/pilt5.jpg';
import pilt6 from '../images/pilt6.jpg';


function Gallery() {
  // Galerii piltide andmed
  const galleryImages = [
    { id: 1, src: pilt1, title: 'BMW remont', description: 'Mootori kapitalremont' },
    { id: 2, src: pilt2, title: 'BMW diagnostika', description: 'Common rail süsteemi hooldus' },
    { id: 3, src: pilt3, title: 'Veermiku remont', description: 'Veermiku täielik hooldus' },
    { id: 4, src: pilt4, title: 'Käigukasti hooldus', description: 'DSG käigukasti hooldus' },
    { id: 5, src: pilt5, title: 'Pidurisüsteem', description: 'Piduriklotside vahetus' },
    { id: 6, src: pilt6, title: 'Elektritööd', description: 'Elektroonika diagnostika' },
  ];

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
              Galerii
            </h1>
            <p className="text-xl text-gray-200 mt-4">
              Vaata meie tehtud töid ja projekte
            </p>
          </div>
        </div>
      </section>

      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {galleryImages.map((image) => (
            <div key={image.id} className="card overflow-hidden p-0 hover:shadow-xl transition-shadow duration-300">
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img 
                  src={image.src} 
                  alt={image.title}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg">{image.title}</h3>
                <p className="text-sm text-gray-600">{image.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}

export default Gallery;
