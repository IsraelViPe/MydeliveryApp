import React from 'react';
import PropTypes from 'prop-types';

export default function UserCard(props) {
  const { item, id, onClick } = props;

  return (
    <tr>
      <td
        data-testid={ `admin_manage__element-user-table-item-number-${id}` }
      >
        {id + 1}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-name-${id}` }
      >
        {item.name}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-email-${id}` }
      >
        {item.email}
      </td>
      <td
        data-testid={ `admin_manage__element-user-table-role-${id}` }
      >
        {item.role}
      </td>
      <td>
        <button
          type="button"
          data-testid={ `admin_manage__element-user-table-remove-${id}` }
          id={ item.id }
          onClick={ onClick }
        >
          Excluir
        </button>
      </td>
    </tr>
  );
}

UserCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  email: PropTypes.string,
  role: PropTypes.string,
}.isRequired;
