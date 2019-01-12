import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {InputText} from 'primereact/inputtext';
import {InputSwitch} from 'primereact/inputswitch';

export class AppTopbar extends Component {

	static defaultProps = {
		onMenuButtonClick: null,
		onTopbarMenuButtonClick: null,
		onTopbarItemClick: null,
		topbarMenuActive: false,
		activeTopbarItem: null,
		onThemeChange: null,
		profileMode: null,
		horizontal: null
	}

	static propTypes = {
		onMenuButtonClick: PropTypes.func.isRequired,
		onTopbarMenuButtonClick: PropTypes.func.isRequired,
		onTopbarItemClick: PropTypes.func.isRequired,
		topbarMenuActive: PropTypes.bool.isRequired,
		activeTopbarItem: PropTypes.string,
		onThemeChange: PropTypes.func,
		profileMode: PropTypes.string,
		horizontal: PropTypes.bool
	}

	constructor() {
		super();
		this.state = {};
	}

	onTopbarItemClick(event, item) {
		if (this.props.onTopbarItemClick) {
			this.props.onTopbarItemClick({
				originalEvent: event,
				item: item
			});
		}
	}

	render() {
		let topbarItemsClassName = classNames('topbar-menu fadeInDown', {'topbar-menu-visible': this.props.topbarMenuActive});

		return <div className="layout-topbar clearfix">

			<a className="layout-topbar-logo">
				<img id="layout-topbar-logo" alt="babylon-layout" src="assets/layout/images/logo-white.png"/>
			</a>

			<a className="layout-menu-button"  onClick={this.props.onMenuButtonClick}>
				<i className="pi pi-bars"/>
			</a>

			<a id="topbar-menu-button"  onClick={this.props.onTopbarMenuButtonClick}>
				<i className="pi pi-ellipsis-v"/>
			</a>

			<ul className={topbarItemsClassName}>
				{(this.props.profileMode === 'popup' || this.props.horizontal) &&
				<li className={classNames('user-profile', {'active-topmenuitem': this.props.activeTopbarItem === 'profile'})}
					onClick={(e) => this.onTopbarItemClick(e, 'profile')}>
					<a>
						<img alt="babylon-layout" src="assets/layout/images/avatar.png"/>
						<span className="topbar-item-name">Arlene Welch</span>
					</a>

					<ul className="fadeInDown">
						<li role="menuitem">
							<a>
								<i className="pi pi-user"/>
								<span>Profile</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-cog"/>
								<span>Settings</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-envelope"/>
								<span>Message</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-bell"/>
								<span>Notifications</span>
							</a>
						</li>
					</ul>
				</li>}

				<li className={classNames({'active-topmenuitem': this.props.activeTopbarItem === 'settings'})}
					onClick={(e) => this.onTopbarItemClick(e, 'settings')}>
					<a>
						<i className="topbar-icon pi pi-calendar"/>
						<span className="topbar-item-name">Notifications</span>
					</a>
					<ul className="fadeInDown">
						<li role="menuitem">
							<a>
								<i className="pi pi-tags"/>
								<span>Pending tasks</span>
								<span className="topbar-submenuitem-badge">6</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-calendar-plus"/>
								<span>Meeting today at 3pm</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-download"/>
								<span>Download</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-lock"/>
								<span>Book flight</span>
							</a>
						</li>
					</ul>
				</li>
				<li className={classNames({'active-topmenuitem': this.props.activeTopbarItem === 'messages'})}
					onClick={(e) => this.onTopbarItemClick(e, 'messages')}>
					<a>
						<i className="topbar-icon pi pi-inbox"/>
						<span className="topbar-item-name">Messages</span>
						<span className="topbar-badge">8</span>
					</a>
					<ul className="fadeInDown">
						<li role="menuitem">
							<a className="topbar-message">
								<img src="assets/layout/images/avatar-john.png" alt="babylon-layout"/>
								<span>Give me a call</span>
							</a>
						</li>
						<li role="menuitem">
							<a className="topbar-message">
								<img src="assets/layout/images/avatar-julia.png" alt="babylon-layout"/>
								<span>Reports attached</span>
							</a>
						</li>
						<li role="menuitem">
							<a className="topbar-message">
								<img src="assets/layout/images/avatar-kevin.png" alt="babylon-layout"/>
								<span>About your invoice</span>
							</a>
						</li>
						<li role="menuitem">
							<a className="topbar-message">
								<img src="assets/layout/images/avatar-julia.png" alt="babylon-layout"/>
								<span>Meeting today</span>
							</a>
						</li>
						<li role="menuitem">
							<a className="topbar-message">
								<img src="assets/layout/images/avatar.png" alt="babylon-layout"/>
								<span>Out of office</span>
							</a>
						</li>
					</ul>
				</li>
				<li className={classNames({'active-topmenuitem': this.props.activeTopbarItem === 'notifications'})}
					onClick={(e) => this.onTopbarItemClick(e, 'notifications')}>
					<a>
						<i className="topbar-icon pi pi-cog"/>
						<span className="topbar-item-name">Settings</span>
					</a>
					<ul className="fadeInDown">
						<li role="menuitem">
							<a>
								<i className="pi pi-pencil"/>
								<span>Change Theme</span>
								<span className="topbar-submenuitem-badge">4</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-star-o"/>
								<span>Favorites</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-lock"/>
								<span>Lock Screen</span>
								<span className="topbar-submenuitem-badge">2</span>
							</a>
						</li>
						<li role="menuitem">
							<a>
								<i className="pi pi-image"/>
								<span>Wallpaper</span>
							</a>
						</li>
					</ul>
				</li>
			</ul>
		</div>;
	}
}