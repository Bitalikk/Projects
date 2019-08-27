import React from 'react';
import PropTypes from 'prop-types';

const CategorySelector = ({ types = [], value, onChange }) => (
  <select value={value} name="category" onChange={onChange}>
    {types.map(type => (
      <option key={type} value={type}>
        {type}
      </option>
    ))}
  </select>
);

CategorySelector.propTypes = {
  types: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default CategorySelector;
