import React, { useLayoutEffect } from 'react';
import VerticalTabs from './VerticalTabs';
import PageNotFound from '../common/PageNotFound';
import { useSelector } from 'react-redux';
const Admin = () => {
    const userInfo = useSelector(state => state.auth.userInfo);
    const currentUserRoles = userInfo?.roles || ['User'];
    const canAccessPage = currentUserRoles.includes('Admin') || currentUserRoles.includes('Manager');
    useLayoutEffect(() => {
        document.title = 'Admin';
    }, []);
    return (canAccessPage ?
        (<div>
            <VerticalTabs />
        </div>
        ) : (
            <PageNotFound />
        )
    );
}

export default Admin;
