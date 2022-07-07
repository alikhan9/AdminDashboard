import './App.scss';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const NavBar = lazy(() => import('./components/menu/index.jsx'));
const Users = lazy(() => import('./components/users/index.jsx'));


function App() {
  return (
    <>
      <Router>
        <Suspense>
          <Routes>
            <Route path={'/'} element={<><NavBar /></>} />
            <Route  path='/users' element={<><NavBar /><Users /></>} />
            <Route  path='/messages' element={<><NavBar /><Users /></>} />
          </Routes>
        </Suspense>
      </Router>
    </>
  );
}

export default App;
