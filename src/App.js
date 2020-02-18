import React, {Component} from 'react';
import classNames from 'classnames';
import {AppTopbar} from './AppTopbar';
import {AppBreadcrumb} from './AppBreadcrumb';
import {AppFooter} from './AppFooter';
import {AppConfig} from './AppConfig';
import {AppMenu} from './AppMenu';
import {AppInlineProfile} from './AppInlineProfile';
import {withRouter} from 'react-router';
import {Route} from 'react-router-dom';
import {Dashboard} from './components/Dashboard';
import {FormsDemo} from './components/FormsDemo';
import {SampleDemo} from './components/SampleDemo';
import {DataDemo} from './components/DataDemo';
import {PanelsDemo} from './components/PanelsDemo';
import {OverlaysDemo} from './components/OverlaysDemo';
import {MenusDemo} from './components/MenusDemo';
import {MessagesDemo} from './components/MessagesDemo';
import {ChartsDemo} from './components/ChartsDemo';
import {MiscDemo} from './components/MiscDemo';
import {EmptyPage} from './components/EmptyPage';
import {Documentation} from './components/Documentation';
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'primereact/resources/primereact.min.css';
import './App.css';

class App extends Component {

	constructor() {
		super();
		this.state = {
			layoutMode: 'static',
			overlayMenuActive: false,
			staticMenuDesktopInactive: false,
			staticMenuMobileActive: false,
			topbarMenuActive: false,
			activeTopbarItem: null,
			darkMenu: true,
			menuActive: false,
			profileMode: 'inline',
			themeColor: 'blue-accent',
			grouped: true,
			configDialogActive: true
		};

		this.onDocumentClick = this.onDocumentClick.bind(this);
		this.onMenuClick = this.onMenuClick.bind(this);
		this.onMenuButtonClick = this.onMenuButtonClick.bind(this);
		this.onTopbarMenuButtonClick = this.onTopbarMenuButtonClick.bind(this);
		this.onTopbarItemClick = this.onTopbarItemClick.bind(this);
		this.onMenuItemClick = this.onMenuItemClick.bind(this);
		this.onRootMenuItemClick = this.onRootMenuItemClick.bind(this);
		this.changeMenuMode = this.changeMenuMode.bind(this);
		this.changeMenuType = this.changeMenuType.bind(this);
		this.changeMenuColor = this.changeMenuColor.bind(this);
		this.changeProfileMode = this.changeProfileMode.bind(this);
		this.changeTheme = this.changeTheme.bind(this);
		this.onConfigButtonClick = this.onConfigButtonClick.bind(this);
		this.onConfigCloseClick = this.onConfigCloseClick.bind(this);
		this.onConfigClick = this.onConfigClick.bind(this);
		this.createMenu();
	}

	onMenuClick(event) {
		this.menuClick = true;
	}

	onMenuButtonClick(event) {
		this.menuClick = true;
		this.setState(({
			topbarMenuActive: false
		}));

		if (this.state.layoutMode === 'overlay') {
			if (this.isDesktop())
				this.setState({overlayMenuActive: !this.state.overlayMenuActive});
			else
				this.setState({staticMenuMobileActive: !this.state.staticMenuMobileActive});
		}
		else {
			if (this.isDesktop())
				this.setState({staticMenuDesktopInactive: !this.state.staticMenuDesktopInactive});
			else
				this.setState({staticMenuMobileActive: !this.state.staticMenuMobileActive});
		}

		event.preventDefault();
	}

	onTopbarMenuButtonClick(event) {
		this.topbarItemClick = true;
		this.setState({topbarMenuActive: !this.state.topbarMenuActive});
		this.hideOverlayMenu();
		event.preventDefault();
	}

	onTopbarItemClick(event) {
		this.topbarItemClick = true;

		if (this.state.activeTopbarItem === event.item)
			this.setState({activeTopbarItem: null});
		else
			this.setState({activeTopbarItem: event.item});

		event.originalEvent.preventDefault();
	}

