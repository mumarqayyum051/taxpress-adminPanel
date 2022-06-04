import { useState } from 'react';
import { css } from '@emotion/react';
import ClipLoader from 'react-spinners/ClipLoader';
import './Loader.css';
// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  margin: 0 auto;
  border-color: #28a793;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
`;

const loaderParent = {
  position: 'relative',
};

function Loader() {
  const [loading, setLoading] = useState(true);
  const [color, setColor] = useState('#ffffff');

  return (
    // <div style={loaderParent}>
    //   <ClipLoader color={color} loading={loading} css={override} size={150} />
    // </div>
    <div className="loading">
      <div className="loader" />
    </div>
  );
}

export default Loader;
