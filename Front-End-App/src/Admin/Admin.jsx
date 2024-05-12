import React, {useLayoutEffect} from 'react';
import VerticalTabs from './VerticalTabs';
const Admin = () => {
    useLayoutEffect(() => {
        document.title = 'Admin';
    }, []);
    return (
        <div>
            <VerticalTabs />
        </div>
    );
}

export default Admin;
