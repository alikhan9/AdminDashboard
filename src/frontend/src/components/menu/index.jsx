import * as React from 'react';
import './index.scss'
import GroupIcon from '@mui/icons-material/Group';
import MessageIcon from '@mui/icons-material/Message';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className='wrapper'>
      <nav>
        <NavLink 
        to='/dashboard'>
          <DashboardIcon className='icon' />
          <p>DashBoard</p>
        </NavLink>
        {/* <NavLink>
          <GroupIcon className='icon' />
          <p>Users</p>
        </NavLink>
        <NavLink>
          <MessageIcon className='icon' />
          <p>Messages</p>
        </NavLink> */}
      </nav>
    </div>
  );
}

export default NavBar;