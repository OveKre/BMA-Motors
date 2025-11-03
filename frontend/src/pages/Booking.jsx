import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import api from '../api/axios';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './Booking.css';
import bmwE34 from '../images/bmwE34.jpg';

function Booking() {
  const { t, i18n } = useTranslation();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [availableSlots, setAvailableSlots] = useState([]);
  const [bookedSlots, setBookedSlots] = useState([]);
  const [monthAvailability, setMonthAvailability] = useState({});
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

  // Fetch slots for initial date
  useEffect(() => {
    fetchAvailableSlots(selectedDate);
  }, []);

  const fetchAvailableSlots = async (date) => {
    try {
      const formattedDate = date.toISOString().split('T')[0];
      const response = await api.get(`/booking/available-slots?date=${formattedDate}`);
      console.log('Available slots response:', response.data);
      
      // Handle different response formats
      const slots = response.data.data?.availableSlots || response.data.availableSlots || [];
      const booked = response.data.data?.bookedSlots || [];
      
      // If no slots from backend, use default slots
      if (slots.length === 0 && booked.length === 0) {
        const defaultSlots = [
          '09:00', '10:00', '11:00', '12:00',
          '13:00', '14:00', '15:00', '16:00', '17:00'
        ];
        setAvailableSlots(defaultSlots);
        setBookedSlots([]);
      } else {
        setAvailableSlots(slots);
        setBookedSlots(booked);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      // Use default slots on error
      const defaultSlots = [
        '09:00', '10:00', '11:00', '12:00',
        '13:00', '14:00', '15:00', '16:00', '17:00'
      ];
      setAvailableSlots(defaultSlots);
      setBookedSlots([]);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    formik.setFieldValue('booking_date', date.toISOString().split('T')[0]);
    fetchAvailableSlots(date);
  };

  // Generate all possible time slots
  const getAllTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
    }
    return slots;
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[400px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${bmwE34})`,
            filter: 'brightness(0.6)'
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50"></div>
        </div>
        <div className="relative h-full flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white">
              {t('booking.title')}
            </h1>
            <p className="text-xl text-gray-200 mt-4">
              {t('booking.subtitle')}
            </p>
          </div>
        </div>
      </section>

      <div className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                locale={i18n.language === 'est' ? 'et-EE' : i18n.language === 'rus' ? 'ru-RU' : 'en-US'}
                className="mx-auto booking-calendar"
              />
            </div>

            {/* Time Slots */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {t('booking.selectTime')}
              </label>
              <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                {getAllTimeSlots().map((slot) => {
                  const isBooked = bookedSlots.includes(slot);
                  const isAvailable = availableSlots.includes(slot);
                  const isSelected = formik.values.booking_time === slot;
                  
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => !isBooked && formik.setFieldValue('booking_time', slot)}
                      disabled={isBooked}
                      className={`p-3 rounded font-medium transition-all ${
                        isSelected
                          ? 'bg-primary-600 text-white ring-2 ring-primary-300'
                          : isBooked
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-300'
                      }`}
                      title={isBooked ? t('booking.booked') : t('booking.available')}
                    >
                      <span className={isBooked ? 'line-through' : ''}>{slot}</span>
                    </button>
                  );
                })}
              </div>
              {bookedSlots.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {t('booking.bookedInfo')}
                </p>
              )}
            </div>

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
                {t('booking.notes')}
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
              {loading ? t('booking.sending') : t('booking.submit')}
            </button>
          </form>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Booking;
