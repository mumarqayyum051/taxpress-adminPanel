import React from 'react';
import './loader2.css';

const Loader2 = () => {
  return (
    <>
      <div className="overlay">
        <div className="overlay__inner">
          <div className="overlay__content">
            <span className="spinner" />
          </div>
        </div>
      </div>
    </>
  );
};
export default Loader2;
