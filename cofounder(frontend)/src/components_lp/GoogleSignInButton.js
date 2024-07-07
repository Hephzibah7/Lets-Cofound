// import React, { useEffect, useState } from 'react';

// const GoogleSignInButton = () => {
//   const [scriptLoaded, setScriptLoaded] = useState(false);

//   useEffect(() => {
//     // Load the Google API library script
//     const script = document.createElement('script');
//     script.src = 'https://accounts.google.com/gsi/client';
//     script.async = true;
//     script.onload = () => {
//       setScriptLoaded(true);
//     };
//     document.body.appendChild(script);

//     // Cleanup the script when the component unmounts
//     return () => {
//       document.body.removeChild(script);
//     };
//   }, []);

//   useEffect(() => {
//     const initializeGoogleSignIn = () => {
//       if (scriptLoaded && window.google) {
//         /* global google */
//         google.accounts.id.initialize({
//           client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
//           callback: handleCredentialResponse,
//           context: 'signup'
//         });
//         google.accounts.id.prompt(); // This will show the account chooser
//       }
//     };

//     initializeGoogleSignIn();
//   }, [scriptLoaded]);

//   const handleCredentialResponse = (response) => {
//     console.log("Encoded JWT ID token: " + response.credential);

//     fetch('/getgoogle', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ token: response.credential })
//     })
//     .then(response => response.json())
//     .then(data => {
//       console.log(data);
//       if (data.success) {
//         localStorage.setItem('jwtToken', data.token);
//         // Redirect user to the homepage
//         window.location.href = '/';
//       }
//     })
//     .catch(error => {
//       console.error('Error:', error);
//     });
//   };

//   return <div id="g_id_signin"></div>;
// };

// export default GoogleSignInButton;

import React, { useEffect, useState } from 'react';

const GoogleSignInButton = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.onload = () => {
        console.log('Google script loaded successfully');
        setScriptLoaded(true);
      };
      script.onerror = () => {
        console.error('Error loading Google script');
      };
      document.body.appendChild(script);
    };

    loadScript();

    return () => {
      // Cleanup the script when the component unmounts
      const script = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (script && script.parentNode === document.body) {
        document.body.removeChild(script);
      }
    };
  }, []);
  const initializeGoogleSignIn = () => {
    if (window.google && window.google.accounts) {
      console.log('Initializing Google Sign-In');
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        callback: handleCredentialResponse,
        ux_mode: 'redirect',
        login_uri: 'http://localhost:3000/oauth2/callback', // Ensure this matches the redirect URI in Google Console
      });
      window.google.accounts.id.renderButton(
        document.getElementById('g_id_signin'),
        { theme: 'outline', size: 'large', text: 'signup_with' }
      );
      window.google.accounts.id.prompt(); // Display account chooser
    } else {
      console.error('Google API is not available');
    }

  useEffect(() => {
    if (scriptLoaded) {
      initializeGoogleSignIn();
    }
  }, [scriptLoaded]);

  };

  const handleCredentialResponse = (response) => {
    console.log("Encoded JWT ID token: " + response.credential);

    fetch('/api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token: response.credential })
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        localStorage.setItem('jwtToken', data.token);
        // Redirect user to the homepage or auto-login
        window.location.href = '/';
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  };

  return <div id="g_id_signin"></div>;
};

export default GoogleSignInButton;
