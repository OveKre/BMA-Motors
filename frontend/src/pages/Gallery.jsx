function Gallery() {
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
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className="card overflow-hidden p-0">
              <div className="h-64 bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400">Pilt {item}</span>
              </div>
              <div className="p-4">
                <h3 className="font-semibold">Projekt {item}</h3>
                <p className="text-sm text-gray-600">Kirjeldus</p>
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
