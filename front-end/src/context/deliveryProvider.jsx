import React, { useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import deliveryContext from './deliveryContext';

function DeliveryProvider({ children }) {
  const [users, setUsers] = useState();
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const { token } = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchData() {
      const { data } = await getUserList(token);
      setUsers(data);
    }
    try {
      fetchData();
      setErrorMsg(null);
      setIsLoading(false);
    } catch (e) {
      setIsLoading(false);
      const { response } = e;
      setErrorMsg(response?.data.message);
    }
  }, []);

  const state = useMemo(() => ({
    users, setUsers, errorMsg, isLoading,
  }), [users, setUsers, errorMsg, isLoading]);
  return (
    <deliveryContext.Provider value={ state }>{children}</deliveryContext.Provider>
  );
}

export default DeliveryProvider;

DeliveryProvider.propTypes = {
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
};
