import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const OAuth2Callback = () => {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('credential');
    if (token) {
      fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          localStorage.setItem('jwtToken', data.token);
          window.location.href = '/';
        }
      })
      .catch(error => console.error('Error:', error));
    }
  }, [location]);

  return <div>Loading...</div>;
};

export default OAuth2Callback;
