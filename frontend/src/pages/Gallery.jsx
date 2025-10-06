function Gallery() {
  return (
    <div className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title text-center">Galerii</h1>
        <p className="text-center text-gray-600 mb-12">
          Vaata meie tehtud töid ja projekte
        </p>

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
  );
}

export default Gallery;
