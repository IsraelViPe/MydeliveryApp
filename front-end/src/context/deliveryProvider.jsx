import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function DeliveryProvider({ children }) {
  const state = useMemo(() => ({ }), []);
  return (
    <deliveryContext.Provider value={ state }>{children}</deliveryContext.Provider>
  );
}

export default DeliveryProvider;

DeliveryProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};
