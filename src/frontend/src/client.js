import axios from "axios"



export const getAllUsers = () => {
    return axios.get('/api/v1/users');
}



export const addUser = (username, first_name, last_name, password, email, dateofbirth) => {
    const data = {
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: password,
        email: email,
        dateofbirth: dateofbirth

    };

    return axios.post('/api/v1/users/add', data);
}


export const editUser = (id, username, first_name, last_name, email, dateofbirth) => {
    const data = {
        id: id,
        username: username,
        first_name: first_name,
        last_name: last_name,
        password: "password",
        email: email,
        dateofbirth: dateofbirth

    };

    return axios.put('/api/v1/users/update', data);
}

export const deleteUsers = (ids) => {
    return axios.delete('/api/v1/users/delete/' + ids);
}