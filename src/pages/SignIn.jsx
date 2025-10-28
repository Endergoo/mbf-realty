import React from 'react';

const SignIn = () => 
{
  return (
    <div className="page-container">
      <div className="page-content">
        <h1 className="page-title">Sign In</h1>
        <div style=
        {{
          maxWidth: '400px',
          margin: '0 auto',
          background: '#2d2d2d',
          padding: '2rem',
          borderRadius: '15px',
          boxShadow: '0 5px 15px rgba(0,0,0,0.3)'
        }}>
          <p className="page-text" style={{textAlign: 'center', marginBottom: '2rem'}}>
            Sign in functionality coming soon!
          </p>
          <div style={{textAlign: 'center'}}>
            <button style=
            {{
              background: '#f0a500',
              color: '#000',
              padding: '1rem 2rem',
              border: 'none',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;