	onMenuItemClick(event) {
		if (!event.item.items) {
			this.hideOverlayMenu();
        }

		if (!event.item.items && (this.isHorizontal() || this.isSlim())) {
			this.setState({
				menuActive: false
			});
		}
	}

	onRootMenuItemClick(event) {
		this.setState({
			menuActive: !this.state.menuActive
		});

		event.originalEvent.preventDefault();
	}

	onConfigButtonClick(event){
		this.configClick = true;
		this.setState({configDialogActive: !this.state.configDialogActive})
	}

	onConfigCloseClick(){
		this.setState({configDialogActive: false})
	}

	onConfigClick(){
		this.configClick = true;
	}

	onDocumentClick(event) {
		if (!this.topbarItemClick) {
			this.setState({
				activeTopbarItem: null,
				topbarMenuActive: false
			});
		}

		if (!this.menuClick) {
			if (this.isHorizontal() || this.isSlim()) {
				this.setState({
					menuActive: false
				})
			}

			this.hideOverlayMenu();
		}

		if (!this.configClick) {
			this.setState({configDialogActive: false});
		}

		this.topbarItemClick = false;
		this.menuClick = false;
		this.configClick = false;
	}

	hideOverlayMenu() {
		this.setState({
			overlayMenuActive: false,
			staticMenuMobileActive: false
		})
	}

	isTablet() {
		let width = window.innerWidth;
		return width <= 1024 && width > 640;
	}

	isDesktop() {
		return window.innerWidth > 1024;
	}

	isMobile() {
		return window.innerWidth <= 640;
	}

	isOverlay() {
		return this.state.layoutMode === 'overlay';
	}

	isHorizontal() {
		return this.state.layoutMode === 'horizontal';
	}

	isSlim() {
		return this.state.layoutMode === 'slim';
	}

	changeMenuMode(event) {
		this.setState({layoutMode: event.menuMode})
		if(event.menuMode === 'horizontal') {
			this.setState({profileMode : 'popup'});
		}
	}

	changeMenuType(event) {
		this.setState({grouped: event.grouped})
	}

	changeMenuColor(event) {
		this.setState({darkMenu: event.darkMenu})
	}

	changeProfileMode(event) {
		this.setState({profileMode: event.profileMode})
	}

	changeTheme(theme, scheme) {
		this.setState({themeColor: theme + '-' + scheme})
		this.changeStyleSheetUrl('layout-css', theme, 'layout', scheme);
		this.changeStyleSheetUrl('theme-css', theme, 'theme', scheme);
	}

	changeStyleSheetUrl(id, value, prefix, scheme) {
		let element = document.getElementById(id);
		let urlTokens = element.getAttribute('href').split('/');

		if(id.localeCompare('layout-css') === 0) {
			urlTokens[urlTokens.length - 1] = prefix + '-' + value + '.css';
		}
		else {
			urlTokens[urlTokens.length - 2] = value ;
			urlTokens[urlTokens.length - 1] = 'theme-' + scheme +  '.css' ;
		}
		let newURL = urlTokens.join('/');

		this.replaceLink(element, newURL);

		if (scheme === 'dark') {
			this.setState({darkMenu:true})
		} else if (scheme === 'light') {
			this.setState({darkMenu:false})
		}

		let topbarLogo = document.getElementById('layout-topbar-logo');
		let menuLogo = document.getElementById('layout-menu-logo');

		if (value.localeCompare('yellow') === 0 || value.localeCompare('lime') === 0) {
			topbarLogo.src = 'assets/layout/images/logo-black.png';
			menuLogo.src = 'assets/layout/images/logo-black.png';

		} else {
			topbarLogo.src = 'assets/layout/images/logo-white.png';
			menuLogo.src = 'assets/layout/images/logo-white.png';
		}
	}

