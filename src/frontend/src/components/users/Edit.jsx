import React from 'react';
import { Box, TextField, Button, Modal } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { editUser } from '../../client';

const style = {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    p: 4,
    borderRadius: 4,
};
const styleInput = {

    width: '100%',
    height: 50,
    m: 1,
};

const Edit = (props) => {

    const [value, setValue] = React.useState(props.row.dateofbirth);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        editUser(
            e.target.id.value,
            e.target.username.value,
            e.target.first_name.value,
            e.target.last_name.value,
            e.target.email.value,
            e.target.dateofbirth.value)
            .then(({ d }) => {
                props.setData((u) => u.map((user) => {
                    if (user.id === props.row.id) {
                        user.username = e.target.username.value;
                        user.first_name = e.target.first_name.value;
                        user.last_name = e.target.last_name.value;
                        user.email = e.target.email.value;
                        user.dateofbirth = e.target.dateofbirth.value;
                    }
                    return user
                }));
                props.closeTab();
            })
            .catch((err) => {
                let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;

            });

    }

    return (
        <Modal
            open={props.open}
            onClose={props.closeTab}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        sx={styleInput}
                        label="Id"
                        name="id"
                        value={props.row.id}
                    />
                    <TextField
                        sx={styleInput}
                        label="Username"
                        name="username"
                        defaultValue={props.row.username}
                        error={false}
                    />
                    <TextField
                        sx={styleInput}
                        label="First Name"
                        name="first_name"
                        defaultValue={props.row.first_name}

                    />
                    <TextField
                        sx={styleInput}
                        label="Last Name"
                        name="last_name"
                        defaultValue={props.row.last_name}
                    />
                    <TextField
                        sx={styleInput}
                        label="Email"
                        name="email"
                        defaultValue={props.row.email}

                    />
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DesktopDatePicker
                            label="Date of birth"
                            inputFormat="yyyy-MM-dd"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params) => <TextField {...params} sx={styleInput} name="dateofbirth" />}
                        />
                    </LocalizationProvider>

                    <Button
                        sx={styleInput}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Update
                    </Button>
                </form>
            </Box>
        </Modal>
    )
}

export default Edit;