import React, {useEffect} from 'react';
import VerticalTabs from './VerticalTabs';
const Admin = () => {
    useEffect(() => {
        document.title = 'Admin';
    }, []);
    return (
        <div>
            <VerticalTabs />
        </div>
    );
}

export default Admin;
