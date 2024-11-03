import React from 'react';
import UserForm from '../components/Users/UsersForm';
import UsersTbl from '../components/Users/UsersTbl';
const Users = () => {
    return (
        <div className="users">
        <div className="row bg-white">
            <UserForm/>
        </div>
        <div className="row mt-3">
<UsersTbl/>
        </div>
        </div>
       
    );
};

export default Users;