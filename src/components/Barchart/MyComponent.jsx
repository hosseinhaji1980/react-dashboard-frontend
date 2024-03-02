import React from 'react';
import GradientLine from './GradientLine'; // Adjust the path accordingly

const MyComponent = () => {
  const dataset = {
    label: "My Dataset",
    data: [31, 40, 190, 158, 10, 109, 100]
  };

  return (
    <div>
      <GradientLine dataset={dataset} />
    </div>
  );
}

export default MyComponent;
