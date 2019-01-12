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
                <a className="layout-profile-button" onClick={this.onClick}>
                    <img src="assets/layout/images/avatar.png" alt="babylon-layout"/>
                    <div className="layout-profile-userinfo">
                        <span className="layout-profile-name">Arlene Welch</span>
                        <span className="layout-profile-role">Design Ops</span>
                    </div>
                    <i className="layout-profile-icon pi pi-angle-down"/>
                </a>

                <ul className="layout-profile-menu">
                    <li role="menuitem">
                        <a tabIndex={this.state.expanded ? null : '-1'}>
							<i className="pi pi-user"/>
							<span>Profile</span>
                        </a>
                    </li>
                    <li role="menuitem">
                        <a  tabIndex={this.state.expanded ? null : '-1'}>
							<i className="pi pi-cog"/>
							<span>Settings</span>
                        </a>
                    </li>
                    <li role="menuitem">
                        <a  tabIndex={this.state.expanded ? null : '-1'}>
							<i className="pi pi-envelope"/>
							<span>Messages</span>
                        </a>
                    </li>
                    <li role="menuitem">
                        <a  tabIndex={this.state.expanded ? null : '-1'}>
							<i className="pi pi-bell"/>
							<span>Notifications</span>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }
}