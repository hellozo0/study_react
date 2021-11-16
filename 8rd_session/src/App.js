import React from 'react';
import About from './About';
import { Route, Link, Routes } from 'react-router-dom';
import Home from './Home';
import Profile from './Profile';
import Profiles from './Profiles';

const App = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/profiles">프로필 목록</Link>
        </li>
      </ul>
      <hr />
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/profiles" element={<Profiles></Profiles>} />
        <Route path="/profiles/:username" element={<Profile></Profile>} />
    </Routes>
    </div>
  );
};

export default App;