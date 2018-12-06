
import React from 'react';

const ProgressBar = props => (
  <div className="progress-bar">
    <Filler percentage={props.percentage} />
  </div>
);

export default ProgressBar;
