
import React from 'react';
import './progressBar.scss';

const ProgressBar = props => (
  <div className="progress-bar">
    <Filler percentage={props.percentage} />
  </div>
);

export default ProgressBar;
