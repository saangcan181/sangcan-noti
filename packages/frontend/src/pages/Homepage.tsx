import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const Homepage: React.FC = () => {
  const { user, logout } = useAuth();

  return (
    <div style={{ maxWidth: '800px', margin: '50px auto', padding: '20px' }}>
      <header style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>
          <h1>Chào mừng bạn trở lại!</h1>
          <p style={{ margin: 0, color: '#666' }}>
            Xin chào, <strong>{user?.name}</strong> ({user?.email})
          </p>
        </div>
        <button
          onClick={logout}
          style={{
            padding: '8px 16px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Đăng xuất
        </button>
      </header>

      <main>
        <div style={{
          padding: '30px',
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h2>Dashboard</h2>
          <p>Đây là trang chủ sau khi đăng nhập thành công.</p>
          
          <div style={{ marginTop: '30px' }}>
            <h3>Thông tin tài khoản:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <strong>ID:</strong> {user?.id}
              </li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <strong>Tên:</strong> {user?.name}
              </li>
              <li style={{ padding: '8px 0', borderBottom: '1px solid #eee' }}>
                <strong>Email:</strong> {user?.email}
              </li>
            </ul>
          </div>

          <div style={{ 
            marginTop: '30px', 
            padding: '20px', 
            backgroundColor: '#e7f3ff', 
            borderRadius: '4px',
            border: '1px solid #b3d9ff'
          }}>
            <h4>🎉 Đăng nhập thành công!</h4>
            <p>Bạn đã đăng nhập thành công vào hệ thống SangCan Notification.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Homepage;
