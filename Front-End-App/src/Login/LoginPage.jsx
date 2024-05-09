import React, {useEffect} from 'react';

const LoginPage = () => {
    useEffect(() => {
        document.title = 'Login';
    }, []);
    return (
        <div>
            Login Page
        </div>
    );
}

export default LoginPage;
