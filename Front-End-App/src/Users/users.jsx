import React, { useLayoutEffect } from 'react';

const Users = () => {
    useLayoutEffect(() => {
        document.title = "Users";
    }, [])
    return (
        <div>
            Users Page (Pending Implementation)
        </div>
    );
}

export default Users;
