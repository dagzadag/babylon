import React from 'react';

const AppFooter = () => {

    return (
        <div className="layout-footer">
            <div className="p-grid">
                <div className="p-col-6">
                    <a href="/" className="logo-container">
                        <img src="assets/layout/images/logo-black.png" alt="babylon-layout" />
                    </a>
                </div>
                <div className="p-col-6 footer-icons">
                    <a href="#">
                        <i className="pi pi-home"></i>
                    </a>
                    <a href="#">
                        <i className="pi pi-globe"></i>
                    </a>
                    <a href="#">
                        <i className="pi pi-envelope"></i>
                    </a>
                </div>
            </div>
        </div>
    );
}

export default AppFooter;
