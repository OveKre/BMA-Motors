import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../api/axios';

function SpareParts() {
  const { t, i18n } = useTranslation();
  const [carModels, setCarModels] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fikseeritud automarkide list
  const carMakes = [
    'Alfa Romeo',
    'Audi',
    'Bentley',
    'BMW',
    'Cadillac',
    'Chevrolet',
    'Chrysler',
    'Citroen',
    'Dacia',
    'Daewoo',
    'Dodge',
    'Fiat',
    'Ford',
    'GMC',
    'Honda',
    'Hyundai',
    'Infiniti',
    'Isuzu',
    'Jaguar',
    'Jeep',
    'Kia',
    'Lancia',
    'Land Rover',
    'Lexus',
    'Lincoln',
    'Mazda',
    'Mercedes-Benz',
    'MINI',
    'Mitsubishi',
    'Nissan',
    'Opel',
    'Peugeot',
    'Porsche',
    'Renault',
    'Rolls-Royce',
    'Rover',
    'Saab',
    'SEAT',
    'Skoda',
    'Smart',
    'SsangYong',
    'Subaru',
    'Suzuki',
    'Tesla',
    'Toyota',
    'VAZ',
    'Volkswagen',
    'Volvo',
    'Other'
  ];

  const fetchCarModels = async (makeName) => {
    try {
      // Otsi make_id andmebaasist make_display nime järgi
      const response = await api.get(`/cars/makes`);
      const makes = Array.isArray(response.data) ? response.data : response.data.data || [];
      const selectedMake = makes.find(m => m.make_display === makeName);
      
      if (selectedMake) {
        const modelsResponse = await api.get(`/cars/models/${selectedMake.make_id}`);
        const models = Array.isArray(modelsResponse.data) ? modelsResponse.data : modelsResponse.data.data || [];
        setCarModels(models);
      } else {
        setCarModels([]);
      }
    } catch (error) {
      console.error('Error fetching car models:', error);
      setCarModels([]);
    }
  };

  const validationSchema = Yup.object({
    client_name: Yup.string().required('Name is required'),
    client_email: Yup.string().email('Invalid email').required('Email is required'),
    client_phone: Yup.string().required('Phone is required'),
    car_make: Yup.string().required('Car make is required'),
    car_model: Yup.string().required('Car model is required'),
    sparepart_name: Yup.string().required('Part name is required'),
  });

  const formik = useFormik({
    initialValues: {
      client_name: '',
      client_email: '',
      client_phone: '',
      car_make: '',
      car_model: '',
      car_year: '',
      license_plate: '',
      sparepart_name: '',
      sparepart_description: '',
      language: i18n.language
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await api.post('/spareparts/inquiry', values);
        
        if (response.data.success) {
          toast.success(t('spareparts.success'));
          resetForm();
        }
      } catch (error) {
        toast.error(error.response?.data?.error?.message || 'Error submitting inquiry');
      } finally {
        setLoading(false);
      }
    },
  });

  const handleMakeChange = (e) => {
    const makeName = e.target.value;
    formik.setFieldValue('car_make', makeName);
    formik.setFieldValue('car_model', '');
    if (makeName) {
      fetchCarModels(makeName);
    } else {
      setCarModels([]);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2032&auto=format&fit=crop)',
            filter: 'brightness(0.6)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              {t('spareparts.title')}
            </h1>
            <p className="text-xl text-gray-200 mt-4">
              Täida vorm ja saadame sulle pakkumise esimesel võimalusel
            </p>
          </div>
        </div>
      </section>

      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="card">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('spareparts.name')} *
                </label>
                <input
                  type="text"
                  name="client_name"
                  value={formik.values.client_name}
                  onChange={formik.handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('spareparts.email')} *
                </label>
                <input
                  type="email"
                  name="client_email"
                  value={formik.values.client_email}
                  onChange={formik.handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('spareparts.phone')} *
                </label>
                <input
                  type="tel"
                  name="client_phone"
                  value={formik.values.client_phone}
                  onChange={formik.handleChange}
                  className="input-field"
                />
              </div>
            </div>

            {/* Car Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('spareparts.carMake')} *
                </label>
                <select
                  name="car_make"
                  value={formik.values.car_make}
                  onChange={handleMakeChange}
                  className="input-field"
                >
                  <option value="">Vali mark</option>
                  {carMakes.map((make) => (
                    <option key={make} value={make}>
                      {make}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('spareparts.carModel')} *
                </label>
                <select
                  name="car_model"
                  value={formik.values.car_model}
                  onChange={formik.handleChange}
                  className="input-field"
                  disabled={!formik.values.car_make}
                >
                  <option value="">Vali mudel</option>
                  {carModels.map((model) => (
                    <option key={model.id} value={model.model_name}>
                      {model.model_name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('spareparts.year')}
                </label>
                <input
                  type="number"
                  name="car_year"
                  value={formik.values.car_year}
                  onChange={formik.handleChange}
                  className="input-field"
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear() + 1}
                />
              </div>
            </div>

            {/* License Plate */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auto numbrimärk
              </label>
              <input
                type="text"
                name="license_plate"
                value={formik.values.license_plate}
                onChange={formik.handleChange}
                className="input-field"
                placeholder="nt. 123ABC"
                maxLength="10"
                style={{ textTransform: 'uppercase' }}
              />
              <p className="text-xs text-gray-500 mt-1">Numbrimärk aitab meil täpsemalt varuosa leida</p>
            </div>

            {/* Part Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('spareparts.partName')} *
              </label>
              <input
                type="text"
                name="sparepart_name"
                value={formik.values.sparepart_name}
                onChange={formik.handleChange}
                className="input-field"
                placeholder="nt. Esitulede komplekt, pidurikettad"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('spareparts.description')}
              </label>
              <textarea
                name="sparepart_description"
                value={formik.values.sparepart_description}
                onChange={formik.handleChange}
                rows={4}
                className="input-field"
                placeholder="Täpsusta varuosa detaile (nt. OEM number, asend, seisukord)"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Saadan...' : t('spareparts.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default SpareParts;
