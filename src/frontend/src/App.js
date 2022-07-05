import './App.scss';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const NavBar = lazy(() => import('./components/menu/index.jsx'));
const Users = lazy(() => import('./components/users/index.jsx'));


function App() {
  return (
    <>
    <NavBar/>
    <Router>
      <Suspense>
        <Routes>
            <Route path='/dashboard' element={<Users />} />
        </Routes>
      </Suspense>
    </Router>
    </>
  );
}

export default App;
