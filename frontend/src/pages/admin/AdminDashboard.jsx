import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    todayBookings: 0,
    pendingBookings: 0,
    newInquiries: 0,
    totalMessages: 0
  });
  const [bookings, setBookings] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageStats, setMessageStats] = useState({ total: 0, unread: 0, replied: 0 });
  const [services, setServices] = useState([]);
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings', 'inquiries', 'messages', or 'services'
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [selectedService, setSelectedService] = useState(null);
  const [showResponseModal, setShowResponseModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [responseData, setResponseData] = useState({
    price: '',
    availability: '',
    delivery_time: '',
    additional_info: ''
  });
  const [serviceData, setServiceData] = useState({
    name_est: '',
    name_eng: '',
    name_rus: '',
    description_est: '',
    description_eng: '',
    description_rus: '',
    category: '',
    price: '',
    duration_minutes: '',
    is_active: true
  });

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin');
      return;
    }

    fetchDashboardData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Run only once on mount

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch dashboard stats
      const statsResponse = await api.get('/admin/dashboard');
      const dashboardData = statsResponse.data?.data || statsResponse.data;
      
      // Dashboard returns statistics objects, not arrays
      setStats({
        todayBookings: Array.isArray(dashboardData.todayBookings) ? dashboardData.todayBookings.length : 0,
        pendingBookings: dashboardData.bookings?.overview?.pending_count || 0,
        newInquiries: dashboardData.inquiries?.overview?.new_count || 0,
        totalMessages: dashboardData.inquiries?.overview?.total || 0
      });

      // Fetch bookings
      const bookingsResponse = await api.get('/admin/broneeringud');
      console.log('Bookings response:', bookingsResponse.data);
      setBookings(bookingsResponse.data?.data || bookingsResponse.data || []);

      // Fetch inquiries
      const inquiriesResponse = await api.get('/admin/paringud');
      console.log('Inquiries response:', inquiriesResponse.data);
      setInquiries(inquiriesResponse.data?.data || inquiriesResponse.data || []);

      // Fetch messages
      const messagesResponse = await api.get('/admin/sonumid');
      console.log('Messages response:', messagesResponse.data);
      setMessages(messagesResponse.data?.data || messagesResponse.data || []);
      const msgStats = messagesResponse.data?.stats || { total: 0, unread: 0, replied: 0 };
      setMessageStats(msgStats);
      
      // Update stats with actual message count
      setStats(prevStats => ({
        ...prevStats,
        totalMessages: msgStats.unread || msgStats.total || 0
      }));

      // Fetch services
      const servicesResponse = await api.get('/services?active=false');
      console.log('Services response:', servicesResponse.data);
      setServices(servicesResponse.data?.data || servicesResponse.data || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      console.error('Error details:', error.response?.data);
      if (error.response?.status === 401) {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        navigate('/admin');
      } else {
        toast.error('Viga andmete laadimisel');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    toast.info('Oled välja logitud');
    navigate('/admin');
  };

  const updateBookingStatus = async (bookingId, status) => {
    try {
      await api.put(`/admin/broneeringud/${bookingId}`, { status });
      toast.success('Broneeringut uuendatud');
      fetchDashboardData();
    } catch (error) {
      toast.error('Viga broneeringu uuendamisel');
    }
  };

  const deleteBooking = async (bookingId) => {
    if (!confirm('Kas oled kindel, et soovid selle broneeringu kustutada?')) {
      return;
    }

    try {
      await api.delete(`/admin/broneeringud/${bookingId}`);
      toast.success('Broneering kustutatud');
      fetchDashboardData();
    } catch (error) {
      toast.error('Viga broneeringu kustutamisel');
    }
  };

  const updateInquiryStatus = async (inquiryId, statusId) => {
    try {
      await api.put(`/admin/paringud/${inquiryId}`, { status_id: statusId });
      toast.success('Päringut uuendatud');
      fetchDashboardData();
    } catch (error) {
      toast.error('Viga päringu uuendamisel');
    }
  };

  const openResponseModal = (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowResponseModal(true);
    setResponseData({
      price: '',
      availability: '',
      delivery_time: '',
      additional_info: ''
    });
  };

  const closeResponseModal = () => {
    setShowResponseModal(false);
    setSelectedInquiry(null);
  };

  const handleResponseSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await api.post(`/admin/paringud/${selectedInquiry.id}/vastus`, responseData);
      
      toast.success('Vastus edukalt saadetud!');
      closeResponseModal();
      fetchDashboardData();
    } catch (error) {
      console.error('Error sending response:', error);
      toast.error('Viga vastuse saatmisel');
    }
  };

  const openMessageModal = async (message) => {
    setSelectedMessage(message);
    setShowMessageModal(true);
    
    // Märgi loetuks kui pole veel loetud
    if (!message.is_read) {
      try {
        await api.get(`/admin/sonumid/${message.id}`);
        fetchDashboardData(); // Refresh to update unread count
      } catch (error) {
        console.error('Error marking message as read:', error);
      }
    }
  };

  const closeMessageModal = () => {
    setShowMessageModal(false);
    setSelectedMessage(null);
  };

  const markMessageAsReplied = async (messageId) => {
    try {
      await api.put(`/admin/sonumid/${messageId}`, { replied: true });
      toast.success('Sõnum märgitud vastatuks');
      fetchDashboardData();
    } catch (error) {
      toast.error('Viga sõnumi uuendamisel');
    }
  };

  const deleteMessage = async (messageId) => {
    if (!window.confirm('Kas oled kindel, et soovid sõnumi kustutada?')) {
      return;
    }

    try {
      await api.delete(`/admin/sonumid/${messageId}`);
      toast.success('Sõnum kustutatud');
      closeMessageModal();
      fetchDashboardData();
    } catch (error) {
      toast.error('Viga sõnumi kustutamisel');
    }
  };

  // Service management functions
  const openServiceModal = (service = null) => {
    if (service) {
      setSelectedService(service);
      setServiceData({
        name_est: service.name_est || '',
        name_eng: service.name_eng || '',
        name_rus: service.name_rus || '',
        description_est: service.description_est || '',
        description_eng: service.description_eng || '',
        description_rus: service.description_rus || '',
        category: service.category || '',
        price: service.price || '',
        duration_minutes: service.duration_minutes || '',
        is_active: service.is_active !== undefined ? service.is_active : true
      });
    } else {
      setSelectedService(null);
      setServiceData({
        name_est: '',
        name_eng: '',
        name_rus: '',
        description_est: '',
        description_eng: '',
        description_rus: '',
        category: '',
        price: '',
        duration_minutes: '',
        is_active: true
      });
    }
    setShowServiceModal(true);
  };

  const closeServiceModal = () => {
    setShowServiceModal(false);
    setSelectedService(null);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (selectedService) {
        // Update existing service
        await api.put(`/admin/teenused/${selectedService.id}`, serviceData);
        toast.success('Teenus uuendatud');
      } else {
        // Create new service
        await api.post('/admin/teenused', serviceData);
        toast.success('Teenus lisatud');
      }
      closeServiceModal();
      fetchDashboardData();
    } catch (error) {
      toast.error(selectedService ? 'Viga teenuse uuendamisel' : 'Viga teenuse lisamisel');
      console.error('Service error:', error);
    }
  };

  const deleteService = async (serviceId) => {
    if (!window.confirm('Kas oled kindel, et soovid teenuse kustutada?')) {
      return;
    }

    try {
      await api.delete(`/admin/teenused/${serviceId}`);
      toast.success('Teenus kustutatud');
      fetchDashboardData();
    } catch (error) {
      toast.error('Viga teenuse kustutamisel');
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'pending': 'bg-yellow-100 text-yellow-800',
      'confirmed': 'bg-green-100 text-green-800',
      'cancelled': 'bg-red-100 text-red-800',
      'completed': 'bg-blue-100 text-blue-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Laadimine...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Logi välja
          </button>
        </div>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-gray-600 text-sm">Broneeringud (täna)</h3>
            <p className="text-3xl font-bold text-primary-600 mt-2">
              {stats.todayBookings}
            </p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm">Uued päringud</h3>
            <p className="text-3xl font-bold text-primary-600 mt-2">
              {stats.newInquiries}
            </p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm">Ootel broneeringud</h3>
            <p className="text-3xl font-bold text-orange-600 mt-2">
              {stats.pendingBookings}
            </p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm">Sõnumid</h3>
            <p className="text-3xl font-bold text-primary-600 mt-2">
              {stats.totalMessages}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Broneeringud ({bookings.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'inquiries'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Varuosapäringud ({inquiries.length})
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`py-4 px-1 border-b-2 font-medium text-sm relative ${
                activeTab === 'messages'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sõnumid ({messages.length})
              {messageStats.unread > 0 && (
                <span className="ml-2 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full">
                  {messageStats.unread}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('services')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'services'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Teenused ({services.length})
            </button>
          </nav>
        </div>

        {/* Bookings Table */}
        {activeTab === 'bookings' && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Broneeringud</h2>
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                Uuenda
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Klient</th>
                    <th className="text-left py-3 px-4">Kontakt</th>
                    <th className="text-left py-3 px-4">Kuupäev</th>
                    <th className="text-left py-3 px-4">Aeg</th>
                    <th className="text-left py-3 px-4">Auto</th>
                    <th className="text-left py-3 px-4">Staatus</th>
                    <th className="text-left py-3 px-4">Toimingud</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-8 text-gray-500">
                        Broneeringuid ei leitud
                      </td>
                    </tr>
                  ) : (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">#{booking.id}</td>
                        <td className="py-3 px-4">{booking.client_name || '-'}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>{booking.client_email || '-'}</div>
                            <div className="text-gray-500">{booking.client_phone || '-'}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">{booking.booking_date || '-'}</td>
                        <td className="py-3 px-4">{booking.booking_time || '-'}</td>
                        <td className="py-3 px-4">
                          {booking.car_make || '-'} {booking.car_model || ''}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className={`px-2 py-1 rounded text-sm ${getStatusColor(booking.status)}`}
                          >
                            <option value="pending">Ootel</option>
                            <option value="confirmed">Kinnitatud</option>
                            <option value="completed">Lõpetatud</option>
                            <option value="cancelled">Tühistatud</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => deleteBooking(booking.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            Kustuta
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Inquiries Table */}
        {activeTab === 'inquiries' && (
          <div className="card">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Varuosapäringud</h2>
              <button
                onClick={fetchDashboardData}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                Uuenda
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b bg-gray-50">
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Klient</th>
                    <th className="text-left py-3 px-4">Kontakt</th>
                    <th className="text-left py-3 px-4">Auto</th>
                    <th className="text-left py-3 px-4">Varuosa</th>
                    <th className="text-left py-3 px-4">Kuupäev</th>
                    <th className="text-left py-3 px-4">Staatus</th>
                    <th className="text-left py-3 px-4">Toimingud</th>
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan="8" className="text-center py-8 text-gray-500">
                        Päringuid ei leitud
                      </td>
                    </tr>
                  ) : (
                    inquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">#{inquiry.id}</td>
                        <td className="py-3 px-4">{inquiry.client_name || '-'}</td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>{inquiry.client_email || '-'}</div>
                            <div className="text-gray-500">{inquiry.client_phone || '-'}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div>{inquiry.car_make || '-'} {inquiry.car_model || ''}</div>
                            <div className="text-gray-500">{inquiry.car_year || '-'}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm">
                            <div className="font-medium">{inquiry.sparepart_name || '-'}</div>
                            <div className="text-gray-500">{inquiry.sparepart_description || '-'}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          {inquiry.created_at ? new Date(inquiry.created_at).toLocaleDateString() : '-'}
                        </td>
                        <td className="py-3 px-4">
                          <select
                            value={inquiry.status_id}
                            onChange={(e) => updateInquiryStatus(inquiry.id, e.target.value)}
                            className="px-2 py-1 rounded text-sm bg-blue-100 text-blue-800"
                          >
                            <option value="1">Uus</option>
                            <option value="2">Töötlemisel</option>
                            <option value="3">Pakkumine saadetud</option>
                            <option value="4">Tellitud</option>
                            <option value="5">Lõpetatud</option>
                            <option value="6">Tühistatud</option>
                          </select>
                        </td>
                        <td className="py-3 px-4">
                          <button
                            onClick={() => openResponseModal(inquiry)}
                            className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 text-sm"
                          >
                            Vasta
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Messages Table */}
        {activeTab === 'messages' && (
          <div className="card">
            <div>
              <h2 className="text-xl font-semibold mb-4">Kliendi Sõnumid</h2>
              <div className="flex gap-4 mb-4 text-sm">
                <span className="text-gray-600">Kokku: {messageStats.total}</span>
                <span className="text-red-600 font-semibold">Lugemata: {messageStats.unread}</span>
                <span className="text-green-600">Vastatud: {messageStats.replied}</span>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left py-3 px-4">Staatus</th>
                      <th className="text-left py-3 px-4">Nimi</th>
                      <th className="text-left py-3 px-4">Email</th>
                      <th className="text-left py-3 px-4">Telefon</th>
                      <th className="text-left py-3 px-4">Teema</th>
                      <th className="text-left py-3 px-4">Kuupäev</th>
                      <th className="text-left py-3 px-4">Toimingud</th>
                    </tr>
                  </thead>
                  <tbody>
                    {messages.length === 0 ? (
                      <tr>
                        <td colSpan="7" className="text-center py-8 text-gray-500">
                          Sõnumeid ei leitud
                        </td>
                      </tr>
                    ) : (
                      messages.map((message) => (
                        <tr 
                          key={message.id} 
                          className={`border-b hover:bg-gray-50 ${!message.is_read ? 'bg-blue-50' : ''}`}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              {!message.is_read && (
                                <span className="w-2 h-2 bg-blue-500 rounded-full" title="Lugemata"></span>
                              )}
                              {message.replied && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                  Vastatud
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium">
                            {message.name || '-'}
                          </td>
                          <td className="py-3 px-4">
                            <a href={`mailto:${message.email}`} className="text-blue-600 hover:underline">
                              {message.email || '-'}
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            <a href={`tel:${message.phone}`} className="text-blue-600 hover:underline">
                              {message.phone || '-'}
                            </a>
                          </td>
                          <td className="py-3 px-4">
                            {message.subject || '-'}
                          </td>
                          <td className="py-3 px-4">
                            {message.created_at ? new Date(message.created_at).toLocaleDateString() : '-'}
                          </td>
                          <td className="py-3 px-4">
                            <button
                              onClick={() => openMessageModal(message)}
                              className="px-3 py-1 bg-primary-600 text-white rounded hover:bg-primary-700 text-sm"
                            >
                              Vaata
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Services Table */}
        {activeTab === 'services' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Teenuste haldamine</h2>
              <button
                onClick={() => openServiceModal()}
                className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
              >
                + Lisa teenus
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4">ID</th>
                    <th className="text-left py-3 px-4">Nimi (EST)</th>
                    <th className="text-left py-3 px-4">Kategooria</th>
                    <th className="text-left py-3 px-4">Hind</th>
                    <th className="text-left py-3 px-4">Kestus (min)</th>
                    <th className="text-left py-3 px-4">Staatus</th>
                    <th className="text-left py-3 px-4">Toimingud</th>
                  </tr>
                </thead>
                <tbody>
                  {services.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-500">
                        Teenuseid ei leitud
                      </td>
                    </tr>
                  ) : (
                    services.map((service) => (
                      <tr key={service.id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">{service.id}</td>
                        <td className="py-3 px-4 font-medium">{service.name_est}</td>
                        <td className="py-3 px-4">
                          <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">
                            {service.category}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          {service.price ? `${service.price}€` : 'Hinna järgi'}
                        </td>
                        <td className="py-3 px-4">{service.duration_minutes || '-'}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-1 rounded ${
                            service.is_active 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {service.is_active ? 'Aktiivne' : 'Mitteaktiivne'}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openServiceModal(service)}
                              className="text-blue-600 hover:text-blue-800"
                            >
                              Muuda
                            </button>
                            <button
                              onClick={() => deleteService(service.id)}
                              className="text-red-600 hover:text-red-800"
                            >
                              Kustuta
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Service Modal */}
        {showServiceModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">
                    {selectedService ? 'Muuda teenust' : 'Lisa uus teenus'}
                  </h2>
                  <button
                    onClick={closeServiceModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form onSubmit={handleServiceSubmit}>
                  {/* Estonian fields */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary-600">Eesti keel</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Nimi (EST) *</label>
                        <input
                          type="text"
                          required
                          value={serviceData.name_est}
                          onChange={(e) => setServiceData({ ...serviceData, name_est: e.target.value })}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Kirjeldus (EST)</label>
                        <textarea
                          value={serviceData.description_est}
                          onChange={(e) => setServiceData({ ...serviceData, description_est: e.target.value })}
                          rows="3"
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* English fields */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary-600">English</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Name (ENG)</label>
                        <input
                          type="text"
                          value={serviceData.name_eng}
                          onChange={(e) => setServiceData({ ...serviceData, name_eng: e.target.value })}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Description (ENG)</label>
                        <textarea
                          value={serviceData.description_eng}
                          onChange={(e) => setServiceData({ ...serviceData, description_eng: e.target.value })}
                          rows="3"
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Russian fields */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary-600">Русский</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Название (RUS)</label>
                        <input
                          type="text"
                          value={serviceData.name_rus}
                          onChange={(e) => setServiceData({ ...serviceData, name_rus: e.target.value })}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Описание (RUS)</label>
                        <textarea
                          value={serviceData.description_rus}
                          onChange={(e) => setServiceData({ ...serviceData, description_rus: e.target.value })}
                          rows="3"
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional fields */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3 text-primary-600">Teenuse andmed</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">Kategooria *</label>
                        <select
                          required
                          value={serviceData.category}
                          onChange={(e) => setServiceData({ ...serviceData, category: e.target.value })}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="">Vali kategooria</option>
                          <option value="remonttööd">Remonttööd</option>
                          <option value="mootoriremont">Mootoriremont</option>
                          <option value="diagnostika">Diagnostika</option>
                          <option value="elektritööd">Elektritööd</option>
                          <option value="ostueelne_kontroll">Ostueelne kontroll</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Hind (€)</label>
                        <input
                          type="number"
                          step="0.01"
                          value={serviceData.price}
                          onChange={(e) => setServiceData({ ...serviceData, price: e.target.value })}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                          placeholder="Tühi = hinna järgi"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Kestus (minutid)</label>
                        <input
                          type="number"
                          value={serviceData.duration_minutes}
                          onChange={(e) => setServiceData({ ...serviceData, duration_minutes: e.target.value })}
                          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2 mt-6">
                          <input
                            type="checkbox"
                            checked={serviceData.is_active}
                            onChange={(e) => setServiceData({ ...serviceData, is_active: e.target.checked })}
                            className="w-4 h-4 text-primary-600 focus:ring-primary-500"
                          />
                          <span className="text-sm font-medium">Aktiivne teenus</span>
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end gap-4">
                    <button
                      type="button"
                      onClick={closeServiceModal}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Tühista
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                      {selectedService ? 'Uuenda' : 'Lisa teenus'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Response Modal */}
        {showResponseModal && selectedInquiry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Vasta varuosapäringule</h2>
                  <button
                    onClick={closeResponseModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Inquiry Details */}
                <div className="bg-gray-50 p-4 rounded mb-6">
                  <h3 className="font-semibold mb-2">Päringu detailid</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Klient:</span>
                      <p className="font-medium">{selectedInquiry.client_name}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Email:</span>
                      <p className="font-medium">{selectedInquiry.client_email}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Telefon:</span>
                      <p className="font-medium">{selectedInquiry.client_phone}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Auto:</span>
                      <p className="font-medium">
                        {selectedInquiry.car_make} {selectedInquiry.car_model} ({selectedInquiry.car_year})
                      </p>
                    </div>
                    <div className="col-span-2">
                      <span className="text-gray-600">Varuosa:</span>
                      <p className="font-medium">{selectedInquiry.sparepart_name}</p>
                      {selectedInquiry.sparepart_description && (
                        <p className="text-gray-600 text-xs mt-1">{selectedInquiry.sparepart_description}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Response Form */}
                <form onSubmit={handleResponseSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Hind (€)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={responseData.price}
                        onChange={(e) => setResponseData({ ...responseData, price: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                        placeholder="99.99"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Saadavus
                      </label>
                      <select
                        value={responseData.availability}
                        onChange={(e) => setResponseData({ ...responseData, availability: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                        required
                      >
                        <option value="">Vali saadavus</option>
                        <option value="in_stock">Laos</option>
                        <option value="order_needed">Tellimisel</option>
                        <option value="unavailable">Ei ole saadaval</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tarneaeg
                      </label>
                      <input
                        type="text"
                        value={responseData.delivery_time}
                        onChange={(e) => setResponseData({ ...responseData, delivery_time: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                        placeholder="nt: 2-3 tööpäeva"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Lisainfo
                      </label>
                      <textarea
                        value={responseData.additional_info}
                        onChange={(e) => setResponseData({ ...responseData, additional_info: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-primary-500 focus:border-primary-500"
                        rows="4"
                        placeholder="Lisainfo kliendile..."
                      />
                    </div>
                  </div>

                  <div className="flex justify-end gap-3 mt-6">
                    <button
                      type="button"
                      onClick={closeResponseModal}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                    >
                      Tühista
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
                    >
                      Saada vastus
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Message Modal */}
        {showMessageModal && selectedMessage && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-bold">Kliendi Sõnum</h2>
                  <button
                    onClick={closeMessageModal}
                    className="text-gray-500 hover:text-gray-700 text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Message Details */}
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-600">Nimi:</span>
                        <p className="font-medium">{selectedMessage.name}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Kuupäev:</span>
                        <p className="font-medium">
                          {new Date(selectedMessage.created_at).toLocaleString('et-EE')}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Email:</span>
                        <p className="font-medium">
                          <a href={`mailto:${selectedMessage.email}`} className="text-blue-600 hover:underline">
                            {selectedMessage.email}
                          </a>
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Telefon:</span>
                        <p className="font-medium">
                          <a href={`tel:${selectedMessage.phone}`} className="text-blue-600 hover:underline">
                            {selectedMessage.phone || '-'}
                          </a>
                        </p>
                      </div>
                    </div>
                  </div>

                  {selectedMessage.subject && (
                    <div>
                      <span className="text-sm text-gray-600">Teema:</span>
                      <p className="font-medium text-lg">{selectedMessage.subject}</p>
                    </div>
                  )}

                  <div>
                    <span className="text-sm text-gray-600">Sõnum:</span>
                    <div className="mt-2 p-4 bg-gray-50 rounded border border-gray-200 whitespace-pre-wrap">
                      {selectedMessage.message}
                    </div>
                  </div>

                  {/* Status Badges */}
                  <div className="flex gap-2">
                    {selectedMessage.is_read && (
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                        ✓ Loetud
                      </span>
                    )}
                    {selectedMessage.replied && (
                      <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full">
                        ✓ Vastatud
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex justify-between mt-6 gap-3">
                  <div className="flex gap-3">
                    {!selectedMessage.replied && (
                      <a
                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject || 'Teie päring'}`}
                        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => markMessageAsReplied(selectedMessage.id)}
                      >
                        📧 Vasta emailiga
                      </a>
                    )}
                    <button
                      onClick={() => deleteMessage(selectedMessage.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      🗑️ Kustuta
                    </button>
                  </div>
                  <button
                    onClick={closeMessageModal}
                    className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50"
                  >
                    Sulge
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
