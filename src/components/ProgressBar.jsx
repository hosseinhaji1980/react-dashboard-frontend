import React from 'react';

const ProgressBarSegment = ({ width, color, label }) => (
  
  <div
    className={`progress-bar bg-${color}`}
    role="progressbar"
    aria-label={label}
    style={{ width: `${width}%` }}
    aria-valuenow={width}
    aria-valuemin={0}
    aria-valuemax={100}
    data-toggle="tooltip"
    title={label}
  ></div>
);

const ProgressBar = ({ segments }) => (
  <div className="progress" style={{ height: '40px' }}>
    {segments.map((segment, index) => (
      <ProgressBarSegment key={index} {...segment} />
    ))}
  </div>
);

export default ProgressBar;
