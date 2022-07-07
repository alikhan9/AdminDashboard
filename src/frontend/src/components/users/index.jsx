import  React, { useEffect, useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {getAllUsers} from '../../client.js'
import './index.scss'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'



const columns = [
  { field: 'id', headerName: 'ID', width: 100 },
  { field: 'username', headerName: 'Username', width: 200 },
  { field: 'last_name', headerName: 'Last name', width: 200 },
  { field: 'first_name', headerName: 'First name', width: 200 },
  { field: 'email', headerName: 'email', width: 300 },
  {
    field: 'dateofbirth', headerName: 'Date of Birth', width: 200,
  }
];

const Users = () => {

  const [data, setData] = React.useState([]);


  useEffect(() => {
    getAllUsers()
      .then((response) => {
        setData(response.data.map( u => { u.dateofbirth = u.dateofbirth.substring(0,10); return u} ));
      })
  }, [])


  return (
    <div className='table-wrapper'>
      <DataGrid
        className='table'
        rows={data}
        columns={columns}
        pageSize={18}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
};

export default Users;