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
  const [activeTab, setActiveTab] = useState('bookings'); // 'bookings' or 'inquiries'
  const [loading, setLoading] = useState(true);

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
                  </tr>
                </thead>
                <tbody>
                  {inquiries.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-500">
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
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
