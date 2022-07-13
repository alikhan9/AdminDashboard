import { alpha } from '@material-ui/core';
import { Box, Button, IconButton, Modal, TextField, Toolbar, Tooltip, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import React from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { addUser } from '../../client';
import { deleteUsers } from '../../client';

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

const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;
    const [value, setValue] = React.useState(null);

    const handleChange = (newValue) => {
        setValue(newValue);
    };

    const handeDelete = () => {
        deleteUsers(props.selectedUsers).then(() => {
            props.setData(users => users.filter(user => !props.selectedUsers.includes(user.id)))
            props.setSelected([]);
            props.setSelectedUsers([]);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        addUser(
            e.target.username.value,
            e.target.first_name.value,
            e.target.last_name.value,
            e.target.password.value,
            e.target.email.value,
            e.target.dateofbirth.value)
            .then(({ data }) => {
                props.closeTab();
            })
            .catch((err) => {
                let message = typeof err.response !== "undefined" ? err.response.data.message : err.message;
            });
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    <span>Users</span>
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
                                    label="Username"
                                    name="username"
                                />
                                <TextField
                                    sx={styleInput}
                                    label="First Name"
                                    name="first_name"
                                />
                                <TextField
                                    sx={styleInput}
                                    label="Last Name"
                                    name="last_name"
                                />
                                <TextField
                                    sx={styleInput}
                                    label="Password"
                                    name="password"
                                />
                                <TextField
                                    sx={styleInput}
                                    label="Email"
                                    name="email"
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
                                    Create
                                </Button>
                            </form>
                        </Box>
                    </Modal>
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                    <IconButton onClick={handeDelete}>
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            ) : (
                <Button sx={{ width: '10%', mx: 2 }} color="success" variant="outlined" onClick={props.openTab}>New user</Button>
            )}
        </Toolbar>
    );
};



EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


export default EnhancedTableToolbar;