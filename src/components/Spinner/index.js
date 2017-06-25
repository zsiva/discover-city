import React from 'react';

import './style.css';

const Spinner = (props) => {
  return (
    <div className="text-center">
      <div className="loader" />
      {props.text && <p>{props.text}</p>}
    </div>
  );
};

export default Spinner;
