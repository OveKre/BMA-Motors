import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Booking() {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [loading, setLoading] = useState(false);

  const validationSchema = Yup.object({
    client_name: Yup.string().required(t('booking.name') + ' is required'),
    client_email: Yup.string().email('Invalid email').required('Email is required'),
    client_phone: Yup.string().required('Phone is required'),
    booking_time: Yup.string().required('Time is required'),
  });

  const formik = useFormik({
    initialValues: {
      client_name: '',
      client_email: '',
      client_phone: '',
      booking_date: selectedDate.toISOString().split('T')[0],
      booking_time: '',
      car_make: '',
      car_model: '',
      notes: '',
      language: i18n.language
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await api.post('/booking', values);
        
        if (response.data.success) {
          toast.success(t('booking.success'));
          resetForm();
        }
      } catch (error) {
        toast.error(error.response?.data?.error?.message || 'Error submitting booking');
      } finally {
        setLoading(false);
      }
    },
  });

  const fetchAvailableSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await api.get(`/booking/available-slots?date=${formattedDate}`);
      console.log('Available slots response:', response.data);
      
      // Handle different response formats
      const slots = response.data.data?.availableSlots || response.data.availableSlots || [];
      
      // If no slots from backend, use default slots
      if (slots.length === 0) {
        const defaultSlots = [
          '09:00', '10:00', '11:00', '12:00',
          '13:00', '14:00', '15:00', '16:00'
        ];
        setAvailableSlots(defaultSlots);
      } else {
        setAvailableSlots(slots);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      // Use default slots on error
      const defaultSlots = [
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00'
      ];
      setAvailableSlots(defaultSlots);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    formik.setFieldValue('booking_date', date.toISOString().split('T')[0]);
    fetchAvailableSlots(date);
  };

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="section-title text-center">{t('booking.title')}</h1>

        <div className="card mt-8">
          <form onSubmit={formik.handleSubmit} className="space-y-6">
            {/* Calendar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.selectDate')}
              </label>
              <Calendar
                onChange={handleDateChange}
                value={selectedDate}
                minDate={new Date()}
                className="mx-auto"
              />
            </div>

            {/* Time Slots */}
            {availableSlots.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Vali aeg
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => formik.setFieldValue('booking_time', slot)}
                      className={`p-2 rounded ${
                        formik.values.booking_time === slot
                          ? 'bg-primary-600 text-white'
                          : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.name')} *
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
                  {t('booking.email')} *
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
                  {t('booking.phone')} *
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.carMake')}
                </label>
                <input
                  type="text"
                  name="car_make"
                  value={formik.values.car_make}
                  onChange={formik.handleChange}
                  className="input-field"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {t('booking.carModel')}
                </label>
                <input
                  type="text"
                  name="car_model"
                  value={formik.values.car_model}
                  onChange={formik.handleChange}
                  className="input-field"
                />
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Märkused
              </label>
              <textarea
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
                rows={4}
                className="input-field"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full"
            >
              {loading ? 'Saadan...' : t('booking.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Booking;
