import React from 'react';

export default function Input({ type, value, name, onChange, dataTestid }) {
  return (
    <input
      type={ type }
      value={ value }
      onChange={ onChange }
      data-testid={ dataTestid }
      name={ name }
    />
  );
}
