import React, { useState, useEffect } from 'react';
// import './CircularProgress.css';

/**
 * 
 * @param {textSize} textSize number between 1 and 5 - 1 is the biggest 
 * @returns 
 */
function CircularProgress({ size, strokeWidth, percent, color, textSize = 5 }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setProgress(percent);
  }, [percent]);

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className='circular-progress-container'>
      <svg className='circular-progress' width={size} height={size}>
        <circle
          className='circular-progress-background'
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
        />
        <circle
          className='circular-progress-fill'
          r={radius}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          stroke={color ?? 'black'}
        />
        <text
          className={`circular-progress-text fs-${textSize}`}
          x='50%'
          y='50%'
          dominantBaseline='middle'
          textAnchor='middle'
          fill={color ?? 'black'}
        >
          {progress}%
        </text>
      </svg>
    </div>
  );
}

export default CircularProgress;
