import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import api from '../../api/axios';

function AdminLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.username || !formData.password) {
      toast.error('Palun sisesta kasutajanimi ja parool');
      return;
    }

    try {
      setLoading(true);
      const response = await api.post('/admin/login', formData);
      
      if (response.data.success) {
        // Salvesta token
        localStorage.setItem('adminToken', response.data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.data.user));
        
        toast.success('Sisselogimine õnnestus!');
        navigate('/admin/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.error?.message || 'Sisselogimine ebaõnnestus');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="card max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6"></h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kasutajanimi
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
              autoComplete="username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Parool
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input-field"
              disabled={loading}
              autoComplete="current-password"
            />
          </div>
          <button 
            type="submit" 
            className="btn-primary w-full"
            disabled={loading}
          >
            {loading ? 'Sisselogimine...' : 'Logi sisse'}
          </button>
        </form>
        
        <div className="mt-4 text-sm text-gray-600 text-center">
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
