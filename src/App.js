import './App.sass';
import { useState, useEffect } from 'react';
import Logo from './components/Logo';
import { Routes, Route, NavLink } from 'react-router-dom';
import ApiService from './apiService';
import Dashboard from './components/Dashboard';
import VisualCompare from './components/VisualCompare';
import NotFound from './components/NotFound';
import UserStats from './components/UserStats';

function App() {
  const [usernames, setUsernames] = useState(['Abhirajshriwinsome', 'Abhinav6002', 'Abhishek9282']);
  const [userProfiles, setUserProfiles] = useState([]);
  const [userProfileStats, setUserProfileStats] = useState([]);
  const myUsername = 'Abhinav6002';

  useEffect(() => {
      if (userProfileStats.length == 0) 
          ApiService.fetchUserData(usernames, (userStats, userDetails) => {
              setUserProfileStats(userStats);
              setUserProfiles(userDetails);
          });
  }, [userProfileStats]);

  return <>
  <div className="header">
    <Logo isBeta={true} />
    <nav>
      <NavLink exact="true" to="/">Dashboard</NavLink>
      <NavLink exact="true" to="/compare">Compare</NavLink>
      <NavLink exact="true" to={"/user/" + myUsername}>My Profile</NavLink>
    </nav>
  </div>
  <Routes>
      <Route path="/" element={<Dashboard userProfileStats={userProfileStats} usernames={usernames} />} />
      <Route path="/compare" element={<VisualCompare />} />
      <Route path="/user/:name" element={<UserStats userProfileStats={userProfileStats} userProfiles={userProfiles} />} />
      <Route path="*" element={<NotFound />} />
  </Routes>
  </>
}

export default App;