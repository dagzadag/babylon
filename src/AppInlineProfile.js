import React, { Component } from 'react';
import classNames from 'classnames';

export class AppInlineProfile extends Component {

    constructor() {
        super();
        this.state = {
            expanded: false
        };
        this.onClick = this.onClick.bind(this);
    }

    onClick(event) {
        this.setState({expanded: !this.state.expanded});
        event.preventDefault();
    }

    render() {
        return  (
            <div className={classNames('layout-profile', {'layout-profile-active': this.state.expanded})}>
                <button className="layout-profile-button p-link" onClick={this.onClick}>
                    <img src="assets/layout/images/avatar.png" alt="babylon-layout"/>
                    <div className="layout-profile-userinfo">
                        <span className="layout-profile-name">Arlene Welch</span>
                        <span className="layout-profile-role">Design Ops</span>
                    </div>
                    <i className="layout-profile-icon pi pi-angle-down"/>
                </button>

                <ul className="layout-profile-menu">
                    <li role="menuitem">
                        <button className="p-link" tabIndex={this.state.expanded ? null : '-1'}>
							<i className="pi pi-user"/>
							<span>Profile</span>
                        </button>
                    </li>
                    <li role="menuitem">
                        <button className="p-link" tabIndex={this.state.expanded ? null : '-1'}>
							<i className="pi pi-cog"/>
							<span>Settings</span>
                        </button>
                    </li>
                    <li role="menuitem">
                        <button className="p-link" tabIndex={this.state.expanded ? null : '-1'}>
							<i className="pi pi-envelope"/>
							<span>Messages</span>
                        </button>
                    </li>
                    <li role="menuitem">
                        <button className="p-link" tabIndex={this.state.expanded ? null : '-1'}>
							<i className="pi pi-bell"/>
							<span>Notifications</span>
                        </button>
                    </li>
                </ul>
            </div>
        )
    }
}