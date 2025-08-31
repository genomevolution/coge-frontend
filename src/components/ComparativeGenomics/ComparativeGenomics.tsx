import React from 'react';
import { useNavigate } from 'react-router-dom';

const ComparativeGenomics: React.FC = () => {
  console.log('ComparativeGenomics component rendered - Route: /tools/comparative-genomics');
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <button onClick={handleBack} style={{ 
        marginBottom: '2rem',
        padding: '12px 24px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '6px',
        cursor: 'pointer',
        fontSize: '16px'
      }}>
        ← Back to Home
      </button>
      <h1>Comparative Genomics</h1>
      <p>This component will handle comparative genomics functionality.</p>
    </div>
  );
};

export default ComparativeGenomics;
