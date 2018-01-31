// Default imports
import React from 'react';
import PropTypes from 'prop-types';

function Panel({ name, description, image }) {
  return (
    <section className="panel">
      <figure className="panel-figure">
        <img src={image} alt={`${name} thumbnail`} className="panel-img" />
      </figure>
      <section className="panel-description">
        <strong className="panel-title">
          {name}
        </strong>
        <p className="panel-text">
          {description}
        </p>
      </section>
    </section>
  );
}

// Props validation
Panel.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired
};

export default Panel;
