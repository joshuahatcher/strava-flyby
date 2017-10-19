import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = (props) => {
  return (
      <div className="main-cover cover in-front flex center-children">
        <div className="full-width block center-children">
          <h1>FlyBy</h1>
          <h2 className="content-box">404 - Ya lost?</h2>
          <Link to='/' className='submit'>Run Home</Link>
        </div>
      </div>
  )
};

export default NotFound;
