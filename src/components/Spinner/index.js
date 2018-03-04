import React from 'react';

import './style.css';

const Spinner = props => {
  return (
    <div className="text-center spinner">
      {props.text && <p>{props.text}</p>}
      <div className="loaderBar" />
    </div>
  );
};

export default Spinner;
