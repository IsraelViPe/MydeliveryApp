import React from 'react';
import PropTypes from 'prop-types';

export default function ErrorMessage({ ErrorMsg, dataTestId }) {
  return (
    <div>
      <p data-testid={ dataTestId }>{ ErrorMsg }</p>
    </div>
  );
}

ErrorMessage.propTypes = {
  ErrorMsg: PropTypes.string,
}.isRequired;
