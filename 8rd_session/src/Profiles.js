import React from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import Profile from './Profile';

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록:</h3>
      <ul>
        <li>
          <Link to="/profiles/yungu">yungu</Link>
        </li>
        <li>
          <Link to="/profiles/likelion">likelion</Link>
        </li>
      </ul>
      <hr/>
      <Routes>
      <Route path="/profiles/:username" element={Profile} />
      </Routes>
    </div>
  );
};

export default Profiles;