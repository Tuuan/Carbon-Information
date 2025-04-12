import { signOut } from 'firebase/auth';
import 'leaflet/dist/leaflet.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const CoordinateDisplay = () => {
  const [coords, setCoords] = useState({ lat: 0, lng: 0 });

  useMapEvents({
    mousemove(e) {
      setCoords({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });

  return (
    <div style={{ position: 'absolute', bottom: 10, left: 10, background: 'white', padding: 5 }}>
      Lat: {coords.lat.toFixed(5)} | Lng: {coords.lng.toFixed(5)}
    </div>
  );
};

const MapView = () => {
  const navigate = useNavigate();
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserEmail(user.email);
    } else {
      navigate('/');
    }
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <div style={{ height: '100vh', position: 'relative' }}>
      {/* Floating Menu (Bên trái) */}
      <div style={{
        position: 'absolute',
        top: 20,
        left: 20,
        zIndex: 1001,
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        padding: '16px',
        width: '250px',
      }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#333' }}>Menu</p>
        <p><strong>👤</strong> {userEmail}</p>
        <button onClick={handleLogout}
          style={{
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold'
          }}
        >
          🔓 Đăng xuất
        </button>
        {/* Các tính năng khác cho menu có thể thêm ở đây */}
      </div>

      {/* Thông tin tài khoản + Logout */}
      <div style={{
        position: 'absolute',
        top: 20,
        right: 20,
        zIndex: 1001,
        backgroundColor: '#fff',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
        borderRadius: '8px',
        padding: '16px',
        width: '250px'
      }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold', color: '#333' }}>
          👤 {userEmail}
        </p>
        <button onClick={handleLogout}
          style={{
            backgroundColor: '#ff4d4f',
            color: '#fff',
            border: 'none',
            padding: '10px 15px',
            borderRadius: '6px',
            cursor: 'pointer',
            width: '100%',
            fontWeight: 'bold'
          }}
        >
          🔓 Đăng xuất
        </button>
      </div>

      {/* Bản đồ */}
      <MapContainer center={[21.0285, 105.8542]} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <CoordinateDisplay />
      </MapContainer>
    </div>
  );
};

export default MapView;
