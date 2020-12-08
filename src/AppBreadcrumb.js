import React from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';

const AppBreadcrumb = () => {

    const history = useHistory();
    const location = useLocation();
    const pathname = location.pathname;
    const paths = pathname.split('/');

    return (
        <div className="route-bar">
            <div className="route-bar-breadcrumb">
                <ul>
                    <li><button type="button" className="p-link" onClick={() => history.push('/')}><i className="pi pi-home"/></button></li>
                    {
                        location.pathname === '/' ? <li>/</li> : paths.map((path, index) => <li key={index}>{path === '' ? '/' : path}</li>)
                    }
                </ul>
            </div>
        </div>
    );
}

export default withRouter(AppBreadcrumb);
