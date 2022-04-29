import React from 'react';

function Error({ error }) {
  if (!error) return null;

  return (
    <div style={{ color: 'var(--error-color)', margin: '1rem 0' }}>{error}</div>
  );
}

export default Error;