	replaceLink(linkElement, href) {
		const id = linkElement.getAttribute('id');
		const cloneLinkElement = linkElement.cloneNode(true);

		cloneLinkElement.setAttribute('href', href);
		cloneLinkElement.setAttribute('id', id + '-clone');

		linkElement.parentNode.insertBefore(cloneLinkElement, linkElement.nextSibling);

		cloneLinkElement.addEventListener('load', () => {
			linkElement.remove();
			cloneLinkElement.setAttribute('id', id);
		});
	}

	createMenu() {
		this.menuGrouped = [
			{ 	label: 'Home Page', icon: 'pi pi-fw pi-home',
				items: [
					{label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/'}
				]
			},
			{ label: 'Customization', icon: 'pi pi-fw pi-cog',
				items: [
					{	label: 'Menu Layouts', icon: 'pi pi-fw pi-th-large', badge: 2,
						items: [
							{label: 'Static Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'static'})},
							{label: 'Overlay Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'overlay'})},
							{label: 'Slim Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'slim'})},
							{label: 'Horizontal Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({layoutMode: 'horizontal'})},
							{label: 'Grouped Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({grouped: true})},
							{label: 'Ungrouped Menu', icon: 'pi pi-fw pi-bars', command: () => this.setState({grouped: false})}
						]
					},
					{
						label: 'Menu Colors', icon: 'pi pi-fw pi-list', badge: 2,
						items: [
							{ label: 'Light', icon: 'pi pi-fw pi-circle-off', command: () => this.setState({darkMenu: false})},
							{ label: 'Dark', icon: 'pi pi-fw pi-circle-on', command: () => this.setState({darkMenu: true})}
						]
					},
					{label: 'User Profile', icon: 'pi pi-fw pi-user', badge: 2,
						items: [
							{label: 'Popup Profile', icon: 'pi pi-fw pi-user',  command: () => this.setState({profileMode: 'popup'})},
							{label: 'Inline Profile', icon: 'pi pi-fw pi-user',  command: () => this.setState({profileMode: 'inline'})}
						]
					},
					{
						label: 'Themes', icon: 'pi pi-fw pi-pencil', badge: 17,
						items: [
							{
								label: 'Blue', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('blue', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('blue', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('blue', 'dark')
									}
								]
							},
							{
								label: 'Blue Grey', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('bluegrey', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('bluegrey', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('bluegrey', 'dark')
									}
								]
							},
							{
								label: 'Light Blue', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightblue', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightblue', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightblue', 'dark')
									}
								]
							},
							{
								label: 'Indigo', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('indigo', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('indigo', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('indigo', 'dark')
									}
								]
							},
							{
								label: 'Pink', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('pink', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('pink', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('pink', 'dark')
									}
								]
							},
							{
								label: 'Green', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('green', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('green', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('green', 'dark')
									}
								]
							},
							{
								label: 'Light Green', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightgreen', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightgreen', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lightgreen', 'dark')
									}
								]
							},
							{
								label: 'Teal', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('teal', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('teal', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('teal', 'dark')
									}
								]
							},
							{
								label: 'Cyan', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('cyan', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('cyan', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('cyan', 'dark')
									}
								]
							},
							{
								label: 'Lime', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lime', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lime', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('lime', 'dark')
									}
								]
							},
							{
								label: 'Amber', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('amber', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('amber', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('amber', 'dark')
									}
								]
							},
							{
								label: 'Orange', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('orange', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('orange', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('orange', 'dark')
									}
								]
							},
							{
								label: 'Deep Orange', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeporange', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeporange', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeporange', 'dark')
									}
								]
							},
							{
								label: 'Yellow', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('yellow', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('yellow', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('yellow', 'dark')
									}
								]
							},
							{
								label: 'Purple', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('purple', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('purple', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('purple', 'dark')
									}
								]
							},
							{
								label: 'Deep Purple', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeppurple', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeppurple', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('deeppurple', 'dark')
									}
								]
							},
							{
								label: 'Brown', icon: 'pi pi-fw pi-pencil',
								items: [
									{
										label: 'Accent', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('brown', 'accent')
									},
									{
										label: 'Light', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('brown', 'light')
									},
									{
										label: 'Dark', icon: 'pi pi-fw pi-pencil',
										command: () => this.changeTheme('brown', 'dark')
									}
								]
							}
						]
					}
				]
			},
			{
				label: 'Components', icon: 'pi pi-fw pi-star',
				items: [
					{label: 'Sample Page', icon: 'pi pi-fw pi-th-large', to: '/sample'},
					{label: 'Forms', icon: 'pi pi-fw pi-file', to: '/forms'},
					{label: 'Data', icon: 'pi pi-fw pi-table', to: '/data'},
					{label: 'Panels', icon: 'pi pi-fw pi-list', to: '/panels'},
					{label: 'Overlays', icon: 'pi pi-fw pi-clone', to: '/overlays'},
					{label: 'Menus', icon: 'pi pi-fw pi-plus', to: '/menus'},
					{label: 'Messages', icon: 'pi pi-fw pi-spinner',to: '/messages'},
					{label: 'Charts', icon: 'pi pi-fw pi-chart-bar', to: '/charts'},
					{label: 'Misc', icon: 'pi pi-fw pi-upload', to: '/misc'}
				]
			},
			{
				label: 'Pages', icon: 'pi pi-fw pi-copy',
				items: [
					{label: 'Empty Page', icon: 'pi pi-fw pi-clone', to: '/empty'},
					{label: 'Landing', icon: 'pi pi-fw pi-globe', url: 'assets/pages/landing.html', target: '_blank'},
					{label: 'Login', icon: 'pi pi-fw pi-sign-in', to: '/login'},
					{label: 'Error', icon: 'pi pi-fw pi-exclamation-triangle', to: '/error'},
					{label: '404 Page', icon: 'pi pi-fw pi-times', to: '/notfound'},
					{label: 'Access Denied', icon: 'pi pi-fw pi-ban', to: '/access'}
				]
			},
			{
				label: 'Hierarchy', icon: 'pi pi-fw pi-sitemap',
				items: [
					{
						label: 'Submenu 1', icon: 'pi pi-fw pi-sign-in',
						items: [
							{
								label: 'Submenu 1.1', icon: 'pi pi-fw pi-sign-in',
								items: [
									{ label: 'Submenu 1.1.1', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 1.1.2', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 1.1.3', icon: 'pi pi-fw pi-sign-in' },
								]
							},
							{
								label: 'Submenu 1.2', icon: 'pi pi-fw pi-sign-in',
								items: [
									{ label: 'Submenu 1.2.1', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 1.2.2', icon: 'pi pi-fw pi-sign-in' }
								]
							},
						]
					},
					{
						label: 'Submenu 2', icon: 'pi pi-fw pi-sign-in',
						items: [
							{
								label: 'Submenu 2.1', icon: 'pi pi-fw pi-sign-in',
								items: [
									{ label: 'Submenu 2.1.1', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 2.1.2', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 2.1.3', icon: 'pi pi-fw pi-sign-in' },
								]
							},
							{
								label: 'Submenu 2.2', icon: 'pi pi-fw pi-sign-in',
								items: [
									{ label: 'Submenu 2.2.1', icon: 'pi pi-fw pi-sign-in' },
									{ label: 'Submenu 2.2.2', icon: 'pi pi-fw pi-sign-in' }
								]
							},
						]
					}
				]
			},
			{ label: 'Get Started', icon: 'pi pi-fw pi-download',
				items: [
					{
						label: 'Docs', icon: 'pi pi-fw pi-file', command: () => {window.location = "#/documentation"}
					},
					{
						label: 'Buy Now', icon: 'pi pi-fw pi-money-bill', url: ['https://www.primefaces.org/store']
					}
				]
			}
		];

		this.menuUngrouped = [
			{
				label: 'Main Menu',
				icon: 'pi pi-fw pi-home',
				items: this.menuGrouped
			}
		];
	}

	render() {
		const layoutClassName = classNames('layout-wrapper', {
			'layout-horizontal': this.state.layoutMode === 'horizontal',
			'layout-overlay': this.state.layoutMode === 'overlay',
			'layout-static': this.state.layoutMode === 'static',
			'layout-slim': this.state.layoutMode === 'slim',
			'layout-static-inactive': this.state.staticMenuDesktopInactive,
			'layout-mobile-active': this.state.staticMenuMobileActive,
			'layout-overlay-active': this.state.overlayMenuActive,
			'layout-menu-dark': this.state.darkMenu,
			'layout-menu-light':!this.state.darkMenu
		});
		const AppBreadCrumbWithRouter = withRouter(AppBreadcrumb);

		return (
			<div className={layoutClassName} onClick={this.onDocumentClick}>
				<AppTopbar topbarMenuActive={this.state.topbarMenuActive} activeTopbarItem={this.state.activeTopbarItem}
						   onMenuButtonClick={this.onMenuButtonClick} onTopbarMenuButtonClick={this.onTopbarMenuButtonClick} onTopbarItemClick={this.onTopbarItemClick}
						   profileMode={this.state.profileMode} horizontal={this.isHorizontal()}/>

				<div className='layout-menu-container' onClick={this.onMenuClick}>
					<div className="layout-menu-logo">
						<button className="p-link">
							<img id="layout-menu-logo" src="assets/layout/images/logo-white.png" alt="babylon-layout"/>
						</button>
					</div>
					<div className="layout-menu-wrapper">
						<div className="menu-scroll-content">
							{(this.state.profileMode === 'inline' && this.state.layoutMode !== 'horizontal') && <AppInlineProfile />}
							<AppMenu model={this.state.grouped ? this.menuGrouped : this.menuUngrouped} onMenuItemClick={this.onMenuItemClick}
									 onRootMenuItemClick={this.onRootMenuItemClick}
									 layoutMode={this.state.layoutMode} active={this.state.menuActive}/>
						</div>
					</div>
				</div>

				<div className="layout-main">
					<AppBreadCrumbWithRouter/>

					<div className="layout-content">
						<Route path="/" exact component={Dashboard}/>
						<Route path="/forms" component={FormsDemo}/>
						<Route path="/sample" component={SampleDemo}/>
						<Route path="/data" component={DataDemo}/>
						<Route path="/panels" component={PanelsDemo}/>
						<Route path="/overlays" component={OverlaysDemo}/>
						<Route path="/menus" component={MenusDemo}/>
						<Route path="/messages" component={MessagesDemo}/>
						<Route path="/charts" component={ChartsDemo}/>
						<Route path="/misc" component={MiscDemo}/>
						<Route path="/empty" component={EmptyPage}/>
						<Route path="/documentation" component={Documentation}/>
					</div>
				</div>

				<AppConfig layoutMode={this.state.layoutMode} grouped={this.state.grouped} darkMenu={this.state.darkMenu}
						   profileMode={this.state.profileMode} themeColor={this.state.themeColor}
						   changeMenuMode={this.changeMenuMode} changeMenuType={this.changeMenuType} changeProfileMode={this.changeProfileMode}
						   changeMenuColor={this.changeMenuColor} changeTheme={this.changeTheme}
						   onConfigButtonClick={this.onConfigButtonClick} onConfigCloseClick={this.onConfigCloseClick}
						   onConfigClick={this.onConfigClick} configDialogActive={this.state.configDialogActive}/>

				<AppFooter/>

				{this.state.staticMenuMobileActive && <div className="layout-mask"></div>}
			</div>
		);
	}
}

export default App;
